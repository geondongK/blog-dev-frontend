import "../../pages/EditPost/EditPost.scss";
import React, { useMemo, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import ReactQuill, { Quill } from "react-quill";
import { useParams, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";

import { updatePostApi, uploadFileApi } from "../../libs/service/postService";
import loading from "../../assets/images/loading.gif";
import { fnPostCheckByte } from "../../utils/CheckByte";

Quill.register("modules/ImageResize", ImageResize);
function EditPost({ postcontent }) {
  const [postInfo, setPostInfo] = useState({
    title: postcontent.title,
    description: postcontent.description,
  });
  const [isError, setError] = useState(null);

  const quillRef = useRef();

  const navigate = useNavigate();
  const { id } = useParams();

  const imageHandler = async () => {
    // 이미지를 저장할 input type=file DOM을 생성.
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files[0];

      // 압축 옵션
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const editor = quillRef.current.getEditor();

      const range = editor.getSelection(true);

      editor.insertEmbed(range.index, "image", loading);

      try {
        const compressedFile = await imageCompression(file, options);

        const formData = new FormData();
        formData.append("file", compressedFile);

        // const response = await authContext.post("/upload", formData);
        const response = await uploadFileApi(formData);

        if (compressedFile.size > 5 * 1024 * 1024) {
          window.alert("5MB 이하 사진만 올려주세요");
          editor().deleteText(range.index);
          return;
        } else if (
          !compressedFile.type === "image/jpeg" ||
          !compressedFile.type === "image/png" ||
          !compressedFile.type === "image/gif"
        ) {
          window.alert("이미지 파일만 올려주세요.");
          editor().deleteText(range.index);
          return;
        }

        // 압축 결과
        const IMG_URL = response.data;

        editor.deleteText(range.index, 1);

        editor.insertEmbed(range.index, "image", IMG_URL);
      } catch (error) {
        editor.deleteText(range.index, 1);
      }
    });
  };

  const handleChangeValue = (e) => {
    setPostInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeDescription = (value) => {
    fnPostCheckByte(value);
    setPostInfo({ ...postInfo, description: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (postInfo.title.length < 1) {
      setError("제목을 작성해 주세요.");
      return;
    }
    if (postInfo.title.length > 50) {
      setError("제목은 50자 이내로 작성해 주세요");
      return;
    }
    if (postInfo.description.length < 1) {
      setError("본문을 작성해 주세요.");
      return;
    }
    // authContext
    updatePostApi(id, {
      title: postInfo.title,
      description: postInfo.description,
    })
      .then(() => {
        navigate("/");
      })
      .catch(() => {});
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          [{ align: [] }, { color: [] }, { background: [] }],
          // ['clean'],
        ],
        handlers: { image: imageHandler },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    }),

    []
  );

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  return (
    <div className="editpost">
      <div className="container">
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
          <h3>글작성</h3>
          <div className="title">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="제목"
              value={postInfo.title}
              onChange={handleChangeValue}
            />
          </div>
          <div className="quill">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              modules={modules}
              placeholder="게시물을 작성해 주세요."
              value={postInfo.description}
              onChange={handleChangeDescription}
              formats={formats}
              id="description"
              name="description"
            />
          </div>
          <div className="editpost-submit">
            <sup>
              (<span id="now-byte">{postcontent.description.length}</span>
              /5000자)
            </sup>
            <button id="save-button" type="submit">
              저장
            </button>
            <button id="no-save-button" type="button" hidden>
              저장
            </button>
          </div>
          {isError !== null && (
            <div className="errors-message"> {isError} </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default EditPost;
