import React, { useState } from "react";

type GuideCardProps = {
  userObj: any;
};

const GuideCard = ({ userObj }: GuideCardProps) => {
  let url: string = userObj.photo;
  const role =
    userObj.role === "lead-guide"
      ? "Lead Guide"
      : userObj.role === "guide"
      ? "Guide"
      : userObj.role;
  return (
    <div className="flex justify-start">
      <img
        src={`http://localhost:3500/img/users/${url}`}
        className=" mr-4 h-28 w-28 rounded-full object-cover shadow"
        alt="profile-pic"
        crossOrigin="anonymous"
      />
      <div className="flex flex-col justify-center">
        <p className="text-lg font-bold ">{userObj.name}</p>
        <p className="text-sm text-gray-800">{role}</p>
      </div>
    </div>
  );
};

export default GuideCard;
