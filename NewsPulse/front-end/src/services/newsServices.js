import axiosClient from "./axiosClient";

export const getLatestNews = async (currentPage) => {
  const request = await axiosClient.get(`/news/?page=${currentPage}`);
  return request.data;
};

export const getSearchResult = async ({ query, currentPage }) => {
  const request = await axiosClient.get(
    `/news/?q=${query}&page=${currentPage}`
  );
  return request.data;
};

export const getCategoryArticles = async ({ category, currentPage }) => {
  const request = await axiosClient.get(
    `/news/?category=${category}&page=${currentPage}`
  );
  return request.data;
};
