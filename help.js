/* =========================================
   HELP POPUP OPEN / CLOSE
========================================= */

window.openHelpPopup = function(){

  const popup =
    document.getElementById("helpPopup");

  if(!popup){
    return;
  }

  popup.classList.add("open");

  document.body.style.overflow = "hidden";
};


window.closeHelpPopup = function(){

  const popup =
    document.getElementById("helpPopup");

  if(!popup){
    return;
  }

  popup.classList.remove("open");

  document.body.style.overflow = "hidden";

  setTimeout(function(){

    resetHelpChat();

  },250);

};


/* HELP BUTTON CLICK */

const profileHelpBtn =
  document.getElementById("profileHelpBtn");

if(profileHelpBtn){

  profileHelpBtn.addEventListener(
    "click",
    function(e){

      e.stopPropagation();

      openHelpPopup();

    }
  );

}


/* =========================================
   HELP POPUP SWIPE BACK
========================================= */
let selectedHelpOrder = null;
let helpUserOrders = [];
let helpSwipeStartX = 0;
let helpSwipeStartY = 0;
let helpSwipeAllowed = false;

const helpPopupBox =
  document.getElementById("helpPopup");

if(helpPopupBox){

  helpPopupBox.addEventListener(
    "touchstart",
    function(e){

      e.stopPropagation();

      const touch = e.touches[0];

      helpSwipeStartX = touch.clientX;
      helpSwipeStartY = touch.clientY;

      // Swipe-back only from left edge
      helpSwipeAllowed =
        helpSwipeStartX <= 35;

    },
    {
      passive:true
    }
  );


  helpPopupBox.addEventListener(
    "touchend",
    function(e){

      e.stopPropagation();

      if(!helpSwipeAllowed){
        return;
      }

      const touch = e.changedTouches[0];

      const diffX =
        touch.clientX - helpSwipeStartX;

      const diffY =
        touch.clientY - helpSwipeStartY;

      if(
        diffX > 90 &&
        Math.abs(diffY) < 70
      ){
        closeHelpPopup();
      }

      helpSwipeAllowed = false;

    },
    {
      passive:true
    }
  );

}
/* =====================================================
   CEZOO HELP CHAT — JAVASCRIPT ONLY
===================================================== */



let cezooHelpChatReady = false;
let selectedHelpIssue = "";

let helpConversation = [];
let helpTicketCreated = false;
/* GET USER NAME */

function getHelpUserName(){

  try{

    const user = JSON.parse(
      localStorage.getItem("cezooUser") || "null"
    );

    if(user?.name){

      return String(user.name)
        .trim()
        .split(" ")
        .map(word =>
          word.charAt(0).toUpperCase() +
          word.slice(1).toLowerCase()
        )
        .join(" ");

    }

  }catch(error){
    console.error("Help user error:", error);
  }

  return "there";
}


/* ESCAPE USER MESSAGE */

