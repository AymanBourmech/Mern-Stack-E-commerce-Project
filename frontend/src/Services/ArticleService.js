import Api from "../Axios/Api";
const ARTICLE_API = "/articles";
const fetchArticles = async () => {
  const token = JSON.parse(localStorage.getItem("CC_Token"));

  return await Api.get(ARTICLE_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const fetchArticleById = async (id) => {
  return await Api.get(ARTICLE_API + "/" + id);
};
const deleteArticle = async (id) => {
  return await Api.delete(ARTICLE_API + "/" + id);
};
const addArticle = async (art) => {
  return await Api.post(ARTICLE_API, art);
};
const editArticle = async (art) => {
  return await Api.put(ARTICLE_API + "/" + art._id, art);
};

export const ArticleService = {
  fetchArticles,
  fetchArticleById,
  deleteArticle,
  addArticle,
  editArticle,
};
