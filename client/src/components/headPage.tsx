import React from "react";
import Head from "next/head";

interface HeadPageProps {
  title: string;
}

const HeadPage = ({ title }: HeadPageProps) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default HeadPage;
