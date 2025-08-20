import Settings from "../models/settings.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  if (!req.user.role === "admin") {
    return next(errorHandler(403, "شما اجازه آپدیت تنظیمات را ندارید."));
  }
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
      });
    }
    await settings.save();
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};
