import React from "react";
import { CircularProgress } from "@chakra-ui/react";
import "./CircularLoader.css";

const CircularLoader = () => {
  return (
    <div className="loader">
      <CircularProgress isIndeterminate color="green.400" size="150" />
    </div>
  );
};

export default CircularLoader;
