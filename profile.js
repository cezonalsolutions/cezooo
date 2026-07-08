window.openCezooProfile = function(){

  const user = JSON.parse(
    localStorage.getItem("cezooUser") || "null"
  );

  if(user && user.name && user.mobile && user.otp && user.login === true){

    const capitalName = user.name
      .toLowerCase()
      .split(" ")
      .filter(word => word)
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");

    document.getElementById("profileUserName").innerText =
      capitalName;

    document.getElementById("profileUserMobile").innerText =
      "+91 " + user.mobile;

    document
      .getElementById("cezooProfilePopup")
      .classList.add("open");

    document.body.style.overflow = "hidden";

  }else{

    openLoginPopup();

  }
};

window.closeCezooProfile = function(){
  document.getElementById("cezooProfilePopup").classList.remove("open");
  document.body.style.overflow = "";
};

const profileBackBtn = document.getElementById("profileBackBtn");
const profileDotsBtn = document.getElementById("profileDotsBtn");
const profileMenuBox = document.getElementById("profileMenu");

profileBackBtn.onclick = function(){
  closeCezooProfile();
};

profileDotsBtn.onclick = function(e){
  e.stopPropagation();
  profileMenuBox.classList.toggle("show");
};

profileMenuBox.onclick = function(e){
  e.stopPropagation();
};

document.addEventListener("click", function(){
  profileMenuBox.classList.remove("show");
});

window.logoutUser = function(){
  localStorage.removeItem("cezooUser");
  profileMenuBox.classList.remove("show");
  closeCezooProfile();

  setTimeout(function(){
    openLoginPopup();
  }, 150);
};


let profileStartX = 0;
let profileStartY = 0;

const cezooProfilePopup =
  document.getElementById("cezooProfilePopup");

cezooProfilePopup.addEventListener("touchstart", function(e){
  const touch = e.touches[0];

  profileStartX = touch.clientX;
  profileStartY = touch.clientY;
});
cezooProfilePopup.addEventListener("touchend", function(e){

  if(anyChildPopupOpen()) return;

  const touch = e.changedTouches[0];

  const diffX = touch.clientX - profileStartX;
  const diffY = touch.clientY - profileStartY;

  if(Math.abs(diffX) > 90 && Math.abs(diffY) < 70){
    closeCezooProfile();
  }
});


