//  eslint-disable
import React, { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { searchPostApi, deletePostApi } from "../../libs/service/postService";
import PostCard from "../../components/PostCard/PostCard/PostCard";
import Loading from "../../components/Loading/Loading";

function Search() {
  const btnSort = [
    { key: 1, type: "최신순" },
    { key: 2, type: "오래된순" },
    { key: 3, type: "조회수" },
  ];
  // 게시물 출력.
  const [posts, setPosts] = useState([]);
  const [btnActive, setBtnActive] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  const observerTargetEl = useRef(null);
  const page = useRef(0);

  const query = decodeURI(useLocation().search);

  // const query = URLSearchParams(location.search);

  // 게시물 삭제 기능.
  const deletePost = async (postId) => {
    // eslint-disable-next-line no-alert
    await deletePostApi(postId)
      .then(() => {
        const newPosts = posts.filter((post) => post.postId !== postId);
        setPosts(newPosts);
      })
      .catch(() => {
        // console.log(error);
      });
  };

  // 정렬기능.
  const handleChangeValue = (sort) => {
    // 최신
    if (sort === "최신순") {
      const dateDesc = posts
        .filter((post) => post)
        .sort(
          (a, b) =>
            new Date(moment(b.createDate).format("YYYY-MM-DD HH:mm:ss")) -
            new Date(moment(a.createDate).format("YYYY-MM-DD HH:mm:ss"))
        );
      setBtnActive(sort);
      setPosts(dateDesc);
    } else if (sort === "오래된순") {
      // 오래된순
      const dateAsc = posts
        .filter((post) => post)
        .sort(
          (a, b) =>
            new Date(moment(a.createDate).format("YYYY-MM-DD HH:mm:ss")) -
            new Date(moment(b.createDate).format("YYYY-MM-DD HH:mm:ss"))
        );
      setBtnActive(sort);
      setPosts(dateAsc);
    } else {
      // 조회수
      const view = posts.filter((post) => post).sort((a, b) => b.hits - a.hits);

      setBtnActive(sort);
      setPosts(view);
    }
  };

  // 게시물 무한 스크롤 기능.
  const fetch = useCallback(async () => {
    try {
      const { data } = await searchPostApi(query, 10, page.current);
      setPosts((prevPosts) => [...prevPosts, ...data.data]);
      setHasNextPage(data.data.length === 10);

      if (data.data.length) {
        page.current += 10;
      }
    } catch (error) {
      // console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!observerTargetEl.current || !hasNextPage) {
      setLoading(false);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    io.observe(observerTargetEl.current);

    setBtnActive("최신순");
    // return () => {
    //     io.disconnect();
    // };
  }, [fetch, hasNextPage]);

  return (
    <div className="home">
      <div className="sort-button">
        {btnSort.map((item) => {
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                handleChangeValue(item.type);
                setBtnActive(item.type);
              }}
              className={`${btnActive === item.type ? "btn-active" : ""}`}
            >
              {item.type}
            </button>
          );
        })}
      </div>
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} deletePost={deletePost} />
      ))}
      <div className="observer-loading" ref={observerTargetEl}>
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default Search;
