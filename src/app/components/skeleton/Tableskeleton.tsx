import React from "react";
import { AnimatePresence } from "framer-motion";

const Tableskeleton = () => {
  return (
    <div className="w-full">
      <div className="w-full">
        <form className="w-full">
          <div className="flex gap-2 pb-6 border-b border-[#e0e5ff]">
            <div className="w-full rounded-md border border-dashed border-[#c7cefe] bg-gray-200 py-1 px-3 animate-pulse">
              <div className="h-8 bg-gray-200 rounded-md"></div>
            </div>
            <div className="bg-gray-200 text-white p-2 rounded-md text-[1.5rem] animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </form>
      </div>

      <div className="py-6 flex flex-col gap-1">
        <AnimatePresence>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="flex items-center gap-2 animate-pulse">
              <div className="w-full bg-gray-100 h-12 rounded-md"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tableskeleton;
