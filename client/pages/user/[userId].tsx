import React from "react";
import { useRouter } from "next/router";

const UserId = () => {
  const router = useRouter();

  const { userId } = router.query;

  console.log(userId);
  return <div></div>;
};

export default UserId;
