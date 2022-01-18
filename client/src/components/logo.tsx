import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-48">
      <Image
        src="/logo/dumbbell.svg"
        alt="logo"
        className="h-20 w-20"
        width={200}
        height={200}
      />
      <h1 className="text-4xl font-bold text-brand-700">Powerful</h1>
    </div>
  );
};

export default Logo;
