import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

interface ErrorHandlingProps {
  error: any;
}

const ErrorHandling = ({ error }: ErrorHandlingProps) => {
  const isFetchBaseQueryErrorType = (
    error: any
  ): error is FetchBaseQueryError => "status" in error;

  return (
    <div className="error-handling">
      {isFetchBaseQueryErrorType(error as string) ? error.data : null}
    </div>
  );
};

export default ErrorHandling;
