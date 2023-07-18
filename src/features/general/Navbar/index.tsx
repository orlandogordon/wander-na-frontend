import { useState, useEffect, useRef } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Logo from "../../../assets/LogoGreenMedium.png";
import LogoSmall from "../../../assets/LogoGreenSmall.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "../../../hooks/useMediaQuery";
import ActionButton from "../../../shared/ActionButton";
import {
  useSendLogoutMutation,
  useCheckLoginMutation,
} from "../../auth/authApiSlice";
import useAuth from "../../../hooks/useAuth";
import { selectCurrentToken, selectLoginStatus } from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { current } from "@reduxjs/toolkit";

type Props = {
  isTopOfPage: boolean;
};

const Navbar = ({ isTopOfPage }: Props) => {
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const navbarBackground = isTopOfPage
    ? "bg-slate-500"
    : "bg-slate-500 drop-shadow";
  const [content, setContent] = useState(<PulseLoader />);
  const [mobileContent, setMobileContent] = useState(<PulseLoader />);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [
    sendLogout,
    {
      isLoading: isLoadingLogout,
      isSuccess: isSuccessLogout,
      isError: isErrorLogout,
      error: errorLogout,
    },
  ] = useSendLogoutMutation();

  const logoutAction = () => {
    sendLogout("");
  };

  const toggleMobileNav = () => setIsMenuToggled(!isMenuToggled);

  const [
    sendCheckLogin,
    {
      data: dataCheckLogin,
      isLoading: isLoadingCheckLogin,
      isSuccess: isSuccessCheckLogin,
      isError: isErrorCheckLogin,
      error: errorCheckLogin,
    },
  ] = useCheckLoginMutation();

  useEffect(() => {
    if (isSuccessLogout) {
      navigate("/");
      //navigate(0);
    }
  }, [isSuccessLogout, navigate]);

  useEffect(() => {
    if (isLoadingCheckLogin) setContent(<PulseLoader />);

    if (isErrorCheckLogin) {
      console.log(errorCheckLogin);
      if (errorCheckLogin) {
        if ("data" in errorCheckLogin) {
          setContent(<p className=" text-red-600">error!!!!!!!!!!!!!!</p>);
        }
      }
    }

    if (isSuccessCheckLogin) {
      setContent(
        dataCheckLogin.data.loginStatus ? (
          <>
            <NavLink
              to="/"
              onClick={logoutAction}
              className={({ isActive }) => {
                return `${
                  isActive ? "text-white" : ""
                } text-lg transition duration-500 hover:text-primary-300`;
              }}
            >
              Logout
            </NavLink>
            <NavLink to="/manage-account">
              {" "}
              <UserCircleIcon className=" h-7 w-7 fill-white hover:fill-primary-300" />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="login"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } text-lg transition duration-500 hover:text-primary-300`;
              }}
            >
              Login
            </NavLink>
            <ActionButton target={"signup"}>Sign Up</ActionButton>
          </>
        )
      );
      setMobileContent(
        dataCheckLogin.data.loginStatus ? (
          <>
            <NavLink
              to="manage-account"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } transition duration-500 hover:text-primary-300`;
              }}
            >
              Manage Account
            </NavLink>
            <NavLink
              to="logout"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } transition duration-500 hover:text-primary-300`;
              }}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="login"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } transition duration-500 hover:text-primary-300`;
              }}
            >
              Login
            </NavLink>
            <NavLink
              to="signup"
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } transition duration-500 hover:text-primary-300`;
              }}
            >
              Signup
            </NavLink>
          </>
        )
      );
    }
  }, [
    isSuccessCheckLogin,
    dataCheckLogin,
    isLoadingCheckLogin,
    isErrorCheckLogin,
    errorCheckLogin,
    dispatch,
    sendLogout,
  ]);

  useEffect(() => {
    sendCheckLogin("");
  }, []);

  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} h-18 fixed top-0 z-30 w-full py-6 text-white`}
      >
        <div className={`${flexBetween} mx-auto w-5/6 `}>
          <div className={`${flexBetween} w-full gap-10`}>
            {/* Left Side */}
            <NavLink to="/">
              <img alt="logo" src={LogoSmall} />
            </NavLink>
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <NavLink
                    to="tours"
                    end
                    className={({ isActive }) => {
                      return `${
                        isActive ? "text-primary-500" : ""
                      } text-lg transition duration-500 hover:text-primary-300`;
                    }}
                  >
                    Tours
                  </NavLink>
                  <NavLink
                    to="people"
                    className={({ isActive }) => {
                      return `${
                        isActive ? "text-primary-500" : ""
                      } text-lg transition duration-500 hover:text-primary-300`;
                    }}
                  >
                    Our Team
                  </NavLink>
                  <NavLink
                    to="contact"
                    className={({ isActive }) => {
                      return `${
                        isActive ? "text-primary-500" : ""
                      } text-lg transition duration-500 hover:text-primary-300`;
                    }}
                    state={"general"}
                  >
                    Contact Us
                  </NavLink>
                </div>
                {/* Right Side */}
                <div className={`${flexBetween} gap-8`}>{content}</div>
              </div>
            ) : (
              <button
                className="rounded-full bg-primary-500 p-2"
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              >
                <Bars3Icon className="h-6 w-6 text-slate-700" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed bottom-0 right-0 z-40 h-full w-10/12 bg-slate-500 text-white drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={toggleMobileNav}>
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className={`ml-[33%] flex flex-col gap-10 text-2xl`}>
            <NavLink
              to="/"
              onClick={toggleMobileNav}
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } transition duration-500 hover:text-primary-300`;
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="tours"
              onClick={toggleMobileNav}
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } transition duration-500 hover:text-primary-300`;
              }}
            >
              Tours
            </NavLink>
            <NavLink
              to="people"
              onClick={toggleMobileNav}
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } transition duration-500 hover:text-primary-300`;
              }}
            >
              Our Team
            </NavLink>
            <NavLink
              to="contact"
              onClick={toggleMobileNav}
              className={({ isActive }) => {
                return `${
                  isActive ? "text-primary-500" : ""
                } transition duration-500 hover:text-primary-300`;
              }}
            >
              Contact Us
            </NavLink>
            {mobileContent}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
