import Category from "../models/category.model.js";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createCategory = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه ایجاد دسته‌بندی ندارید."));
  }
  try {
    const { name } = req.body;

    if (!name) {
      return next(
        errorHandler(
          400,
          "نام دسته‌بندی الزامی است.",
          "نام دسته‌بندی نمی‌تواند خالی باشد."
        )
      );
    }

    const slug = name
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .replace(/--+/g, "-");

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return next(
        errorHandler(
          409,
          "این دسته‌بندی قبلاً ایجاد شده است.",
          "یک دسته‌بندی با این نام وجود دارد."
        )
      );
    }

    const newCategory = new Category({ name, slug });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);

    const query = Category.find().sort({ createdAt: -1 });

    if (limit) {
      query.limit(limit);
    }

    const categories = await query.exec();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      errorHandler(403, "شما اجازه به‌روزرسانی دسته‌بندی‌ها را ندارید.")
    );
  }
  try {
    const { name } = req.body;

    const newSlug = name
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { $set: { name, slug: newSlug } },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه حذف دسته‌بندی‌ها را ندارید."));
  }
  try {
    const categoryId = req.params.categoryId;

    const postCount = await Post.countDocuments({ category: categoryId });

    if (postCount > 0) {
      return next(
        errorHandler(
          400,
          "نمی‌توانید این دسته‌بندی را حذف کنید چون توسط پست‌ها استفاده می‌شود."
        )
      );
    }

    await Category.findByIdAndDelete(categoryId);
    res.status(200).json("دسته‌بندی با موفقیت حذف شد.");
  } catch (error) {
    next(error);
  }
};