function escapeHelpMessage(value){

  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* CREATE HELP CHAT */

function createHelpChat(){

  if(cezooHelpChatReady){
    return;
  }

  const popup =
    document.getElementById("helpPopup");

  const header =
    popup?.querySelector(".helpHeader");

  if(!popup || !header){
    return;
  }


  /* STYLE */

  const style =
    document.createElement("style");

  style.id = "cezooHelpChatStyle";

  style.innerHTML = `

  .helpChatPage{
    height:calc(
      100dvh -
      117px -
      env(safe-area-inset-top)
    );

    display:flex;
    flex-direction:column;

    background:#f5f6f8;
  }

  .helpChatMessages{
    flex:1;

    padding:18px 14px 22px;

    overflow-y:auto;
    overflow-x:hidden;

    -webkit-overflow-scrolling:touch;
  }

  .helpSupportMessage{
    display:flex;
    align-items:flex-end;
    gap:9px;

    margin-bottom:14px;
  }

  .helpSupportIcon{
    width:34px;
    height:34px;

    flex-shrink:0;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:50%;

    background:#222222;
    color:#ffffff;

    font-size:14px;
  }

  .helpSupportBubble{
    max-width:82%;

    padding:11px 13px;

    border:1px solid #e5e5e5;
    border-radius:16px 16px 16px 4px;

    background:#ffffff;
    color:#222222;

    font-size:13px;
    line-height:1.48;
    font-weight:500;

    box-shadow:
      0 3px 10px rgba(0,0,0,.035);
  }

  .helpUserMessage{
    display:flex;
    justify-content:flex-end;

    margin-bottom:13px;
  }

  .helpUserBubble{
    max-width:80%;

    padding:11px 13px;

    border:1px solid #dddddd;
    border-radius:16px 16px 4px 16px;

    background:#e9e9e9;
    color:#222222;

    font-size:13px;
    line-height:1.45;
    font-weight:600;
  }

  .helpIssueTitle{
    margin:20px 2px 10px;

    font-size:12px;
    font-weight:800;

    color:#666666;
  }

  .helpIssueOptions{
    display:flex;
    flex-wrap:wrap;
    gap:8px;

    margin-bottom:18px;
  }

  .helpIssueOption{
    margin:0;
    padding:9px 12px;

    border:1px solid #dddddd;
    border-radius:20px;

    background:#ffffff;
    color:#333333;

    font-size:11.5px;
    font-weight:700;

    cursor:pointer;

    -webkit-tap-highlight-color:transparent;
  }

  .helpIssueOption.selected{
    border-color:#222222;

    background:#eeeeee;
    color:#222222;
  }

  .helpIssueOption:disabled{
    opacity:1;
    cursor:default;
  }

  .helpTyping{
    width:max-content;

    margin:
      0
      0
      14px
      43px;

    padding:11px 14px;

    display:flex;
    gap:4px;

    border:1px solid #e5e5e5;
    border-radius:16px 16px 16px 4px;

    background:#ffffff;
  }

  .helpTyping span{
    width:6px;
    height:6px;

    border-radius:50%;

    background:#888888;

    animation:helpTypingAnimation 1s infinite;
  }

  .helpTyping span:nth-child(2){
    animation-delay:.15s;
  }

  .helpTyping span:nth-child(3){
    animation-delay:.30s;
  }

  @keyframes helpTypingAnimation{

    0%,
    60%,
    100%{
      transform:translateY(0);
      opacity:.45;
    }

    30%{
      transform:translateY(-4px);
      opacity:1;
    }

  }

  .helpOrderLoading{
    width:max-content;

    margin:
      4px
      0
      15px
      43px;

    padding:11px 13px;

    display:flex;
    align-items:center;
    gap:9px;

    border:1px solid #e5e5e5;
    border-radius:14px;

    background:#ffffff;

    font-size:11px;
    font-weight:600;
    color:#777777;
  }

  .helpOrderLoadingSpinner{
    width:17px;
    height:17px;

    border:2px solid #e5e5e5;
    border-top-color:#222222;
    border-radius:50%;

    animation:helpOrderSpin .7s linear infinite;
  }

  @keyframes helpOrderSpin{
    to{
      transform:rotate(360deg);
    }
  }

  .helpOrdersList{
    display:flex;
    flex-direction:column;
    gap:10px;

    margin:
      4px
      0
      18px
      43px;
  }

  .helpOrderCard{
    width:calc(100% - 8px);
    min-height:92px;

    margin:0;
    padding:11px;

    display:flex;
    align-items:center;
    gap:11px;

    border:1px solid #e4e4e4;
    border-radius:16px;

    background:#ffffff;

    text-align:left;

    cursor:pointer;

    box-shadow:
      0 3px 10px rgba(0,0,0,.035);

    -webkit-tap-highlight-color:transparent;
  }

  .helpOrderCard.selected{
    border-color:#222222;
    background:#f3f3f3;
  }

  .helpOrderCard:disabled{
    opacity:1;
    cursor:default;
  }

.helpOrderProductImage{
  width:76px;
  height:68px;
  flex-shrink:0;

  position:relative;
}

.helpOrderThumb{
  position:absolute;

  width:48px;
  height:48px;

  overflow:hidden;

  border:2px solid #ffffff;
  border-radius:12px;

  background:#f7f7f7;

  box-shadow:0 2px 7px rgba(0,0,0,.12);
}

.helpOrderThumb img{
  width:100%;
  height:100%;

  padding:4px;

  display:block;
  object-fit:contain;

  box-sizing:border-box;
}

/* first image in front */
.helpOrderThumb:nth-child(1){
  left:0;
  top:14px;
  z-index:3;
}

/* second image behind */
.helpOrderThumb:nth-child(2){
  left:14px;
  top:8px;
  z-index:2;
}

/* third image further behind */
.helpOrderThumb:nth-child(3){
  left:28px;
  top:2px;
  z-index:1;
}

.helpOrderProductEmpty{
  width:58px;
  height:58px;

  display:flex;
  align-items:center;
  justify-content:center;

  border:1px solid #eeeeee;
  border-radius:13px;

  background:#f7f7f7;
  color:#aaaaaa;
}

.helpOrderProductEmpty i{
  font-size:20px;
}
    

 
  .helpOrderCardInfo{
    flex:1;
    min-width:0;
  }

  .helpOrderProductName{
    display:-webkit-box;

    overflow:hidden;

    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;

    font-size:12.5px;
    line-height:1.35;
    font-weight:800;

    color:#202020;
  }

  .helpOrderMoreItems{
    margin-top:3px;

    font-size:9.5px;
    font-weight:600;

    color:#999999;
  }

  .helpOrderCardMeta{
    margin-top:7px;

    display:flex;
    align-items:center;
    gap:6px;

    font-size:10px;
    line-height:1.3;
    font-weight:650;

    color:#666666;
  }

  .helpOrderMetaDot{
    width:3px;
    height:3px;

    flex-shrink:0;

    border-radius:50%;

    background:#aaaaaa;
  }

  .helpOrderCardDate{
    margin-top:4px;

    overflow:hidden;

    white-space:nowrap;
    text-overflow:ellipsis;

    font-size:9.5px;
    line-height:1.3;
    font-weight:500;

    color:#aaaaaa;
  }

  .helpOrderCardRight{
    align-self:stretch;

    flex-shrink:0;

    display:flex;
    flex-direction:column;
    align-items:flex-end;
    justify-content:space-between;

    padding:3px 0;
  }

  .helpOrderCardPrice{
    font-size:13px;
    line-height:1.2;
    font-weight:900;

    color:#111111;
  }

  .helpOrderCardRight > i{
    font-size:10px;

    color:#aaaaaa;
  }

  .helpNoOrders{
    margin:
      5px
      0
      15px
      43px;

    padding:14px;

    border:1px solid #e6e6e6;
    border-radius:14px;

    background:#ffffff;

    font-size:11px;
    line-height:1.5;
    font-weight:600;

    color:#777777;
  }

  .helpChatInputArea{
  width:100%;

  padding:
  10px
  12px
  calc(29px + env(safe-area-inset-bottom));
  display:flex;
  align-items:center;
  gap:9px;

  border-top:1px solid #e6e6e6;

  background:#ffffff;
}
  .helpChatInput{
    flex:1;
    height:45px;

    padding:0 15px;

    border:1px solid #dedede;
    border-radius:23px;

    outline:none;

    background:#f7f7f7;
    color:#222222;

    font-size:13px;
    font-weight:500;
  }

  .helpChatInput:focus{
    border-color:#222222;
    background:#ffffff;
  }

  .helpChatInput:disabled{
    background:#f2f2f2;
    color:#999999;
  }

  .helpChatSendBtn{
    width:45px;
    height:45px;

    flex-shrink:0;

    margin:0;
    padding:0;

    display:flex;
    align-items:center;
    justify-content:center;

    border:none;
    border-radius:50%;

    background:#222222;
    color:#ffffff;

    font-size:16px;

    cursor:pointer;

    -webkit-tap-highlight-color:transparent;
  }

  .helpChatSendBtn:disabled{
    opacity:.45;
    cursor:default;
  }

  .helpChatSendBtn:active,
  .helpIssueOption:active,
  .helpOrderCard:active{
    transform:none;
  }

`;

  document.head.appendChild(style);


  /* CHAT HTML */

  const chatPage =
    document.createElement("div");

  chatPage.className = "helpChatPage";

  chatPage.innerHTML = `

    <div
      id="helpChatMessages"
      class="helpChatMessages"
    ></div>

    <div class="helpChatInputArea">

      <input
        id="helpChatInput"
        class="helpChatInput"
        type="text"
        placeholder="Type your message..."
        autocomplete="off"
      >

      <button
        id="helpChatSendBtn"
        class="helpChatSendBtn"
        type="button"
        aria-label="Send message"
      >
        <i class="fa-solid fa-paper-plane"></i>
      </button>

    </div>

  `;

  header.insertAdjacentElement(
    "afterend",
    chatPage
  );


  document
    .getElementById("helpChatSendBtn")
    .addEventListener("click", sendHelpMessage);


  document
    .getElementById("helpChatInput")
    .addEventListener("keydown", function(event){

      if(event.key === "Enter"){
        sendHelpMessage();
      }

    });


  cezooHelpChatReady = true;

  renderHelpChatHome();
}


/* INITIAL CHAT */

function renderHelpChatHome(){

  const messages =
    document.getElementById("helpChatMessages");

  if(!messages){
    return;
  }

  selectedHelpIssue = "";

  const name =
    escapeHelpMessage(getHelpUserName());

  messages.innerHTML = `

    <div class="helpSupportMessage">

      <div class="helpSupportIcon">
        <i class="fa-solid fa-headset"></i>
      </div>

      <div class="helpSupportBubble">

       <div class="helpGreeting">
  Hi <strong>${name}</strong> 👋
</div>

<div class="helpGreetingSub">
  How can I help you today?
</div>

      </div>

    </div>


    <div class="helpIssueTitle">
      Select an issue
    </div>


    <div class="helpIssueOptions">

      <button
        class="helpIssueOption"
        type="button"
        data-issue="Delivery issue"
      >
        Delivery issue
      </button>

      <button
        class="helpIssueOption"
        type="button"
        data-issue="Return or exchange"
      >
        Return or exchange
      </button>

      <button
        class="helpIssueOption"
        type="button"
        data-issue="Payment issue"
      >
        Payment issue
      </button>

      <button
        class="helpIssueOption"
        type="button"
        data-issue="Refund issue"
      >
        Refund issue
      </button>

      <button
        class="helpIssueOption"
        type="button"
        data-issue="Missing product"
      >
        Missing product
      </button>

      <button
        class="helpIssueOption"
        type="button"
        data-issue="Damaged product"
      >
        Damaged product
      </button>

      <button
        class="helpIssueOption"
        type="button"
        data-issue="Other issue"
      >
        Other issue
      </button>

    </div>

  `;


  messages
    .querySelectorAll(".helpIssueOption")
    .forEach(button => {

      button.addEventListener("click", function(){

        selectHelpIssue(
          this.dataset.issue,
          this
        );

      });

    });

}

function showChangeHelpIssueButton(){

  const messages =
    document.getElementById("helpChatMessages");

  if(!messages){
    return;
  }

  document
    .getElementById("helpChangeIssueWrap")
    ?.remove();

  messages.insertAdjacentHTML(
    "beforeend",
    `
      <div
        id="helpChangeIssueWrap"
        class="helpChangeIssueWrap"
      >
        <button
          class="helpChangeIssueBtn"
          type="button"
          onclick="changeHelpIssue()"
        >
          <i class="fa-solid fa-rotate-left"></i>
          Change issue
        </button>
      </div>
    `
  );
}
window.changeHelpIssue = function(){

  selectedHelpIssue = "";
  selectedHelpOrder = null;
  helpUserOrders = [];

  const input =
    document.getElementById("helpChatInput");

  if(input){
    input.value = "";
    input.disabled = false;
    input.placeholder = "Type your message...";
  }

  renderHelpChatHome();
};
/* SELECT ISSUE */
async function selectHelpIssue(issue, button){

  selectedHelpIssue = issue;
  selectedHelpOrder = null;

  document
    .querySelectorAll(".helpIssueOption")
    .forEach(item => {

      item.classList.remove("selected");
      item.disabled = true;

    });

  button.classList.add("selected");

showChangeHelpIssueButton();
  const messages =
    document.getElementById("helpChatMessages");

  const input =
    document.getElementById("helpChatInput");

  if(!messages || !input){
    return;
  }


  // Send selected issue as user message
  messages.insertAdjacentHTML(
    "beforeend",
    `

      <div class="helpUserMessage">

        <div class="helpUserBubble">
          ${escapeHelpMessage(issue)}
        </div>

      </div>

    `
  );


  messages.scrollTo({
    top:messages.scrollHeight,
    behavior:"smooth"
  });


  // Bot typing animation
  const typingId =
    `helpTyping_${Date.now()}`;

  messages.insertAdjacentHTML(
    "beforeend",
    `

      <div
        id="${typingId}"
        class="helpTyping"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

    `
  );


  messages.scrollTo({
    top:messages.scrollHeight,
    behavior:"smooth"
  });


  setTimeout(async function(){

    document
      .getElementById(typingId)
      ?.remove();


    messages.insertAdjacentHTML(
      "beforeend",
      `

        <div class="helpSupportMessage">

          <div class="helpSupportIcon">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="helpSupportBubble">
            Please select the order related to this issue.
          </div>

        </div>


        <div
          id="helpOrderLoading"
          class="helpOrderLoading"
        >

          <div class="helpOrderLoadingSpinner"></div>

          Loading your orders...

        </div>

      `
    );


    messages.scrollTo({
      top:messages.scrollHeight,
      behavior:"smooth"
    });


    const orders =
      await loadHelpUserOrders();


    document
      .getElementById("helpOrderLoading")
      ?.remove();


    renderHelpOrderSelection(orders);


    input.placeholder =
      "Select an order first...";

    input.disabled = true;

  }, 650);

}
async function createHelpSupportTicket(reason){

  if(helpTicketCreated){
    return;
  }

  helpTicketCreated = true;

  const messages =
    document.getElementById("helpChatMessages");

  const input =
    document.getElementById("helpChatInput");

  const client =
    window._supabaseClient;

  if(
    !client ||
    typeof client.from !== "function"
  ){

    console.error(
      "Ticket failed: Supabase client is unavailable"
    );

    helpTicketCreated = false;

    return;
  }

  const ticketId =
    "CZT-" +
    Date.now()
      .toString()
      .slice(-8);

  const userName =
    getHelpUserName();

  const userMobile =
    getLoggedUserMobile();

  const orderId =
    selectedHelpOrder?.order_id
      ? String(selectedHelpOrder.order_id)
      : null;

  const orderStatus =
    selectedHelpOrder?.order_status ||
    null;

  const orderTotal =
    Number(
      selectedHelpOrder?.total_amount || 0
    );

  const priority =
    selectedHelpIssue === "Payment issue"
      ? "High"
      : "Normal";

  try{

    const { error } =
      await client
        .from("support_tickets")
        .insert([{
          ticket_id:ticketId,

          user_name:userName,
          user_mobile:userMobile,

          issue_type:
            selectedHelpIssue ||
            "Other issue",

          order_id:orderId,
          order_status:orderStatus,
          order_total:orderTotal,

          conversation:helpConversation,

          ai_summary:reason,

          status:"Open",
          priority:priority,

          assigned_to:null
        }]);

    if(error){
      throw error;
    }

    if(messages){

      messages.insertAdjacentHTML(
        "beforeend",
        `
          <div class="helpSupportMessage">

            <div class="helpSupportIcon">
              <i class="fa-solid fa-headset"></i>
            </div>

            <div class="helpSupportBubble">
              I understand that this has been frustrating.

              <br><br>

              I have created a support ticket for you.

              <br><br>

              <strong>Ticket ID: ${escapeHelpMessage(ticketId)}</strong>

              <br>

              Our CEZOO support team will review it shortly.
            </div>

          </div>
        `
      );

      messages.scrollTo({
        top:messages.scrollHeight,
        behavior:"smooth"
      });
    }

    if(input){
      input.disabled = true;
      input.placeholder =
        "Support ticket created";
    }

    console.log(
      "Support ticket created:",
      ticketId
    );

  }catch(error){

    console.error(
      "Ticket creation failed:",
      error
    );

    helpTicketCreated = false;

    if(messages){

      messages.insertAdjacentHTML(
        "beforeend",
        `
          <div class="helpSupportMessage">

            <div class="helpSupportIcon">
              <i class="fa-solid fa-headset"></i>
            </div>

            <div class="helpSupportBubble">
              I couldn't create the support ticket right now. Please try again.
            </div>

          </div>
        `
      );
    }
  }
}
/* SEND USER MESSAGE */
function isHelpUserIrritated(message){

  const text =
    String(message || "")
      .toLowerCase()
      .trim();

  const irritationWords = [
    "angry",
    "very angry",
    "worst",
    "worst service",
    "bad service",
    "very bad",
    "useless",
    "not helping",
    "you are not helping",
    "waste",
    "fraud",
    "cheating",
    "scam",
    "complaint",
    "manager",
    "human support",
    "talk to human",
    "connect me to human",
    "customer care",
    "call me",
    "fed up",
    "frustrated",
    "irritated",
    "resolve immediately",
    "solve immediately",
    "enough",
    "cancel everything"
  ];

  return irritationWords.some(word =>
    text.includes(word)
  );
}
async function sendHelpMessage(){
  const input =
    document.getElementById("helpChatInput");

  const messages =
    document.getElementById("helpChatMessages");

  if(!input || !messages){
    return;
  }

  if(helpTicketCreated){
    return;
  }

  const message =
    input.value.trim();

  if(!message){
    return;
  }

  messages.insertAdjacentHTML(
    "beforeend",
    `
      <div class="helpUserMessage">

        <div class="helpUserBubble">
          ${escapeHelpMessage(message)}
        </div>

      </div>
    `
  );

  helpConversation.push({
    role:"user",
    content:message
  });

  input.value = "";

  messages.scrollTo({
    top:messages.scrollHeight,
    behavior:"smooth"
  });
const ticketStatusHandled =
  await checkHelpTicketStatus(message);

if(ticketStatusHandled){
  return;
}
  if(isHelpUserIrritated(message)){

    createHelpSupportTicket(
      `User appeared frustrated and requested escalation. Latest message: ${message}`
    );

    return;
  }

  showHelpAutoReply(message);
}

/* AUTOMATIC AI REPLY */
async function showHelpAutoReply(message){

  const messages =
    document.getElementById("helpChatMessages");

  if(!messages){
    return;
  }

  const typingId =
    `helpTyping_${Date.now()}`;

  messages.insertAdjacentHTML(
    "beforeend",
    `
      <div
        id="${typingId}"
        class="helpTyping"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    `
  );

  messages.scrollTo({
    top:messages.scrollHeight,
    behavior:"smooth"
  });

  try{

    const response = await fetch(
      "https://cezoohelpbot.onrender.com/chat",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          message:message,
          conversation:helpConversation.slice(0, -1),
          issue:selectedHelpIssue,
          order:selectedHelpOrder || {}
        })
      }
    );

    const data = await response.json();

    document
      .getElementById(typingId)
      ?.remove();

    let reply =
  data?.choices?.[0]?.message?.content?.trim();

