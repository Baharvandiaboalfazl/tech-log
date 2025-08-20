import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import Category from "../models/category.model.js";
import Settings from "../models/settings.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const create = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه ایجاد پست را ندارید."));
  }

  if (!req.body.title || !req.body.content || !req.body.category) {
    return next(errorHandler(400, "لطفاً تمام فیلدهای الزامی را پر کنید."));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/--+/g, "-");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
    allowComments: req.body.allowComments,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  console.log("درخواست دریافت شده با کوئری:", req.query);
  try {
    const settings = await Settings.findOne();
    const postsPerPage = settings ? settings.rowsIndex : 9;

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || postsPerPage;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    if (req.query.searchTerm) {
      const users = await User.find({
        username: { $regex: req.query.searchTerm, $options: "i" },
      });
      const userIds = users.map((user) => user._id);

      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
        { userId: { $in: userIds } },
      ];
    }

    if (req.query.cat) {
      try {
        const categoryDoc = await Category.findOne({
          slug: { $regex: `^${req.query.cat}$`, $options: "i" },
        });

        if (categoryDoc) {
          query.category = categoryDoc._id;
        } else {
          query.category = null;
        }
      } catch (e) {
        console.error("خطا در جستجوی دسته‌بندی:", e);
      }
    }

    console.log("آبجکت کوئری نهایی برای MongoDB:", query);

    const posts = await Post.find(query)
      .populate("userId", "username avatar")
      .populate("category", "name slug")
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  try {
    const { postId, userId } = req.params;

    const postToDelete = await Post.findById(postId);

    if (!postToDelete) {
      return next(errorHandler(404, "پست مورد نظر برای حذف یافت نشد."));
    }

    if (
      req.user.role !== "admin" &&
      postToDelete.userId.toString() !== userId
    ) {
      return next(errorHandler(403, "شما اجازه حذف این پست را ندارید."));
    }

    await Comment.deleteMany({ postId });

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: "پست با موفقیت حذف شد." });
  } catch (error) {
    console.error("خطا در حذف پست:", error);
    return next(errorHandler(500, "خطایی در حذف پست رخ داد."));
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.role === "admin" || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "شما اجازه به‌روزرسانی این پست را ندارید."));
  }

  try {
    const postToUpdate = await Post.findById(req.params.postId);
    if (!postToUpdate) {
      return next(errorHandler(404, "پست مورد نظر برای به‌روزرسانی یافت نشد."));
    }

    if (!req.body.title || !req.body.content || !req.body.category) {
      return next(errorHandler(400, "عنوان و محتوای پست نمی‌تواند خالی باشد."));
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
          allowComments: req.body.allowComments,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const getRandomPosts = async (req, res, next) => {
  try {
    const randomPosts = await Post.aggregate([{ $sample: { size: 4 } }]);

    res.status(200).json(randomPosts);
  } catch (error) {
    next(error);
  }
};

export const getPostStats = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه مشاهده آمار را ندارید."));
  }
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const postsPerMonth = await Post.aggregate([
      { $match: { createdAt: { $gte: oneYearAgo } } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
            ],
          },
          count: 1,
        },
      },
    ]);

    const postsByCategory = await Post.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      {
        $lookup: {
          from: Category.collection.name,
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      { $project: { _id: 0, name: "$categoryDetails.name", value: "$count" } },
    ]);

    res.status(200).json({ postsPerMonth, postsByCategory });
  } catch (error) {
    next(error);
  }
};
