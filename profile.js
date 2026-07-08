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
  const touch = e.changedTouches[0];

  const diffX = touch.clientX - profileStartX;
  const diffY = touch.clientY - profileStartY;

  if(Math.abs(diffX) > 90 && Math.abs(diffY) < 70){
    closeCezooProfile();
  }
});
