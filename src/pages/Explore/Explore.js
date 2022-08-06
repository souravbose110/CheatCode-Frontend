import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import "./Explore.css";
import CircularLoader from "../../components/CircularLoader/CircularLoader";
import { fetchTags } from "../../api/api";
import { Box } from "@chakra-ui/react";
import Navbar from "../../components/navbar/Navbar";
import { toast } from "react-toastify";

const Explore = () => {
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toastStyle = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchTagsHelper = async (token) => {
    setLoading(true);
    const fetchedTags = await fetchTags(token);
    if (fetchedTags === null) {
      toast.error("Failed to load!", toastStyle);
    } else {
      setTags(fetchedTags);
    }
    setLoading(false);
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("cheat-code-user"));
    if (!userInfo) {
      navigate("/login");
    }
    fetchTagsHelper(userInfo.token);
  }, [navigate]);

  return (
    <div className="parent">
      {(tags === null || loading) && <CircularLoader />}
      {tags !== null && (
        <>
          <Navbar />
          <Box className="row">
            {tags.map((t) => (
              <Link
                key={t.id}
                to={`/problems/${t.name}/${t.id}`}
                className="link"
              >
                <Card title={t.name} />
              </Link>
            ))}
          </Box>
        </>
      )}
    </div>
  );
};
export default Explore;
