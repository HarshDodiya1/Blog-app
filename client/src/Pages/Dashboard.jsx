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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ">
      <div className="md:w-64 md:fixed md:inset-y-0 md:top-[73px] bg-white dark:bg-gray-800 shadow-lg z-30 transition-all duration-300">
        <div className="mt-[73px] md:mt-0">
          <DashSidebar />
        </div>
      </div>

      <div className="flex-1 md:ml-64 mt-[73px] transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {tab === "profile" && <DashProfile />}
            {tab === "posts" && <DashPosts />}
            {tab === "users" && <DashUsers />}
            {tab === "comments" && <DashComments />}
            {tab === "dash" && <DashboardComp />}
          </div>
        </div>
      </div>
    </div>
  );
};
