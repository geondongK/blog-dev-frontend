import customAxios from "./api/axios";

/* 댓글 작성 */
export const createCommentApi = (newComment, parentId) => {
  return customAxios.post("/comment", newComment, parentId);
};

/* 해당 댓글 */
export const getCommentApi = (id) => {
  return customAxios.get(`/comment/${id}`);
};

/* 댓글 수정 */
export const updateCommentApi = (commentId, newComment) => {
  return customAxios.put(`/comment/${commentId}`, newComment);
};

/* 대댓글 존재 */
export const existsByCommentApi = (commentId) => {
  return customAxios.put(`/comment/existComment/${commentId}`);
};

/* 댓글 삭제 */
export const deleteCommentApi = (id) => {
  return customAxios.delete(`/comment/${id}`);
};