if(
  !response.ok ||
  !reply
){
  reply =
    "I’m having trouble connecting right now. Please try again in a moment.";
}

helpConversation.push({
  role:"assistant",
  content:reply
});

    messages.insertAdjacentHTML(
      "beforeend",
      `
        <div class="helpSupportMessage">

          <div class="helpSupportIcon">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="helpSupportBubble">
            ${escapeHelpMessage(reply)}
          </div>

        </div>
      `
    );

    messages.scrollTo({
      top:messages.scrollHeight,
      behavior:"smooth"
    });

  }catch(error){

    console.error(
      "Help AI error:",
      error
    );

    document
      .getElementById(typingId)
      ?.remove();

    const fallbackReply =
      "I’m having trouble connecting right now. Please try again in a moment.";

    messages.insertAdjacentHTML(
      "beforeend",
      `
        <div class="helpSupportMessage">

          <div class="helpSupportIcon">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="helpSupportBubble">
            ${escapeHelpMessage(fallbackReply)}
          </div>

        </div>
      `
    );

    messages.scrollTo({
      top:messages.scrollHeight,
      behavior:"smooth"
    });

  }

}
function getHelpAutomaticReply(issue, message){

  const text =
    String(message || "").toLowerCase();

  const orderId =
    selectedHelpOrder?.order_id ||
    "your selected order";


  if(!selectedHelpOrder){

    return "Please select an order first so I can help you properly.";

  }


  if(
    issue === "Delivery issue" ||
    text.includes("delivery") ||
    text.includes("late") ||
    text.includes("not received")
  ){

    return (
      `Thank you. I have noted the delivery issue for order ${orderId}. ` +
      `Please keep your mobile available for delivery updates.`
    );

  }


  if(
    issue === "Return or exchange" ||
    text.includes("return") ||
    text.includes("exchange")
  ){

    return (
      `I have noted your return or exchange request for order ${orderId}. ` +
      `Please keep the product and original packaging safely.`
    );

  }


  if(
    issue === "Payment issue" ||
    text.includes("payment") ||
    text.includes("deducted")
  ){

    return (
      `I have noted the payment issue for order ${orderId}. ` +
      `Please do not make another payment if the amount was already deducted.`
    );

  }


  if(
    issue === "Refund issue" ||
    text.includes("refund")
  ){

    return (
      `I have noted the refund request for order ${orderId}. ` +
      `Refund processing time may depend on the payment provider.`
    );

  }


  if(
    issue === "Missing product" ||
    text.includes("missing")
  ){

    return (
      `I have noted the missing-product issue for order ${orderId}. ` +
      `Please keep the delivered package available for verification.`
    );

  }


  if(
    issue === "Damaged product" ||
    text.includes("damaged") ||
    text.includes("broken")
  ){

    return (
      `I have noted the damaged-product issue for order ${orderId}. ` +
      `Please keep the product and packaging safely.`
    );

  }


  return (
    `Thank you. Your message has been added to order ${orderId}. ` +
    `Please provide any other important details.`
  );

}

