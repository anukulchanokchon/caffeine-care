/* =========================
CAFFEINE CARE V3
========================= */

console.log("SCRIPT LOADED");

const screens = {

  welcome:
    document.getElementById("welcome"),

  auth:
    document.getElementById("authScreen"),

  register:
    document.getElementById("register"),

  dashboard:
    document.getElementById("dashboard"),

  assessment:
    document.getElementById("assessment"),

  result:
    document.getElementById("result"),

  ai:
    document.getElementById("aiScreen"),

  history:
    document.getElementById("historyScreen"),

  knowledge:
    document.getElementById("knowledgeScreen")

};

function showScreen(screenName){

  Object.values(screens)
  .forEach(screen => {

    screen.style.display = "none";

  });

  screens[screenName]
  .style.display = "block";

}


/* =========================
APP DATA
========================= */

const today =
  new Date()
  .toLocaleDateString("th-TH");

const savedDate =
  localStorage.getItem(
    "caffeineDate"
  );

if(savedDate !== today){

  localStorage.setItem(
    "caffeineDate",
    today
  );

  localStorage.setItem(
    "totalCaffeine",
    0
  );

}

let selectedDrink = null;

let currentCaffeine = 0;

function getDeviceId() {
  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
}

let totalCaffeine =
  Number(
    localStorage.getItem(
      "totalCaffeine"
    )
  ) || 0;

let historyData =
  JSON.parse(
    localStorage.getItem(
      "caffeineHistory"
    )
  ) || [];


/* =========================
WELCOME
========================= */

document
.getElementById("goRegister")
.addEventListener("click", () => {

  showScreen("auth");

});

/* =========================
GENDER
========================= */

document
.querySelectorAll(".gender-btn")
.forEach(btn => {

  btn.addEventListener("click", () => {

    document
    .querySelectorAll(".gender-btn")
    .forEach(item => {

      item.classList.remove(
        "active"
      );

    });

    btn.classList.add(
      "active"
    );

  });

});


/* =========================
FREQUENCY
========================= */

document
.querySelectorAll(".freq-btn")
.forEach(btn => {

  btn.addEventListener("click", () => {

    document
    .querySelectorAll(".freq-btn")
    .forEach(item => {

      item.classList.remove(
        "active"
      );

    });

    btn.classList.add(
      "active"
    );

  });

});


/* =========================
REGISTER
========================= */

document
.getElementById("createProfile")
.addEventListener("click", () => {

  const name =
    document
    .getElementById(
      "userName"
    ).value;

  const age =
    document
    .getElementById(
      "userAge"
    ).value;

  const weight =
    document
    .getElementById(
      "userWeight"
    ).value;

  const gender =
    document
    .querySelector(
      ".gender-btn.active"
    );

  const frequency =
    document
    .querySelector(
      ".freq-btn.active"
    );

  const medical =
    document
    .getElementById(
      "medical"
    ).value;

  const error =
    document
    .getElementById(
      "errorMsg"
    );

  if(
    name === "" ||
    age === "" ||
    weight === "" ||
    !gender ||
    !frequency
  ){

    error.innerText =
    "กรุณากรอกข้อมูลให้ครบทุกช่อง";

    return;

  }

  error.innerText = "";

  const profile = {

    name,
    age,
    weight,

    gender:
      gender.innerText,

    frequency:
      frequency.innerText,

    medical

  };

  localStorage.setItem(
    "userProfile",
    JSON.stringify(profile)
  );

  document
  .getElementById(
    "welcomeName"
  ).innerText =
  `สวัสดี ${name} 👋`;

  showScreen(
    "dashboard"
  );

});

/* =========================
DASHBOARD MENU
========================= */

document
.getElementById("goAssessment")
.addEventListener("click", () => {

  showScreen("assessment");

});


document
.getElementById("goAI")
.addEventListener("click", () => {

  updateAIAdvice();

  showScreen("ai");

});


document
.getElementById("goHistory")
.addEventListener("click", () => {

  renderHistory();

  showScreen("history");

});


document
.getElementById("goKnowledge")
.addEventListener("click", () => {

  showScreen("knowledge");

});


/* =========================
DRINK SELECT
========================= */

document
.querySelectorAll(".drink-btn")
.forEach(btn => {

  btn.addEventListener("click", () => {

    document
    .querySelectorAll(".drink-btn")
    .forEach(item => {

      item.classList.remove(
        "active"
      );

    });

    btn.classList.add(
      "active"
    );

    selectedDrink = btn;

  });

});


