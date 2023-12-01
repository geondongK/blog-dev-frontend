import customAxios from "../api/axios";
import authContext from "../api/instance";

/* 좋아요 조회 */
export const getLikeApi = (postId) => {
  return customAxios.get(`/like/${postId}`);
};

/* 좋아요 추가 */
export const addLikeApi = (value) => {
  return authContext.post(`/like`, value);
};

/* 좋아요 삭제 */
export const deleteLikeApi = (commentId, userId) => {
  return authContext.delete(`/like/${commentId}/${userId}`);
};
