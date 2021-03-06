import React from "react";

export default function pagination({ current, setCurrent, max }) {
  const handlerPaginationIncrease = () => {
    setCurrent(1);
  };
  const handlerPaginationDecrease = () => {
    setCurrent(-1);
  };
  return (
    <div className=" overflow-hidden  text-center p-4">
      <div className="inline-flex">
        <button
          disabled={current === 1 ? true : false}
          onClick={handlerPaginationDecrease}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:bg-gray-100 font-bold py-2 px-4 rounded-l"
        >
          Prev
        </button>
        <button
          disabled={current === max ? true : false}
          onClick={handlerPaginationIncrease}
          className="bg-gray-300 disabled:bg-gray-100 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
}