/* =========================
CALCULATE
========================= */

document
.getElementById("calculateBtn")
.addEventListener("click", () => {

  if(!selectedDrink){

    alert(
      "กรุณาเลือกเครื่องดื่ม"
    );

    return;

  }

  const cups =
    Number(
      document
      .getElementById(
        "cupCount"
      ).value
    );

  if(
    !cups ||
    cups < 1
  ){

    alert(
      "กรุณากรอกจำนวนแก้ว"
    );

    return;

  }

  const caffeine =
    Number(
      selectedDrink.dataset.caffeine
    );

  currentCaffeine =
    caffeine * cups;

  document
  .getElementById(
    "drinkName"
  ).innerText =
  selectedDrink.dataset.name;

  document
  .getElementById(
    "caffeineResult"
  ).innerText =
  currentCaffeine + " mg";

  if(currentCaffeine <= 200){

    document
    .getElementById(
      "resultRisk"
    ).innerText =
    "🟢 ความเสี่ยงต่ำ";

    document
    .getElementById(
      "resultAdvice"
    ).innerText =
    "ยังอยู่ในช่วงที่ปลอดภัย";

  }

  else if(
    currentCaffeine <= 400
  ){

    document
    .getElementById(
      "resultRisk"
    ).innerText =
    "🟡 ความเสี่ยงปานกลาง";

    document
    .getElementById(
      "resultAdvice"
    ).innerText =
    "ควรหลีกเลี่ยงคาเฟอีนเพิ่ม";

  }

  else{

    document
    .getElementById(
      "resultRisk"
    ).innerText =
    "🔴 ความเสี่ยงสูง";

    document
    .getElementById(
      "resultAdvice"
    ).innerText =
    "คาเฟอีนเกินปริมาณที่แนะนำ";

  }

  showScreen(
    "result"
  );

});


/* =========================
SAVE RESULT
========================= */

document
.getElementById("saveBtn")
.addEventListener("click", () => {

totalCaffeine += currentCaffeine;

localStorage.setItem(
  "totalCaffeine",
  totalCaffeine
);

  const percent =
    Math.min(
      (
        totalCaffeine / 400
      ) * 100,
      100
    );

  document
  .getElementById(
    "dailyTotal"
  ).innerText =
  totalCaffeine +
  " / 400 mg";

  document
  .getElementById(
    "progressBar"
  ).style.width =
  percent + "%";

  document
  .getElementById(
    "progressText"
  ).innerText =
  Math.round(percent) +
  "%";

  updateRisk();

saveHistory();

const profile =
  JSON.parse(
    localStorage.getItem("userProfile")
  ) || {};

fetch(
  "https://script.google.com/macros/s/AKfycbz4ajOghqDLCsKZ799p7y6PGZ03y3uOk48IgIKuTSoyhOQrghQGXnvbbVwjbFVD7M5c/exec",
  {
    method: "POST",
    mode: "no-cors",
body: JSON.stringify({
  deviceId: getDeviceId(),
  customerId: getDeviceId(),
  name: profile.name || "Unknown",
  caffeine: currentCaffeine,
  source: "Website",
  time: new Date().toLocaleTimeString("th-TH"),
  status:
    totalCaffeine > 400
      ? "High Risk"
      : "Normal"
})
  }
)
.then(() => {

  console.log("saved");

})

.catch(err => {

  alert(err.message);

});

showScreen("dashboard");

});

/* =========================
UPDATE RISK
========================= */

function updateRisk(){
  
  const riskLevel =
    document.getElementById(
      "riskLevel"
    );

  const riskDescription =
    document.getElementById(
      "riskDescription"
    );

  if(totalCaffeine <= 200){

    riskLevel.innerText =
    "🟢 ต่ำ";

    riskDescription.innerText =
    "ยังอยู่ในช่วงที่ปลอดภัย";

  }

  else if(
    totalCaffeine <= 400
  ){

    riskLevel.innerText =
    "🟡 ปานกลาง";

    riskDescription.innerText =
    "ควรระวังการบริโภคเพิ่ม";

  }

  else{

    riskLevel.innerText =
    "🔴 สูง";

    riskDescription.innerText =
    "คาเฟอีนเกินปริมาณที่แนะนำ";

  }

}


/* =========================
HISTORY
========================= */

