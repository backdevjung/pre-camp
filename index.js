let 수강생모음 = [];
let timer; // 타이머 아이디를 저장할 변수

function JS_수강생확인() {
  //수강생이 아무도 없는 경우
  if (수강생모음.length === 0) {
    document.getElementById("수강생이 없는 경우").style = "display: block;";
  }
  // 수강생이 1명 이상 있는 경우
  else if (수강생모음.length !== 0) {
    document.getElementById("수강생이 없는 경우").style = "display: none;";
  }
}

function JS_수강생DOM만들기() {
  // 여러명의 수강생을 보여주는 방법
  // const 수강생목록 = 수강생모음
  //   .map(
  //     (수강생, index) =>
  //       `<div class="CSS_수강생항목" onclick="JS_수강생상세정보보여주기(${index})"><img src="./assets/프로필이미지.png" /><div class="CSS_사이드바_왼쪽부분_항목_간격"></div><div class="CSS_수강생항목텍스트"
  //     >${수강생.이름}</div></div>`
  //   )
  //   .join("");

  // 추가된 수강생중, 마지막인 수강생 한명 만 보여주기

  let 수강생 = 수강생모음[수강생모음.length - 1];
  console.log("수강생::::", 수강생);
  const 수강생목록 = `<div class="CSS_수강생항목" onclick="JS_수강생상세정보보여주기(${0})"><img src="./assets/프로필이미지.png" /><div class="CSS_사이드바_왼쪽부분_항목_간격"></div><div class="CSS_수강생항목텍스트">${
    수강생.이름
  }</div></div>`;

  window.document.getElementById("수강생보여주는곳").innerHTML = 수강생목록;
}

function JS_수강생상세정보보여주기(수강생번호) {
  const 수강생정보 = 수강생모음[수강생번호];
  alert(
    `     이름 : ${수강생정보.이름} 
     이메일 : ${수강생정보.이메일}
     비밀번호 : ${수강생정보.비밀번호}
     성별 : ${수강생정보.성별} 
     전화번호 : ${수강생정보.전화번호}
     동의여부 : Y 
     자기소개 : ${수강생정보.자기소개}
     (가입일시 : ${수강생정보.가입일시})
     `
  );
}

function JS_회원가입() {
  // 오늘날짜 계산하기
  const 나의날짜 = new Date();
  const 오늘연월일 =
    나의날짜.getFullYear() +
    "-" +
    (나의날짜.getMonth() + 1) +
    "-" +
    나의날짜.getDate();

  // 회원가입 완료 alert 창 날짜와 함께 보여주기
  alert(`회원가입을 축하합니다. \n(가입일시: ${오늘연월일})`);

  // 새로운 수강생 추가하기
  const 내가입력한이름 = document.getElementById("이름입력창").value;
  const 내가입력한이메일 = document.getElementById("이메일입력창").value;
  const 내가입력한비밀번호 = document.getElementById("비밀번호입력창").value;
  const 내가입력한전화번호 = document.getElementById("전화번호입력창").value;
  const 내가입력한자기소개 = document.getElementById("자기소개입력창").value;

  let 내가입력한성별 = "";
  const 남자성별일까 = document.getElementById("male");
  const 여자성별일까 = document.getElementById("female");

  if (남자성별일까.checked) 내가입력한성별 = "남성";
  else if (여자성별일까.checked) 내가입력한성별 = "여성";

  // 문자열쪼개기: 전화번호 가운데 - 쪼개서 ****로 바꾸기
  const 전화번호머리 = 내가입력한전화번호.split("-")[0];
  const 전화번호중간 = 내가입력한전화번호.split("-")[1];
  const 전화번호꼬리 = 내가입력한전화번호.split("-")[2];

  const 새로운전화번호중간 = "****";
  const 새로운전화번호 =
    전화번호머리 + "-" + 새로운전화번호중간 + "-" + 전화번호꼬리;
  const 새로운수강생 = {
    이름: 내가입력한이름,
    이메일: 내가입력한이메일,
    비밀번호: "****",
    전화번호: 새로운전화번호,
    자기소개: 내가입력한자기소개,
    성별: 내가입력한성별,
    가입일시: 오늘연월일,
  };

  수강생모음.push(새로운수강생);
  // 변경된 수강생목록 보여주기
  JS_수강생DOM만들기();

  // 수강생이 아무도 없는경우 or 있는경우 화면 보여주기
  JS_수강생확인();
}

function 인증번호요청기능() {
  if (timer) {
    clearInterval(timer);
  }

  const 인증번호 = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  document.getElementById("인증번호보여주는곳").innerText = 인증번호;

  let 남은시간 = 180;
  timer = setInterval(function () {
    const 분 = String(Math.floor(남은시간 / 60)).padStart(2, "0");
    const 초 = String(남은시간 % 60).padStart(2, "0");
    document.getElementById("남은시간보여주는곳").innerText = 분 + ":" + 초;

    남은시간 = 남은시간 - 1;

    if (남은시간 < 0) {
      clearInterval(timer);
    }
  }, 1000);

  JS_인증완료기능();
}

function JS_인증완료기능() {
  const 결과버튼 = document.getElementById("회원가입_인증번호_결과버튼");
  결과버튼.src = "./assets/인증완료.png";
}
