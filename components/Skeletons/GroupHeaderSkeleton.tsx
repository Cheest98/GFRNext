import Image from "next/image";
import React from "react";

const GroupHeaderSkeleton = () => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-20 w-20  bg-gray-600 rounded-full"></div>
          <div className="h-8 w-20  bg-gray-600 rounded-lg"></div>
          <div className="flex-1 space-y-">       
          </div>
        </div>
        <div className="h-8 w-20  bg-gray-600 rounded-lg"></div>
      </div>
      <div className="mt-6 h-4 w-full  bg-gray-600 rounded"></div>
      <div className="mt-12 h-0.5 w-full bg-dark-3"></div>
      <div className="flex justify-end mt-2 h-4 rounded-md mb-6">
      <div className="mt-1 h-8  w-20 bg-gray-600 rounded-md">
      </div>
  </div>
    </article>
  );
};

export default GroupHeaderSkeleton;