/* UPDATE OPEN HELP */

window.openHelpPopup = function(){

  const popup =
    document.getElementById("helpPopup");

  if(!popup){
    return;
  }

  createHelpChat();

  popup.classList.add("open");

  document.body.style.overflow = "hidden";

};


async function loadHelpUserOrders(){

  const mobile = getLoggedUserMobile();

  if(!mobile){
    return [];
  }


  const client =
    window._supabaseClient;

  /*
    IMPORTANT:
    Do not call getOrdersSupabaseClient() here,
    because that function throws an error.
  */

  if(!client || typeof client.from !== "function"){

    console.warn(
      "Help orders skipped: Supabase client is not ready"
    );

    return [];

  }


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

      client
        .from("cash_delivery_orders")
        .select("*")
        .in("user_mobile", mobileVariants)
        .order("created_at", {
          ascending:false
        })
        .limit(10),

      client
        .from("upi_orders")
        .select("*")
        .in("user_mobile", mobileVariants)
        .order("created_at", {
          ascending:false
        })
        .limit(10)

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


    helpUserOrders = [
      ...cashOrders,
      ...upiOrders
    ].sort((first, second) => {

      return (
        new Date(second.created_at).getTime() -
        new Date(first.created_at).getTime()
      );

    });


    return helpUserOrders;

  }catch(error){

    console.error(
      "Help orders load error:",
      error
    );

    return [];

  }

}
async function renderHelpOrderSelection(orders){

  const messages =
    document.getElementById("helpChatMessages");

  if(!messages){
    return;
  }


  if(!orders.length){

    messages.insertAdjacentHTML(
      "beforeend",
      `
        <div class="helpNoOrders">
          No orders were found for this mobile number.

          <br><br>

          You can still type your issue below.
        </div>
      `
    );

    const input =
      document.getElementById("helpChatInput");

    if(input){

      input.disabled = false;
      input.placeholder = "Describe your issue...";

    }

    return;
  }


  const orderCards =
    await Promise.all(

      orders.map(async (order, index) => {

        const items =
          parseUserOrderItems(order.items);


        const totalItems =
          items.reduce((total, item) => {

            return total +
              (userOrderNumber(item.qty) || 1);

          }, 0);


        
let helpOrderProducts = [];

if(
  items.length > 0 &&
  window._supabaseClient &&
  typeof window._supabaseClient.from === "function"
){

  try{

    const firstThreeItems =
      items.slice(0, 3);

    helpOrderProducts =
      (
        await Promise.all(
          firstThreeItems.map(item =>
            loadSingleOrderProduct(item)
          )
        )
      ).filter(Boolean);

  }catch(error){

    console.warn(
      "Help products could not load:",
      error
    );

    helpOrderProducts = [];

  }

}

     const productName =
  helpOrderProducts[0]?.name ||
  "Order products";

const productImages =
  helpOrderProducts
    .map(product => product?.image1)
    .filter(Boolean)
    .slice(0, 3);


        const remainingProducts =
          Math.max(
            0,
            items.length - 1
          );


        return `

          <button
            class="helpOrderCard"
            type="button"
            onclick="selectHelpOrder(${index}, this)"
          >

            
<div class="helpOrderProductImage">

  ${
    productImages.length
      ? productImages.map((image, imageIndex) => `
          <div class="helpOrderThumb">

            <img
              src="${userOrderEscape(image)}"
              alt="Order product ${imageIndex + 1}"
              loading="lazy"
            >

          </div>
        `).join("")
      : `
        <div class="helpOrderProductEmpty">
          <i class="fa-solid fa-box-open"></i>
        </div>
      `
  }

</div>

            <div class="helpOrderCardInfo">

              <div class="helpOrderProductName">
                ${userOrderEscape(productName)}
              </div>


              ${
                remainingProducts > 0
                  ? `
                    <div class="helpOrderMoreItems">
                      +${remainingProducts} more
                      ${remainingProducts === 1 ? "product" : "products"}
                    </div>
                  `
                  : ""
              }


              <div class="helpOrderCardMeta">

                <span>
                  ${totalItems}
                  ${totalItems === 1 ? "item" : "items"}
                </span>

                <span class="helpOrderMetaDot"></span>

                <span>
                  ${userOrderEscape(
                    userOrderStatusText(
                      order.order_status
                    )
                  )}
                </span>

              </div>


              <div class="helpOrderCardDate">

                ${userOrderEscape(
                  userOrderDate(
                    order.created_at
                  )
                )}

              </div>

            </div>


            <div class="helpOrderCardRight">

              <div class="helpOrderCardPrice">

                ${userOrderMoney(
                  order.total_amount
                )}

              </div>

              <i class="fa-solid fa-chevron-right"></i>

            </div>

          </button>

        `;

      })

    );


  messages.insertAdjacentHTML(
    "beforeend",
    `
      <div
        id="helpOrdersList"
        class="helpOrdersList"
      >
        ${orderCards.join("")}
      </div>
    `
  );


  messages.scrollTo({
    top:messages.scrollHeight,
    behavior:"smooth"
  });

}
/* =====================================================
   USER SELECTS ONE ORDER
===================================================== */

