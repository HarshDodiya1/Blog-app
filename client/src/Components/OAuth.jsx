import { Button } from "flowbite-react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../redux/User/userSlice";
import { useNavigate } from "react-router-dom";

export const OAuth = () => {

    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleOnClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: "select_account"})
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {"content-Type": 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    profilePhoto: resultsFromGoogle.user.photoURL,
                })
            })
            const data = await res.json();
            if(data){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error)   
        }
    }
  return (
    <Button
      className="relative text-black rounded-md bg-white isolation-auto z-10 border-2 border-blue-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 font-bold"
      type="submit" onClick={handleGoogleOnClick}
    >
      <FcGoogle className="mr-2 size-[1.5rem]" />
     <span className=" text-sm">
     Continue with Google
     </span>
    </Button>
  );
};
