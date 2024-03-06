import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


export const PrivateRoute = () => {
    const {currentUser} = useSelector((state) => state.user);
    console.log("This is out current user from PrivateRoute : ", currentUser)
  return currentUser ? <Outlet /> : <Navigate to={"/signin"} />
}
