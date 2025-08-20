import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(errorHandler(401, "دسترسی غیرمجاز", "لطفا ابتدا وارد شوید."));
    }

    const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = userPayload;
    next();
  } catch (error) {
    return next(errorHandler(403, "دسترسی ممنوع", "توکن نامعتبر است."));
  }
};
