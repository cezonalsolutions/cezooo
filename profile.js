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
loadProfileRecentOrders();
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
    e.stopPropagation();
  const touch = e.touches[0];
  termsStartX = touch.clientX;
  termsStartY = touch.clientY;
});

termsPopup.addEventListener("touchend", function(e){
      e.stopPropagation();

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
  e.stopPropagation();

  const touch = e.touches[0];

  refundStartX = touch.clientX;
  refundStartY = touch.clientY;

});


refundPopupBox.addEventListener("touchend", function(e){
  e.stopPropagation();

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
      e.stopPropagation();

  const touch = e.touches[0];
  couponsStartX = touch.clientX;
  couponsStartY = touch.clientY;
});

couponsPopupBox.addEventListener("touchend", function(e){
      e.stopPropagation();

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
    e.stopPropagation();
  const touch = e.touches[0];
  notificationsStartX = touch.clientX;
  notificationsStartY = touch.clientY;
});

notificationsPopupBox.addEventListener("touchend", function(e){
    e.stopPropagation();
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
e.stopPropagation();
  const touch = e.touches[0];

  sellerStartX = touch.clientX;
  sellerStartY = touch.clientY;

});


sellerPopupBox.addEventListener("touchend", function(e){
e.stopPropagation();
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
    document
  .getElementById("savedAddressPopup")
  ?.classList.contains("open") ||
    document.getElementById("termsPopup")?.classList.contains("open") ||
    document.getElementById("refundPopup")?.classList.contains("open") ||
    document.getElementById("couponsPopup")?.classList.contains("open") ||
    document.getElementById("notificationsPopup")?.classList.contains("open") ||
    document.getElementById("sellerPopup")?.classList.contains("open") ||
    document.getElementById("yourOrdersPopup")?.classList.contains("open")
  );
}
window.openYourOrdersPopup = function(){

  document
    .getElementById("yourOrdersPopup")
    .classList.add("open");

  document.body.style.overflow = "hidden";
};


window.closeYourOrdersPopup = function(){

  document
    .getElementById("yourOrdersPopup")
    .classList.remove("open");

  // profile popup remains open
  document.body.style.overflow = "hidden";
};


let ordersStartX = 0;
let ordersStartY = 0;
let ordersTouchCount = 0;

const yourOrdersPopupBox =
  document.getElementById("yourOrdersPopup");


yourOrdersPopupBox.addEventListener("touchstart", function(e){

  ordersTouchCount = e.touches.length;

  /*
    Do not start popup swipe when:
    - order details page is open
    - user touches the map
    - user scrolls product images
  */
  if(
    document
      .getElementById("userOrderDetailsPage")
      ?.classList.contains("open") ||

    e.target.closest("#userOrderTrackingMap") ||

    e.target.closest(".userOrderTrackingMapWrap") ||

    e.target.closest(".recentOrderImages") ||

    e.target.closest(".userOrderImagesRow") ||

    e.target.closest(".userOrderImagesViewport")
  ){
    ordersStartX = 0;
    ordersStartY = 0;
    return;
  }

  const touch = e.touches[0];

  ordersStartX = touch.clientX;
  ordersStartY = touch.clientY;

});


yourOrdersPopupBox.addEventListener("touchend", function(e){

  /*
    Ignore popup swipe while order details are open
  */
  if(
    document
      .getElementById("userOrderDetailsPage")
      ?.classList.contains("open")
  ){
    return;
  }

  /*
    Ignore map and image scrolling
  */
  if(
    e.target.closest("#userOrderTrackingMap") ||

    e.target.closest(".userOrderTrackingMapWrap") ||

    e.target.closest(".recentOrderImages") ||

    e.target.closest(".userOrderImagesRow") ||

    e.target.closest(".userOrderImagesViewport")
  ){
    return;
  }

  /*
    Ignore two-finger map zoom
  */
  if(ordersTouchCount > 1){
    return;
  }

  if(!ordersStartX && !ordersStartY){
    return;
  }

  const touch = e.changedTouches[0];

  const diffX =
    touch.clientX - ordersStartX;

  const diffY =
    touch.clientY - ordersStartY;

  if(
    Math.abs(diffX) > 90 &&
    Math.abs(diffY) < 70
  ){
    closeYourOrdersPopup();
  }

  ordersStartX = 0;
  ordersStartY = 0;
  ordersTouchCount = 0;

});

const userOrderDetailsPageBox =
  document.getElementById("userOrderDetailsPage");

