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




document
.getElementById("payOnlineBtn")
.addEventListener("click", async function(){

  const user = JSON.parse(
    localStorage.getItem("cezooUser") || "null"
  );

  if(!user || !user.name || !user.mobile || !user.otp || user.login !== true){
    openLoginPopup();
    return;
  }

  function showPaySpinner(){

    if(!document.getElementById("paySpinnerStyle")){
      const style = document.createElement("style");
      style.id = "paySpinnerStyle";
      style.innerHTML = `
  .paySpinnerOverlay{
    position:fixed;
    inset:0;
    z-index:999999999;

    background:rgba(255,255,255,.15);

    display:flex;
    align-items:center;
    justify-content:center;
  }

  .iosPaySpinner{
    position:relative;

    width:38px;
    height:38px;
  }

  .iosPaySpinner span{
    position:absolute;

    left:17px;
    top:2px;

    width:4px;
    height:10px;

    background:#555;

    border-radius:4px;

    transform-origin:2px 17px;

    animation:iosPayFade 1.2s linear infinite;
  }

  .iosPaySpinner span:nth-child(1){
    transform:rotate(0deg);
    animation-delay:-1.1s;
  }

  .iosPaySpinner span:nth-child(2){
    transform:rotate(30deg);
    animation-delay:-1s;
  }

  .iosPaySpinner span:nth-child(3){
    transform:rotate(60deg);
    animation-delay:-.9s;
  }

  .iosPaySpinner span:nth-child(4){
    transform:rotate(90deg);
    animation-delay:-.8s;
  }

  .iosPaySpinner span:nth-child(5){
    transform:rotate(120deg);
    animation-delay:-.7s;
  }

  .iosPaySpinner span:nth-child(6){
    transform:rotate(150deg);
    animation-delay:-.6s;
  }

  .iosPaySpinner span:nth-child(7){
    transform:rotate(180deg);
    animation-delay:-.5s;
  }

  .iosPaySpinner span:nth-child(8){
    transform:rotate(210deg);
    animation-delay:-.4s;
  }

  .iosPaySpinner span:nth-child(9){
    transform:rotate(240deg);
    animation-delay:-.3s;
  }

  .iosPaySpinner span:nth-child(10){
    transform:rotate(270deg);
    animation-delay:-.2s;
  }

  .iosPaySpinner span:nth-child(11){
    transform:rotate(300deg);
    animation-delay:-.1s;
  }

  .iosPaySpinner span:nth-child(12){
    transform:rotate(330deg);
    animation-delay:0s;
  }

  @keyframes iosPayFade{
    0%{
      opacity:1;
    }

    100%{
      opacity:.12;
    }
  }
`;
      document.head.appendChild(style);
    }

    if(!document.getElementById("paySpinnerOverlay")){
      document.body.insertAdjacentHTML("beforeend", `
  <div id="paySpinnerOverlay" class="paySpinnerOverlay">

    <div class="iosPaySpinner">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

  </div>
`);
    }else{
      document.getElementById("paySpinnerOverlay").style.display = "flex";
    }
  }

  function hidePaySpinner(){
    const loader = document.getElementById("paySpinnerOverlay");
    if(loader){
      loader.style.display = "none";
    }
  }

  try{

    showPaySpinner();

    const finalAmount = Number(
  document
    .getElementById("cartToPayBottom")
    .innerText
    .replace(/[^\d.]/g, "")
);
    if(!finalAmount || finalAmount <= 0){
      hidePaySpinner();
      console.log("Invalid amount");
      return;
    }

    const response = await fetch(
      "https://razropay.onrender.com/create-order",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          amount: finalAmount * 100
        })
      }
    );

    const data = await response.json();

    console.log("RAZORPAY RESPONSE:", data);

    if(!data || !data.success || !data.order){
      hidePaySpinner();
      console.log("Razorpay order failed");
      return;
    }

    const options = {
      key:"rzp_live_SqrUSaPO5pA6gt",

      amount:data.order.amount,
      currency:data.order.currency,
      order_id:data.order.id,

      name:"CEZOO",
      description:"Order Payment",

      prefill:{
        name:user.name,
        contact:user.mobile
      },

      theme:{
        color:"#0BD957"
      },

      handler:function(paymentResponse){

        console.log("Payment Success:", paymentResponse);

        showOrderPlacedPopup();

        setTimeout(function(){

          document.getElementById("orderPlacedPopup")
            ?.classList.remove("show");

          document.getElementById("cartPagePopup")
            ?.classList.remove("open");

          cart = {};
          localStorage.removeItem("cezooCart");

          document.body.style.overflow = "";

          document.querySelector(".floatBarWrap")
            ?.classList.remove("popupMode");

          if(typeof updateCartFloat === "function"){
            updateCartFloat();
          }

          if(typeof restoreCartButtons === "function"){
            restoreCartButtons(document);
          }

          window.scrollTo({
            top:0,
            behavior:"smooth"
          });

        }, 5000);
      },

      modal:{
        ondismiss:function(){
          hidePaySpinner();
          console.log("Razorpay closed");
        }
      }
    };

    const razorpay = new Razorpay(options);

    hidePaySpinner();

    setTimeout(function(){
      razorpay.open();
    }, 150);

  }catch(error){

    hidePaySpinner();

    console.error("Payment error:", error);

  }

});

  