function saveHistory(){

  const item = {

    drink:
      document
      .getElementById(
        "drinkName"
      ).innerText,

    caffeine:
      currentCaffeine,

    date:
      new Date()
      .toLocaleString(
        "th-TH"
      )

  };

  historyData.push(item);

  localStorage.setItem(
    "caffeineHistory",
    JSON.stringify(
      historyData
    )
  );

}


function renderHistory(){

  const container =
    document
    .getElementById(
      "historyList"
    );

  const saved =
    JSON.parse(
      localStorage.getItem(
        "caffeineHistory"
      )
    ) || [];

  container.innerHTML = "";

  if(saved.length === 0){

    container.innerHTML =
    `
    <div class="card">
      ยังไม่มีประวัติ
    </div>
    `;

    return;

  }

  saved
  .slice()
  .reverse()
  .forEach(item => {

    container.innerHTML +=
    `
    <div class="history-item">

      <strong>
        ${item.drink}
      </strong>

      <br>

      ${item.caffeine} mg

      <br>

      <small>
        ${item.date}
      </small>

    </div>
    `;

  });

}


/* =========================
AI ASSISTANT
========================= */

function updateAIAdvice(){

  const aiAdvice =
    document
    .getElementById(
      "aiAdvice"
    );

  if(totalCaffeine <= 100){

    aiAdvice.innerHTML =

    `
    วันนี้คุณได้รับ
    ${totalCaffeine} mg

    <br><br>

    ✅ อยู่ในระดับต่ำ

    <br>

    สามารถดื่มเพิ่มได้
    อย่างเหมาะสม
    `;

  }

  else if(
    totalCaffeine <= 250
  ){

    aiAdvice.innerHTML =

    `
    วันนี้คุณได้รับ
    ${totalCaffeine} mg

    <br><br>

    🟢 อยู่ในเกณฑ์ปกติ

    <br>

    ควรดื่มน้ำเพิ่ม
    ระหว่างวัน
    `;

  }

  else if(
    totalCaffeine <= 400
  ){

    aiAdvice.innerHTML =

    `
    วันนี้คุณได้รับ
    ${totalCaffeine} mg

    <br><br>

    🟡 เริ่มเข้าใกล้
    ขีดจำกัด

    <br>

    ควรหลีกเลี่ยง
    คาเฟอีนเพิ่ม
    ในช่วง 4-6 ชั่วโมง
    ข้างหน้า
    `;

  }

  else{

    aiAdvice.innerHTML =

    `
    วันนี้คุณได้รับ
    ${totalCaffeine} mg

    <br><br>

    🔴 เกินปริมาณ
    ที่แนะนำ

    <br>

    ควรงดเครื่องดื่ม
    ที่มีคาเฟอีน
    เพิ่มเติม
    `;

  }

}


/* =========================
AI CHAT
========================= */

document
.getElementById("askAI")
.addEventListener("click", () => {

  const question =
    document
    .getElementById(
      "aiQuestion"
    ).value
    .toLowerCase();

  const answer =
    document
    .getElementById(
      "aiAnswer"
    );

  if(question === ""){

    answer.innerHTML =
    "กรุณาพิมพ์คำถาม";

    return;

  }

  if(
    question.includes(
      "นอน"
    )
  ){

    answer.innerHTML =
    "ควรหลีกเลี่ยงคาเฟอีนก่อนนอนอย่างน้อย 6 ชั่วโมง";

  }

  else if(
    question.includes(
      "กาแฟ"
    )
  ){

    answer.innerHTML =
    "กาแฟ 1 แก้วโดยเฉลี่ยมีคาเฟอีนประมาณ 95 mg";

  }

  else if(
    question.includes(
      "มัทฉะ"
    )
  ){

    answer.innerHTML =
    "มัทฉะ 1 แก้วมีคาเฟอีนประมาณ 70 mg";

  }

  else{

    answer.innerHTML =
    "AI ยังไม่มีข้อมูลสำหรับคำถามนี้";

  }

});


/* =========================
BACK BUTTONS
========================= */

document
.getElementById(
  "backDashboard"
)
.addEventListener(
  "click",
  () => {

    showScreen(
      "dashboard"
    );

});

document
.getElementById(
  "backDashboardAI"
)
.addEventListener(
  "click",
  () => {

    showScreen(
      "dashboard"
    );

});

document
.getElementById(
  "backDashboardHistory"
)
.addEventListener(
  "click",
  () => {

    showScreen(
      "dashboard"
    );

});

document
.getElementById(
  "backDashboardKnowledge"
)
.addEventListener(
  "click",
  () => {

    showScreen(
      "dashboard"
    );

});

