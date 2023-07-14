import React, { useRef, useEffect, useState } from "react";
import {
  PencilSquareIcon,
  EnvelopeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useUpdateUserMutation } from "../usersApiSlice";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

type Props = {
  user: any;
};

const NAME_REGEX = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const UpdateUserInfo = ({ user }: Props) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const navigate = useNavigate();

  const [photo, setPhoto] = useState();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [emailConfirm, setEmailConfirm] = useState();
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  let form = useRef();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form_data = new FormData(form.current);
    let payload: any = {};
    form_data.forEach(function (value, key) {
      payload[key] = value;
    });
  };

  // Set up form variables and hadleSubmit functions
  const onPhotoChanged = (e: any) => {
    setPhoto(e.target.files[0]);
    console.log(photo);
  };
  const onNameChanged = (e: any) => setName(e.target.value);
  const onEmailChanged = (e: any) => setEmail(e.target.value);
  const onEmailConfirmChanged = (e: any) => setEmailConfirm(e.target.value);

  const onEditFormClicked = (e: any) => {
    setEditForm(!editForm);
    setErrMsg("");
  };

  const onSaveFormClicked = async (e: any) => {
    e.preventDefault();
    const user_data = new FormData();

    if (NAME_REGEX.test(name) && name !== user.name)
      user_data.append("name", name);
    if (EMAIL_REGEX.test(email) && email === emailConfirm)
      user_data.append("email", email);
    if (photo) user_data.append("photo", photo);

    if (Array.from(user_data.keys()).length > 0) {
      updateUser(user_data).then(() => {
        navigate(0);
      });
    } else {
      setErrMsg(
        "Invalid inputs. Please confirm that the information entered is correct."
      );
    }
  };

  const buttonContent = editForm ? (
    <>
      <button
        onClick={onEditFormClicked}
        className="mr-4 rounded bg-gray-200 px-6 py-2 text-xs text-indigo-600 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none "
      >
        Cancel
      </button>
      <button
        className="rounded bg-indigo-700 px-8 py-2 text-sm text-white transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none"
        type="submit"
        onClick={onSaveFormClicked}
      >
        Save
      </button>
    </>
  ) : (
    <button
      className="rounded bg-indigo-700 px-8 py-2 text-sm text-white transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none"
      type="submit"
      onClick={onEditFormClicked}
    >
      Edit
    </button>
  );

  let nameInputContent = editForm ? (
    <div className="xl:w-1/4 mb-6 flex flex-col md:w-1/2 lg:w-1/2">
      <label htmlFor="Name" className="pb-2 text-sm font-bold text-gray-800 ">
        Name
      </label>
      <div className="flex flex-row">
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mr-2 w-full rounded border border-gray-300 bg-transparent py-3 pl-3 text-sm text-gray-800 placeholder-gray-800 shadow-sm focus:border-indigo-700 focus:outline-none  "
          onChange={onNameChanged}
        />
      </div>
    </div>
  ) : (
    <div className="xl:w-1/4 mb-6 flex flex-col md:w-1/2 lg:w-1/2">
      <label htmlFor="Name" className="pb-2 text-sm font-bold text-gray-800 ">
        Name
      </label>
      <div className="flex flex-row">
        <div className="mr-2 w-full rounded border border-gray-300 bg-transparent py-3 pl-3 text-sm text-gray-800 placeholder-gray-800 shadow-sm  focus:outline-none  ">
          {user.name}
        </div>
      </div>
    </div>
  );

  let emailInputContent = editForm ? (
    <div className="xl:w-1/4 mb-6 flex flex-col md:w-1/2 lg:w-1/2">
      <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800 ">
        Email
      </label>
      <div className="flex flex-row">
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mr-2 w-full rounded border border-gray-300 bg-transparent py-3 pl-3 text-sm text-gray-800 placeholder-gray-800 shadow-sm focus:border-indigo-700 focus:outline-none   "
          onChange={onEmailChanged}
        />
      </div>
    </div>
  ) : (
    <div className="xl:w-1/4 mb-6 flex flex-col md:w-1/2 lg:w-1/2">
      <label htmlFor="Name" className="pb-2 text-sm font-bold text-gray-800 ">
        Email
      </label>
      <div className="flex flex-row">
        <div className="mr-2 w-full rounded border border-gray-300 bg-transparent py-3 pl-3 text-sm text-gray-800 placeholder-gray-800 shadow-sm  focus:outline-none  ">
          {user.email}
        </div>
      </div>
    </div>
  );

  return (
    <form id="updateUserInfo" onSubmit={handleSubmit}>
      <div className="bg-white ">
        <div className="container mx-auto mt-10 rounded bg-white px-4 ">
          <div className="xl:w-full border-b border-gray-300 py-5 ">
            <div className="xl:w-full xl:mx-0 mx-auto flex w-11/12 items-center">
              <p className="text-lg font-bold text-gray-800 ">
                Personal Information
              </p>
            </div>
          </div>
          <div className="mx-auto pt-4">
            <div className="container mx-auto">
              <div className="relative mb-8 h-24 rounded">
                <div className="flex h-20 w-fit flex-row items-center justify-center rounded-full bg-cover bg-center bg-no-repeat shadow">
                  <img
                    src={`https://wander-api-bl56.onrender.com/img/users/${
                      user.photo ? user.photo : "default.png"
                    }`}
                    alt="avatar"
                    className=" h-20 w-20 rounded-full object-cover shadow"
                    crossOrigin="anonymous"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="photo"
                    name="photo"
                    onChange={onPhotoChanged}
                    className={editForm ? "ml-5" : "hidden"}
                  />
                </div>
              </div>
              {nameInputContent}
              {emailInputContent}
              <div
                className={`xl:w-1/4 mb-6 flex flex-col md:w-1/2 lg:w-1/2 ${
                  editForm ? "" : "hidden"
                }`}
              >
                <label
                  htmlFor="Email"
                  className="pb-2 text-sm font-bold text-gray-800 "
                >
                  Confirm Email
                </label>
                <div className="flex flex-row">
                  <input
                    type="email"
                    id="email-confirm"
                    name="emailConfirm"
                    required
                    className={`mr-2 w-full rounded border border-gray-300 bg-transparent py-3 pl-3 text-sm text-gray-800 placeholder-gray-800 shadow-sm focus:border-indigo-700 focus:outline-none `}
                    onChange={onEmailConfirmChanged}
                    disabled={!editForm}
                  />
                </div>
              </div>
            </div>
            <div className="sm:text-md mb-2 p-1 text-red-500 md:text-xl">
              {errMsg}
            </div>
          </div>
          <div className="xl:w-full container mx-auto w-11/12">
            <div className="flex w-full justify-end bg-white py-4  sm:px-0">
              {buttonContent}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateUserInfo;
