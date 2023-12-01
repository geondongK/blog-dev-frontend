// 바이트 수 체크
export default function fnCheckByte(obj) {
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

  if (totalByte > maxByte) {
    alert("작성 가능한 길이를 초과하였습니다.");
    document.getElementById("nowByte").innerText = totalByte;
    document.getElementById("nowByte").style.color = "red";
  } else {
    document.getElementById("nowByte").innerText = totalByte;
    document.getElementById("nowByte").style.color = "green";
  }
}
