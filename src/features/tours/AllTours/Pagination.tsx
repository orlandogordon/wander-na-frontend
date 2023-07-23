import { usePagination, DOTS } from "../../../hooks/usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  onPageChange: (arg: number | string) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: Props) => {
  const paginationRange = usePagination(
    totalCount,
    pageSize,
    siblingCount,
    currentPage
  );

  // If there are not multiple pages to display we will not render this component
  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className=" mb-12 mt-16 flex w-full list-none justify-center">
      {/* Left navigation arrow */}
      <li
        className={` mx-1 my-auto box-border flex h-8 min-w-[32px] items-center rounded-2xl px-3 text-center text-gray-900 hover:cursor-pointer hover:bg-slate-300 ${
          currentPage === 1
            ? "pointer-events-none hover:cursor-default hover:bg-transparent"
            : ""
        }`}
        onClick={onPrevious}
      >
        <ChevronLeftIcon className="relative inline-block h-6 w-6" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={index}
            className={`mx-1 my-auto box-border flex h-8 min-w-[32px] items-center rounded-2xl px-3 text-center text-lg text-gray-900 hover:cursor-pointer hover:bg-slate-300 ${
              pageNumber === currentPage ? "bg-slate-400" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={`mx-1 my-auto box-border flex h-8 min-w-[32px] items-center rounded-2xl px-3 text-center text-sm text-gray-900 hover:cursor-pointer hover:bg-slate-300 ${
          currentPage === lastPage
            ? "pointer-events-none border-r-slate-300 border-t-slate-300 hover:cursor-default hover:bg-transparent"
            : ""
        }`}
        onClick={onNext}
      >
        <ChevronRightIcon className="relative inline-block h-6 w-6 border-r-slate-300 border-t-slate-300" />
      </li>
    </ul>
  );
};

export default Pagination;