if(userOrderDetailsPageBox){

  userOrderDetailsPageBox.addEventListener(
    "touchstart",
    function(e){
      e.stopPropagation();
    }
  );

  userOrderDetailsPageBox.addEventListener(
    "touchmove",
    function(e){
      e.stopPropagation();
    }
  );

  userOrderDetailsPageBox.addEventListener(
    "touchend",
    function(e){
      e.stopPropagation();
    }
  );

}

/* ================================
   OPEN SAVED ADDRESS
================================ */

window.openSavedAddressPopup = function(){

  const popup =
    document.getElementById("savedAddressPopup");

  popup.classList.add("open");

  document.body.style.overflow = "hidden";

  renderSavedAddresses();

};


/* ================================
   CLOSE SAVED ADDRESS
================================ */

window.closeSavedAddressPopup = function(){

  const popup =
    document.getElementById("savedAddressPopup");

  popup.classList.remove("open");

  // Keep body locked because profile popup
  // is still open behind this popup

  document.body.style.overflow = "hidden";

};


/* ================================
   SHOW SAVED LOCATIONS
================================ */

function renderSavedAddresses(){

  const list =
    document.getElementById("savedAddressList");


  const addresses = JSON.parse(
    localStorage.getItem("recentLocations") || "[]"
  );


  if(addresses.length === 0){

    list.innerHTML = `
      <div class="noSavedAddress">
        No saved address found
      </div>
    `;

    return;
  }


  list.innerHTML = addresses.map((loc, index) => {

    return `

      <div class="savedAddressCard">

        <div class="savedAddressCardIcon">
          <i class="fa-solid fa-location-dot"></i>
        </div>


        <div class="savedAddressCardText">

          <h3>
            Saved Address ${index + 1}
          </h3>

          <p>
            ${loc.name}
          </p>

        </div>

      </div>

    `;

  }).join("");

}


/* ================================
   SWIPE TO CLOSE
================================ */

let savedAddressStartX = 0;
let savedAddressStartY = 0;


const savedAddressPopupBox =
  document.getElementById("savedAddressPopup");


savedAddressPopupBox.addEventListener(
  "touchstart",
  function(e){

    // IMPORTANT:
    // Prevent profile popup swipe listener
    e.stopPropagation();


    const touch = e.touches[0];

    savedAddressStartX =
      touch.clientX;

    savedAddressStartY =
      touch.clientY;

  }
);


savedAddressPopupBox.addEventListener(
  "touchend",
  function(e){

    // IMPORTANT:
    // Only close Saved Address popup
    e.stopPropagation();


    const touch =
      e.changedTouches[0];


    const diffX =
      touch.clientX -
      savedAddressStartX;


    const diffY =
      touch.clientY -
      savedAddressStartY;


    if(
      Math.abs(diffX) > 90 &&
      Math.abs(diffY) < 70
    ){

      closeSavedAddressPopup();

    }

  }
);

function openAddressSheetFromProfile(){

  // close saved address page first
  document.getElementById("savedAddressPopup")
    ?.classList.remove("open");

  // close profile page also, so sheet works normally
  document.getElementById("cezooProfilePopup")
    ?.classList.remove("open");

  document.body.style.overflow = "";

  setTimeout(() => {
    openSheet();
  }, 100);
}


/* =====================================================
   USER ORDERS DATABASE
===================================================== */
function getOrdersSupabaseClient(){

  if(!window._supabaseClient){
    throw new Error("Supabase client is not initialized");
  }

  return window._supabaseClient;
}
/*
  This creates a separate Supabase connection only for
  loading the user's orders.

  If you already have a Supabase client called:
  window.supabaseClient
  it will use that client.
*/


/* =====================================================
   ORDER STATE
===================================================== */

let loggedUserOrders = [];

const userOrdersProductCache = {};
let userOrderTrackingMap = null;

/* =====================================================
   HELPERS
===================================================== */

