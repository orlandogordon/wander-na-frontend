import React from "react";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className="items-top relative flex min-h-screen justify-center bg-slate-100  sm:items-center sm:pt-0">
      <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mr-2 bg-contactus-background p-6 sm:rounded-lg">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary-500  sm:text-5xl">
                Get in touch
              </h1>
              <p className="text-normal mt-2 text-lg font-medium text-white  sm:text-2xl">
                Fill in the form to start a conversation
              </p>

              <div className="mt-8 flex items-center text-white ">
                <MapPinIcon className="h-8 w-8 text-primary-500" />
                <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                  123 Market Street Suite 456 Jersey City, NJ 07302
                </div>
              </div>

              <div className="mt-4 flex items-center text-white ">
                <PhoneIcon className="h-8 w-8 text-primary-500" />
                <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                  +1 (201)-425-6825{" "}
                </div>
              </div>

              <div className="mt-4 flex items-center text-white">
                <EnvelopeIcon className="h-8 w-8 text-primary-500" />
                <div className="text-md ml-4 w-40 font-semibold tracking-wide">
                  info@wanderna.com
                </div>
              </div>
            </div>

            <form className="flex flex-col justify-center p-6">
              <div className="flex flex-col">
                <label className="hidden">Full Name</label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  className="w-100 mt-2 rounded-lg border border-gray-400 bg-white px-3 py-3 font-semibold text-gray-800 focus:border-secondary-500 focus:outline-none "
                />
              </div>

              <div className="mt-2 flex flex-col">
                <label className="hidden">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-100 mt-2 rounded-lg border border-gray-400 bg-white px-3 py-3 font-semibold text-gray-800 focus:border-secondary-500 focus:outline-none "
                />
              </div>

              <div className="mt-2 flex flex-col">
                <label className="hidden">Message</label>
                <textarea
                  rows={5}
                  cols={80}
                  id="message"
                  placeholder="Enter message here..."
                  className="mt-2 rounded-lg border border-gray-400 bg-white px-3 py-3 font-semibold text-gray-800 focus:border-secondary-500 focus:outline-none "
                />
              </div>

              <button
                type="submit"
                className="hover:bg-blue-dark mt-3 rounded-lg bg-slate-700 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:bg-slate-600 md:w-32"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
