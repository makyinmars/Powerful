import { mainBullets } from "../data/mainBullets";

const Main = () => {
  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <p className="px-4">
            Powerful is a simple and intuitive workout application that makes
            your tracking experience easy. Think less and lift more. Make those
            gains with Powerful.
          </p>
        </div>
      </div>
      <div className="h-full grid grid-cols-1 gap-4 sm:grid-cols-2">
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
