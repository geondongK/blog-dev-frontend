// 바이트 수 체크
// 게시물 글자 수 체크 함수
export const fnPostCheckByte = (obj) => {
  const maxByte = 5000; //최대 100바이트
  // const text_val = obj.replace(/(<([^>]+)>)/gi, "").replace(/\s+/g, ""); //입력한 문자
  const text_val = obj.replace(/(<([^>]+)>)/gi, ""); //입력한 문자

  const text_len = text_val.length; //입력한 문자수
  //   const text_len = text_val.replace(
  //     /[\0-\x7f]|([0-\u07ff]|(.))/g,
  //     "$&$1$2"
  //   ).length; //입력한 문자수

  let totalByte = 0;

  for (let i = 0; i < text_len; i++) {
    totalByte++;
  }

  const nowByte = document.querySelector("#now-byte");
  const saveButton = document.querySelector("#save-button");
  const noSaveButton = document.querySelector("#no-save-button");

  saveButton.addEventListener("mouseover", function (e) {
    saveButton.style.background = "#303f9f";
    e.preventDefault();
  });
  saveButton.addEventListener("mouseout", function (e) {
    saveButton.style.background = "#3d5afe";
    e.preventDefault();
  });

  if (totalByte > maxByte) {
    alert("작성 가능한 길이를 초과하였습니다.");
    nowByte.innerText = totalByte;
    nowByte.style.color = "red";

    noSaveButton.style.display = "block";
    noSaveButton.style.background = "#9e9e9e";
    noSaveButton.style.cursor = "default";

    saveButton.style.display = "none";
  } else {
    nowByte.innerText = totalByte;
    nowByte.style.color = "green";

    noSaveButton.style.display = "none";

    saveButton.style.display = "block";
    saveButton.type = "submit";
    saveButton.style.cursor = "pointer";
    saveButton.style.background = "#3d5afe";
  }
};

// 댓글 글자 수 체크 함수
export const fnCommentCheckByte = (obj, commetUpdate) => {
  const maxByte = 1000; //최대 100바이트

  const text_val = obj; //입력한 문자

  const text_len = text_val.length; //입력한 문자수

  let totalByte = 0;

  for (let i = 0; i < text_len; i++) {
    totalByte++;
  }

  // 댓글
  const nowByte = document.querySelector("#now-byte");
  const commentBtnStyle = document.querySelector("#comment-button__save");
  const noCommentBtnStyle = document.querySelector("#no-comment-button__save");

  commentBtnStyle.addEventListener("mouseover", function (e) {
    commentBtnStyle.style.background = "#303f9f";
    e.preventDefault();
  });
  commentBtnStyle.addEventListener("mouseout", function (e) {
    commentBtnStyle.style.background = "#3d5afe";
    e.preventDefault();
  });

  if (
    totalByte <= 0 ||
    text_val.replace(/^\s+|\s+$/g, "") === "" ||
    totalByte > maxByte
  ) {
    if (totalByte > maxByte) {
      alert("댓글은 1000자 이내로 작성해 주세요.");
      nowByte.style.color = "red";
    }

    nowByte.innerText = totalByte;

    noCommentBtnStyle.style.display = "block";
    noCommentBtnStyle.style.background = "#9e9e9e";
    noCommentBtnStyle.style.cursor = "default";

    commentBtnStyle.style.display = "none";
  } else {
    nowByte.innerText = totalByte;
    nowByte.style.color = "green";

    noCommentBtnStyle.style.display = "none";

    commentBtnStyle.style.display = "block";
    commentBtnStyle.type = "submit";
    commentBtnStyle.style.cursor = "pointer";
    commentBtnStyle.style.background = "#3d5afe";
  }
};

// 편집 & 대댓글 글자 수 체크 함수
export const fnEditCommentCheckByte = (obj) => {
  const maxByte = 1000; //최대 100바이트

  const text_val = obj; //입력한 문자

  const text_len = text_val.length; //입력한 문자수

  let totalByte = 0;

  for (let i = 0; i < text_len; i++) {
    totalByte++;
  }

  // 편집 & 대댓글
  const editNowByte = document.querySelector("#edit-now-byte");
  const editCommentBtnStyle = document.querySelector(
    "#edit-comment-button__save"
  );
  const noEditCommentBtnStyle = document.querySelector(
    "#no-edit-comment-button__save"
  );

  editCommentBtnStyle.addEventListener("mouseover", function (e) {
    editCommentBtnStyle.style.background = "#303f9f";
    e.preventDefault();
  });
  editCommentBtnStyle.addEventListener("mouseout", function (e) {
    editCommentBtnStyle.style.background = "#3d5afe";
    e.preventDefault();
  });

  if (
    totalByte <= 0 ||
    text_val.replace(/^\s+|\s+$/g, "") === "" ||
    totalByte > maxByte
  ) {
    if (totalByte > maxByte) {
      alert("댓글은 1000자 이내로 작성해 주세요.");
      editNowByte.style.color = "red";
    }

    editNowByte.innerText = totalByte;

    noEditCommentBtnStyle.style.display = "inline";
    noEditCommentBtnStyle.style.background = "#9e9e9e";
    noEditCommentBtnStyle.style.cursor = "default";

    editCommentBtnStyle.style.display = "none";
  } else {
    editNowByte.innerText = totalByte;
    editNowByte.style.color = "green";

    noEditCommentBtnStyle.style.display = "none";

    editCommentBtnStyle.style.display = "inline";
    editCommentBtnStyle.type = "submit";
    editCommentBtnStyle.style.cursor = "pointer";
    editCommentBtnStyle.style.background = "#3d5afe";
  }
};
