import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-20 h-20 border-t-4 border-b-4 border-brand-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
