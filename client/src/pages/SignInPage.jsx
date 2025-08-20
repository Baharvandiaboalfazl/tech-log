import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import Signin from "../components/login-form/Signin";
import SideImage from "../components/login-form/SideImage";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinUser(formData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="flex">
      <SideImage />
      <Signin
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
    </div>
  );
};

export default SignInPage;
