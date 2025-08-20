import bcrypt from "bcrypt";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Settings from "../models/settings.model.js";

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.userId && !req.user.role === "admin") {
      return next(
        errorHandler(403, "شما اجازه به‌روزرسانی این کاربر را ندارید.")
      );
    }

    const {
      username,
      email,
      avatar,
      bio,
      currentPassword,
      newPassword,
      confirmPassword,
      socials,
    } = req.body;

    const validationErrors = {};
    const updateFields = {};

    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(errorHandler(404, "کاربر پیدا نشد."));
    }

    if (newPassword || currentPassword || confirmPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        validationErrors.password =
          "برای تغییر رمز عبور، هر سه فیلد الزامی است.";
      } else {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          validationErrors.password = "رمز عبور فعلی شما صحیح نیست.";
        } else if (newPassword !== confirmPassword) {
          validationErrors.password = "رمز عبور جدید با تکرار آن مطابقت ندارد.";
        } else {
          const passwordErrors = [];
          if (newPassword.length < 8) passwordErrors.push("حداقل ۸ کاراکتر");
          if (!/[A-Z]/.test(newPassword)) passwordErrors.push("یک حرف بزرگ");
          if (!/[0-9]/.test(newPassword)) passwordErrors.push("یک عدد");
          if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword))
            passwordErrors.push("یک کاراکتر خاص");
          if (passwordErrors.length > 0) {
            validationErrors.password = `رمز عبور جدید باید شامل: ${passwordErrors.join(
              "، "
            )}.`;
          }

          if (!validationErrors.password) {
            const saltRounds = 12;
            updateFields.password = await bcrypt.hash(newPassword, saltRounds);
          }
        }
      }
    }

    if (username) {
      if (username.length < 5 || username.length > 20)
        validationErrors.username = "نام کاربری باید بین ۵ تا ۲۰ کاراکتر باشد.";
      else if ((await User.findOne({ username })) && user.username !== username)
        validationErrors.username = "این نام کاربری قبلا ثبت شده است.";
      else updateFields.username = username;
    }

    if (email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        validationErrors.email = "فرمت ایمیل نامعتبر است.";
      else if ((await User.findOne({ email })) && user.email !== email)
        validationErrors.email = "این ایمیل قبلا ثبت شده است.";
      else updateFields.email = email;
    }

    if (bio) {
      if (bio.length > 200)
        validationErrors.bio = "بیوگرافی نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد.";
      else updateFields.bio = bio;
    }
    if (avatar) updateFields.avatar = avatar;

    if (socials) {
      if (user.role === "admin" || user.role === "editor") {
        updateFields.socials = socials;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      return next(
        errorHandler(422, "خطای اعتبارسنجی.", "اطلاعات وارد شده صحیح نیست.", {
          errors: validationErrors,
        })
      );
    }

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(200)
        .json({ message: "هیچ فیلدی برای به‌روزرسانی ارائه نشده است." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateFields },
      { new: true }
    );

    const { password: userPassword, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("کاربر با موفقیت خارج شد.");
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.role === "admin" && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "شما اجازه حذف این کاربر رو ندارید."));
  }

  try {
    const userToDelete = await User.findById(req.params.userId);

    if (!userToDelete) {
      return next(errorHandler(404, "کاربر یافت نشد."));
    }

    if (userToDelete.role === "admin") {
      return next(errorHandler(403, "امکان حذف حساب مدیر وجود ندارد."));
    }

    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "کاربر با موفقیت حذف شد." });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه مشاهده لیست کاربران را ندارید."));
  }

  try {
    const settings = await Settings.findOne();
    const usersPerPage = settings ? settings.rowsIndex : 9;

    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || usersPerPage;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const query = {
      ...(req.query.searchTerm && {
        $or: [
          { username: { $regex: req.query.searchTerm, $options: "i" } },
          { email: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
      ...(req.query.role &&
        ["user", "editor", "admin"].includes(req.query.role) && {
          role: req.query.role,
        }),
      ...(req.query.isVerified &&
        ["true", "false"].includes(req.query.isVerified) && {
          isVerified: req.query.isVerified === "true",
        }),
      ...(req.query.isBanned &&
        ["true", "false"].includes(req.query.isBanned) && {
          isBanned: req.query.isBanned === "true",
        }),
      ...(req.query.userId && { _id: req.query.userId }),
    };

    const users = await User.find(query)
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const ignoreUsersPass = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments(query);

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: ignoreUsersPass,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "کاربر یافت نشد."));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getAuthorProfile = async (req, res, next) => {
  try {
    const author = await User.findOne({ username: req.params.username });

    if (!author) {
      return next(errorHandler(404, "نویسنده یافت نشد."));
    }

    const posts = await Post.find({ userId: author._id })
      .sort({ createdAt: -1 })
      .limit(10);

    const { password, email, ...authorProfile } = author._doc;

    res.status(200).json({ author: authorProfile, posts });
  } catch (error) {
    next(error);
  }
};

export const changeRole = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه تغییر نقش را ندارید."));
  }

  try {
    const { newRole } = req.body;
    const targetUserId = req.params.userId;

    if (newRole === "admin") {
      const currentAdmin = await User.findOne({ role: "admin" });

      if (currentAdmin && currentAdmin._id.toString() !== targetUserId) {
        return next(
          errorHandler(400, "فقط یک کاربر می‌تواند نقش مدیر را داشته باشد.")
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      targetUserId,
      { $set: { role: newRole } },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "کاربر یافت نشد."));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const banUser = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه مسدود کردن کاربر را ندارید."));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { isBanned: true } },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "کاربر یافت نشد."));
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const unbanUser = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه رفع مسدودیت کاربر را ندارید."));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { isBanned: false } },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "کاربر یافت نشد."));
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getChartData = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه مشاهده آمار را ندارید."));
  }
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const usersPerMonth = await User.aggregate([
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

    res.status(200).json({ usersPerMonth });
  } catch (error) {
    next(error);
  }
};
