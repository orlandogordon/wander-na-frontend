import { useState } from "react";
import {
  AdjustmentsVerticalIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { createSearchParams, useNavigate } from "react-router-dom";
import { SearchParam } from "../../../shared/types";

type Props = {};

type ratingsObj = {
  oneStar: boolean;
  twoStars: boolean;
  threeStars: boolean;
  fourStars: boolean;
};
type priceObj = {
  price500: boolean;
  price1000: boolean;
  price2000: boolean;
  price3000: boolean;
  price5000: boolean;
};
type durationObj = {
  duration1to5: boolean;
  duration5to10: boolean;
  duration10to20: boolean;
  duration20to30: boolean;
};
type difficultyObj = {
  difficultyEasy: boolean;
  difficultyMedium: boolean;
  difficultyHard: boolean;
  difficultyExpert: boolean;
};

const Filter = (props: Props) => {
  const navigate = useNavigate();

  const [showFilters, setShowfilters] = useState(false);
  const [checkRatings, setCheckRatings] = useState<ratingsObj>({
    oneStar: false,
    twoStars: false,
    threeStars: false,
    fourStars: false,
  });
  const [checkPrice, setCheckPrice] = useState<priceObj>({
    price500: false,
    price1000: false,
    price2000: false,
    price3000: false,
    price5000: false,
  });
  const [checkDuration, setCheckDuration] = useState<durationObj>({
    duration1to5: false,
    duration5to10: false,
    duration10to20: false,
    duration20to30: false,
  });
  const [checkDifficulty, setCheckDifficulty] = useState<difficultyObj>({
    difficultyEasy: false,
    difficultyMedium: false,
    difficultyHard: false,
    difficultyExpert: false,
  });

  const changeHandlerRatings = (e: any) => {
    setCheckRatings({
      oneStar: false,
      twoStars: false,
      threeStars: false,
      fourStars: false,
      [e.target.name]: e.target.checked,
    });
  };
  const changeHandlerPrice = (e: any) => {
    setCheckPrice({
      price500: false,
      price1000: false,
      price2000: false,
      price3000: false,
      price5000: false,
      [e.target.name]: e.target.checked,
    });
  };
  const changeHandlerDuration = (e: any) => {
    setCheckDuration({
      duration1to5: false,
      duration5to10: false,
      duration10to20: false,
      duration20to30: false,
      [e.target.name]: e.target.checked,
    });
  };
  const changeHandlerDifficulty = (e: any) => {
    setCheckDifficulty({
      difficultyEasy: false,
      difficultyMedium: false,
      difficultyHard: false,
      difficultyExpert: false,
      [e.target.name]: e.target.checked,
    });
  };

  const applyFilters = (e: any) => {
    let queryParams = "";
    Object.keys(checkRatings).forEach(function (key) {
      if (checkRatings[key as keyof ratingsObj] === true) {
        queryParams += SearchParam[key as keyof ratingsObj];
      }
    });
    Object.keys(checkPrice).forEach(function (key) {
      if (checkPrice[key as keyof priceObj] === true) {
        queryParams += SearchParam[key as keyof priceObj];
      }
    });
    Object.keys(checkDuration).forEach(function (key) {
      if (checkDuration[key as keyof durationObj] === true) {
        queryParams += SearchParam[key as keyof durationObj];
      }
    });
    Object.keys(checkDifficulty).forEach(function (key) {
      if (checkDifficulty[key as keyof difficultyObj] === true) {
        queryParams += SearchParam[key as keyof difficultyObj];
      }
    });
    setShowfilters(!showFilters);
    navigate(`?${queryParams}`);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className=" mb-4 px-4 pt-9 md:px-6 md:pt-12 lg:px-20">
        <div className=" mt-4 flex items-center justify-end">
          {/*  filters Button (md and plus Screen) */}
          <button
            onClick={() => setShowfilters(!showFilters)}
            className="flex cursor-pointer items-center justify-center bg-gray-800 px-6 py-4 text-base font-normal leading-4 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 "
          >
            <AdjustmentsVerticalIcon className="mr-2 h-6 w-6" />
            Filters
          </button>
        </div>
      </div>

      <div
        id="filterSection"
        className={
          "relative w-full bg-gray-50 px-4 py-5 md:px-6 md:py-6 lg:px-20 " +
          (showFilters ? "block" : "hidden")
        }
      >
        {/* Cross button Code  */}
        <div
          onClick={() => setShowfilters(false)}
          className=" absolute right-0 top-0 cursor-pointer px-4 py-9 md:px-6 md:py-10 lg:px-20"
        >
          <XMarkIcon className="h-6 w-6 lg:h-8 lg:w-8" />
        </div>

        {/* Average Rating Section */}
        <div>
          <div className=" flex space-x-2">
            <StarIcon className="h-6 w-6" />
            <p className=" text-xl font-medium leading-5 text-gray-800 lg:text-2xl lg:leading-6 ">
              Average Rating
            </p>
          </div>
          <div className=" mt-8 grid grid-cols-3 flex-wrap gap-y-8 md:flex md:space-x-6">
            <div className=" flex items-center justify-start md:items-center md:justify-center ">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="OneStar"
                name="oneStar"
                value="1"
                checked={checkRatings.oneStar}
                onChange={changeHandlerRatings}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="OneStar"
                  >
                    {"1 +"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center ">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="TwoStar"
                name="twoStars"
                value="2"
                checked={checkRatings.twoStars}
                onChange={changeHandlerRatings}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="TwoStar"
                  >
                    {"2 +"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-end md:items-center md:justify-center ">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="ThreeStar"
                name="threeStars"
                value="3"
                checked={checkRatings.threeStars}
                onChange={changeHandlerRatings}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="ThreeStar"
                  >
                    {"3 +"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-start md:items-center md:justify-center ">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="FourStar"
                name="fourStars"
                value="4"
                checked={checkRatings.fourStars}
                onChange={changeHandlerRatings}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="FourStar"
                  >
                    {"4 +"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className=" my-3 w-full bg-gray-200 md:my-5 lg:w-6/12" />

        {/* Material Section */}
        <div>
          <div className=" flex space-x-2">
            <CreditCardIcon className="h-6 w-6" />
            <p className=" text-xl font-medium leading-5 text-gray-800 lg:text-2xl lg:leading-6 ">
              Price
            </p>
          </div>
          <div className=" mt-8 grid grid-cols-3 flex-wrap gap-y-8 md:flex md:space-x-6">
            <div className=" flex items-center justify-start space-x-2 md:items-center md:justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Price500"
                name="price500"
                value="500"
                checked={checkPrice.price500}
                onChange={changeHandlerPrice}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Price500"
                  >
                    {"< $500"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Price1000"
                name="price1000"
                value="1000"
                checked={checkPrice.price1000}
                onChange={changeHandlerPrice}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Price1000"
                  >
                    {"< $1,000"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-end space-x-2 md:items-center md:justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Price2000"
                name="price2000"
                value="2000"
                checked={checkPrice.price2000}
                onChange={changeHandlerPrice}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Price2000"
                  >
                    {"< $2,000"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-start space-x-2 md:items-center md:justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Price3000"
                name="price3000"
                value="3000"
                checked={checkPrice.price3000}
                onChange={changeHandlerPrice}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Price3000"
                  >
                    {"< $3,000"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Price5000"
                name="price5000"
                value="5000"
                checked={checkPrice.price5000}
                onChange={changeHandlerPrice}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Price5000"
                  >
                    {"< $5,000"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className=" my-3 w-full bg-gray-200 md:my-5 lg:w-6/12" />

        {/* Size Section */}
        <div>
          <div className=" flex space-x-2">
            <CalendarDaysIcon className="h-6 w-6" />
            <p className="  text-xl font-medium leading-5 text-gray-800 lg:text-2xl lg:leading-6 ">
              Duration
            </p>
          </div>
          <div className=" mt-8 grid grid-cols-3 flex-wrap gap-y-8 md:flex md:space-x-6">
            <div className=" flex items-center justify-start md:items-center md:justify-center ">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Duration1to5"
                name="duration1to5"
                value="1-5"
                checked={checkDuration.duration1to5}
                onChange={changeHandlerDuration}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Duration1to5"
                  >
                    {"1 - 5 Days"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center ">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Duration5to10"
                name="duration5to10"
                value="5-10"
                checked={checkDuration.duration5to10}
                onChange={changeHandlerDuration}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Duration5to10"
                  >
                    {"5 - 10 Days"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-end md:items-center md:justify-center ">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Duration10to20"
                name="duration10to20"
                value="10-20"
                checked={checkDuration.duration10to20}
                onChange={changeHandlerDuration}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Duration10to20"
                  >
                    {"10 - 20 Days"}
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-start md:items-center md:justify-center ">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="Duration20to30"
                name="duration20to30"
                value="20-30"
                checked={checkDuration.duration20to30}
                onChange={changeHandlerDuration}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="Duration20to30"
                  >
                    {"20 - 30 Days"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className=" my-3 w-full bg-gray-200 md:my-5 lg:w-6/12" />

        {/* Collection Section */}

        <div>
          <div className=" flex space-x-2">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <p className=" text-xl font-medium leading-5 text-gray-800 lg:text-2xl lg:leading-6 ">
              Difficulty
            </p>
          </div>
          <div className=" mt-8 flex space-x-8">
            <div className=" flex items-center justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="DifficultyEasy"
                name="difficultyEasy"
                value="Easy"
                checked={checkDifficulty.difficultyEasy}
                onChange={changeHandlerDifficulty}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="DifficultyEasy"
                  >
                    Easy
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="DifficultyMedium"
                name="difficultyMedium"
                value="Medium"
                checked={checkDifficulty.difficultyMedium}
                onChange={changeHandlerDifficulty}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="DifficultyMedium"
                  >
                    Medium
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="DifficultyHard"
                name="difficultyHard"
                value="Hard"
                checked={checkDifficulty.difficultyHard}
                onChange={changeHandlerDifficulty}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="DifficultyHard"
                  >
                    Hard
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                id="DifficultyExpert"
                name="difficultyExpert"
                value="Expert"
                checked={checkDifficulty.difficultyExpert}
                onChange={changeHandlerDifficulty}
              />
              <div className=" inline-block">
                <div className=" flex items-center justify-center space-x-6">
                  <label
                    className=" mr-2 text-sm font-normal leading-3 text-gray-600"
                    htmlFor="DifficultyExpert"
                  >
                    Expert
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full px-0 md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-auto md:px-6 md:py-10 lg:px-20">
          <button
            onClick={applyFilters}
            className="w-full bg-gray-800 px-10 py-4 text-base font-medium leading-4 text-white hover:bg-gray-700 focus:ring focus:ring-gray-800 focus:ring-offset-2"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
