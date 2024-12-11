import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/H_Logo2.jpg";
import { OAuth } from "../Components/OAuth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/User/userSlice";

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const { loading, error: erorrMessage } = useSelector((state) => state.user);
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the required field."));
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == true) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
      if (data.success == false) {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-6xl w-full mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Section - Brand */}
            <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12 text-white flex flex-col justify-center items-center">
              <img
                src={logo}
                alt="Blog Logo"
                className="w-48 h-48 object-contain mb-8 rounded-lg bg-white/10 p-4"
              />
              <h1 className="text-3xl font-bold mb-4 text-center">
                Welcome Back!
              </h1>
              <p className="text-center text-white/90 mb-6">
                Share your stories, ideas, and expertise with our growing
                community of readers and writers.
              </p>
              <div className="text-sm text-white/80">
                Discover • Create • Connect
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="md:w-1/2 p-12">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">
                Sign In to Your Account
              </h2>
              <form className="space-y-6" onSubmit={submitHandler}>
                <div>
                  <Label value="Email address" className="text-gray-700" />
                  <TextInput
                    type="email"
                    placeholder="name@company.com"
                    id="email"
                    onChange={changeHandler}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label value="Password" className="text-gray-700" />
                  <TextInput
                    type="password"
                    placeholder="••••••••"
                    id="password"
                    onChange={changeHandler}
                    className="mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 font-bold"
                >
                  {loading ? (
                    <div className="flex items-center justify-center ">
                      <Spinner size="sm" />
                      <span className="ml-2">Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <OAuth />

                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign up
                  </Link>
                </div>
              </form>

              {erorrMessage && (
                <Alert className="mt-5" color="failure">
                  {erorrMessage}
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
