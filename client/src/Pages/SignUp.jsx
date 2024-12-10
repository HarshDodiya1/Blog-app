import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/H_Logo2.jpg";
import { OAuth } from "../Components/OAuth";
export const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [erorrMessage, setErorrMessage] = useState(null);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });

    if (!formData.username || !formData.email || !formData.password) {
      return setErorrMessage("Please fill out all the fields.");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErorrMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == true) {
        navigate("/signin");
      }
      if (data.success == false) {
        return setErorrMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErorrMessage(error.message);
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen mt-20">
    //   <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
    //     {/* This will be our left part of the signup page */}
    //     <div className="flex-1">
    //       <img
    //         src={logo}
    //         alt="This is the logo"
    //         width={250}
    //         height={300}
    //         className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
    //       />
    //       <p className="text-sm mt-5 w-[80%]">
    //         This is a demo project. You can sign up with your email and password
    //         or with Google.
    //       </p>
    //     </div>

    //     <div className="flex-1">
    //       <form className="flex flex-col gap-4" onSubmit={submitHandler}>
    //         <div>
    //           <Label value="Your Username" />
    //           <TextInput
    //             type="text"
    //             placeholder="Enter Username"
    //             id="username"
    //             onChange={changeHandler}
    //           />
    //         </div>

    //         <div>
    //           <Label value="Your email" />
    //           <TextInput
    //             type="email"
    //             placeholder="name@company.com"
    //             id="email"
    //             onChange={changeHandler}
    //           />
    //         </div>

    //         <div>
    //           <Label value="Your password" />
    //           <TextInput
    //             type="password"
    //             placeholder="*******"
    //             id="password"
    //             onChange={changeHandler}
    //           />
    //         </div>

    //         <Button
    //           className="relative px-6 py-1 rounded-lg gap-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform transition-transform duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
    //           type="submit"
    //           disabled={loading}
    //         >
    //           {loading ? (
    //             <>
    //               <Spinner size="sm" />
    //               <span className="pl-3">loading...</span>
    //             </>
    //           ) : (
    //             "Sign Up"
    //           )}
    //         </Button>
    //         <OAuth />
    //       </form>
    //       <div className="flex gap-2 text-sm mt-5">
    //         <span>Have an account?</span>
    //         <Link to={"/signin"} className="text-blue-500">
    //           Sign In
    //         </Link>
    //       </div>
    //       {erorrMessage && (
    //         <Alert className="mt-5" color="failure">
    //           {erorrMessage}
    //         </Alert>
    //       )}
    //     </div>
    //   </div>
    // </div>
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
                Join Our Community
              </h1>
              <p className="text-center text-white/90 mb-6">
                Start your journey with us. Create, share, and connect with
                fellow writers and readers.
              </p>
              <div className="text-sm text-white/80">Write • Share • Grow</div>
            </div>

            {/* Right Section - Form */}
            <div className="md:w-1/2 p-12">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">
                Create Your Account
              </h2>
              <form className="space-y-6" onSubmit={submitHandler}>
                <div>
                  <Label value="Username" className="text-gray-700" />
                  <TextInput
                    type="text"
                    placeholder="Enter Username"
                    id="username"
                    onChange={changeHandler}
                    className="mt-1"
                  />
                </div>

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
                    <div className="flex items-center justify-center">
                      <Spinner size="sm" />
                      <span className="ml-2">Creating account...</span>
                    </div>
                  ) : (
                    "Sign Up"
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
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign in
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
