import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import React from "react";

export const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(
    "This is our current user we get from OnlyAdminPrivateRoute: ",
    currentUser
  );
  return currentUser && currentUser.user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};
