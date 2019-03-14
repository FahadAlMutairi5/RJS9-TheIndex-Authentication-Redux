import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

const setLoading = () => ({
  type: actionTypes.SET_AUTHOR_LOADING
});

export const fetchAuthorDetail = authorID => {
  return dispatch => {
    dispatch(setLoading());
    instance
      .get(`/api/authors/${authorID}/`)
      .then(res => res.data)
      .then(author =>
        dispatch({
          type: actionTypes.FETCH_AUTHOR_DETAIL,
          payload: author
        })
      )
      .catch(err => console.error(err));
  };
};

export const postBook = (book, author) => {
  book = {
    ...book,
    authors: author
  };
  return dispatch => {
    instance
      .post(`/api/books/`, book)
      .then(res => res.data)
      .then(createdBook =>
        dispatch({
          type: actionTypes.POST_BOOK,
          payload: createdBook
        })
      )
      .catch(error => console.error(error.response.data));
  };
};
