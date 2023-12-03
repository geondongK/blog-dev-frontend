// eslint-disable
import React, { useState } from "react";
import "./CommentForm.scss";
import { fnEditCommentCheckByte } from "../../../utils/CheckByte";

function EditCommentForm({
  handleSubmit,
  submitLabel,
  textLabel,
  handleCancel,
  handleCancelButton = false,
  initialText = "",
}) {
  // 댓글 작성.
  const [newComment, setNewComment] = useState(initialText);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newComment);
    setNewComment("");
  };

  const writeComment = (comment) => {
    fnEditCommentCheckByte(comment);
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
            (<span id="edit-now-byte">{initialText.length}</span>/1000자)
          </sub>
          <div>
            <button
              style={{ display: "none" }}
              className="save-button"
              id="edit-comment-button__save"
              type="submit"
            >
              {submitLabel}
            </button>
            <button
              className="save-button"
              id="no-edit-comment-button__save"
              type="button"
            >
              {submitLabel}
            </button>
            {handleCancelButton && (
              <button
                className="cancel-button"
                // hidden={buttonHidden}
                onClick={handleCancel}
                type="button"
              >
                취소
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCommentForm;
