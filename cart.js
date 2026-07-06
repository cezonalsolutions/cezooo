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
        Delivering in 10-15 mins
      </div>

      <div class="deliveryItemsText">
        ${t.totalQty} items
      </div>

    </div>

  </div>

  <div class="scheduleBtn" onclick="openLionSheet()">
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
function cartPageIncrease(key){
  if(!cart[key]) return;

  cart[key].qty++;

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

let lionSelectedDate = "";
let lionSelectedTime = "";

function createLionSheet(){
  if(document.getElementById("lionSheet")) return;

  const style = document.createElement("style");
  style.innerHTML = `
    .lionSheet{
      position:fixed;
      inset:0;
      z-index:999999999;
      display:none;
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
    }

    .lionSheet.show{display:block;}

    .lionSheetOverlay{
      position:absolute;
      inset:0;
      background:rgba(15,18,25,.55);
      backdrop-filter:blur(3px);
    }

    .lionSheetBox{
      position:absolute;
      left:0;
      right:0;
      bottom:0;
      background:#fff;
      border-radius:28px 28px 0 0;
      padding:14px 16px 22px;
      max-height:86vh;
      overflow-y:auto;
      box-shadow:0 -12px 35px rgba(0,0,0,.18);
      animation:lionSheetUp .28s ease;
    }

    @keyframes lionSheetUp{
      from{transform:translateY(100%);}
      to{transform:translateY(0);}
    }

    .lionSheetHandle{
      width:44px;
      height:5px;
      border-radius:20px;
      background:#d7d7d7;
      margin:0 auto 16px;
    }

    .lionSheetHead{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      margin-bottom:18px;
    }

    .lionSheetHeadLeft{
      display:flex;
      align-items:center;
      gap:12px;
      min-width:0;
    }

    .lionSheetIcon{
      width:44px;
      height:44px;
      border-radius:16px;
      background:#f4f5f8;
      color:#222;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:18px;
      flex-shrink:0;
    }

    .lionSheetTitle{
      font-size:18px;
      font-weight:800;
      color:#151515;
      line-height:1.1;
    }

    .lionSheetText{
      font-size:12px;
      font-weight:500;
      color:#777;
      margin-top:4px;
      line-height:1.3;
    }

    .lionSheetClose{
      width:36px;
      height:36px;
      border:none;
      border-radius:50%;
      background:#f3f3f3;
      color:#222;
      font-size:22px;
      line-height:36px;
      cursor:pointer;
      flex-shrink:0;
    }

    .lionSection{
      margin-top:18px;
    }

    .lionLabel{
      font-size:13px;
      font-weight:800;
      color:#252525;
      margin-bottom:10px;
    }

    .lionDateRow{
      display:flex;
      gap:10px;
      overflow-x:auto;
      padding-bottom:4px;
      scrollbar-width:none;
    }

    .lionDateRow::-webkit-scrollbar{display:none;}

    .lionDateBtn{
      min-width:82px;
      border:1px solid #e5e5e5;
      background:#fff;
      border-radius:18px;
      padding:12px 8px;
      text-align:center;
      cursor:pointer;
      box-shadow:0 5px 14px rgba(0,0,0,.04);
    }

    .lionDateBtn.active{
      border-color:#222;
      background:#222;
      color:#fff;
    }

    .lionDay{
      display:block;
      font-size:11px;
      font-weight:700;
      color:#777;
      margin-bottom:5px;
    }

    .lionDateBtn.active .lionDay{
      color:#ddd;
    }

    .lionDateNum{
      display:block;
      font-size:20px;
      font-weight:900;
      line-height:1;
    }

    .lionMonth{
      display:block;
      margin-top:5px;
      font-size:11px;
      font-weight:700;
      color:#777;
    }

    .lionDateBtn.active .lionMonth{
      color:#ddd;
    }

    .lionCalendar{
      width:100%;
      height:50px;
      border:1px solid #e1e1e1;
      border-radius:16px;
      padding:0 14px;
      box-sizing:border-box;
      background:#fafafa;
      color:#222;
      font-size:14px;
      font-weight:700;
      outline:none;
    }

    .lionCalendar:focus{
      border-color:#222;
      background:#fff;
    }

    .lionTimeGrid{
      display:grid;
      grid-template-columns:repeat(2,1fr);
      gap:10px;
    }

    .lionTimeBtn{
      height:48px;
      border:1px solid #e5e5e5;
      border-radius:16px;
      background:#fff;
      color:#222;
      font-size:12px;
      font-weight:800;
      cursor:pointer;
      box-shadow:0 5px 14px rgba(0,0,0,.04);
    }

    .lionTimeBtn.active{
      border-color:#222;
      background:#222;
      color:#fff;
    }

    .lionPreview{
      display:none;
      align-items:center;
      gap:12px;
      margin-top:18px;
      padding:14px;
      border-radius:18px;
      background:#f6f6f6;
      border:1px solid #ececec;
    }

    .lionPreview.show{display:flex;}

    .lionPreviewIcon{
      width:38px;
      height:38px;
      border-radius:14px;
      background:#fff;
      display:flex;
      align-items:center;
      justify-content:center;
      color:#222;
      flex-shrink:0;
    }

    .lionPreviewSmall{
      font-size:11px;
      color:#777;
      font-weight:700;
      margin-bottom:3px;
    }

    .lionPreviewText{
      font-size:13px;
      font-weight:850;
      color:#111;
      line-height:1.25;
    }

    .lionConfirm{
      width:100%;
      height:52px;
      margin-top:18px;
      border:none;
      border-radius:18px;
      background:#222;
      color:#fff;
      font-size:15px;
      font-weight:900;
      cursor:pointer;
    }

    .lionConfirm:disabled{
      background:#cfcfcf;
      color:#777;
      cursor:not-allowed;
    }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML("beforeend", `
    <div id="lionSheet" class="lionSheet">
      <div class="lionSheetOverlay" onclick="closeLionSheet()"></div>

      <div class="lionSheetBox">
        <div class="lionSheetHandle"></div>

        <div class="lionSheetHead">
          <div class="lionSheetHeadLeft">
            <div class="lionSheetIcon">
              <i class="fa-regular fa-calendar-check"></i>
            </div>

            <div>
              <div class="lionSheetTitle">Schedule Delivery</div>
              <div class="lionSheetText">Choose a comfortable delivery slot</div>
            </div>
          </div>

          <button class="lionSheetClose" onclick="closeLionSheet()">×</button>
        </div>

        <div class="lionSection">
          <div class="lionLabel">Quick date</div>
          <div id="lionDateRow" class="lionDateRow"></div>
        </div>

        <div class="lionSection">
          <div class="lionLabel">Custom date</div>
          <input
            type="date"
            id="lionCalendar"
            class="lionCalendar"
            onchange="lionCalendarChanged(this.value)">
        </div>

        <div class="lionSection">
          <div class="lionLabel">Available time slots</div>

          <div class="lionTimeGrid">
            <button class="lionTimeBtn" onclick="selectLionTime(this,'8:00 AM - 10:00 AM')">8 AM - 10 AM</button>
            <button class="lionTimeBtn" onclick="selectLionTime(this,'10:00 AM - 12:00 PM')">10 AM - 12 PM</button>
            <button class="lionTimeBtn" onclick="selectLionTime(this,'12:00 PM - 2:00 PM')">12 PM - 2 PM</button>
            <button class="lionTimeBtn" onclick="selectLionTime(this,'2:00 PM - 4:00 PM')">2 PM - 4 PM</button>
            <button class="lionTimeBtn" onclick="selectLionTime(this,'4:00 PM - 6:00 PM')">4 PM - 6 PM</button>
            <button class="lionTimeBtn" onclick="selectLionTime(this,'6:00 PM - 8:00 PM')">6 PM - 8 PM</button>
          </div>
        </div>

        <div id="lionPreview" class="lionPreview">
          <div class="lionPreviewIcon">
            <i class="fa-solid fa-clock"></i>
          </div>

          <div>
            <div class="lionPreviewSmall">Selected schedule</div>
            <div id="lionPreviewText" class="lionPreviewText"></div>
          </div>
        </div>

        <button
          id="lionConfirm"
          class="lionConfirm"
          onclick="confirmLionSchedule()"
          disabled>
          Confirm Schedule
        </button>
      </div>
    </div>
  `);

  generateLionDates();
}

function openLionSheet(){
  createLionSheet();
  document.body.appendChild(document.getElementById("lionSheet"));
  document.getElementById("lionSheet").classList.add("show");
}

function closeLionSheet(){
  document.getElementById("lionSheet")?.classList.remove("show");
}

function generateLionDates(){
  const row = document.getElementById("lionDateRow");
  if(!row) return;

  row.innerHTML = "";

  const today = new Date();

  for(let i = 0; i < 7; i++){
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const value =
      date.getFullYear() + "-" +
      String(date.getMonth() + 1).padStart(2,"0") + "-" +
      String(date.getDate()).padStart(2,"0");

    const day =
      i === 0 ? "Today" :
      i === 1 ? "Tomorrow" :
      date.toLocaleDateString("en-US",{weekday:"short"});

    const month = date.toLocaleDateString("en-US",{month:"short"});

    row.insertAdjacentHTML("beforeend", `
      <button
        class="lionDateBtn"
        data-date="${value}"
        onclick="selectLionDate(this,'${value}')">

        <span class="lionDay">${day}</span>
        <span class="lionDateNum">${date.getDate()}</span>
        <span class="lionMonth">${month}</span>
      </button>
    `);
  }

  const calendar = document.getElementById("lionCalendar");

  calendar.min =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2,"0") + "-" +
    String(today.getDate()).padStart(2,"0");
}

function selectLionDate(btn,date){
  document.querySelectorAll(".lionDateBtn")
    .forEach(x => x.classList.remove("active"));

  btn.classList.add("active");

  lionSelectedDate = date;
  document.getElementById("lionCalendar").value = date;

  updateLionPreview();
}

function lionCalendarChanged(date){
  lionSelectedDate = date;

  document.querySelectorAll(".lionDateBtn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.date === date);
  });

  updateLionPreview();
}

function selectLionTime(btn,time){
  document.querySelectorAll(".lionTimeBtn")
    .forEach(x => x.classList.remove("active"));

  btn.classList.add("active");

  lionSelectedTime = time;

  updateLionPreview();
}

function updateLionPreview(){
  const preview = document.getElementById("lionPreview");
  const text = document.getElementById("lionPreviewText");
  const confirmBtn = document.getElementById("lionConfirm");

  if(lionSelectedDate && lionSelectedTime){
    const date = new Date(lionSelectedDate + "T00:00:00");

    const formatted = date.toLocaleDateString("en-IN",{
      weekday:"short",
      day:"numeric",
      month:"short",
      year:"numeric"
    });

    text.innerText = `${formatted} • ${lionSelectedTime}`;

    preview.classList.add("show");
    confirmBtn.disabled = false;
  }else{
    preview.classList.remove("show");
    confirmBtn.disabled = true;
  }
}

function confirmLionSchedule(){
  if(!lionSelectedDate || !lionSelectedTime) return;

  const scheduleData = {
    date: lionSelectedDate,
    time: lionSelectedTime
  };

  localStorage.setItem(
    "cezooDeliverySchedule",
    JSON.stringify(scheduleData)
  );

  const scheduleText = document.querySelector(".scheduleBtn span");

  if(scheduleText){
    scheduleText.innerText = "Scheduled";
  }

  closeLionSheet();

  console.log("Delivery Schedule:", scheduleData);
}