function userOrderEscape(value){

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function userOrderNumber(value){

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;

}


function userOrderMoney(value){

  return new Intl.NumberFormat(
    "en-IN",
    {
      style:"currency",
      currency:"INR",
      maximumFractionDigits:2
    }
  ).format(userOrderNumber(value));

}


function userOrderDate(value){

  if(!value){
    return "—";
  }

  const date = new Date(value);

  if(Number.isNaN(date.getTime())){
    return String(value);
  }

  return date.toLocaleString(
    "en-IN",
    {
      day:"2-digit",
      month:"short",
      year:"numeric",
      hour:"2-digit",
      minute:"2-digit",
      hour12:true
    }
  );

}


function userOrderStatusText(status){

  const labels = {
    placed:"Order Placed",
    packed:"Packed",
    on_the_way:"On the Way",
    delivered:"Delivered",
    cancelled:"Cancelled",
    canceled:"Cancelled"
  };

  return labels[status] || "Order Placed";

}


function parseUserOrderItems(items){

  if(Array.isArray(items)){
    return items;
  }

  if(typeof items === "string"){

    try{

      const parsed = JSON.parse(items);

      return Array.isArray(parsed)
        ? parsed
        : [];

    }catch(error){

      console.error(
        "Order items JSON error:",
        error
      );

    }

  }

  return [];

}


function getLoggedUserMobile(){

  try{

    const user = JSON.parse(
      localStorage.getItem("cezooUser") || "null"
    );

    if(!user || !user.mobile){
      return "";
    }

    return String(user.mobile)
      .replace(/\D/g, "")
      .slice(-10);

  }catch(error){

    console.error(
      "Logged user read error:",
      error
    );

    return "";

  }

}


/* =====================================================
   OPEN / CLOSE YOUR ORDERS
===================================================== */

window.openYourOrdersPopup = function(){

  const popup =
    document.getElementById("yourOrdersPopup");

  if(!popup){
    return;
  }

  popup.classList.add("open");

  document.body.style.overflow = "hidden";

  closeUserOrderDetails();

  loadLoggedUserOrders();

};


window.closeYourOrdersPopup = function(){

  document
    .getElementById("yourOrdersPopup")
    ?.classList.remove("open");

  document
    .getElementById("userOrderDetailsPage")
    ?.classList.remove("open");

  /*
    Profile popup is still open behind it,
    so body must remain locked.
  */

  document.body.style.overflow = "hidden";

};


window.closeUserOrderDetails = function(){

  document
    .getElementById("userOrderDetailsPage")
    ?.classList.remove("open");


  if(userOrderTrackingMap){

    userOrderTrackingMap.remove();

    userOrderTrackingMap = null;

  }


  document.body.style.overflow = "hidden";

};


/* =====================================================
   LOAD FIRST PRODUCT FOR ORDER CARD
===================================================== */

async function loadSingleOrderProduct(item){

  if(!item){
    return null;
  }

  const tableName =
    String(item.product_table || "").trim();

  const productId =
    Number(item.product_id);


  if(
    !tableName ||
    !Number.isFinite(productId)
  ){
    return null;
  }


  const cacheKey =
    `${tableName}_${productId}`;


  if(userOrdersProductCache[cacheKey]){

    return {
      ...userOrdersProductCache[cacheKey],
      ordered_qty:
        userOrderNumber(item.qty) || 1
    };

  }


const { data, error } =
  await getOrdersSupabaseClient()
      .from(tableName)
      .select(`
        id,
        name,
        name_telugu,
        quantity,
        unit,
        original_price,
        discount_price,
        image1
      `)
      .eq("id", productId)
      .maybeSingle();


  if(error){

    console.error(
      `Could not load product from ${tableName}:`,
      error
    );

    return null;

  }


  if(!data){
    return null;
  }


  userOrdersProductCache[cacheKey] = {
    ...data,
    product_table:tableName
  };


  return {
    ...data,
    product_table:tableName,
    ordered_qty:
      userOrderNumber(item.qty) || 1
  };

}


/* =====================================================
   LOAD ALL PRODUCTS FOR ONE ORDER
===================================================== */

async function loadAllUserOrderProducts(items){

  const savedItems =
    parseUserOrderItems(items);


  if(savedItems.length === 0){
    return [];
  }


  const products =
    await Promise.all(

      savedItems.map(async item => {

        const product =
          await loadSingleOrderProduct(item);


        if(product){
          return product;
        }


        return {
          id:item.product_id,
          product_table:item.product_table,
          ordered_qty:
            userOrderNumber(item.qty) || 1,
          name:"Product information unavailable",
          quantity:"",
          unit:"",
          original_price:0,
          discount_price:0,
          image1:""
        };

      })

    );


  return products;

}


/* =====================================================
   LOAD ORDERS BY MOBILE NUMBER
===================================================== */

async function loadLoggedUserOrders(){

  const container =
    document.getElementById("yourOrdersContent");


  if(!container){
    return;
  }


  const mobile =
    getLoggedUserMobile();


  if(!mobile){

    container.innerHTML = `

      <div class="userOrdersState">

        <i class="fa-solid fa-user-lock"></i>

        <h3>Login required</h3>

        <p>
          Please log in to view your orders.
        </p>

      </div>
    `;

    return;

  }


  container.innerHTML = `

    <div class="userOrdersState">

      <div class="userOrdersSpinner"></div>

      <h3>Loading your orders</h3>

      <p>
        Fetching orders linked to your mobile number.
      </p>

    </div>
  `;


  /*
    Supports database mobile values such as:
    9502877675
    919502877675
    +919502877675
    +91 9502877675
  */

  const mobileVariants = [
    mobile,
    `91${mobile}`,
    `+91${mobile}`,
    `+91 ${mobile}`
  ];


  try{

    const [
      cashResponse,
      upiResponse
    ] = await Promise.all([

      getOrdersSupabaseClient()
  .from("cash_delivery_orders")
        .select("*")
        .in("user_mobile", mobileVariants)
        .order("created_at", {
          ascending:false
        }),

     getOrdersSupabaseClient()
  .from("upi_orders")
        .select("*")
        .in("user_mobile", mobileVariants)
        .order("created_at", {
          ascending:false
        })

    ]);


    if(cashResponse.error){
      throw cashResponse.error;
    }

    if(upiResponse.error){
      throw upiResponse.error;
    }


    const cashOrders =
      (cashResponse.data || []).map(order => ({
        ...order,
        _order_type:"cash"
      }));


    const upiOrders =
      (upiResponse.data || []).map(order => ({
        ...order,
        _order_type:"upi"
      }));


    loggedUserOrders = [
      ...cashOrders,
      ...upiOrders
    ].sort((first, second) => {

      return (
        new Date(second.created_at).getTime() -
        new Date(first.created_at).getTime()
      );

    });


    await renderLoggedUserOrders();


  }catch(error){

    console.error(
      "User orders load error:",
      error
    );


    container.innerHTML = `

      <div class="userOrdersState">

        <i class="fa-solid fa-triangle-exclamation"></i>

        <h3>Could not load orders</h3>

        <p>
          ${userOrderEscape(
            error.message ||
            "Please try again."
          )}
        </p>

      </div>
    `;

  }

}


/* =====================================================
   RENDER USER ORDER CARDS
===================================================== */

async function renderLoggedUserOrders(){

  const container =
    document.getElementById("yourOrdersContent");


  if(loggedUserOrders.length === 0){

    container.innerHTML = `

      <div class="userOrdersState">

        <i class="fa-regular fa-box-open"></i>

        <h3>No orders found</h3>

        <p>
          Orders placed using this mobile number
          will appear here.
        </p>

      </div>
    `;

    return;

  }


  const cards =
    await Promise.all(

      loggedUserOrders.map(
        async (order, index) => {

          const items =
            parseUserOrderItems(order.items);


          
const orderProducts =
  await loadAllUserOrderProducts(items);



const orderImagesHtml =
  orderProducts.length
    ? orderProducts.map(product => {

        return `
          <div class="userOrderMiniImage">

            ${
              product.image1
                ? `
                  <img
                    src="${userOrderEscape(product.image1)}"
                    alt="${userOrderEscape(product.name || "Product")}"
                    loading="lazy"
                  >
                `
                : `
                  <i class="fa-solid fa-box"></i>
                `
            }

            <span>
              ×${userOrderNumber(product.ordered_qty) || 1}
            </span>

          </div>
        `;

      }).join("")
    : `
      <div class="userOrderMiniImage">
        <i class="fa-solid fa-box"></i>
      </div>
    `;

          const remainingItems =
            Math.max(
              0,
              items.length - 1
            );
const totalItemCount = items.reduce((total, item) => {
  return total + (userOrderNumber(item.qty) || 1);
}, 0);

          const statusClass =
            String(
              order.order_status || "placed"
            )
            .toLowerCase()
            .replace(/[^a-z_]/g, "");


          return `

            <div
              class="userOrderCard"
              onclick="openRecentOrderDetails(${index})"
            >

              <div class="userOrderTopRow">

              <div class="userOrderImagesViewport">

  <div class="userOrderImagesRow">
    ${orderImagesHtml}
  </div>

</div>


                <div class="userOrderMainInfo">

               

                  <div class="userOrderQuantity">
  Total Items: ${totalItemCount}
</div>

                  <div class="userOrderId">
                    Order ID:
                    ${userOrderEscape(order.order_id || "—")}
                  </div>
  <div class="userOrderCustomerName">
    Name:
    ${userOrderEscape(order.user_name || "—")}
  </div>

    <div class="userOrderCustomerMobile">
    Mobile:
    ${userOrderEscape(order.user_mobile || "—")}
  </div>
                </div>


                <div class="userOrderArrow">

                  <i class="fa-solid fa-chevron-right"></i>

                </div>

              </div>


              <div class="userOrderDivider"></div>


              <div class="userOrderAddress">

                <i class="fa-solid fa-location-dot"></i>

                <span>
                  ${userOrderEscape(
                    order.address ||
                    order.village ||
                    "Delivery address unavailable"
                  )}
                </span>

              </div>


              <div class="userOrderBottomRow">

                <div
                  class="userOrderStatus ${statusClass}"
                >
                  ${userOrderEscape(
                    userOrderStatusText(
                      order.order_status
                    )
                  )}
                </div>


                <div class="userOrderPrice">

                  ${userOrderMoney(
                    order.total_amount
                  )}

                </div>

              </div>

            </div>
          `;

        }
      )

    );


  container.innerHTML =
    cards.join("");

}
function initializeUserOrderMap(order){

  const mapBox =
    document.getElementById("userOrderTrackingMap");

  if(!mapBox){
    return;
  }

  const latitude =
    Number(order.latitude);

  const longitude =
    Number(order.longitude);

  if(
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude === 0 ||
    longitude === 0
  ){
    return;
  }

  currentUserOrderMapLocation = {
    latitude,
    longitude
  };

  if(userOrderTrackingMap){

    userOrderTrackingMap.remove();

    userOrderTrackingMap = null;

  }

  userOrderTrackingMap =
    L.map(
      mapBox,
      {
        zoomControl:false,
        attributionControl:false,
        dragging:true,
        scrollWheelZoom:false,
doubleClickZoom:true,
touchZoom:true,
boxZoom:true
      }
    ).setView(
      [latitude, longitude],
      16
    );
L.DomEvent.disableClickPropagation(mapBox);
L.DomEvent.disableScrollPropagation(mapBox);

mapBox.addEventListener("touchstart", function(e){
  e.stopPropagation();
});

mapBox.addEventListener("touchmove", function(e){
  e.stopPropagation();
});

mapBox.addEventListener("touchend", function(e){
  e.stopPropagation();
});

  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom:19
    }
  ).addTo(userOrderTrackingMap);

  const locationMarkerIcon =
    L.divIcon({
      className:"",
      html:`
        <div class="userOrderMapMarker"></div>
      `,
      iconSize:[22,22],
      iconAnchor:[11,11]
    });

  L.marker(
    [latitude, longitude],
    {
      icon:locationMarkerIcon
    }
  ).addTo(userOrderTrackingMap);

  setTimeout(function(){

    userOrderTrackingMap?.invalidateSize();

  }, 200);

}
window.openUserOrderDetails =
async function(index){

  const order =
    loggedUserOrders[index];


  if(!order){
    return;
  }


  const page =
    document.getElementById(
      "userOrderDetailsPage"
    );


  const content =
    document.getElementById(
      "userOrderDetailsContent"
    );


  page.classList.add("open");

  document.body.style.overflow =
    "hidden";


  content.innerHTML = `

    <div class="userOrdersState">

      <div class="userOrdersSpinner"></div>

      <h3>Loading order details</h3>

      <p>
        Loading ordered product information.
      </p>

    </div>
  `;


  try{

    const products =
      await loadAllUserOrderProducts(
        order.items
      );


    const instructions =
      Array.isArray(order.delivery_instructions)
        ? order.delivery_instructions
        : [];


    const productsHtml =
      products.length
        ? products.map(product => {

            const qty =
              userOrderNumber(
                product.ordered_qty
              ) || 1;


            const price =
              userOrderNumber(
                product.discount_price ||
                product.original_price
              );


            return `

              <div class="userOrderedProduct">

                <div class="userOrderedProductImage">

                  ${
                    product.image1
                      ? `
                        <img
                          src="${userOrderEscape(product.image1)}"
                          alt="${userOrderEscape(product.name)}"
                          loading="lazy"
                        >
                      `
                      : `
                        <i
                          class="fa-solid fa-box"
                          style="color:#bbb;font-size:22px"
                        ></i>
                      `
                  }

                </div>


                <div class="userOrderedProductInfo">

                  <div class="userOrderedProductName">

                    ${userOrderEscape(product.name)}

                  </div>


                  <div class="userOrderedProductPack">

                    ${userOrderEscape(
                      `${product.quantity || ""} ${product.unit || ""}`.trim() ||
                      "Pack information unavailable"
                    )}

                  </div>


                  <div class="userOrderedProductQty">

                    Quantity: ${qty}

                  </div>

                </div>


                <div class="userOrderedProductPrice">

                  ${userOrderMoney(
                    price * qty
                  )}

                </div>

              </div>
            `;

          }).join("")

        : `

          <div class="userOrdersState">

            <i class="fa-regular fa-box-open"></i>

            <p>
              No product information found.
            </p>

          </div>
        `;


    
content.innerHTML = `

${
  Number.isFinite(Number(order.latitude)) &&
  Number.isFinite(Number(order.longitude)) &&
  Number(order.latitude) !== 0 &&
  Number(order.longitude) !== 0

    ? `
      <div class="userOrderTrackingMapWrap">

        <div id="userOrderTrackingMap"></div>

        <button
          class="userOrderMapBackBtn"
          type="button"
          onclick="closeUserOrderDetails()"
          aria-label="Back"
        >
          ‹
        </button>

        <button
          class="userOrderMapRefreshBtn"
          type="button"
          onclick="refreshUserOrderMap()"
          aria-label="Recenter map"
        >
          <i class="fa-solid fa-location-crosshairs"></i>
        </button>

      </div>
    `

    : `
      <div class="userOrderTrackingMapWrap">

        <div class="userOrderMapNoLocation">
          <i class="fa-solid fa-location-dot"></i>
          <span>Location not available</span>
        </div>

        <button
          class="userOrderMapBackBtn"
          type="button"
          onclick="closeUserOrderDetails()"
          aria-label="Back"
        >
          ‹
        </button>

      </div>
    `
}

<div class="orderDeliveryPartnerCard">

  <div class="orderDeliveryPartnerProfile">
    <i class="fa-solid fa-user"></i>
  </div>

  <div class="orderDeliveryPartnerInfo">

    <div class="orderDeliveryPartnerLabel">
      Delivery Partner
    </div>

    <div class="orderDeliveryPartnerName">
      Mohammad
    </div>

  </div>

  <button
    class="orderDeliveryPartnerCall"
    type="button"
    onclick="callDeliveryPartner()"
    aria-label="Call delivery partner"
  >
    <i class="fa-solid fa-phone"></i>
  </button>

</div>



<div class="userOrderDetailCard">

  <div class="userOrderDetailHeading">

    <i class="fa-solid fa-box-open"></i>

    Order Information

  </div>

        <div class="userOrderDetailRow">

          <span>Order ID</span>

          <strong>
            ${userOrderEscape(order.order_id || "—")}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Order date</span>

          <strong>
            ${userOrderEscape(
              userOrderDate(order.created_at)
            )}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Status</span>

          <strong>
            ${userOrderEscape(
              userOrderStatusText(
                order.order_status
              )
            )}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Mobile</span>

          <strong>
            ${userOrderEscape(order.user_mobile || "—")}
          </strong>

        </div>

      </div>


      <div class="userOrderDetailCard">

        <div class="userOrderDetailHeading">

          <i class="fa-solid fa-basket-shopping"></i>

          Items Ordered

        </div>

        ${productsHtml}

      </div>


      <div class="userOrderDetailCard">

        <div class="userOrderDetailHeading">

          <i class="fa-solid fa-location-dot"></i>

          Delivery Address

        </div>


        <div class="userOrderDetailRow">

          <span>Name</span>

          <strong>
            ${userOrderEscape(order.user_name || "—")}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Village</span>

          <strong>
            ${userOrderEscape(order.village || "—")}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Address</span>

          <strong>
            ${userOrderEscape(order.address || "—")}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Delivery mode</span>

          <strong>
            ${
              order.delivery_mode === "12_hours"
                ? "Scheduled Delivery"
                : "Instant Delivery"
            }
          </strong>

        </div>




      </div>


      ${
  instructions.length
    ? `
      <div class="userOrderDetailCard">

        <div class="userOrderDetailHeading">
          <i class="fa-solid fa-list-check"></i>
          Delivery Instructions
        </div>

        <div class="orderInstructionGrid">

          ${instructions.map(text => {

            const value = String(text).toLowerCase();

            let icon = "fa-solid fa-box";

            if(value.includes("security")){
              icon = "fa-solid fa-shield-halved";
            }
            else if(value.includes("door")){
              icon = "fa-solid fa-door-closed";
            }
            else if(value.includes("ring")){
              icon = "fa-solid fa-bell-slash";
            }
            else if(value.includes("pet")){
              icon = "fa-solid fa-paw";
            }

            return `
              <div class="orderInstructionItem">

                <div class="orderInstructionIcon">
                  <i class="${icon}"></i>
                </div>

                <div class="orderInstructionText">
                  ${userOrderEscape(text)}
                </div>

              </div>
            `;

          }).join("")}

        </div>

      </div>
    `
    : ""
}

      <div class="userOrderDetailCard">

        <div class="userOrderDetailHeading">

          <i class="fa-solid fa-receipt"></i>

          Bill Details

        </div>


        <div class="userOrderDetailRow">

          <span>Item total</span>

          <strong>
            ${userOrderMoney(order.item_total)}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Delivery fee</span>

          <strong>
            ${userOrderMoney(order.delivery_fee)}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Handling fee</span>

          <strong>
            ${userOrderMoney(order.handling_fee)}
          </strong>

        </div>


        <div class="userOrderDetailRow">

          <span>Delivery tip</span>

          <strong>
            ${userOrderMoney(order.delivery_tip)}
          </strong>

        </div>


        <div class="userOrderDetailRow userOrderDetailTotal">

          <span>Total amount</span>

          <strong>
            ${userOrderMoney(order.total_amount)}
          </strong>

        </div>

      </div>


      <div class="userOrderDetailCard">

        <div class="userOrderDetailHeading">

          <i class="fa-solid fa-credit-card"></i>

          Payment

        </div>


        <div class="userOrderDetailRow">

          <span>Payment method</span>

          <strong>
            ${
              order._order_type === "upi"
                ? "UPI Payment"
                : "Cash on Delivery"
            }
          </strong>

        </div>


        <div class="userOrderDetailRow">

  <span>Payment status</span>

  <strong>
    ${userOrderEscape(
      order.payment_status || "Pending"
    )}
  </strong>

</div>

</div>
<div class="userOrderCancelArea">

  <button
    class="userOrderCancelBtn"
    type="button"
  >
    Cancel Order
  </button>

</div>
`;


/* INITIALIZE ORDER LOCATION MAP */

if(
  Number.isFinite(Number(order.latitude)) &&
  Number.isFinite(Number(order.longitude)) &&
  Number(order.latitude) !== 0 &&
  Number(order.longitude) !== 0
){

  setTimeout(function(){

    initializeUserOrderMap(order);

  }, 100);

}


}
catch(error){

  console.error(
    "Order detail error:",
    error
  );

  content.innerHTML = `

    <div class="userOrdersState">

      <i class="fa-solid fa-triangle-exclamation"></i>

      <h3>Unable to load details</h3>

      <p>
        ${userOrderEscape(
          error.message ||
          "Please try again."
        )}
      </p>

    </div>
  `;

}

};

