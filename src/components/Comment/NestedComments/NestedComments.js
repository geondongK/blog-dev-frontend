//  eslint-disable
import "./NestedComments.scss";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as dislike } from "@fortawesome/free-regular-svg-icons";
import { faHeart as like } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getLikeApi,
  addLikeApi,
  deleteLikeApi,
} from "../../../libs/service/likeService";
import { ReactComponent as Avatar } from "../../../assets/images/avatar.svg";
import CommentDropdown from "../CommentDropdown/CommentDropdown";
import CommentForm from "../CommentForm/CommentForm";

function NestedComments({
  commentId,
  writerId,
  writer,
  description,
  createDate,
  activeComment,
  setActiveComment,
  addComment,
  editComment,
  deleteComment,
  isDeleted,
}) {
  const [liked, setLiked] = useState([]);

  const { id } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  // 좋아요 개수.
  const likes = liked.filter((likeCount) => likeCount.commentId === commentId);

  // 답글 클릭일 경우.
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === commentId &&
    currentUser !== null;

  // 수정 클릭일 경우.
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === commentId;

  // 좋아요 추가
  const handleAddLike = async (addLikeId) => {
    await addLikeApi({
      postId: id,
      commentId: addLikeId,
      userId: currentUser.userId,
    })
      .then((response) => {
        setLiked([...liked, ...response.data.data]);
      })
      .catch(() => {
        // console.log(error);
      });
  };

  // 좋아요 삭제
  const handleDeleteLike = async (deleteCommentId) => {
    await deleteLikeApi(deleteCommentId, currentUser.userId)
      .then(() => {
        const deleteLiked = liked.filter(
          (deleteLike) =>
            deleteLike.commentId === commentId &&
            deleteLike.userId !== currentUser.userId
        );
        setLiked(deleteLiked);
      })
      .catch(() => {
        // console.log(error);
      });
  };

  // 편집 및 삭제
  function dropdownComponent() {
    if (currentUser !== null) {
      if (writerId === currentUser.userId) {
        return (
          <CommentDropdown
            commentId={commentId}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            editComment={editComment}
          />
        );
      }
      return null;
    }
    return null;
  }

  function likedButtonComponent() {
    if (currentUser !== null) {
      if (
        liked.some(
          (likeButton) =>
            likeButton.commentId === commentId &&
            likeButton.userId === currentUser.userId
        )
      ) {
        return (
          <button
            type="button"
            onClick={() => {
              handleDeleteLike(commentId);
            }}
          >
            <FontAwesomeIcon style={{ color: "red" }} icon={like} />
          </button>
        );
      }

      return (
        <button
          type="button"
          onClick={() => {
            handleAddLike(commentId);
          }}
        >
          <FontAwesomeIcon icon={dislike} />
        </button>
      );
    }
    return (
      <button className="like-button" type="button">
        <FontAwesomeIcon icon={dislike} />
      </button>
    );
  }

  useEffect(() => {
    const fetchLiked = async () => {
      const response = await getLikeApi(id);
      setLiked(response.data.data);
    };

    fetchLiked();
  }, []);

  return (
    <div className="nestedcomments">
      <div className="nestedcomments-info">
        <div className="nestedcomments-space">
          <Avatar
            className="nestedcomments-info-img"
            width="30px"
            height="0%"
          />
          <div className="nestedcomments-details">
            <span className="nestedcomments-name">{writer}</span>
            <span className="nestedcomments-date">
              {moment(createDate, "YYYY-M-D").format("YYYY년 M월 D일")}
              {liked.userId}
              {liked.commentId}
            </span>
          </div>
        </div>
        <div className="nestedcomment-dropdown">{dropdownComponent()}</div>
      </div>
      {isDeleted ? (
        <p className="nestedcomments-description__deleted">
          작성자에 의해 삭제되었습니다.
        </p>
      ) : (
        <p className="nestedcomments-description">{description}</p>
      )}

      <div className="nestedcomments-button">
        {/* 좋아요 버튼 */}
        {likedButtonComponent()}
        <span>{likes.length === 0 ? null : `${likes.length} `}</span>
        {/* 답글 버튼 */}
        {!currentUser ? null : (
          <button
            onClick={() => {
              setActiveComment({
                id: commentId,
                type: "replying",
              });
            }}
            type="button"
          >
            <span>답글작성</span>
          </button>
        )}
      </div>
      {/* 대댓글 작성 */}
      <div className="nestedcomments-active">
        {isReplying && (
          <CommentForm
            submitLabel="답글달기"
            textLabel="답글 달기"
            handleCancelButton
            handleSubmit={(newComment) => {
              addComment(newComment, commentId);
            }}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        {/* likedButtonComponent() 코드로 동작함 */}
        {isEditing && (
          <CommentForm
            submitLabel="댓글 수정"
            textLabel="수정"
            handleCancelButton
            initialText={description}
            handleSubmit={(newComment) => {
              editComment(commentId, newComment);
            }}
            handleCancel={() => setActiveComment(null)}
          />
        )}
      </div>
    </div>
  );
}

export default NestedComments;