window.selectHelpOrder = function(index, button){

  const order =
    helpUserOrders[index];

  if(!order){
    return;
  }

  selectedHelpOrder = order;


  document
    .querySelectorAll(".helpOrderCard")
    .forEach(card => {

      card.classList.remove("selected");
      card.disabled = true;

    });

  button.classList.add("selected");


  const messages =
    document.getElementById("helpChatMessages");

  const input =
    document.getElementById("helpChatInput");

  if(!messages || !input){
    return;
  }


  messages.insertAdjacentHTML(
    "beforeend",
    `

      <div class="helpUserMessage">

        <div class="helpUserBubble">

          Order:
          ${userOrderEscape(
            order.order_id || "Selected order"
          )}

        </div>

      </div>

    `
  );


  const typingId =
    `helpTyping_${Date.now()}`;


  messages.insertAdjacentHTML(
    "beforeend",
    `

      <div
        id="${typingId}"
        class="helpTyping"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

    `
  );


  messages.scrollTo({
    top:messages.scrollHeight,
    behavior:"smooth"
  });


  setTimeout(function(){

    document
      .getElementById(typingId)
      ?.remove();


    const reply =
      getSelectedOrderReply(
        selectedHelpIssue,
        order
      );


    messages.insertAdjacentHTML(
      "beforeend",
      `

        <div class="helpSupportMessage">

          <div class="helpSupportIcon">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="helpSupportBubble">

            ${escapeHelpMessage(reply)}

          </div>

        </div>

      `
    );


    input.disabled = false;

    input.placeholder =
      "Type more details about this order...";

    input.focus();


    messages.scrollTo({
      top:messages.scrollHeight,
      behavior:"smooth"
    });

  }, 650);

};
function getSelectedOrderReply(issue, order){

  const orderId =
    order.order_id || "this order";

  const status =
    userOrderStatusText(
      order.order_status
    );


  if(issue === "Delivery issue"){

    return (
      `I found order ${orderId}. ` +
      `Its current status is ${status}. ` +
      `Please tell me what delivery problem you are facing.`
    );

  }


  if(issue === "Return or exchange"){

    return (
      `I found order ${orderId}. ` +
      `Please tell me which product you want to return or exchange and the reason.`
    );

  }


  if(issue === "Payment issue"){

    return (
      `I found order ${orderId}. ` +
      `Its payment status is ${order.payment_status || "Pending"}. ` +
      `Please explain whether the amount was deducted, failed or is still pending.`
    );

  }


  if(issue === "Refund issue"){

    return (
      `I found order ${orderId}. ` +
      `Please tell me which product or payment needs a refund.`
    );

  }


  if(issue === "Missing product"){

    return (
      `I found order ${orderId}. ` +
      `Please type the name of the missing product.`
    );

  }


  if(issue === "Damaged product"){

    return (
      `I found order ${orderId}. ` +
      `Please tell me which product was damaged.`
    );

  }


  return (
    `Order ${orderId} has been selected. ` +
    `Please explain your issue in more detail.`
  );

}

