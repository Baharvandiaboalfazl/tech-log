import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signupUser,
  verifyEmail,
  resendOtp,
  clearError,
} from "../redux/user/userSlice";
import toast from "react-hot-toast";
import SignUp from "../components/login-form/SignUp";
import SideImage from "../components/login-form/SideImage";
import VerifyEmail from "../components/login-form/VerifyEmail";

const SignUpPage = () => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(1);
  const [cooldown, setCooldown] = useState(0);

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        setStep(2);
        setCooldown(60);
      })
      .catch((err) => {
        if (err.type === "general") {
          toast.error(err.message);
        }
      });
  };

  const handleResendOtp = () => {
    if (cooldown > 0) return;
    dispatch(resendOtp(formData.email))
      .unwrap()
      .then(
        () => setCooldown(60),
        toast.success("کد تایید مجدد برای شما ارسال شد.")
      )
      .catch((err) => toast.error(err));
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    dispatch(verifyEmail({ email: formData.email, otp: formData.otp }))
      .unwrap()
      .then(
        () => setTimeout(() => navigate("/sign-in"), 2000),
        toast.success("ثبت نام شما با موفقیت انجام شد.")
      )
      .catch((err) => toast.error(err));
  };

  const fieldErrors = error?.type === "validation" ? error.errors : {};
  const otpError = error?.type === "otp" ? error.message : null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {step === 1 && (
        <SignUp
          loading={loading}
          handleSignupSubmit={handleSignupSubmit}
          handleChange={handleChange}
          fieldErrors={fieldErrors}
        />
      )}
      {step === 2 && (
        <VerifyEmail
          formData={formData}
          handleVerifySubmit={handleVerifySubmit}
          handleChange={handleChange}
          handleResendOtp={handleResendOtp}
          otpError={otpError}
          loading={loading}
          cooldown={cooldown}
        />
      )}
      <SideImage />
    </div>
  );
};

export default SignUpPage;
