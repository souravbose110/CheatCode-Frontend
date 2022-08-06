import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularLoader from "../../components/CircularLoader/CircularLoader";
import { fetchQuestions, submitSolved } from "../../api/api";
import Navbar from "../../components/navbar/Navbar";
import Problem from "../../components/problem/Problem";
import Modal from "../../components/modal/Modal";
import Pagination from "../../components/pagination/Pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProblemsPage = () => {
  const params = useParams();
  const [list, setList] = useState(null);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleCurrentPage = (cmd) => {
    if (page === 1 && cmd === false) return;
    if (page === maxPage && cmd === true) return;
    if (cmd === true) {
      setPage(page + 1);
    } else if (cmd === false) {
      setPage(page - 1);
    }
  };

  const handleGoto = (num) => {
    if (num <= maxPage && num > 0) {
      setPage(num);
    } else {
      toast.warning(
        `Please enter page number between 1 and ${maxPage}`,
        toastStyle
      );
    }
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fetchQuestionsHelper = async (token) => {
    setIsLoading(true);
    const fetchedQuestions = await fetchQuestions(params.id, page, token);
    if (fetchedQuestions === null) {
      toast.error("Failed to load!", toastStyle);
    } else {
      setMaxPage(Math.round(fetchedQuestions.count / 25));
      setList(fetchedQuestions.results);
    }
    setIsLoading(false);
    backToTop();
  };

  const handleSolved = async (id) => {
    if (user) {
      submitSolved(id, user.token);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("cheat-code-user"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/login");
    }
    fetchQuestionsHelper(userInfo.token);
  }, [page, navigate]);

  return (
    <>
      <Navbar />
      <div className="sub-heading" style={{ marginTop: "100px" }}>
        {params.title}
      </div>
      {list === null && <CircularLoader />}

      {list !== null && list !== undefined && isLoading && (
        <>
          <Modal modalLoading={isLoading} />
        </>
      )}
      {list !== null && list !== undefined && (
        <>
          <div className="p-container">
            <div className="p-d-container">
              <div className="progress-bar">
                {/* <p>Problems Solved</p>
                    <Progress value={progressPercentage} width='8rem' size='xs' colorScheme='green' /> */}
              </div>
            </div>
            <div className="p-container-top">
              <div style={{ display: "flex", gap: "2.1rem" }}>
                <p>Status</p>
                <p>Title</p>
              </div>
              <div>Difficulty</div>
            </div>
            <Modal modalLoading={list === null} />
            <Problem
              loading={list === null}
              list={list}
              handleSolved={handleSolved}
            />
            <Pagination
              handleGoto={handleGoto}
              currentPage={page}
              handleCurrentPage={handleCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProblemsPage;
