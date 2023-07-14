import React from "react";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
  reviewData: any;
};

const Review = ({ reviewData }: Props) => {
  let starsContent: any[] = [];
  for (let i = 0; i < reviewData.rating; i++) {
    starsContent.push(
      <StarIcon key={starsContent.length} className="h-6 w-6" />
    );
  }
  while (starsContent.length < 5) {
    starsContent.push(
      <StarIconOutline key={starsContent.length} className="h-6 w-6" />
    );
  }

  return (
    <div className="flex w-full flex-col items-start justify-start bg-gray-50 p-8">
      <div className="flex w-full flex-col justify-between md:flex-row">
        {/* <div className="flex flex-row items-start justify-between">
          <p className="text-xl font-medium leading-normal text-gray-800 md:text-2xl">
            {" "}
            {reviewData.title ? reviewData.title : ""}
          </p>
        </div> */}
        <span className="mt-2 flex  md:mt-0">{starsContent}</span>
      </div>
      <div className="block md:block">
        <p className="xl:w-5/6 mt-3 w-full text-base leading-normal text-gray-600 md:w-9/12">
          {reviewData.review}
        </p>

        <div className="mt-6 flex flex-row items-center justify-start space-x-2.5">
          <div>
            <img
              src={`http://localhost:3500/img/users/${reviewData.user.photo}`}
              className="mr-4 h-20 w-20 rounded-full object-cover shadow"
              alt="pic-from-tour"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex flex-col items-start justify-start space-y-2">
            <p className="text-base font-medium leading-none text-gray-800">
              {reviewData.user.name}
            </p>
            <p className="text-sm leading-none text-gray-600">
              {new Date(reviewData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
