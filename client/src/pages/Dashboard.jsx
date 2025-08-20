import { lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setTab } from "../redux/dashboard/dashboardSlice";

const DashSidebar = lazy(() => import("../components/dashboard/DashSidebar"));
const DashInfo = lazy(() => import("../components/dashboard/DashInfo"));
const DashProfile = lazy(() => import("../components/dashboard/DashProfile"));
const DashPosts = lazy(() => import("../components/dashboard/DashPosts"));
const DashUsers = lazy(() => import("../components/dashboard/DashUsers"));
const DashComments = lazy(() => import("../components/dashboard/DashComments"));
const DashCategories = lazy(() =>
  import("../components/dashboard/DashCategories")
);
const DashSettings = lazy(() => import("../components/dashboard/DashSettings"));

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { tab } = useSelector((state) => state.dashboard);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      dispatch(setTab(tabFromUrl));
    }
  }, [location.search, dispatch]);

  return (
    <div className="lg:flex">
      <div className="lg:fixed lg:h-screen lg:w-64">
        <DashSidebar />
      </div>
      <main className="min-h-screen w-full lg:mr-64 bg-gray-100 dark:bg-slate-900">
        {tab === "dash" && <DashInfo />}

        {tab === "profile" && <DashProfile />}
        {tab === "comments" && <DashComments />}

        {currentUser.role === "admin" && (
          <>
            {tab === "users" && <DashUsers />}
            {tab === "settings" && <DashSettings />}
          </>
        )}

        {(currentUser.role === "admin" || currentUser.role === "editor") && (
          <>
            {tab === "posts" && <DashPosts />}
            {tab === "categories" && <DashCategories />}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
