import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostApi } from "../../../libs/service/postService";
import EditPosts from "../../../components/EditPost/EditPost";

function EditPost() {
  // 게시물 내용.
  const [postcontents, setPostcontents] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      //const response = await customAxios.get(`/post/${id}`);
      const response = await getPostApi(id);
      setPostcontents(response.data.data);
    };
    fetchPost();
  }, []);

  return (
    <div>
      {postcontents.map((postcontent) => (
        <EditPosts
          postcontent={postcontent}
          // Dompurify 데이터 받기.
          description={postcontent.description}
          key={postcontent.postId}
        />
      ))}
    </div>
  );
}

export default EditPost;
