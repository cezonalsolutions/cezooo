function isCezooUserLoggedIn(){
  const user = JSON.parse(localStorage.getItem("cezooUser") || "null");

  return user &&
    user.name &&
    user.mobile &&
    user.otp &&
    user.login === true;
}

function showOrderPlacedPopup(){

  if(document.getElementById("orderPlacedPopup")){
    document.getElementById("orderPlacedPopup").classList.add("show");
    return;
  }

  const style = document.createElement("style");
  style.innerHTML = `
    .orderPlacedPopup{
      position:fixed;
      inset:0;
      z-index:999999999;
      background:#16a34a;
      display:none;
      align-items:center;
      justify-content:center;
      overflow:hidden;
      font-family:Arial, Helvetica, sans-serif;
    }

    .orderPlacedPopup.show{
      display:flex;
    }

    .orderSuccessBox{
      width:100%;
      text-align:center;
      color:white;
      padding:20px;
      animation:orderPageShow .8s ease forwards;
    }

    @keyframes orderPageShow{
      from{opacity:0; transform:translateY(25px);}
      to{opacity:1; transform:translateY(0);}
    }

    .orderAnimationArea{
      width:190px;
      height:170px;
      margin:0 auto 25px;
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
    }

    .orderTickCircle{
      width:135px;
      height:135px;
      background:#fff;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      box-shadow:0 18px 35px rgba(0,0,0,.22);
      animation:orderCirclePop .8s cubic-bezier(.22,1.2,.36,1) forwards;
    }

    @keyframes orderCirclePop{
      0%{transform:scale(0); opacity:0;}
      65%{transform:scale(1.12); opacity:1;}
      100%{transform:scale(1); opacity:1;}
    }

    .orderTickSvg{
      width:105px;
      height:105px;
      overflow:visible;
      animation:orderTickBounce .45s ease 1.25s forwards;
    }

    .orderTickPath{
      fill:none;
      stroke:#16a34a;
      stroke-width:13;
      stroke-linecap:round;
      stroke-linejoin:round;
      stroke-dasharray:1;
      stroke-dashoffset:1;
      animation:orderDrawTick .85s cubic-bezier(.35,0,.2,1) .45s forwards;
    }

    @keyframes orderDrawTick{to{stroke-dashoffset:0;}}

    @keyframes orderTickBounce{
      0%{transform:scale(1);}
      50%{transform:scale(1.12);}
      100%{transform:scale(1);}
    }

    .orderStar{
      position:absolute;
      color:#fff;
      font-size:30px;
      opacity:0;
      text-shadow:0 5px 14px rgba(0,0,0,.18);
      animation:orderStarMove 2.3s ease-in-out infinite;
    }

    .orderStar1{top:2px; left:5px; animation-delay:.1s;}
    .orderStar2{top:2px; right:5px; animation-delay:.3s;}
    .orderStar3{bottom:5px; left:10px; animation-delay:.5s;}
    .orderStar4{bottom:5px; right:10px; animation-delay:.7s;}
    .orderStar5{top:45%; left:-12px; animation-delay:.9s;}
    .orderStar6{top:45%; right:-12px; animation-delay:1.1s;}
    .orderStar7{top:-18px; left:50%; transform:translateX(-50%); animation-delay:1.3s; font-size:24px;}
    .orderStar8{bottom:-10px; left:50%; transform:translateX(-50%); animation-delay:1.5s; font-size:24px;}

    @keyframes orderStarMove{
      0%{transform:scale(0) rotate(0deg); opacity:0;}
      35%{transform:scale(1.25) rotate(120deg); opacity:1;}
      70%{transform:scale(1) rotate(240deg); opacity:.85;}
      100%{transform:scale(0) rotate(360deg); opacity:0;}
    }

    .orderSuccessBox h1{
      font-size:29px;
      font-weight:800;
      margin-bottom:12px;
    }

    .orderSuccessBox p{
  margin:0;

  font-size:16px;
  line-height:1.6;

  font-weight:500;
  letter-spacing:.2px;

  color:rgba(255,255,255,.92);

  max-width:300px;
  margin-left:auto;
  margin-right:auto;
}
  `;

  document.head.appendChild(style);

  document.body.insertAdjacentHTML("beforeend", `
    <div id="orderPlacedPopup" class="orderPlacedPopup show">
      <div class="orderSuccessBox">

        <div class="orderAnimationArea">

          <span class="orderStar orderStar1">✦</span>
          <span class="orderStar orderStar2">✦</span>
          <span class="orderStar orderStar3">✦</span>
          <span class="orderStar orderStar4">✦</span>
          <span class="orderStar orderStar5">✦</span>
          <span class="orderStar orderStar6">✦</span>
          <span class="orderStar orderStar7">✦</span>
          <span class="orderStar orderStar8">✦</span>

          <div class="orderTickCircle">
            <svg class="orderTickSvg" viewBox="0 0 120 120">
              <path class="orderTickPath" pathLength="1" d="M30 62 L51 83 L92 36"></path>
            </svg>
          </div>

        </div>

        <h1>Order Placed</h1>
        <p>Your order has been placed successfully.</p>

      </div>
    </div>
  `);
}

document
  .getElementById("payCashBtn")
  .addEventListener("click", function(){

    if(!isCezooUserLoggedIn()){
      openLoginPopup();
      return;
    }

    // show success popup
    showOrderPlacedPopup();


    // wait 5 seconds
    setTimeout(function(){

  // 1. Hide success popup
  document
    .getElementById("orderPlacedPopup")
    ?.classList.remove("show");


  // 2. Close cart page popup
  document
    .getElementById("cartPagePopup")
    ?.classList.remove("open");


  // 3. Close profile popup
  document
    .getElementById("cezooProfilePopup")
    ?.classList.remove("open");


  // 4. Close login popup if open
  document
    .getElementById("loginPopup")
    ?.classList.remove("open");


  // 5. Close location sheet
  document
    .getElementById("sheet")
    ?.classList.remove("open");

  document
    .getElementById("overlay")
    ?.classList.remove("active");


  // 6. Clear cart
  cart = {};

  localStorage.removeItem("cezooCart");


  // 7. Restore page scrolling
  document.body.style.overflow = "";


  // 8. Remove popup mode from floating bar
  document
    .querySelector(".floatBarWrap")
    ?.classList.remove("popupMode");


  // 9. Update cart UI
  if(typeof updateCartFloat === "function"){
    updateCartFloat();
  }

  if(typeof restoreCartButtons === "function"){
    restoreCartButtons(document);
  }


  // 10. Go main page top
  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}, 4000);

  });






  

  
