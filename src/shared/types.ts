import { GeoJsonObject } from "geojson";
import { Key } from "react";

export enum SelectedPage {
    Home = "home",
    Benefits = "benefits",
    OurClasses = "ourclasses",
    ContactUs = "contactus",
  }

  export enum SearchParam {
    oneStar= "ratingsAverage[gte]=1.0&",
    twoStars= "ratingsAverage[gte]=2.0&",
    threeStars= "ratingsAverage[gte]=3.0&",
    fourStars= "ratingsAverage[gte]=4.0&",
    price500= "price[lt]=500&",
    price1000= "price[lt]=1000&",
    price2000= "price[lt]=2000&",
    price3000= "price[lt]=3000&",
    price5000= "price[lt]=5000&",
    duration1to5= "duration[gte]=1&duration[lte]=5&",
    duration5to10= "duration[gte]=5&duration[lte]=10&",
    duration10to20= "duration[gte]=10&duration[lte]=20&",
    duration20to30= "duration[gte]=20&duration[lte]=30&",
    difficultyEasy= "difficulty=easy&",
    difficultyMedium= "difficulty=medium&",
    difficultyHard= "difficulty=hard&",
    difficultyExpert= "difficulty=expert&",
  }

  export enum Months {
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  }

  export type TourObj = {
    id: string,
    name: String,
    slug: String,
    duration:Number,
    maxGroupSize:Number,
    difficulty:String,
    ratingsAverage:  Number,
    ratingsQuantity: Number,
    price: Number,
    priceDiscount: Number,
    summary: String,
    description: String,
    imageCover: String,
    images: String[],
    createdAt: String,
    startDates: string[],
    secretTour: Boolean,
    startLocation: LocationObject,
    // startLocation: {
    //   // GeoJSON
    //   type: {
    //     type: String,
    //     default: 'Point',
    //     enum: ['Point'],
    //   },
    //   coordinates: [Number],
    //   address: String,
    //   description: String,
    // },
    locations: LocationObject[],
    guides: UserObject[],
  } 

export type UserObject = {
  name: String,
  email: String,
  photo: String,
  role:String,
  password: String,
  passwordConfirm:String,
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: Boolean,
}

export type LocationObject = {
  address?: String,
  day?: String,
  coordinates: Number[],
  description: String,
}

  export interface TourType  {
    imageCover: JSX.Element;
    name: string;
    difficulty: string;
    duration: string;
    summary: string;
    startLocation: string;
    startDate: string;
    stops: string;
    maxGroupSize: string;
    price: string;
    ratingsAverage: string;
    ratingsQuantity: string;
  }

  export interface BenefitType {
    icon: JSX.Element;
    title: string; 
    description: string;
  }

export interface ClassType {
  name: string;
  description?: string;
  image: string;
}