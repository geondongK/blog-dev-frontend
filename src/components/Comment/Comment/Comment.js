//  eslint-disable
import "./Comment.scss";
import React, { useState } from "react";
// import moment from 'moment';
import "moment/locale/ko";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
// import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';

import NestedComments from "../NestedComments/NestedComments";
import NestedComment from "../NestedComment/NestedComment";

function Comment({
  mainPostComment,
  isDeleted,
  subPostComment,
  addComment,
  editComment,
  activeComment,
  setActiveComment,
  deleteComment,
  commentId,
}) {
  // 대댓글 오픈.
  const [showNestedComments, setShowNestedComments] = useState(false);

  return (
    <div className="postcomment">
      {/* 대댓글 */}
      <NestedComments
        commentId={commentId}
        isDeleted={isDeleted}
        writerId={mainPostComment.writerId}
        writer={mainPostComment.writer}
        description={mainPostComment.description}
        createDate={mainPostComment.createDate}
        activeComment={activeComment}
        setActiveComment={setActiveComment}
        addComment={addComment}
        editComment={editComment}
        deleteComment={deleteComment}
      />
      <div className="postcomment-button">
        <button
          onClick={() => {
            setShowNestedComments(!showNestedComments);
          }}
          type="button"
        >
          <FontAwesomeIcon icon={faCommentDots} />
          {` 댓글 ${subPostComment.length}`}
        </button>
      </div>
      {/* 대댓글 */}
      {showNestedComments && (
        <div>
          {/* 답글 */}
          {subPostComment.map((nestedComments) => (
            <NestedComment
              key={nestedComments.commentId}
              commentId={nestedComments.commentId}
              writerId={nestedComments.writerId}
              writer={nestedComments.writer}
              description={nestedComments.description}
              createDate={nestedComments.createDate}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              editComment={editComment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      )}
      <div style={{ clear: "both" }} />
    </div>
  );
}

export default Comment;
