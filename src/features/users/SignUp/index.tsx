import React from "react";
import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "../usersApiSlice";
import { NavLink, useNavigate } from "react-router-dom";
import {
  UserIcon,
  LockClosedIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/solid";
import Logo from "../../../assets/LogoGreenLarge.png";

type Props = {};

const NAME_REGEX = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{8,12}$/;

const SignUp = (props: Props) => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(false);
  const [role, setRole] = useState("user");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidPasswordConfirm(validPassword && passwordConfirm === password);
  }, [passwordConfirm, password, validPassword]);

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setRole("user");
      navigate("/");
      navigate(0);
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e: any) => setName(e.target.value);
  const onEmailChanged = (e: any) => setEmail(e.target.value);
  const onPasswordChanged = (e: any) => setPassword(e.target.value);
  const onPasswordConfirmChanged = (e: any) =>
    setPasswordConfirm(e.target.value);

  const canSave =
    [role, validName, validEmail, validPassword, validPasswordConfirm].every(
      Boolean
    ) && !isLoading;

  const onSaveUserClicked = async (e: any) => {
    setErrMsg("");
    e.preventDefault();
    if (canSave) {
      await addNewUser({ name, email, password, passwordConfirm, role });
    } else {
      if (!validPasswordConfirm) setErrMsg("- Passwords entered do not match.");
      if (!validPassword) setErrMsg("- Invalid password entered.");
      if (!validEmail) setErrMsg("- Invalid email entered.");
      if (!validName) setErrMsg("- Invalid name entered.");
    }
  };

  if (error && errMsg.length <= 1) {
    if ("data" in error) {
      const errData: object = error.data as object;
      const message: string =
        "message" in errData ? (errData.message as string) : "null";
      if (message.includes("email")) {
        setValidEmail(false);
        setErrMsg(
          "Email address entered is already associated with an account.\n"
        );
      }
    } else {
      console.log("Error:", error);
      // alternatively, send the user to an error page
    }
  }

  const validNameClass =
    !validName && errMsg.includes("name")
      ? "w-full pl-2 text-black outline-red-500 border-2 border-red-400"
      : " w-full border-none pl-2 text-black outline-blue-500";
  const validEmailClass =
    !validEmail && errMsg.includes("Email")
      ? "w-full pl-2 text-black outline-red-500 border-2 border-red-400"
      : " w-full border-none pl-2 text-black outline-blue-500";
  const validPasswordClass =
    !validPassword && errMsg.includes("password")
      ? "w-full pl-2 text-black outline-red-500 border-2 border-red-400"
      : " w-full border-none pl-2 text-black outline-blue-500";
  const validPasswordConfirmClass =
    !validPasswordConfirm && errMsg.includes("match")
      ? "w-full pl-2 text-black outline-red-500 border-2 border-red-400"
      : " w-full border-none pl-2 text-black outline-blue-500";

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
        <div className="w-full px-8 md:px-32 lg:px-24">
          <p className="sm:text-md mb-2 inline-block p-1 text-red-500 md:text-2xl">
            {errMsg}
          </p>
          <form
            className="rounded-md bg-white p-5 shadow-2xl"
            onSubmit={onSaveUserClicked}
          >
            <h1 className="mb-1 text-2xl font-bold text-gray-800">Welocme!</h1>
            <p className="mb-8 text-sm font-normal text-gray-600">
              Please create an account below
            </p>
            <div className="mb-8 flex items-center rounded-2xl border-2 px-3 py-2">
              <UserIcon className="h-5 w-5 text-gray-400" />
              <input
                id="name"
                className={validNameClass}
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={onNameChanged}
                required
              />
            </div>
            <div className="mb-8 flex items-center rounded-2xl border-2 px-3 py-2">
              <AtSymbolIcon className="h-5 w-5 text-gray-400" />
              <input
                id="email"
                className={validEmailClass}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onEmailChanged}
                required
              />
            </div>
            <div className="mb-8 flex items-center rounded-2xl border-2 px-3 py-2 ">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
              <input
                className={validPasswordClass}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={onPasswordChanged}
                required
              />
            </div>
            <div className="mb-12 flex items-center rounded-2xl border-2 px-3 py-2 ">
              <LockClosedIcon className="h-5 w-5 text-gray-400" />
              <input
                className={validPasswordConfirmClass}
                type="password"
                name="passwordconfirm"
                id="password-confirm"
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={onPasswordConfirmChanged}
                required
              />
            </div>
            <button
              type="submit"
              className="mb-2 mt-5 block w-full rounded-2xl bg-slate-600 py-2 font-semibold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-primary-500 hover:text-slate-700"
            >
              Create Account
            </button>
            <div className="mt-4 flex justify-center text-black">
              <NavLink
                to={"/login"}
                className="ml-2 cursor-pointer text-sm transition-all duration-500 hover:-translate-y-1 hover:text-slate-800"
              >
                Already have an account?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
