import React, { useState, useEffect } from "react";
import "./Card.css";
import { CircularProgress } from "@chakra-ui/react";

const Card = ({ title }) => {
  const [name, setName] = useState("");

  const modifyTitle = () => {
    if (title.length > 21) {
      const s = title.substring(0, 20) + "...";
      setName(s);
    } else {
      setName(title);
    }
  };

  useEffect(() => {
    modifyTitle();
  });

  // const findVal = () => {
  //   return Math.round((ques / total) * 100);
  // };

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <div className="card-body">
          <div className="column">
            <h2>0</h2>
            <p>Done</p>
          </div>
          <div className="column">
            <h2>0</h2>
            <p>Total</p>
          </div>
          <CircularProgress
            className="column progress"
            value={40}
            color="black"
          ></CircularProgress>
        </div>
      </div>
    </div>
  );
};

export default Card;
