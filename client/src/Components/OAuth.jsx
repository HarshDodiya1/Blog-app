import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInSuccess } from "../redux/User/userSlice";

export const OAuth = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleOnClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          profilePhoto: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      className="relative px-6 py-1 rounded-lg gap-4 bg-gradient-to-r from-blue-500 to-blue-500 text-white font-semibold hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform transition-transform duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 w-full"
      type="submit"
      onClick={handleGoogleOnClick}
    >
      <FcGoogle className="text-xl transition-transform group-hover:scale-125" />
      <span className="text-sm">Google</span>
    </Button>
  );
};
