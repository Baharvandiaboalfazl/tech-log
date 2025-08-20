import { errorHandler } from "../utils/errorHandler.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import Settings from "../models/settings.model.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId, parentId } = req.body;

    if (!content || !postId || !userId) {
      return next(
        errorHandler(
          400,
          "اطلاعات دیدگاه ناقص است.",
          "محتوا، شناسه پست و شناسه کاربر نمی‌تواند خالی باشد."
        )
      );
    }

    const globalSettings = await Settings.findOne();
    if (!globalSettings.commentsEnabled) {
      return next(errorHandler(403, "بخش دیدگاه‌ها در کل سایت غیرفعال است."));
    }

    const post = await Post.findById(postId);
    if (!post.allowComments) {
      return next(errorHandler(403, "بخش دیدگاه‌ها برای این پست غیرفعال است."));
    }

    if (userId !== req.user.id) {
      return next(
        errorHandler(
          403,
          "شما اجازه ایجاد این دیدگاه را ندارید.",
          "شناسه کاربر وارد شده با کاربر احراز هویت شده مطابقت ندارد."
        )
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
      parentId: parentId || null,
    });

    await newComment.save();

    const populatedComment = await Comment.findById(newComment._id).populate(
      "userId",
      "username avatar"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, "پست مورد نظر یافت نشد."));
    }

    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return next(errorHandler(404, "دیدگاه مورد نظر یافت نشد."));
    }

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getcomments = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(
      errorHandler(403, "شما اجازه دسترسی به تمام دیدگاه‌ها را ندارید.")
    );
  }
  try {
    const settings = await Settings.findOne();
    const commentsPerPage = settings ? settings.rowsIndex : 9;

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || commentsPerPage;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const query = {};

    if (req.query.commentId) {
      query._id = req.query.commentId;
    }

    const comments = await Comment.find(query)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate({ path: "userId", select: "username avatar isBanned" })
      .populate({ path: "postId", select: "title slug" })
      .populate({ path: "parentId", select: "content" });

    const totalComments = await Comment.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "دیدگاه مورد نظر یافت نشد."));
    }

    if (comment.userId !== req.user.id && req.user.role !== "admin") {
      return next(errorHandler(403, "شما اجازه ویرایش این دیدگاه را ندارید."));
    }

    if (!req.body.content) {
      return next(errorHandler(400, "محتوای دیدگاه نمی‌تواند خالی باشد."));
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(404, "دیدگاه مورد نظر یافت نشد."));
    }

    if (comment.userId !== req.user.id && req.user.role !== "admin") {
      return next(errorHandler(403, "شما اجازه حذف این دیدگاه را ندارید."));
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("دیدگاه با موفقیت حذف شد.");
  } catch (error) {
    next(error);
  }
};

export const getCommentByNum = async (req, res, next) => {
  try {
    const size = parseInt(req.query.size);

    if (isNaN(size) || size < 1) {
      return res
        .status(400)
        .json({ message: "تعداد درخواستی باید یک عدد معتبر باشد." });
    }

    const comments = await Comment.find()
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 })
      .limit(size);

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
