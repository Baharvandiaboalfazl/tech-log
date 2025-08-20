import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../redux/user/userSlice";
import toast from "react-hot-toast";
import UserInfo from "./profile/UserInfo";
import UserSocials from "./profile/UserSocials";
import UserPassword from "./profile/UserPassword";
import UserDelete from "./profile/UserDelete";

const DashProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const {
    currentUser,
    loading,
    error: reduxError,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        avatar: currentUser.avatar || "",
        bio: currentUser.bio || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        socials: currentUser.socials || {
          twitter: "",
          instagram: "",
          telegram: "",
        },
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageUploadSuccess = (imageUrl) => {
    setFormData({ ...formData, avatar: imageUrl });
  };

  const handleSocialChange = (e) => {
    setFormData({
      ...formData,
      socials: { ...formData.socials, [e.target.id]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      const passwordError = "رمز عبور جدید و تکرار آن یکسان نیستند.";
      setFormErrors({ password: passwordError });
      toast.error(passwordError);
      return;
    }

    dispatch(updateUser({ userId: currentUser._id, formData }))
      .unwrap()
      .then((updatedUserData) => {
        toast.success("پروفایل شما با موفقیت آپدیت شد");
        console.log(updatedUserData);
      })
      .catch((err) => {
        if (err.type === "validation") {
          setFormErrors(err.errors);
        } else {
          toast.error(err.message || err);
        }
      });
  };

  const handleDeleteUser = () => {
    setShowDeleteModal(false);
    dispatch(deleteUser(currentUser._id))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-10 max-w-4xl mx-auto flex flex-col gap-8"
    >
      <UserInfo
        currentUser={currentUser}
        formData={formData}
        handleChange={handleChange}
        formErrors={formErrors}
        imgUploader={handleImageUploadSuccess}
      />

      <UserSocials
        currentUser={currentUser}
        formData={formData}
        handleSocialChange={handleSocialChange}
      />

      <UserPassword handleChange={handleChange} formErrors={formErrors} />

      <UserDelete
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteUser={handleDeleteUser}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer"
      >
        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </form>
  );
};

export default DashProfile;
