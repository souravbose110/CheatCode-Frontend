import axios from "axios";

export const fetchQues = async (
  token,
  url,
  currentPage,
  handleSetList,
  handleLoading
) => {
  try {
    handleLoading(true);
    const response = await axios.get(`${url}${currentPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    handleLoading(false);
    handleSetList(response.data.results);
  } catch (error) {
    handleLoading(false);
  }
};

//submitting the solved ques
export const submitSolved = async (id, token) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_postSubmittedQuestionsRoute,
      {
        question_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {}
};

export const fetchTags = async (token) => {
  try {
    const response = await axios.get(process.env.REACT_APP_getTagsRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const fetchQuestions = async (id, page, token) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_getTagsRoute + `/${id}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};
