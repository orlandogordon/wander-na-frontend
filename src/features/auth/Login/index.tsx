import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";
import usePersist from "../../../hooks/usePersist";

import Logo from "../../../assets/LogoGreenLarge.png";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/solid";

type Props = {};

const Login = (props: Props) => {
  const userRef = useRef<any>();
  const errRef = useRef<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();
      const { token: accessToken } = data;
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/");
      //navigate(0);
    } catch (err: any) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Invalid email/password combination.");
      } else {
        setErrMsg(err.data?.message);
      }
      if (errRef.current) errRef.current.focus();
    }
  };

  const handleUserInput = (e: any) => setEmail(e.target.value);
  const handlePwdInput = (e: any) => setPassword(e.target.value);

  const errClass = errMsg ? "inline-block text-red-500 p-1 mb-2" : "hidden";

  if (isLoading)
    return <p className="h-full align-middle text-4xl">Loading...</p>;

  return (
    <div className="flex h-screen">
      <div
        className=" hidden w-full items-center justify-around bg-signup-background
          lg:flex lg:w-1/2"
      >
        <div
          className=" 
                  inset-0 
                  z-0 
                  bg-black 
                  opacity-20"
        ></div>
        <div className="mx-auto w-full flex-col items-center space-y-6 px-20">
          <img src={Logo} alt="wanderNa logo" />
          <p className="mt-1 text-white">Book your next journey today!</p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <NavLink
              to="/tours"
              className="mb-2 mt-4 rounded-2xl bg-white px-4 py-2 font-bold text-slate-600 transition-all duration-500 hover:-translate-y-1 hover:bg-slate-700 hover:text-white"
            >
              Browse Tours
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center space-y-8 bg-white lg:w-1/2">
        <div className="w-full px-8 md:px-32 lg:px-24 ">
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>

          <form
            className="rounded-md bg-white p-5 shadow-2xl"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-6 text-2xl font-bold text-gray-800">
              Welcome Back!
            </h1>
            <div className="mb-8 flex items-center rounded-2xl border-2 px-3 py-2">
              <AtSymbolIcon className="h-5 w-5 text-gray-400" />
              <input
                id="email"
                className=" w-full border-none pl-2 text-black outline-none"
                type="email"
                name="email"
                ref={userRef}
                value={email}
                onChange={handleUserInput}
                placeholder="Email Address"
                required
              />
            </div>
            <div className="mb-12 flex items-center rounded-2xl border-2 px-3 py-2 ">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
              <input
                className="w-full border-none pl-2 text-black outline-none"
                type="password"
                name="password"
                id="password"
                onChange={handlePwdInput}
                value={password}
                placeholder="Password"
                // required
              />
            </div>
            <button
              type="submit"
              className="mb-2 mt-5 block w-full rounded-2xl bg-slate-600 py-2 font-semibold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-primary-500 hover:text-slate-700"
            >
              Login
            </button>
            <div className="mt-4 flex justify-between text-black">
              {/* <span className="ml-2 cursor-pointer text-sm transition-all duration-500 hover:-translate-y-1 hover:text-blue-500">
                Forgot Password?
              </span> */}

              <NavLink
                to={"/signup"}
                className="ml-2 cursor-pointer text-sm transition-all duration-500 hover:-translate-y-1 hover:text-slate-800"
              >
                Don't have an account yet?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
