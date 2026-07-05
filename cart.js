document.getElementById("cartFloatBox").addEventListener("click", () => {
  openCartPagePopup();
});

document.getElementById("closeCartPage").addEventListener("click", () => {
  closeCartPagePopup();
});

function openCartPagePopup(){
  const popup = document.getElementById("cartPagePopup");

  popup.classList.add("open");
  document.body.style.overflow = "hidden";

  document.querySelector(".floatBarWrap").classList.add("popupMode");

  document.getElementById("cartHeaderVillage").innerText =
    document.getElementById("village")?.innerText || "Selected Location";

  document.getElementById("cartHeaderStreet").innerText =
    document.getElementById("street")?.innerText || "Delivery address";

  showCartPageShimmer();

  setTimeout(() => {
    renderCartPage();
  }, 150);
}

function closeCartPagePopup(){
  document.getElementById("cartPagePopup").classList.remove("open");
  document.body.style.overflow = "";
  document.querySelector(".floatBarWrap").classList.remove("popupMode");
}

function showCartPageShimmer(){
  const box = document.getElementById("cartPageContent");

  box.innerHTML = `
    <div class="cartShimmerBox">
      <div class="cartShimmerLine" style="width:70%;"></div>
      <div class="cartShimmerSmall"></div>

      ${Array(4).fill(`
        <div class="cartShimmerItem">
          <div class="cartShimmerImg"></div>
          <div>
            <div class="cartShimmerLine"></div>
            <div class="cartShimmerSmall"></div>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="cartShimmerBox">
      <div class="cartShimmerLine" style="width:60%;"></div>
      <div class="cartShimmerLine"></div>
      <div class="cartShimmerLine"></div>
      <div class="cartShimmerSmall"></div>
    </div>
  `;
}
let deliveryPartnerTip = 0;
let selectedInstructions = [];
function getCartTotals(){
  const items = Object.values(cart || {});

  let mrpTotal = 0;
  let itemTotal = 0;
  let totalQty = 0;

  items.forEach(item => {
    const qty = Number(item.qty || 0);
    const mrp = Number(item.original_price || item.discount_price || 0);
    const price = Number(item.discount_price || 0);

    mrpTotal += mrp * qty;
    itemTotal += price * qty;
    totalQty += qty;
  });

const deliveryFee = 35;

/* Handling Fee Logic */
const handlingFee = 10;

const deliveryPay = 0;

/* ₹10 only if cart has MORE THAN 15 items */
const handlingPay = totalQty > 15 ? handlingFee : 0;

const toPay = itemTotal + handlingPay + deliveryPartnerTip;
const savings =
  (mrpTotal - itemTotal) +
  deliveryFee;
  return {
    items,
    mrpTotal,
    itemTotal,
    totalQty,
    deliveryFee,
    handlingFee,
    deliveryPay,
    handlingPay,
    toPay,
    savings
  };
}

function renderCartPage(){
  const box = document.getElementById("cartPageContent");
  const t = getCartTotals();

  document.getElementById("cartToPayBottom").innerText = `₹${t.toPay}`;

  if(t.totalQty <= 0){
    box.innerHTML = `
      <div style="padding:50px;text-align:center;font-weight:900;">
        Your cart is empty
      </div>
    `;
    return;
  }

  box.innerHTML = `
    <div class="cartDeliveryCard">

   <div class="cartDeliveryTop">

  <div class="cartDeliveryLeft">

    <div class="cartClockIcon">
      <i class="fa-regular fa-clock"></i>
    </div>

    <div class="deliveryInfoWrap">

      <div class="deliveryTimeText">
        Delivering in 6 mins
      </div>

      <div class="deliveryItemsText">
        ${t.totalQty} items
      </div>

    </div>

  </div>

  <div class="scheduleBtn">
    <i class="fa-regular fa-calendar"></i>
    <span>Schedule</span>
  </div>
</div>

      ${t.items.map(item => renderCartItemRow(item)).join("")}

      <div class="addMoreCart">
        Forgot something? <span onclick="closeCartPagePopup()">Add More Items</span>
      </div>

    </div>
<div class="cartCouponCard">

  <div class="couponTitle">
    Apply Coupon
  </div>

  <div class="couponRow">

    <input
      type="text"
      id="couponCode"
      class="couponInput"
      placeholder="Enter coupon code">

    <button
      class="applyCouponBtn"
      onclick="applyCoupon()">
      APPLY
    </button>

  </div>

</div>
    <div class="cartBillCard">

    <div class="billHeader">
  <div class="billIcon">
    <i class="fa-solid fa-receipt"></i>
  </div>
  <h3>Bill Summary</h3>
</div>
      <div class="billRows">

        <div class="billRow">
          <span>Item Total</span>
          <strong>
            <del>₹${t.mrpTotal}</del> ₹${t.itemTotal}
          </strong>
        </div>

     <div class="billRow">
  <span>Delivery Fee</span>
  <strong>
    <del>₹${t.deliveryFee}</del> FREE
  </strong>
</div>
   <div class="billRow">
  <span>Handling Fee</span>
  <strong>
    ${t.handlingPay === 0 ? "₹0" : "₹10"}
  </strong>
</div>
${deliveryPartnerTip > 0 ? `
  <div class="billRow">
    <span>Delivery Partner Tip</span>
    <strong>₹${deliveryPartnerTip}</strong>
  </div>
` : ""}


        <div class="billRow billTotal">
          <span>To Pay</span>
          <strong>
           <del>₹${t.mrpTotal}</del>
₹${t.toPay}
          </strong>
        </div>

      </div>
    </div>




<div class="tipInstructionCard">

  <div class="tipTabs">
    <button class="tipTab active"
      onclick="showTipSection('tip',this)">
      Give a Tip
    </button>

    <button class="tipTab"
      onclick="showTipSection('instruction',this)">
      Delivery Instructions
    </button>
  </div>

  <!-- GIVE A TIP -->
  <div id="tipSection" class="tipSection active">

    <div class="tipContent">

      <div class="tipText">

        <div class="tipHeading">
          Tip Delivery Partner
        </div>

        <div class="tipDesc">
          Help them earn a little extra for their effort. 100% of this tip will go to them.
        </div>

      <div class="tipSafety" onclick="openDeliverySafety()">
  Delivery Partner Safety
</div>

      </div>

      <div class="tipImage">
        <img src="tip.png" alt="">
      </div>

    </div>

    <div class="tipAmountRow">

   <button class="tipAmountBtn ${deliveryPartnerTip === 10 ? "active" : ""}" onclick="toggleDeliveryTip(10)">₹10</button>
<button class="tipAmountBtn ${deliveryPartnerTip === 20 ? "active" : ""}" onclick="toggleDeliveryTip(20)">₹20</button>
<button class="tipAmountBtn ${deliveryPartnerTip === 30 ? "active" : ""}" onclick="toggleDeliveryTip(30)">₹30</button>
<button class="tipAmountBtn ${deliveryPartnerTip === 40 ? "active" : ""}" onclick="toggleDeliveryTip(40)">₹40</button>
<button class="tipAmountBtn ${deliveryPartnerTip === 50 ? "active" : ""}" onclick="toggleDeliveryTip(50)">₹50</button>
    </div>

  </div>

  <!-- DELIVERY INSTRUCTIONS -->
  <div id="instructionSection" class="tipSection">

    <div class="deliveryInstructionRow">

<button class="instructionBtn ${selectedInstructions.includes("Leave with Security") ? "active" : ""}"
        onclick='toggleInstruction(this,"Leave with Security")'>
  <i class="fa-solid fa-shield-heart"></i>
  <span>Leave with<br>Security</span>
</button>

<button class="instructionBtn ${selectedInstructions.includes("Leave at Door") ? "active" : ""}"
        onclick='toggleInstruction(this,"Leave at Door")'>
  <i class="fa-solid fa-door-open"></i>
  <span>Leave at<br>Door</span>
</button>

<button class="instructionBtn ${selectedInstructions.includes("Dont Ring Bell") ? "active" : ""}"
        onclick='toggleInstruction(this,"Dont Ring Bell")'>
  <i class="fa-regular fa-bell-slash"></i>
  <span>Don't Ring<br>Bell</span>
</button>

<button class="instructionBtn ${selectedInstructions.includes("Beware of Pets") ? "active" : ""}"
        onclick='toggleInstruction(this,"Beware of Pets")'>
  <i class="fa-solid fa-paw"></i>
  <span>Beware of<br>Pets</span>
</button>
    </div>

  </div>

</div>





    <div class="cartSavingsCard">
      <div class="savingsTop">
        <span>Savings on this order</span>
        <span class="savingsBadge">₹${t.savings}</span>
      </div>

      <div class="savingsInner">
       <div class="savingLine">
  <span>Discount on MRP</span>
  <strong>₹${t.mrpTotal - t.itemTotal}</strong>
</div>

<div class="savingLine">
  <span>FREE delivery savings</span>
  <strong>₹${t.deliveryFee}</strong>
</div>
      </div>

      
    </div>

    
    
  `;
}

function renderCartItemRow(item){
  const key = `${item.table}_${item.id}`;

  return `
    <div class="cartItem">

      <div class="cartItemImg">
        <div class="cartImgLoader"></div>
        <img
          src="${item.image1 || ""}"
          onload="this.previousElementSibling.remove()"
          onerror="this.previousElementSibling.remove()">
      </div>

      <div class="cartItemMiddle">
        <div class="cartItemName">${item.name || ""}</div>

        <div class="cartItemQty">
          ${item.quantity || ""} ${item.unit || ""}
        </div>

        <div class="cartPriceBox">
          <del>₹${Number(item.original_price || 0) * Number(item.qty || 1)}</del>
          <span>₹${Number(item.discount_price || 0) * Number(item.qty || 1)}</span>
        </div>
      </div>

      <div class="cartItemRight">
        <div class="cartQtyBox">
          <button onclick="cartPageDecrease('${key}')">−</button>
          <span>${item.qty}</span>
          <button onclick="cartPageIncrease('${key}')">+</button>
        </div>
      </div>

    </div>
  `;
}





function cartPageDecrease(key){
  if(!cart[key]) return;

  cart[key].qty--;

  if(cart[key].qty <= 0){
    delete cart[key];
  }

  saveCart();
  updateCartFloat();
  updatePopupCartSummary();
  restoreCartButtons(document);
  renderCartPage();
}
function applyCoupon(){
  const code = document.getElementById("couponCode").value.trim();

  if(!code) return;

  console.log("Coupon:", code);
}
let cartSwipeStartX = 0;
let cartSwipeStartY = 0;
let cartSwipeEdge = "";

const cartPagePopup = document.getElementById("cartPagePopup");

cartPagePopup.addEventListener("touchstart", function(e){
  const touch = e.touches[0];

  cartSwipeStartX = touch.clientX;
  cartSwipeStartY = touch.clientY;

  const w = window.innerWidth;

  if(cartSwipeStartX <= 28){
    cartSwipeEdge = "left";
  }else if(cartSwipeStartX >= w - 28){
    cartSwipeEdge = "right";
  }else{
    cartSwipeEdge = "";
  }
});

cartPagePopup.addEventListener("touchend", function(e){
  if(!cartSwipeEdge) return;

  const touch = e.changedTouches[0];

  const diffX = touch.clientX - cartSwipeStartX;
  const diffY = Math.abs(touch.clientY - cartSwipeStartY);

  if(diffY > 60){
    cartSwipeEdge = "";
    return;
  }

  if(cartSwipeEdge === "left" && diffX > 90){
    closeCartPagePopup();
  }

  if(cartSwipeEdge === "right" && diffX < -90){
    closeCartPagePopup();
  }

  cartSwipeEdge = "";
});

function showTipSection(type, btn){

  document.querySelectorAll(".tipTab")
    .forEach(x => x.classList.remove("active"));

  btn.classList.add("active");

  document.getElementById("tipSection").classList.remove("active");
  document.getElementById("instructionSection").classList.remove("active");

  if(type === "tip"){
    document.getElementById("tipSection").classList.add("active");
  }else{
    document.getElementById("instructionSection").classList.add("active");
  }
}

function toggleDeliveryTip(amount){
  deliveryPartnerTip = deliveryPartnerTip === amount ? 0 : amount;
  renderCartPage();
}

function toggleInstruction(btn, text){
  btn.classList.toggle("active");

  if(selectedInstructions.includes(text)){
    selectedInstructions = selectedInstructions.filter(x => x !== text);
  }else{
    selectedInstructions.push(text);
  }
}

/* DELIVERY SAFETY BOTTOM SHEET - JS ONLY */
function createDeliverySafetySheet(){
  if(document.getElementById("deliverySafetySheet")) return;

  const style = document.createElement("style");
  style.innerHTML = `
    .deliverysafety{
      position:fixed;
      inset:0;
      z-index:999999999;
      display:none;
    }

    .deliverysafety.show{
      display:block;
    }

    .deliverysafetyOverlay{
      position:absolute;
      inset:0;
      background:rgba(0,0,0,.45);
    }

    .deliverysafetyClose{
    position:fixed;

    left:50%;
    bottom:330px;   /* Adjust this value if your sheet height changes */

    transform:translateX(-50%);

    width:36px;
    height:36px;

    border:none;
    border-radius:50%;

    background:#fff;
    color:#333;

    font-size:18px;
    font-weight:600;
    line-height:36px;
    text-align:center;

    box-shadow:0 4px 14px rgba(0,0,0,.18);

    cursor:pointer;
    z-index:99999999;
}

    .deliverysafetyBox{
      position:absolute;
      left:0;
      right:0;
      bottom:0;
      background:#fff;
      border-radius:26px 26px 0 0;
      padding:28px 20px 30px;
      text-align:center;
      z-index:2;
    }

    .deliverysafetyImg{
    width:54px;
    height:54px;
    object-fit:contain;
    display:block;
    margin:0 auto 10px;
}
    .deliverysafetyBox h3{
    margin:0 0 12px;
    font-size:17px;
    font-weight:700;
    color:#222;
}
    .deliverysafetyPoints{
    display:flex;
    flex-direction:column;
    gap:8px;
}

.deliverysafetyPoints p{
    margin:0;
    padding:10px 12px;

    background:#f7f7f7;
    border-radius:10px;

    font-size:13px;
    font-weight:500;
    line-height:1.4;
    color:#555;
}
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML("beforeend", `
    <div id="deliverySafetySheet" class="deliverysafety">
      <div class="deliverysafetyOverlay" onclick="closeDeliverySafety()"></div>

      <button class="deliverysafetyClose" onclick="closeDeliverySafety()">×</button>

      <div class="deliverysafetyBox">
        <img src="tip.png" class="deliverysafetyImg" alt="">

        <h3>Delivery Partner Safety</h3>

        <div class="deliverysafetyPoints">
          <p>Delivery partner follows safe delivery guidelines.</p>
          <p>Your tip goes directly to the delivery partner.</p>
          <p>Contactless delivery is available when requested.</p>
          <p>Delivery instructions help complete the order safely.</p>
        </div>
      </div>
    </div>
  `);
}

function openDeliverySafety(){
  createDeliverySafetySheet();

  const sheet = document.getElementById("deliverySafetySheet");
  document.body.appendChild(sheet);
  sheet.classList.add("show");
}

function closeDeliverySafety(){
  document.getElementById("deliverySafetySheet")?.classList.remove("show");
}