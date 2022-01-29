import Image from "next/image";

import { mainBullets } from "@/data/mainBullets";
import Logo from "./logo";

const Main = () => {
  return (
    <>
      <Logo />
      <div className="flex justify-center flex-col items-center">
        <div className="flex flex-col items-center text-center gap-4 text-2xl font-bold">
          <p className="px-4 mt-8">
            Powerful is a simple and intuitive workout application that makes
            your tracking experience easy.
          </p>
          <p className="px-4">
            Think less and lift more. Make those gains with Powerful.
          </p>
          <span className="px-4"></span>
        </div>
      </div>
      <div className="h-full grid grid-cols-1 gap-4 sm:grid-cols-2 font-bold px-1">
        <MainBullets />
      </div>
    </>
  );
};

export default Main;

const MainBullets = () => {
  return (
    <>
      {mainBullets.map((bullet, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-zinc-900 rounded"
        >
          <Image
            src={bullet.src}
            alt={bullet.alt}
            width={400}
            height={400}
            className="w-100 h-80 sm:w-50 sm:h-50"
          />
          <p className="text-center text-lg p-1">{bullet.text}</p>
        </div>
      ))}
    </>
  );
};
