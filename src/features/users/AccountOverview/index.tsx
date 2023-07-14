import React, { useRef, useEffect, useState } from "react";
import {
  PencilSquareIcon,
  EnvelopeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "../usersApiSlice";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import UpdateUserInfo from "./UpdateUserInfo";
import UpdatePassword from "./UpdatePassword";
import UserBookings from "./UserBookings";

type Props = {};

const AccountOverview = (props: Props) => {
  // Retrieve the current users information
  const {
    data: currentUserData,
    isLoading: currentUserIsLoading,
    isSuccess: currentUserIsSuccess,
    isError: currentUserIsError,
    error: currentUserError,
  } = useGetCurrentUserQuery("");

  let content;

  if (currentUserIsLoading)
    content = (
      <PulseLoader color={"#51883d"} className="ml-96 h-full content-center" />
    );

  if (currentUserIsError) {
    console.log(currentUserError);
    content = <p className="errmsg">Oops! Failed to load user information..</p>;
  }

  if (currentUserIsSuccess) {
    const user = currentUserData.data.data;
    content = (
      <>
        <UpdateUserInfo user={user} />
        <UpdatePassword />
        <UserBookings user={user} />
      </>
    );
  }

  return <div className="mt-24">{content}</div>;
};

export default AccountOverview;
