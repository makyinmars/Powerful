import type { NextPage } from "next";
import Layout from "../components/layout";
import Main from "../components/main";

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <Main />
      </Layout>
    </div>
  );
};

export default Home;
