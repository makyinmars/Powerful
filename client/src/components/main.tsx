import { mainBullets } from "../data/mainBullets";
import Logo from "./logo";

const Main = () => {
  return (
    <>
      <Logo />
      <div className="flex justify-center flex-col items-center">
        <div className="flex flex-col items-center gap-4 text-lg font-bold">
          <p className="px-4">
            Powerful is a simple and intuitive workout application that makes
            your tracking experience easy
          </p>
          <p className="px-4">Think less and lift more</p>
          <p className="px-4">Make those gains with Powerful</p>
        </div>
      </div>
      <div className="h-full grid grid-cols-1 gap-4 sm:grid-cols-2 font-bold">
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
        <div key={index} className="flex flex-col items-center justify-center">
          <img
            src={bullet.src}
            alt={bullet.alt}
            className="w-100 h-80 sm:w-50 sm:h-50"
          />
          <p className="text-center text-sm">{bullet.text}</p>
        </div>
      ))}
    </>
  );
};
