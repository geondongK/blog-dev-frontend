// eslint-disable
import "./PostCard.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
// import PostCard from '../PostCard/PostCard';
import { useSelector } from "react-redux";
import { getCommentApi } from "../../../libs/service/commentService";
import "moment/locale/ko";
import { ReactComponent as Avatar } from "../../../assets/images/avatar.svg";
import Dropdown from "../Dropdown/Dropdown";

function PostCard({ post, deletePost }) {
  const { currentUser } = useSelector((state) => state.user);

  // 게시물 댓글 수
  const [countComment, setCountComment] = useState([]);

  // 현재 사용자가 작성한 게시물만 표시.
  function dropdownComponent() {
    // return <Dropdown postId={post.postId} deletePost={deletePost} />;
    if (currentUser !== null) {
      if (post.writerId === currentUser.userId) {
        return <Dropdown postId={post.postId} deletePost={deletePost} />;
      }
      return null;
    }
    return null;
  }

  // 게시물 댓글 수 가져오기.
  useEffect(() => {
    const fetchCountComment = async () => {
      const response = await getCommentApi(post.postId);
      setCountComment(response.data.data);
    };
    fetchCountComment();
  }, []);

  return (
    <div className="postcard">
      <div className="postcard-container">
        <div className="postcard-header">
          <div className="postcard-info">
            <Avatar width="30px" height="30px" className="postcard-info-img" />
            <div className="postcard-info-details">
              <span className="postcard-name">{post.writer}</span>
              <span className="postcard-date">
                {moment(post.createDate, "YYYY.MM.DD HH:mm:ss").fromNow()}
              </span>
            </div>
          </div>
          {dropdownComponent()}
        </div>
        <div className="postcard-body">
          <h4 className="postcard-body-title">
            <Link
              onClick={() => {
                // handleViewClick(post.postId);
              }}
              to={`/post/${post.postId}`}
            >
              {post.title}
            </Link>
          </h4>
        </div>
        <div className="postcard-footer">
          <span>
            <FontAwesomeIcon icon={faEye} />
          </span>
          <span>{post.hits}</span>
          <span className="footer-icon">
            <FontAwesomeIcon icon={faCommentDots} />
          </span>
          <span>{countComment.length}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