document
.getElementById("signUpBtn")
.addEventListener("click", async () => {

  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value.trim();
  const error = document.getElementById("authError");

  if (email === "" || password === "") {
    error.innerText = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }

  if (password.length < 6) {
    error.innerText = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    return;
  }

  try {
    const result =
      await window.createUserWithEmailAndPassword(
        window.auth,
        email,
        password
      );

    localStorage.setItem("userId", result.user.uid);
    localStorage.setItem("userEmail", result.user.email);

    error.innerText = "";
    showScreen("register");

  } 
  
catch (err) {
  console.error(err);

  if (err.code === "auth/email-already-in-use") {
    error.innerText = "อีเมลนี้ถูกลงทะเบียนแล้ว";
  } else if (err.code === "auth/invalid-email") {
    error.innerText = "รูปแบบอีเมลไม่ถูกต้อง";
  } else if (err.code === "auth/weak-password") {
    error.innerText = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  } else {
    error.innerText = "สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่";
  }
}
});

document
.getElementById("resetPasswordBtn")
.addEventListener("click", async () => {

  const email = document.getElementById("authEmail").value.trim();
  const error = document.getElementById("authError");

  if (email === "") {
    error.innerText = "กรุณากรอกอีเมลก่อนรีเซ็ตรหัสผ่าน";
    return;
  }

  try {

    await window.sendPasswordResetEmail(
      window.auth,
      email
    );

    error.innerText =
    "ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว กรุณาตรวจสอบกล่องจดหมายหรือโฟลเดอร์สแปม";

  } catch (err) {

    console.error(err);

    if (err.code === "auth/invalid-email") {
      error.innerText = "รูปแบบอีเมลไม่ถูกต้อง";
    } else {
      error.innerText = "ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้";
    }

  }

});

let loginFailCount = 0;

document
.getElementById("loginBtn")
.addEventListener("click", async () => {

  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value.trim();
  const error = document.getElementById("authError");

  if (email === "" || password === "") {
    error.innerText = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }

  try {
    const result =
      await window.signInWithEmailAndPassword(
        window.auth,
        email,
        password
      );

    loginFailCount = 0;

    localStorage.setItem("userId", result.user.uid);
    localStorage.setItem("userEmail", result.user.email);

    error.innerText = "";

    const profile = localStorage.getItem("userProfile");

    if (profile) {
      const user = JSON.parse(profile);

      document.getElementById("welcomeName").innerText =
        `สวัสดี ${user.name} 👋`;

      showScreen("dashboard");
    } else {
      showScreen("register");
    }

  } catch (err) {
    console.error(err);

    if (err.code === "auth/invalid-credential") {
      loginFailCount++;

      if (loginFailCount >= 3) {
        error.innerText =
          "กรอกรหัสผ่านผิดมากเกินไป โปรดกดลืมรหัสผ่าน";
      } else {
        error.innerText =
          "รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้ง";
      }

    } else {
      error.innerText =
        "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่";
    }
  }

});

/* =========================
AUTO LOGIN
========================= */

window.onAuthStateChanged(window.auth, user => {

  if (user) {
    localStorage.setItem("userId", user.uid);
    localStorage.setItem("userEmail", user.email);

    const profile = localStorage.getItem("userProfile");

    if (profile) {
      const savedUser = JSON.parse(profile);

      document.getElementById("welcomeName").innerText =
        `สวัสดี ${savedUser.name} 👋`;

      showScreen("dashboard");
    } else {
      showScreen("register");
    }
  }

});

window.onload = () => {

  const profile =
    localStorage.getItem(
      "userProfile"
    );

  if(profile){

    const user =
      JSON.parse(profile);

    document
    .getElementById(
      "welcomeName"
    ).innerText =
    `สวัสดี ${user.name} 👋`;

  }
  
  document
  .getElementById(
    "dailyTotal"
  ).innerText =
  totalCaffeine +
  " / 400 mg";

  const percent =
    Math.min(
      (totalCaffeine / 400) * 100,
      100
    );

  document
  .getElementById(
    "progressBar"
  ).style.width =
  percent + "%";

  document
  .getElementById(
    "progressText"
  ).innerText =
  Math.round(percent) + "%";

  updateRisk();

};

document
.getElementById("logoutBtn")
.addEventListener("click", async () => {

  const confirmLogout =
    confirm("ต้องการออกจากระบบใช่หรือไม่?");

  if (!confirmLogout) return;

  await window.signOut(window.auth);

  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");

  showScreen("welcome");

});