let currentUserOrderMapLocation = null;

window.refreshUserOrderMap = function(){

  if(
    !userOrderTrackingMap ||
    !currentUserOrderMapLocation
  ){
    return;
  }

  userOrderTrackingMap.invalidateSize();

  userOrderTrackingMap.setView(
    [
      currentUserOrderMapLocation.latitude,
      currentUserOrderMapLocation.longitude
    ],
    16,
    {
      animate:true
    }
  );

};


async function loadProfileRecentOrders(){

  const container =
    document.getElementById("profileRecentOrders");

  if(!container) return;


  const mobile = getLoggedUserMobile();

  if(!mobile){
    container.innerHTML = "";
    return;
  }


  container.innerHTML = `
    <div class="userOrdersState">
      <div class="userOrdersSpinner"></div>
      <p>Loading recent orders...</p>
    </div>
  `;


  const mobileVariants = [
    mobile,
    `91${mobile}`,
    `+91${mobile}`,
    `+91 ${mobile}`
  ];


  try{

    const [cashResponse, upiResponse] =
      await Promise.all([

        getOrdersSupabaseClient()
          .from("cash_delivery_orders")
          .select("*")
          .in("user_mobile", mobileVariants)
          .order("created_at", {
            ascending:false
          })
          .limit(3),

        getOrdersSupabaseClient()
          .from("upi_orders")
          .select("*")
          .in("user_mobile", mobileVariants)
          .order("created_at", {
            ascending:false
          })
          .limit(3)

      ]);


    const cashOrders =
      (cashResponse.data || []).map(order => ({
        ...order,
        _order_type:"cash"
      }));


    const upiOrders =
      (upiResponse.data || []).map(order => ({
        ...order,
        _order_type:"upi"
      }));


    loggedUserOrders = [
      ...cashOrders,
      ...upiOrders
    ]
    .sort((a,b) =>
      new Date(b.created_at) -
      new Date(a.created_at)
    )
    .slice(0,3);


    await renderProfileRecentOrders();

  }
  catch(error){

    console.error(error);

    container.innerHTML = `
      <div class="userOrdersState">
        <p>Could not load recent orders</p>
      </div>
    `;

  }

}
async function renderProfileRecentOrders(){

  const container =
    document.getElementById("profileRecentOrders");

  if(!container) return;


  if(loggedUserOrders.length === 0){

    container.innerHTML = `
      <div class="userOrdersState">
        <i class="fa-regular fa-box-open"></i>
        <p>No recent orders found</p>
      </div>
    `;

    return;
  }


  const cards = await Promise.all(

    loggedUserOrders.map(async (order, index) => {

      const items =
        parseUserOrderItems(order.items);


      const products =
        await loadAllUserOrderProducts(items);


      const imagesHtml = products.map(product => `

        <div class="userOrderMiniImage">

          ${
            product.image1
              ? `
                <img
                  src="${userOrderEscape(product.image1)}"
                  loading="lazy"
                >
              `
              : `
                <i class="fa-solid fa-box"></i>
              `
          }

          <span>
            ×${product.ordered_qty || 1}
          </span>

        </div>

      `).join("");


      const totalItems = items.reduce(
        (total, item) =>
          total + (userOrderNumber(item.qty) || 1),
        0
      );


    return `

  <div
    class="recentOrderCard"
  onclick="openRecentOrderDetails(${index})"
  >

    <div class="recentOrderHeader">

      <div class="recentOrderIcon">
        <i class="fa-solid fa-bag-shopping"></i>
      </div>

      <div class="recentOrderHeaderInfo">

        <div class="recentOrderId">
          ${userOrderEscape(order.order_id || "Order")}
        </div>

        <div class="recentOrderDate">
          ${userOrderEscape(userOrderDate(order.created_at))}
        </div>

      </div>

      <div class="recentOrderArrow">
        <i class="fa-solid fa-chevron-right"></i>
      </div>

    </div>


    <div class="recentOrderProducts">

      <div class="recentOrderImages">
        ${imagesHtml}
      </div>

    </div>


   <div class="recentOrderMeta">

  <div class="recentOrderMetaItem">

    <i class="fa-solid fa-box"></i>

    <span>
      ${totalItems}
      ${totalItems === 1 ? "Item" : "Items"}
    </span>

  </div>

</div>


<div class="recentOrderLocation">

  <i class="fa-solid fa-location-dot"></i>

  <span>
    ${userOrderEscape(
      order.village ||
      order.address ||
      "Delivery address"
    )}
  </span>

</div>

    </div>


    <div class="recentOrderFooter">

      <div class="recentOrderStatus ${
        String(order.order_status || "placed")
          .toLowerCase()
          .replace(/[^a-z_]/g, "")
      }">

        <span class="recentOrderStatusDot"></span>

        ${userOrderEscape(
          userOrderStatusText(order.order_status)
        )}

      </div>

      <div class="recentOrderAmount">
        ${userOrderMoney(order.total_amount)}
      </div>

    </div>

  </div>

`;

    })

  );


  container.innerHTML = cards.join("");

}
window.openRecentOrderDetails = async function(index){

  const ordersPopup =
    document.getElementById("yourOrdersPopup");

  const detailsPage =
    document.getElementById("userOrderDetailsPage");

  if(!ordersPopup || !detailsPage){
    console.error("Orders popup or details page not found");
    return;
  }

  // Open parent first
  ordersPopup.classList.add("open");

  // Open details page
  detailsPage.classList.add("open");

  document.body.style.overflow = "hidden";

  // Load selected order details
  await window.openUserOrderDetails(index);
};
