import React from "react";
import { useGetUsersQuery } from "../usersApiSlice";
import { UserObject } from "../../../shared/types";
import GuideCard from "./GuideCard";
import LoadingPage from "../../../shared/LoadingPage";

type Props = {};

const OurTeam = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetUsersQuery("role=lead-guide");

  let content;

  if (isLoading) content = <LoadingPage />;

  if (isError) {
    content = <p className="errmsg">Oops! Failed to load guides..</p>;
  }

  if (isSuccess) {
    const users = data.data.data;
    content = users?.length ? (
      users.map((user: any) => <GuideCard key={`${user._id}`} userObj={user} />)
    ) : (
      <div className="text-red">Error loading guide list. Please refresh.</div>
    );
  }

  return isLoading ? (
    <LoadingPage />
  ) : (
    <div className="lg:max-w-screen-xl mx-auto min-h-full px-4 py-36 sm:max-w-xl md:max-w-full md:px-24 lg:px-8">
      <div className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl">
        <div>
          <p className="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-teal-900">
            Dream Team
          </p>
        </div>
        <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <span className="relative">Meet</span>
          </span>{" "}
          our talented team of professionals
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          Meet our expert team of guides, the passionate navigators who will
          take you on unforgettable journeys across North America.
        </p>
      </div>

      <div className=" row-gap-8 sm:row-gap-10 mx-auto grid grid-cols-2 gap-x-10 gap-y-10 md:grid-cols-4 lg:max-w-screen-lg lg:grid-cols-4">
        {content}
      </div>
    </div>
  );
};

export default OurTeam;
