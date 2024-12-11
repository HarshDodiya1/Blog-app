import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/User/userSlice";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";

export const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signoutSuccess());
      }
    } catch (error) {}
  };

  const NavItem = ({ to, icon: Icon, label, active }) => (
    <Link to={to}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          active
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="mb-6">
        <div className="flex items-center gap-3 px-4">
          <img
            src={currentUser.user.profilePicture}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold dark:text-white">
              {currentUser.user.username}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentUser.user.isAdmin ? "Administrator" : "User"}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {currentUser.user.isAdmin && (
          <NavItem
            to="/dashboard?tab=dash"
            icon={HiChartPie}
            label="Dashboard"
            active={tab === "dash" || !tab}
          />
        )}
        <NavItem
          to="/dashboard?tab=profile"
          icon={HiUser}
          label="Profile"
          active={tab === "profile"}
        />
        {currentUser.user.isAdmin && (
          <>
            <NavItem
              to="/dashboard?tab=posts"
              icon={HiDocumentText}
              label="Posts"
              active={tab === "posts"}
            />
            <NavItem
              to="/dashboard?tab=users"
              icon={HiOutlineUserGroup}
              label="Users"
              active={tab === "users"}
            />
            <NavItem
              to="/dashboard?tab=comments"
              icon={HiAnnotation}
              label="Comments"
              active={tab === "comments"}
            />
          </>
        )}
      </nav>

      <div
        onClick={handleSignout}
        className="mt-auto cursor-pointer flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
      >
        <HiArrowSmRight className="w-5 h-5" />
        <span className="font-medium">Sign Out</span>
      </div>
    </div>
  );
};