function openTermsPopup(){
  document.getElementById("termsPopup").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeTermsPopup(){
  document.getElementById("termsPopup").classList.remove("open");
  document.body.style.overflow = "hidden"; // keep profile popup locked
}

let termsStartX = 0;
let termsStartY = 0;

const termsPopup = document.getElementById("termsPopup");

termsPopup.addEventListener("touchstart", function(e){
  const touch = e.touches[0];
  termsStartX = touch.clientX;
  termsStartY = touch.clientY;
});

termsPopup.addEventListener("touchend", function(e){
  const touch = e.changedTouches[0];

  const diffX = touch.clientX - termsStartX;
  const diffY = touch.clientY - termsStartY;

  if(Math.abs(diffX) > 90 && Math.abs(diffY) < 70){
    closeTermsPopup();
  }
});

window.openRefundPopup = function(){
  document
    .getElementById("refundPopup")
    .classList.add("open");

  document.body.style.overflow = "hidden";
};


window.closeRefundPopup = function(){
  document
    .getElementById("refundPopup")
    .classList.remove("open");

  // profile is still open behind refund popup
  document.body.style.overflow = "hidden";
};


let refundStartX = 0;
let refundStartY = 0;

const refundPopupBox =
  document.getElementById("refundPopup");


refundPopupBox.addEventListener("touchstart", function(e){

  const touch = e.touches[0];

  refundStartX = touch.clientX;
  refundStartY = touch.clientY;

});


refundPopupBox.addEventListener("touchend", function(e){

  const touch = e.changedTouches[0];

  const diffX =
    touch.clientX - refundStartX;

  const diffY =
    touch.clientY - refundStartY;


  if(
    Math.abs(diffX) > 90 &&
    Math.abs(diffY) < 70
  ){
    closeRefundPopup();
  }

});

window.openCouponsPopup = function(){
  document.getElementById("couponsPopup").classList.add("open");
  document.body.style.overflow = "hidden";
};

window.closeCouponsPopup = function(){
  document.getElementById("couponsPopup").classList.remove("open");
  document.body.style.overflow = "hidden";
};

let couponsStartX = 0;
let couponsStartY = 0;

const couponsPopupBox = document.getElementById("couponsPopup");

couponsPopupBox.addEventListener("touchstart", function(e){
  const touch = e.touches[0];
  couponsStartX = touch.clientX;
  couponsStartY = touch.clientY;
});

couponsPopupBox.addEventListener("touchend", function(e){
  const touch = e.changedTouches[0];

  const diffX = touch.clientX - couponsStartX;
  const diffY = touch.clientY - couponsStartY;

  if(Math.abs(diffX) > 90 && Math.abs(diffY) < 70){
    closeCouponsPopup();
  }
});

window.openNotificationsPopup = function(){
  document.getElementById("notificationsPopup").classList.add("open");
  document.body.style.overflow = "hidden";

  document.getElementById("appNotificationToggle").checked =
    localStorage.getItem("cezooAppNotifications") === "on";

  document.getElementById("whatsappNotificationToggle").checked =
    localStorage.getItem("cezooWhatsappNotifications") === "on";
};

window.closeNotificationsPopup = function(){
  document.getElementById("notificationsPopup").classList.remove("open");
  document.body.style.overflow = "hidden";
};

document.getElementById("appNotificationToggle").addEventListener("change", function(){

  if(this.checked){

    localStorage.setItem("cezooAppNotifications", "on");

    if(window.webkit && window.webkit.messageHandlers.requestNotificationPermission){
      window.webkit.messageHandlers.requestNotificationPermission.postMessage("ask");
    }

  }else{

    localStorage.setItem("cezooAppNotifications", "off");

  }

});

document.getElementById("whatsappNotificationToggle").addEventListener("change", function(){
  localStorage.setItem(
    "cezooWhatsappNotifications",
    this.checked ? "on" : "off"
  );
});

let notificationsStartX = 0;
let notificationsStartY = 0;

const notificationsPopupBox =
  document.getElementById("notificationsPopup");

notificationsPopupBox.addEventListener("touchstart", function(e){
  const touch = e.touches[0];
  notificationsStartX = touch.clientX;
  notificationsStartY = touch.clientY;
});

notificationsPopupBox.addEventListener("touchend", function(e){
  const touch = e.changedTouches[0];

  const diffX = touch.clientX - notificationsStartX;
  const diffY = touch.clientY - notificationsStartY;

  if(Math.abs(diffX) > 90 && Math.abs(diffY) < 70){
    closeNotificationsPopup();
  }
});

window.openSellerPopup = function(){
  document
    .getElementById("sellerPopup")
    .classList.add("open");

  document.body.style.overflow = "hidden";
};


window.closeSellerPopup = function(){
  document
    .getElementById("sellerPopup")
    .classList.remove("open");

  document.body.style.overflow = "hidden";
};


let sellerStartX = 0;
let sellerStartY = 0;

const sellerPopupBox =
  document.getElementById("sellerPopup");


sellerPopupBox.addEventListener("touchstart", function(e){

  const touch = e.touches[0];

  sellerStartX = touch.clientX;
  sellerStartY = touch.clientY;

});


sellerPopupBox.addEventListener("touchend", function(e){

  const touch = e.changedTouches[0];

  const diffX = touch.clientX - sellerStartX;
  const diffY = touch.clientY - sellerStartY;

  if(
    Math.abs(diffX) > 90 &&
    Math.abs(diffY) < 70
  ){
    closeSellerPopup();
  }

});

function anyChildPopupOpen(){
  return (
    document.getElementById("termsPopup")?.classList.contains("open") ||
    document.getElementById("refundPopup")?.classList.contains("open") ||
    document.getElementById("couponsPopup")?.classList.contains("open") ||
    document.getElementById("notificationsPopup")?.classList.contains("open") ||
    document.getElementById("sellerPopup")?.classList.contains("open")
  );
}
