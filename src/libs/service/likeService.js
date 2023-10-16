import customAxios from "./api/axios";

/* 좋아요 조회 */
export const getLikeApi = (postId) => {
  return customAxios.get(`/like/${postId}`);
};

/* 좋아요 추가 */
export const addLikeApi = (value) => {
  return customAxios.post(`/like`, value);
};

/* 좋아요 삭제 */
export const deleteLikeApi = (commentId, userId) => {
  return customAxios.delete(`/like/${commentId}/${userId}`);
};
