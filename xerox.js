const pdfUpload = document.getElementById("pdfUpload");
const fileName = document.getElementById("fileName");

const uploadPopup = document.getElementById("uploadPopup");
const uploadCard = document.getElementById("uploadCard");
const uploadTitle = document.getElementById("uploadTitle");
const uploadText = document.getElementById("uploadText");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const cancelUploadBtn = document.getElementById("cancelUpload");

let uploadTimer;
let currentUploadFileName = "";

function resetUploadPopup(){
  clearInterval(uploadTimer);
  uploadPopup.classList.remove("active");
  uploadCard.classList.remove("done");
  progressBar.style.width = "0%";
  progressPercent.textContent = "0%";
  uploadTitle.textContent = "Uploading PDF...";
  uploadText.textContent = "Please wait while your document is uploading.";
}

function cancelUpload(){
  clearInterval(uploadTimer);
  pdfUpload.value = "";
  uploadPopup.classList.remove("active");
  uploadCard.classList.remove("done");
  progressBar.style.width = "0%";
  progressPercent.textContent = "0%";
  fileName.textContent = currentUploadFileName
    ? "Upload cancelled: " + currentUploadFileName
    : "Only PDF files are allowed";
}

function startUploadPopup(file){
  let progress = 0;
  currentUploadFileName = file.name;

  resetUploadPopup();

  uploadPopup.classList.add("active");
  uploadTitle.textContent = "Uploading PDF...";
  uploadText.textContent = file.name;
  progressBar.style.width = "0%";
  progressPercent.textContent = "0%";

  uploadTimer = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;

    if(progress >= 100){
      progress = 100;
      clearInterval(uploadTimer);

      progressBar.style.width = "100%";
      progressPercent.textContent = "100%";
      uploadCard.classList.add("done");
      uploadTitle.textContent = "Upload Complete";
      uploadText.textContent = file.name + " uploaded successfully";
      fileName.textContent = "Uploaded: " + file.name;

      setTimeout(() => {
        uploadPopup.classList.remove("active");
      }, 1000);

      return;
    }

    progressBar.style.width = progress + "%";
    progressPercent.textContent = progress + "%";
  }, 160);
}

cancelUploadBtn.addEventListener("click", cancelUpload);

pdfUpload.addEventListener("change", function(){
  const file = this.files[0];

  if(!file){
    fileName.textContent = "Only PDF files are allowed";
    return;
  }

  if(file.type !== "application/pdf"){
    alert("Only PDF files are allowed!");
    this.value = "";
    resetUploadPopup();
    fileName.textContent = "Only PDF files are allowed";
    return;
  }

  fileName.textContent = "Selected: " + file.name;
  startUploadPopup(file);
});

function openXeroxPopup(){
  document.getElementById("xeroxPopup").classList.add("show");
  document.body.style.overflow = "hidden";

  document.querySelector(".floatBarWrap")?.classList.add("popupMode");
}

function closeXeroxPopup(){
  document.getElementById("xeroxPopup").classList.remove("show");
  document.body.style.overflow = "";

  document.querySelector(".floatBarWrap")?.classList.remove("popupMode");
}

/* ===== Swipe from Left / Right edge to close ===== */

let xeroxStartX = 0;
let xeroxStartY = 0;
let xeroxEdge = "";

const xeroxPopup = document.getElementById("xeroxPopup");

xeroxPopup.addEventListener("touchstart", function(e){

  const touch = e.touches[0];

  xeroxStartX = touch.clientX;
  xeroxStartY = touch.clientY;

  const w = window.innerWidth;

  if(xeroxStartX <= 28){
    xeroxEdge = "left";
  }else if(xeroxStartX >= w - 28){
    xeroxEdge = "right";
  }else{
    xeroxEdge = "";
  }

});

xeroxPopup.addEventListener("touchend", function(e){

  if(!xeroxEdge) return;

  const touch = e.changedTouches[0];

  const diffX = touch.clientX - xeroxStartX;
  const diffY = Math.abs(touch.clientY - xeroxStartY);

  xeroxEdge = "";

  if(diffY > 60) return;

  /* Swipe from left edge → right */
  if(diffX > 90){
    closeXeroxPopup();
  }

  /* Swipe from right edge → left */
  if(diffX < -90){
    closeXeroxPopup();
  }

});