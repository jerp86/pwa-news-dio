/* eslint-disable import/no-anonymous-default-export */
const params = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const URL = "http://localhost:3333/api";

const handleError = (err) =>
  console.error("There was an error calling the API!!!", err);

const getNews = (subject) =>
  fetch(`${URL}/${subject}`, params)
    .then((response) => response.json())
    .catch(handleError);

const getNewsById = (subject, id) =>
  fetch(`${URL}/${subject}/${id}`, params)
    .then((response) => response.json())
    .catch(handleError);

export default { getNews, getNewsById };
