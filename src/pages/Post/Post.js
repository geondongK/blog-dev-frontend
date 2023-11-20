//  eslint-disable
import "./Post.scss";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import moment from "moment";
import Postcontent from "../../components/PostContent/PostContent";
import PostComments from "../../components/Comment/Comment/Comment";
import PostCommentForm from "../../components/Comment/CommentForm/CommentForm";

import {
  getCommentApi,
  createCommentApi,
  updateCommentApi,
  deleteCommentApi,
  existsByCommentApi,
} from "../../libs/service/commentService";
import { getPostApi } from "../../libs/service/postService";
// import authContext from "../../libs/api/AuthContext";
// import Loading from "../../components/Loading/Loading";
import "moment/locale/ko";

function Post() {
  // 게시물 내용.
  const [postcontents, setPostcontents] = useState([]);
  // 게시물 댓글.
  const [postComments, setPostComments] = useState([]);
  // 답글 작성 및 편집.
  const [activeComment, setActiveComment] = useState(null);

  const [loading, setLoading] = useState(true);

  // 현재시간.
  // const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const { currentUser } = useSelector((state) => state.user);

  const { id } = useParams();

  // 댓글 조회.
  const postComment = postComments.filter(
    (getPostComments) => getPostComments.parentId === null
  );

  // 대댓글 조회.
  const getNestedComments = (commentId) => {
    return postComments.filter(
      (getNestedComment) => getNestedComment.parentId === commentId
    );
  };

  // 댓글 or 대댓글 작성.
  const addComment = async (newComment, parentId) => {
    // await authContext

    // .post("/comment", {
    await createCommentApi({
      // id: null,
      postId: id,
      writerId: currentUser.userId,
      description: newComment,
      writer: currentUser.name,
      commentGroup: parentId,
      parentId,
      //createDate: nowTime,
    })
      .then((response) => {
        setPostComments([...postComments, ...response.data.data]);
        setActiveComment(null);
      })
      .catch(() => {
        // console.log(error);
      });
  };

  // 댓글 & 답글 수정 기능
  const editComment = async (commentId, newComment) => {
    await updateCommentApi(commentId, {
      description: newComment,
    })
      .then(() => {
        const updateComments = postComments.map((updateComment) => {
          if (updateComment.commentId === commentId) {
            return {
              ...updateComment,
              description: newComment,
            };
          }
          return updateComment;
        });
        setPostComments(updateComments);
        setActiveComment(null);
      })
      .catch(() => {
        // console.log(error);
      });
  };

  // 댓글 & 답글 삭제 기능
  const deleteComment = async (commentId) => {
    const commentsGroup = postComments.filter(
      (getCommentsGroup) =>
        getCommentsGroup.parentId === commentId ||
        getCommentsGroup.id === commentId
    );

    if (commentsGroup.length >= 1) {
      //   await authContext
      // await customAxios.put(`/comment/existComment`, {
      //   commentId,
      // });
      await existsByCommentApi(commentId)
        .then(() => {
          const updateComments = postComments.map((updateComment) => {
            if (updateComment.commentId === commentId) {
              return {
                ...updateComment,
                isDeleted: true,
              };
            }
            return updateComment;
          });
          setPostComments(updateComments);
          setActiveComment(null);
        })
        .catch(() => {
          // console.log(error);
        });
    } else {
      await deleteCommentApi(commentId)
        .then(() => {
          const newComments = postComments.filter(
            (newComment) => newComment.commentId !== commentId
          );
          setPostComments(newComments);
        })
        .catch(() => {
          // console.log(error);
        });
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getPostApi(id);
        setPostcontents(response.data.data);
      } catch (error) {
        // console.log(error);
      }
      setLoading(false);
    };
    // 게시물 댓글.
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await getCommentApi(id);
        setPostComments(response.data.data);
      } catch (error) {
        // console.log(error);
      }
      setLoading(false);
    };
    fetchPost();
    fetchComments();
  }, []);

  return (
    <div className="post">
      {loading ? (
        // <div className="post-loading">{loading && <Loading />}</div>
        <div className="post-loading">{loading}</div>
      ) : (
        <div className="container">
          {postcontents.map((postcontent) => (
            <Postcontent
              postcontent={postcontent}
              // Dompurify 데이터 받기.
              description={postcontent.description}
              key={postcontent.postId}
            />
          ))}
          <hr className="post-line" />
          {postComment.map((mainPostComment) => (
            <PostComments
              key={mainPostComment.commentId}
              commentId={mainPostComment.commentId}
              isDeleted={mainPostComment.isDeleted}
              mainPostComment={mainPostComment}
              subPostComment={getNestedComments(mainPostComment.commentId)}
              addComment={addComment}
              editComment={editComment}
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
            />
          ))}
          {!currentUser ? (
            <h4 className="post-auth">
              <Link to="/login">로그인</Link>을 하셔야 댓글을 작성할 수 있습니다
            </h4>
          ) : (
            <div className="post-commentForm">
              <PostCommentForm
                submitLabel="댓글달기"
                textLabel="댓글 달기"
                handleSubmit={(newComment) => {
                  addComment(newComment, null);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
