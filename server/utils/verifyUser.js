import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(errorHandler(401, "دسترسی غیرمجاز", "لطفا ابتدا وارد شوید."));
    }

    const token = authHeader.split(' ')[1];

    const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = userPayload; 
    next();
  } catch (error) {
    return next(errorHandler(403, "دسترسی ممنوع", "توکن نامعتبر است."));
  }
};
