// eslint-disable
import React, { useState } from "react";
import "./CommentForm.scss";
import { fnCommentCheckByte } from "../../../utils/CheckByte";

function CommentForm({
  handleSubmit,
  submitLabel,
  textLabel,
  initialText = "",
}) {
  // 댓글 작성.
  const [newComment, setNewComment] = useState(initialText);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newComment);
    setNewComment("");

    document.querySelector("#now-byte").innerText = 0;
    document.querySelector("#comment-button__save").style.display = "none";
    document.querySelector("#no-comment-button__save").style.display = "inline";
  };

  const writeComment = (comment) => {
    fnCommentCheckByte(comment);
    setNewComment(comment);
  };

  return (
    <div className="comment-form">
      <form onSubmit={onSubmit}>
        <textarea
          placeholder={textLabel}
          rows={2}
          type="text"
          value={newComment}
          onChange={(e) => {
            writeComment(e.target.value);
            //setNewComment(e.target.value);
          }}
        />
        <div className="comment-button">
          <sub className="comment-sub">
            (<span id="now-byte">0</span>/1000자)
          </sub>
          <div>
            <button
              style={{ display: "none" }}
              className="save-button"
              id="comment-button__save"
              type="submit"
            >
              {submitLabel}
            </button>
            <button
              className="save-button"
              id="no-comment-button__save"
              type="button"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
