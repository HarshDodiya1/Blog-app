import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashProfile } from "../Components/DashProfile";
import { DashPosts } from "../Components/DashPosts";
import { DashUsers } from "../Components/DashUsers";
import { DashComments } from "../Components/DashComments";
import { DashboardComp } from "../Components/DashboardComp";
import { DashSidebar } from "../Components/DashSidebar";

export const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Sidebar wrapper with proper mobile spacing */}
      <div className="md:w-56 md:fixed md:inset-y-0 md:top-[73px] bg-white dark:bg-gray-800 border-r dark:border-gray-700 z-30">
        <div className="mt-[73px] md:mt-0">
          {" "}
          {/* Added top margin for mobile only */}
          <DashSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-56 mt-[73px]">
        <div className="p-4">
          {tab === "profile" && <DashProfile />}
          {tab === "posts" && <DashPosts />}
          {tab === "users" && <DashUsers />}
          {tab === "comments" && <DashComments />}
          {tab === "dash" && <DashboardComp />}
        </div>
      </div>
    </div>
  );
};
