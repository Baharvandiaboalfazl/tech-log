import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Tech Log" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "کد ورود شما به وبلاگ Tech Log",
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; text-align: right;">
        <h2>کد ورود شما</h2>
        <p>برای ورود به حساب کاربری خود از کد زیر استفاده کنید:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px;">${otp}</p>
        <p>این کد تا ۱۰ دقیقه دیگر معتبر است.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

export const sendResetPasswordEmail = async (to, url) => {
  const mailOptions = {
    from: `"Tech Log" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "لینک بازیابی رمز عبور - Tech Log",
    html: `
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Tahoma, Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

                    <tr>
                        <td align="center" style="padding: 40px 0 30px 0; border-bottom: 1px solid #eeeeee;">
                            <h1 style="margin: 0; color: #333333; font-size: 28px;">Tech Log</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px 30px; text-align: right;">
                            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: bold;">درخواست بازیابی رمز عبور</h2>
                            <p style="margin: 0 0 25px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                                برای تغییر رمز عبور لطفاً روی دکمه زیر کلیک کنید.
                            </p>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 28px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; letter-spacing: 0.5px;">
                                            تنظیم مجدد رمز عبور
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 25px 0 0 0; color: #777777; font-size: 14px; line-height: 1.6;">
                                این لینک فقط تا <strong>۳۰ دقیقه</strong> معتبر است.
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 30px; text-align: center; background-color: #f9f9f9; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                            <p style="margin: 0; color: #888888; font-size: 14px;">
                                اگر شما این درخواست را نداده‌اید، نیاز به انجام کاری نیست و می‌توانید این ایمیل را نادیده بگیرید.
                            </p>
                            <p style="margin: 10px 0 0 0; color: #aaaaaa; font-size: 12px;">
                                &copy; 2025 Tech Log. تمام حقوق محفوظ است.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully");
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};
