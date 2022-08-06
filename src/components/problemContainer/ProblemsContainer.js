import React, { useEffect, useState } from "react";
import Problem from "../problem/Problem.js";
import "./ProblemsContainer.css";
import Pagination from "../pagination/Pagination";
import DMenu from "../DifficultyMenu/DMenu.js";
import { fetchQues, submitSolved } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";

function ProblemsContainer() {
  const navigate = useNavigate();
  const [url, setUrl] = useState(
    "https://cheatcode.pythonanywhere.com/top?page="
  );
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cheat-code-user")) {
      setCurrentUser(JSON.parse(localStorage.getItem("cheat-code-user")));
    }
    // console.log(currentUser);
  }, []);

  function handleLoading(status) {
    setLoading(status);
  }

  //submitting the solved ques
  const handleSolved = async (id) => {
    if (currentUser) {
      submitSolved(id, currentUser.token);
    } else {
      navigate("/login");
    }
  };

  const handleCurrentPage = (cmd) => {
    if (currentPage === 1 && cmd === false) return;
    if (currentPage === 20 && cmd === true) return;
    if (cmd === true) {
      setCurrentPage(currentPage + 1);
    } else if (cmd === false) {
      setCurrentPage(currentPage - 1);
    }
    // console.log(currentPage);
  };

  const handleGoto = (num) => {
    setCurrentPage(num);
  };

  const handleSetList = (data) => {
    setList(data);
  };

  const backToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  const handleModalLoading = (status) => {
    // console.log(status);
    setModalLoading(status);
  };

  useEffect(() => {
    if (currentUser) {
      fetchQues(
        currentUser.token,
        url,
        currentPage,
        handleSetList,
        handleModalLoading
      );
      backToTop();
    }
  }, [currentPage, url]);

  useEffect(() => {
    setCurrentPage(1);
    if (currentUser) {
      fetchQues(
        currentUser.token,
        url,
        currentPage,
        handleSetList,
        handleLoading
      );
      backToTop();
    }
  }, [currentUser]);

  const handleDifficulty = (diff) => {
    // console.log(diff);
    if (diff === "all") {
      setUrl("https://cheatcode.pythonanywhere.com/top?page=");
    } else if (diff === "easy") {
      setUrl(
        "https://cheatcode.pythonanywhere.com/questions?difficulty=1&page="
      );
    } else if (diff === "medium") {
      setUrl(
        "https://cheatcode.pythonanywhere.com/questions?difficulty=2&page="
      );
    } else if (diff === "hard") {
      setUrl(
        "https://cheatcode.pythonanywhere.com/questions?difficulty=3&page="
      );
    }
  };

  return (
    <div className="p-container">
      <div className="all-topics">All Topics</div>

      <div className="p-d-container">
        <div className="progress-bar">
          {/* <p>Problems Solved</p>
                    <Progress value={progressPercentage} width='8rem' size='xs' colorScheme='green' /> */}
        </div>
        <div className="difficulty-selecter">
          <DMenu handleDifficulty={handleDifficulty} />
        </div>
      </div>
      <div className="p-container-top">
        <div style={{ display: "flex", gap: "2.1rem" }}>
          <p>Status</p>
          <p>Title</p>
        </div>
        <div>Difficulty</div>
      </div>
      <Modal modalLoading={modalLoading} />
      <Problem loading={loading} list={list} handleSolved={handleSolved} />
      <Pagination
        handleGoto={handleGoto}
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
      />
    </div>
  );
}

export default ProblemsContainer;
