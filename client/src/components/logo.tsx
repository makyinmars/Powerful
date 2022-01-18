import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-48">
      <img src="/logo/dumbbell.svg" alt="logo" className="h-20 w-20" />
      <h1 className="text-4xl font-bold text-brand-700">Powerful</h1>
    </div>
  );
};

export default Logo;
