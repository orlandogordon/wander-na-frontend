import React, { useEffect, useMemo, useState } from "react";
import { TourObj, TourType } from "../../../shared/types";
import image1 from "../assets/image1.png";
import TourCard from "./TourCard";
import { useGetToursQuery } from "../toursApiSlice";
import Filter from "./Filter";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import LoadingPage from "../../../shared/LoadingPage";

type Props = {};

const PageSize = 12;

const AllTours = ({}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isSuccess, isError, error } = useGetToursQuery(
    searchParams.toString().replace(/%5B/g, "[").replace(/%5D/g, "]")
  );

  let tours: any = [];
  let tourContent;

  if (isError) {
    console.log(error);
    if ("data" in error) {
      tourContent = (
        <p className=" text-red-600">
          Unable to fetch tour data. Please try refreshing and contact us if
          this error persists.
        </p>
      );
    }
  }

  if (isSuccess) {
    tours = data.data.data;
  }

  tourContent = useMemo(() => {
    if (isSuccess && !isLoading) {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      const currentToursData = tours.slice(firstPageIndex, lastPageIndex);
      window.scrollTo(0, 0);
      return tours?.length ? (
        currentToursData.map((tour: TourObj) => (
          <TourCard key={`${tour.id}`} tourObj={tour} />
        ))
      ) : (
        <div>No tours found under the given search paramerters...</div>
      );
    }
  }, [currentPage, tours]);

  return (
    <div className="mt-12 min-h-full bg-slate-100 text-black">
      <Filter />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="mx-auto grid w-11/12 max-w-[150rem] gap-20 sm:grid-cols-1 sm:py-4 md:grid-cols-2 md:py-0 lg:grid-cols-3 lg:py-4">
          {tourContent}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalCount={tours.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page as number)}
      />
    </div>
  );
};

export default AllTours;
