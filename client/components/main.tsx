import { mainBullets } from "../data/mainBullets";

const Main = () => {
  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <img src="/logo/dumbbell.svg" alt="logo" className="h-20 w-20" />
        <div>
          <span className="text-xl font-bold">Powerful </span>
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
