
function shake(el){
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
}

function showStep(id, text){
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.getElementById("title").innerText = text;
}

/* NAME: letters + space only */
const nameInput = document.getElementById("nameInput");

nameInput.addEventListener("input", function(){
  this.value = this.value
    .replace(/[^A-Za-z ]/g, "")
    .replace(/\s+/g, " ")
    .trimStart();
});

function goMobile(){
  const name = document.getElementById("nameInput");

  if(name.value.trim().length < 2){
    shake(name);
    return;
  }

  showStep("mobileStep","Enter mobile number");
  document.getElementById("mobileInput").focus();
}

/* MOBILE: numbers only */
const mobileInput = document.getElementById("mobileInput");

mobileInput.addEventListener("input", function(){
  this.value = this.value.replace(/[^0-9]/g,"").slice(0,10);
});

function goOtp(){
  const mobile = document.getElementById("mobileInput");

  mobile.value = mobile.value.replace(/[^0-9]/g,"").slice(0,10);

  if(mobile.value.length !== 10){
    shake(document.getElementById("mobileBox"));
    return;
  }

  showStep("otpStep","Enter OTP");
  document.querySelector(".otpBoxes input").focus();
}

/* OTP: numbers only */
const otpInputs = document.querySelectorAll(".otpBoxes input");

otpInputs.forEach((input,index) => {

  input.setAttribute("inputmode","numeric");
  input.setAttribute("pattern","[0-9]*");

  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9]/g,"").slice(0,1);

    if(input.value && otpInputs[index + 1]){
      otpInputs[index + 1].focus();
    }

    const otp = [...otpInputs].map(i => i.value).join("");

    if(otp.length === 6){

  if(otp === "123456"){

    const user = {
      name: document.getElementById("nameInput").value.trim(),
      mobile: document.getElementById("mobileInput").value.trim(),
      otp: otp,
      login: true,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem("cezooUser", JSON.stringify(user));

    closeLoginPopup();

  }else{
    document.getElementById("error").innerText = "Incorrect OTP";
    shake(document.getElementById("otpBoxes"));
    otpInputs.forEach(i => i.value = "");
    otpInputs[0].focus();
  }

}
  });

  input.addEventListener("keydown", e => {
    if(e.key === "Backspace"){
      if(input.value){
        input.value = "";
        e.preventDefault();
      }else if(otpInputs[index - 1]){
        otpInputs[index - 1].focus();
        otpInputs[index - 1].value = "";
        e.preventDefault();
      }
    }
  });

});
function goBackMobile(){
  document.querySelectorAll(".otpBoxes input")
    .forEach(i => i.value = "");

  document.getElementById("error").innerText = "";

  showStep("mobileStep","Enter mobile number");
  document.getElementById("mobileInput").focus();
}
function openLoginPopup(){
  document.getElementById("loginPopup").classList.add("open");
}

function closeLoginPopup(){
  document.getElementById("loginPopup").classList.remove("open");
}
let loginStartY = 0;

const loginPopup = document.getElementById("loginPopup");

loginPopup.addEventListener("touchstart", e => {
  loginStartY = e.touches[0].clientY;
});

loginPopup.addEventListener("touchend", e => {

  const endY = e.changedTouches[0].clientY;

  if(endY - loginStartY > 100){
    closeLoginPopup();
  }

});

let cart = JSON.parse(localStorage.getItem("cezooCart") || "{}");
