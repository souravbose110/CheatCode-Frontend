import React, { useState, useEffect } from "react";
import "./Header.css";
import logo2 from "../../assets/images/logo2.png";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const Header = () => {
  // const [progressPercentage, setProgressPercentage] = useState(0);

  // useEffect(() => {
  //     // const percentage = (100 / list?.length) * solved;
  //     // setProgressPercentage(percentage);
  // }, [solved])

  return (
    <div className="header">
      <div className="header-left">
        <div className="header-img">
          <img src={logo2} alt="" />
        </div>
        <div className="title">
          <h1>{"LeetCode Top 500 Problem"}</h1>
          <p>{"LeetCode"}</p>
        </div>
      </div>
      {/* <div className='header-right'>
                <div className="progress-card">
                    <CircularProgress value={progressPercentage} color='green.400' size='120px' thickness='4px'>
                        <CircularProgressLabel>{`${Math.round(progressPercentage)}%`}</CircularProgressLabel>
                    </CircularProgress>
                    <div className='header-right-solved'>
                        <p>Problems Solved</p>
                        <p>{`${solved} / ${list.length}`}</p>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export default Header;
