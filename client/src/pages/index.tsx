import type { NextPage } from "next";
import Main from "@/components/main";
import HeadPage from "@/components/headPage";

const HomePage: NextPage = () => {
  return (
    <>
      <HeadPage title="Powerful" />
      <Main />
    </>
  );
};

export default HomePage;
