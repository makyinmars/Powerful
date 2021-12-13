import React from "react";

interface SuccessHandlingProps {
  text: string;
}

const SuccessQueryHandling = ({ text }: SuccessHandlingProps) => {
  return <div className="success-handling">{text}</div>;
};

export default SuccessQueryHandling;
