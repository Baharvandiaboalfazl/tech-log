import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import useAuthStatus from "./hooks/useAuthStatus";
import Loader from "./lib/Loader";
import RobotLoader from "./components/threejs/RobotLoader";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import NoInstagramPage from "./components/NoInstagramPage";

const AboutPage = Loader(import("./pages/AboutPage"));
const Signin = Loader(import("./pages/SignInPage"));
const Signup = Loader(import("./pages/SignUpPage"));
const Dashboard = Loader(import("./pages/Dashboard"));
const PostPage = Loader(import("./pages/PostPage"));
const Articles = Loader(import("./pages/Articles"));
const AuthorPage = Loader(import("./pages/AuthorPage"));
const CategoryPage = Loader(import("./pages/CategoryPage"));
const ForgotPasswordPage = Loader(import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = Loader(import("./pages/ResetPasswordPage"));
const CreatePostModal = Loader(import("./components/modals/CreatePostModal"));
const UpdatePostModal = Loader(import("./components/modals/UpdatePostModal"));

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();
  const background = location.state?.backgroundLocation;

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useAuthStatus();

  if (initialLoading) {
    return <RobotLoader />;
  }

  return (
    <>
      <Suspense fallback={<RobotLoader />}>
        <Routes location={background || location}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<Home />} />
            <Route path="/articles/search?" element={<Articles />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/post/:postSlug" element={<PostPage />} />
            <Route path="/author/:username" element={<AuthorPage />} />
            <Route path="/categories" element={<CategoryPage />} />
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/no-instagram" element={<NoInstagramPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {background && (
          <Routes>
            <Route path="/create-post" element={<CreatePostModal />} />
            <Route path="/update-post/:postId" element={<UpdatePostModal />} />
          </Routes>
        )}
      </Suspense>
    </>
  );
};

export default App;
