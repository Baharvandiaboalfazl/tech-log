import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendOtpEmail, sendResetPasswordEmail } from "../utils/mailer.js";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const validationErrors = {};

    if (!username) validationErrors.username = "نام کاربری نباید خالی باشد.";
    else if (username.length < 5 || username.length > 20)
      validationErrors.username = "نام کاربری باید بین ۵ تا ۲۰ کاراکتر باشد.";
    else if (!/^[a-z0-9]+$/.test(username))
      validationErrors.username =
        "نام کاربری فقط باید شامل حروف کوچک انگلیسی و اعداد باشد.";

    if (!email) validationErrors.email = "ایمیل نباید خالی باشد.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      validationErrors.email = "فرمت ایمیل صحیح نیست.";

    if (!password) validationErrors.password = "رمز عبور نباید خالی باشد.";
    else {
      const passwordErrors = [];
      if (password.length < 8) passwordErrors.push("حداقل ۸ کاراکتر");
      if (!/[A-Z]/.test(password)) passwordErrors.push("یک حرف بزرگ");
      if (!/[0-9]/.test(password)) passwordErrors.push("یک عدد");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        passwordErrors.push("یک کاراکتر خاص");
      if (passwordErrors.length > 0) {
        validationErrors.password = `رمز عبور باید شامل: ${passwordErrors.join(
          "، "
        )}.`;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      return next(
        errorHandler(422, "ثبت نام انجام نشد", "اطلاعات وارد شده صحیح نیست.", {
          errors: validationErrors,
        })
      );
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser && existingUser.isVerified) {
      const conflictErrors = {};
      if (existingUser.username === username)
        conflictErrors.username = "این نام کاربری قبلاً ثبت شده است.";
      if (existingUser.email === email)
        conflictErrors.email = "این ایمیل قبلاً ثبت شده است.";
      return next(
        errorHandler(409, "نام کاربری یا ایمیل تکراری است.", {
          errors: conflictErrors,
        })
      );
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    let userToSave;
    if (existingUser && !existingUser.isVerified) {
      userToSave = existingUser;
      userToSave.username = username;
      userToSave.password = hashedPassword;
      userToSave.otp = otp;
      userToSave.otpExpires = otpExpires;
    } else {
      userToSave = new User({
        username,
        email,
        password: hashedPassword,
        otp,
        otpExpires,
        isVerified: false,
      });
    }

    await userToSave.save();

    await sendOtpEmail(email, otp);

    res.status(200).json({
      message: "ثبت‌نام اولیه با موفقیت انجام شد, ایمیل خود را تأیید کنید.",
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        errorHandler(
          400,
          "ایمیل و رمز عبور الزامی است.",
          "اطلاعات وارد شده ناقص است."
        )
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(
        errorHandler(
          401,
          "ایمیل یا رمز عبور اشتباه است.",
          "اعتبار سنجی ناموفق بود."
        )
      );
    }

    if (user.isBanned) {
      return next(
        errorHandler(
          403,
          "این حساب مسدود شده است.",
          "دسترسی شما به سیستم مسدود شده است."
        )
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(
        errorHandler(
          401,
          "ایمیل یا رمز عبور اشتباه است.",
          "اعتبار سنجی ناموفق بود."
        )
      );
    }

    const tokenPayload = {
      id: user._id,
      role: user.role,
    };

    console.log("PAYLOAD FOR JWT:", tokenPayload); 

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const { password: userPassword, ...rest } = user._doc;

    const userWithToken = { ...rest, token };
    
    // .cookie("access_token", token, { httpOnly: true })
    
    res
      .status(200)
      .json(userWithToken);
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(
      errorHandler(400, "ایمیل الزامی است.", "ایمیل نمی‌تواند خالی باشد.")
    );
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        username: email.split("@")[0] + Math.random().toString(36).slice(-4),
        password: "otp-user-no-password",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendOtpEmail(email, otp);

    res.status(200).json({ message: "کد به ایمیل شما ارسال شد." });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return next(
        errorHandler(
          400,
          "کد وارد شده نامعتبر یا منقضی شده است.",
          "کد تأیید نامعتبر است."
        )
      );
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({
      message: "حساب شما با موفقیت فعال شد.",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    const EmailFormatErrors = {};

    if (!email) EmailFormatErrors.email = "ایمیل نباید خالی باشد.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      EmailFormatErrors.email = "فرمت ایمیل صحیح نیست.";

    if (!user) {
      EmailFormatErrors.user = "کاربر پیدا نشد.";
    }

    if (Object.keys(EmailFormatErrors).length > 0) {
      return next(
        errorHandler(422, "درخواست شما انجام نشد", "ایمیل شما صحیح نیست", {
          errors: EmailFormatErrors,
        })
      );
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetUrl);

    res.status(200).json({ message: "لینک بازنشانی به ایمیل شما ارسال شد." });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    const validationErrors = {};

    if (!password) {
      validationErrors.password = "رمز عبور نباید خالی باشد.";
    } else {
      const passwordErrors = [];
      if (password.length < 8) passwordErrors.push("حداقل ۸ کاراکتر");
      if (!/[A-Z]/.test(password)) passwordErrors.push("یک حرف بزرگ");
      if (!/[0-9]/.test(password)) passwordErrors.push("یک عدد");
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        passwordErrors.push("یک کاراکتر خاص");
      if (passwordErrors.length > 0) {
        validationErrors.password = `رمز عبور باید شامل: ${passwordErrors.join(
          "، "
        )}.`;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      return next(
        errorHandler(422, "رمز عبور نامعتبر", "اطلاعات وارد شده صحیح نیست.", {
          errors: validationErrors,
        })
      );
    }

    const resetToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        errorHandler(
          400,
          "توکن نامعتبر یا منقضی شده است.",
          "توکن بازنشانی رمز عبور نامعتبر است."
        )
      );
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "رمز عبور با موفقیت تغییر کرد." });
  } catch (error) {
    next(error);
  }
};
