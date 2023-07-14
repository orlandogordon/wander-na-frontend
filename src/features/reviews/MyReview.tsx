import React, { useEffect, useState } from "react";
import {
  StarIcon as StarIconOutline,
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  PlusSmallIcon,
  MinusSmallIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "./reviewsApiSlice";
import ActionButton from "../../shared/ActionButton";
import { useNavigate } from "react-router-dom";

type Props = {
  reviewData: any;
};

const MyReview = ({ reviewData }: Props) => {
  const navigate = useNavigate();
  const [eidtReview, setEditReview] = useState(
    "id" in reviewData ? false : true
  );
  const [stars, setStars] = useState(
    "rating" in reviewData ? reviewData.rating : 0
  );
  const [review, setReview] = useState(
    "review" in reviewData ? reviewData.review : ""
  );
  const [errMsg, setErrMsg] = useState("");

  const [
    createReview,
    {
      data: createReviewData,
      isSuccess: createIsSuccess,
      isLoading: createIsLoading,
      isError: createIsError,
      error: createError,
    },
  ] = useCreateReviewMutation();

  useEffect(() => {
    if (createIsError === true) {
      console.log("Error creating a new review: ", createError);
    } else if (createIsSuccess) {
      navigate(0);
    }
  }, [
    createReviewData,
    createIsSuccess,
    createIsLoading,
    createIsError,
    createError,
    navigate,
  ]);

  const [
    updateReview,
    {
      data: updateReviewData,
      isSuccess: updateIsSuccess,
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateReviewMutation();

  useEffect(() => {
    if (updateIsError === true) {
      console.log("Error updating the review data: ", updateError);
    } else if (updateIsSuccess) {
      setEditReview(false);
    }
  }, [
    updateReviewData,
    updateIsSuccess,
    updateIsLoading,
    updateIsError,
    updateError,
  ]);

  const [
    deleteReview,
    {
      data: deleteReviewData,
      isSuccess: deleteIsSuccess,
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (deleteIsError === true) {
      console.log("Error updating the review data: ", deleteError);
    } else if (deleteIsSuccess) {
      navigate(0);
    }
  }, [
    deleteReviewData,
    deleteIsSuccess,
    deleteIsLoading,
    deleteIsError,
    deleteError,
    navigate,
  ]);

  const onOneStarClick = () => setStars(1);
  const onTwoStarClick = () => setStars(2);
  const onThreeStarClick = () => setStars(3);
  const onFourStarClick = () => setStars(4);
  const onFiveStarClick = () => setStars(5);

  const onCreateReviewClick = () => {
    if (stars === 0 || review.length < 2) {
      setErrMsg(
        "Invalid inputs. Please enter both a star rating and a review message."
      );
    } else {
      createReview({
        review,
        rating: stars,
        tour: reviewData.tour,
        user: reviewData.user._id,
      });
    }
  };

  const onUpdateReviewClick = () => {
    if (review.length < 2) {
      setErrMsg("Invalid inputs. Please enter a review message.");
    } else {
      updateReview({
        reviewId: reviewData.id,
        rating: stars,
        review,
      });
    }
  };

  const onDeleteReviewClick = () => {
    deleteReview(reviewData.id);
  };

  let starClasses = `h-6 w-6 ${
    eidtReview ? "cursor-pointer" : "cursor-default"
  }`;
  const errClass = errMsg ? "inline-block text-red-500 mb-3 text-lg" : "hidden";

  const starsContent = [
    <StarIconOutline
      key="1"
      className={starClasses}
      onClick={() => (eidtReview ? onOneStarClick() : "")}
      fill={stars >= 1 ? "#334155" : "#D8E0E3"}
    />,
    <StarIconOutline
      key="2"
      className={starClasses}
      onClick={() => (eidtReview ? onTwoStarClick() : "")}
      fill={stars >= 2 ? "#334155" : "#D8E0E3"}
    />,
    <StarIconOutline
      key="3"
      className={starClasses}
      onClick={() => (eidtReview ? onThreeStarClick() : "")}
      fill={stars >= 3 ? "#334155" : "#D8E0E3"}
    />,
    <StarIconOutline
      key="4"
      className={starClasses}
      onClick={() => (eidtReview ? onFourStarClick() : "")}
      fill={stars >= 4 ? "#334155" : "#D8E0E3"}
    />,
    <StarIconOutline
      key="5"
      className={starClasses}
      onClick={() => (eidtReview ? onFiveStarClick() : "")}
      fill={stars >= 5 ? "#334155" : "#D8E0E3"}
    />,
  ];

  return "id" in reviewData ? (
    <div className="flex w-full flex-col items-start justify-start bg-gray-50 p-8">
      <p className={errClass}>{errMsg}</p>
      <div className="flex w-full flex-row justify-between">
        {/* <div className="flex flex-row items-start justify-between">
        <p className="text-xl font-medium leading-normal text-gray-800 md:text-2xl">
        {" "}
        {reviewData.title ? reviewData.title : ""}
        </p>
      </div> */}
        <span className="mt-2 flex  md:mt-0">{starsContent}</span>
        <span className="flex gap-5">
          {eidtReview ? (
            <>
              <XMarkIcon
                className="mt-2 h-6 w-6 cursor-pointer md:mt-0"
                onClick={() => setEditReview(false)}
              />
              <CheckIcon
                className="mt-2 h-6 w-6 cursor-pointer md:mt-0"
                onClick={onUpdateReviewClick}
              />
            </>
          ) : (
            <>
              <TrashIcon
                className="mt-2 h-6 w-6 cursor-pointer md:mt-0"
                onClick={onDeleteReviewClick}
              />
              <PencilSquareIcon
                className="mt-2 h-6 w-6 cursor-pointer md:mt-0"
                onClick={() => setEditReview(true)}
              />
            </>
          )}
        </span>
      </div>
      <div className="block w-full md:block">
        {eidtReview ? (
          <textarea
            placeholder={reviewData.review}
            value={review}
            onChange={(e: any) => setReview(e.target.value)}
            className="xl:w-5/6 mt-3 border-2 border-gray-400 bg-gray-50 text-base leading-normal text-gray-600 placeholder:text-gray-600 md:w-9/12"
            rows={4}
          />
        ) : (
          <p className="xl:w-5/6 mt-3 w-full text-base leading-normal text-gray-600 md:w-9/12">
            {reviewData.review}
          </p>
        )}

        <div className="mt-6 flex flex-row items-center justify-start space-x-2.5">
          <div>
            <img
              src={`https://wander-api-bl56.onrender.com/img/users/${reviewData.user.photo}`}
              className="mr-4 h-20 w-20 rounded-full object-cover shadow"
              alt="user=profile-pic"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex flex-col items-start justify-start space-y-2">
            <p className="text-base font-medium leading-none text-gray-800">
              {reviewData.user.name}
            </p>
            <p className="text-sm leading-none text-gray-600">
              {eidtReview
                ? ""
                : new Date(reviewData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex w-full flex-col items-start justify-start bg-gray-50 p-8">
      <p className={errClass}>{errMsg}</p>
      <div className="flex w-full flex-row justify-between">
        <span className="mt-2 flex  md:mt-0">{starsContent}</span>
        <span className="flex gap-5">
          <button
            type="button"
            className="rounded-md bg-slate-700 px-5 py-2 text-lg text-white hover:bg-slate-600 hover:text-white"
            onClick={onCreateReviewClick}
          >
            Submit review
          </button>
        </span>
      </div>
      <div className="block w-full md:block">
        <textarea
          placeholder={"Leave a review here!"}
          value={review}
          onChange={(e: any) => setReview(e.target.value)}
          className="xl:w-5/6 mt-3 border-2 border-gray-400 bg-gray-50 text-base leading-normal text-gray-600 placeholder:text-gray-600 md:w-9/12"
          rows={6}
        />
      </div>
    </div>
  );
};

export default MyReview;
