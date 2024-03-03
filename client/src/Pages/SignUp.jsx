import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/H_Logo2.jpg";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { OAuth } from "../Components/OAuth";
export const SignUp = () => {
  const navigate = useNavigate()
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
      setLoading(true)
      setErorrMessage(null)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success == true){
        navigate("/signin")
      }
      if(data.success == false){
        return setErorrMessage(data.message)
      }
      setLoading(false)
    } catch (error) {

      console.log(error);
      setErorrMessage(error.message)
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* This will be our left part of the signup page */}
        <div className="flex-1">
          <img
            src={logo}
            alt="This is the logo"
            width={250}
            height={300}
            className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
          />
          <p className="text-sm mt-5 w-[80%]">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Enter Username"
                id="username"
                onChange={changeHandler}
              />
            </div>

            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={changeHandler}
              />
            </div>

            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={changeHandler}
              />
            </div>

            <Button
              className="relative text-black px-11 py-1 rounded-md bg-white isolation-auto z-10 border-2 border-blue-500 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 font-bold "
              type="submit"
              disabled={loading}
            >
              {
                loading ? (
                  <>
                  <Spinner size='sm' />
                  <span className="pl-3">loading...</span>
                  </>
                ) : "Sign Up" 
              }
            </Button>
            <OAuth />

          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to={"/signin"} className="text-blue-500">
              Sign In
            </Link>
          </div>
          {erorrMessage && 
            <Alert className='mt-5' color='failure'>{erorrMessage}</Alert> 
          }
        </div>
      </div>
    </div>
  );
};