function resetHelpChat(){

  selectedHelpIssue = "";
  selectedHelpOrder = null;
  helpUserOrders = [];
helpConversation = [];
helpTicketCreated = false;
  const input =
    document.getElementById("helpChatInput");

  if(input){

    input.value = "";
    input.disabled = false;
    input.placeholder = "Type your message...";

  }

  renderHelpChatHome();

}

async function checkHelpTicketStatus(message){

  const text =
    String(message || "")
      .toLowerCase()
      .trim();

  const wantsTicketStatus =
    text.includes("ticket status") ||
    text.includes("check ticket") ||
    text.includes("my ticket") ||
    text.includes("support ticket") ||
    text.includes("ticket issue");

  if(!wantsTicketStatus){
    return false;
  }

  const messages =
    document.getElementById("helpChatMessages");

  const client =
    window._supabaseClient;

  const mobile =
    getLoggedUserMobile();

  if(
    !messages ||
    !client ||
    typeof client.from !== "function" ||
    !mobile
  ){
    return false;
  }

  const typingId =
    `helpTicketTyping_${Date.now()}`;

  messages.insertAdjacentHTML(
    "beforeend",
    `
      <div
        id="${typingId}"
        class="helpTyping"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    `
  );

  messages.scrollTo({
    top:messages.scrollHeight,
    behavior:"smooth"
  });

  try{

    let query =
      client
        .from("support_tickets")
        .select("*")
        .eq("user_mobile", mobile)
        .order("created_at", {
          ascending:false
        })
        .limit(1);

    /*
      If an issue is already selected,
      first try to find the ticket for that issue.
    */
    if(selectedHelpIssue){
      query =
        query.eq(
          "issue_type",
          selectedHelpIssue
        );
    }

    let {
      data,
      error
    } = await query;

    /*
      If no matching issue ticket was found,
      fetch the user's latest ticket by mobile.
    */
    if(
      !error &&
      (!data || data.length === 0) &&
      selectedHelpIssue
    ){

      const fallbackResponse =
        await client
          .from("support_tickets")
          .select("*")
          .eq("user_mobile", mobile)
          .order("created_at", {
            ascending:false
          })
          .limit(1);

      data = fallbackResponse.data;
      error = fallbackResponse.error;
    }

    document
      .getElementById(typingId)
      ?.remove();

    if(error){
      throw error;
    }

    const ticket =
      data?.[0];

    if(!ticket){

      messages.insertAdjacentHTML(
        "beforeend",
        `
          <div class="helpSupportMessage">

            <div class="helpSupportIcon">
              <i class="fa-solid fa-headset"></i>
            </div>

            <div class="helpSupportBubble">
              I couldn't find any support ticket linked to your registered mobile number.
            </div>

          </div>
        `
      );

      return true;
    }

    const ticketStatus =
      ticket.status || "Open";

    const ticketIssue =
      ticket.issue_type || "Support issue";

    const ticketId =
      ticket.ticket_id || "Not available";

    const orderId =
      ticket.order_id || "";

    messages.insertAdjacentHTML(
      "beforeend",
      `
        <div class="helpSupportMessage">

          <div class="helpSupportIcon">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="helpSupportBubble">

            I found your latest support ticket using your registered mobile number.

            <br><br>

            <strong>Ticket ID:</strong>
            ${escapeHelpMessage(ticketId)}

            <br>

            <strong>Issue:</strong>
            ${escapeHelpMessage(ticketIssue)}

            ${
              orderId
                ? `
                  <br>
                  <strong>Order:</strong>
                  ${escapeHelpMessage(orderId)}
                `
                : ""
            }

            <br>

            <strong>Status:</strong>
            ${escapeHelpMessage(ticketStatus)}

          </div>

        </div>
      `
    );

    messages.scrollTo({
      top:messages.scrollHeight,
      behavior:"smooth"
    });

    return true;

  }catch(error){

    console.error(
      "Ticket status check failed:",
      error
    );

    document
      .getElementById(typingId)
      ?.remove();

    messages.insertAdjacentHTML(
      "beforeend",
      `
        <div class="helpSupportMessage">

          <div class="helpSupportIcon">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="helpSupportBubble">
            I couldn't check your ticket status right now. Please try again.
          </div>

        </div>
      `
    );

    return true;
  }
}
