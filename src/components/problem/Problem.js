import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import "./Problem.css";

const Problem = ({ list, handleSolved, loading }) => {
  return (
    <div>
      {loading ? (
        <Stack>
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
          <Skeleton height="35px" />
        </Stack>
      ) : (
        list.map((prob, index) => (
          <div
            className={`all-problem ${index % 2 === 0 ? "even" : "odd"}`}
            key={prob.id}
          >
            <div className="center">
              {/* <label> */}
              <input
                type="checkbox"
                defaultChecked={prob.is_complete}
                onChange={() => handleSolved(prob.id)}
              />
              {/* </label> */}
            </div>
            <a href={prob.link} target="_blank" rel="noreferrer">
              {prob.heading}
            </a>
            <p
              className={
                prob.difficulty === "Hard"
                  ? "red"
                  : prob.difficulty === "Medium"
                  ? "orange"
                  : "green"
              }
            >
              {prob.difficulty}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Problem;
