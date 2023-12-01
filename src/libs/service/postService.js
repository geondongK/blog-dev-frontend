import customAxios from "../api/axios";
import authContext from "../api/instance";

/* 전체 게시물 */
export const getAllPostApi = (limit, offset) => {
  return customAxios.get(`/post?limit=${limit}&offset=${offset}`);
};

/* 해당 게시물 */
export const getPostApi = (postId) => {
  return customAxios.get(`/post/${postId}`);
};

/* 게시물 작성 */
export const createPostApi = (values) => {
  return authContext.post("/post", values);
};

/* 게시물 수정 */
export const updatePostApi = (postId, value) => {
  return authContext.put(`/post/${postId}`, value);
};

/* 게시물 삭제 */
export const deletePostApi = (postId) => {
  return authContext.delete(`/post/${postId}`);
};

/* 게시물 검색 */
export const searchPostApi = (query, limit, offset) => {
  return customAxios.get(
    `/post/search${query}&limit=${limit}&offset=${offset}`
  );
};

export const uploadFileApi = (value) => {
  return authContext.post("/upload", value);
};
