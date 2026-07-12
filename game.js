let gameTimer = null;
let waterWaveTick = 0;
const CEZOO_MAX_GAME_ATTEMPTS = 3;

const CEZOO_ATTEMPT_RESET_TIME =
  5 * 60 * 60 * 1000; // 5 hours

function getCezooGameAttempts(){

  const now = Date.now();

  const lastReset = Number(
    localStorage.getItem("cezooGameLastReset") || 0
  );

  /*
    First time opening the game,
    or 5 hours completed
  */
  if(
    !lastReset ||
    now - lastReset >= CEZOO_ATTEMPT_RESET_TIME
  ){

    localStorage.setItem(
      "cezooGameAttempts",
      "0"
    );

    localStorage.setItem(
      "cezooGameLastReset",
      String(now)
    );

    return 0;
  }

  return Number(
    localStorage.getItem("cezooGameAttempts") || 0
  );
}
function getCezooAttemptsLeft(){

  const left = Math.max(
    0,
    CEZOO_MAX_GAME_ATTEMPTS - getCezooGameAttempts()
  );

  console.log(
    "Cezoo attempts left:",
    left
  );

  return left;
}

function useCezooGameAttempt(){

  const used = getCezooGameAttempts();

  console.log(
    "Cezoo attempts used before:",
    used
  );

  if(used >= CEZOO_MAX_GAME_ATTEMPTS){

    console.log(
      "No Cezoo attempts remaining"
    );

    return false;
  }

  localStorage.setItem(
    "cezooGameAttempts",
    String(used + 1)
  );

  console.log(
    "Cezoo attempt used. Attempts left:",
    CEZOO_MAX_GAME_ATTEMPTS - (used + 1)
  );

  updateCezooAttemptUI();

  return true;
}
function updateCezooAttemptUI(){

  const attemptsLeft = getCezooAttemptsLeft();

  let attemptText =
    document.getElementById("cezooAttemptText");

  if(!attemptText){

    attemptText = document.createElement("div");
    attemptText.id = "cezooAttemptText";

    attemptText.style.cssText = `
      width:100%;
      margin-top:10px;
      text-align:center;
      font-size:12px;
      font-weight:700;
      color:#666;
    `;

    const playButton =
      document.querySelector(".playNowBtn");

    if(playButton){
      playButton.insertAdjacentElement(
        "afterend",
        attemptText
      );
    }
  }

  attemptText.innerText =
    `Attempts left: ${attemptsLeft}`;

  // NEVER HIDE PLAY BUTTON
  const playButton =
    document.querySelector(".playNowBtn");

  if(playButton){
    playButton.style.display = "";
  }
}
function resetGameStart(){
  clearTimeout(gameTimer);

  const splash = document.getElementById("splashScreen");
  const main = document.getElementById("mainScreen");

  splash.style.display = "block";
  main.style.display = "none";

  /* restart animations */
  splash.style.animation = "none";
  main.style.animation = "none";

  void splash.offsetWidth;

  splash.style.animation = "";
  main.style.animation = "";
}

function openGamePopup(){

  gameIntroRunId++;
  gameIntroStarting = false;

  clearGameIntroTimers();

  clearTimeout(gameTimer);
  gameTimer = null;

 
  updateCezooAttemptUI();
  document.getElementById("gamePopup").classList.add("show");
  document.body.style.overflow = "hidden";

  document.querySelector(".floatBarWrap")?.style.setProperty("display","none");

  stopGameVideo(); // first no video

  clearInterval(timerInterval);
  running = false;

  const coupon = document.getElementById("couponResultScreen");
  coupon.style.display = "none";
  coupon.classList.remove("playArc");

  document.getElementById("gameIntroScreen").style.display = "none";
  hideIntroSteps();

  resetGameStart();

  gameTimer = setTimeout(() => {
    document.getElementById("splashScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";

    playGameVideo(); // play only after main screen opens
  }, 3000);
}
function closeGamePopup(){
    gameIntroRunId++;
  gameIntroStarting = false;

  clearTimeout(gameTimer);
  gameTimer = null;

  clearGameIntroTimers();
  stopGameVideo();
stopMic();
  document.getElementById("gamePopup").classList.remove("show");
  document.body.style.overflow = "";

  const coupon = document.getElementById("couponResultScreen");
  coupon.style.display = "none";
  coupon.classList.remove("playArc");

  document.querySelector(".floatBarWrap")?.style.removeProperty("display");

  clearTimeout(gameTimer);
  clearTimeout(introTimer1);
  clearTimeout(introTimer2);
  clearTimeout(introTimer3);
  clearInterval(timerInterval);

  running = false;

  document.getElementById("gameIntroScreen").style.display = "none";
  hideIntroSteps();

  resetGameStart();

  updateCartFloat();
}

/* Swipe both sides close */
let gameSwipeStartX = 0;
let gameSwipeStartY = 0;
let gameSwipeEdge = "";

const gamePopup = document.getElementById("gamePopup");

gamePopup.addEventListener("touchstart", function(e){
  const touch = e.touches[0];

  gameSwipeStartX = touch.clientX;
  gameSwipeStartY = touch.clientY;

  const w = window.innerWidth;

  if(gameSwipeStartX <= 28){
    gameSwipeEdge = "left";
  }else if(gameSwipeStartX >= w - 28){
    gameSwipeEdge = "right";
  }else{
    gameSwipeEdge = "";
  }
});

gamePopup.addEventListener("touchend", function(e){
  if(!gameSwipeEdge) return;

  const touch = e.changedTouches[0];

  const diffX = touch.clientX - gameSwipeStartX;
  const diffY = Math.abs(touch.clientY - gameSwipeStartY);

  gameSwipeEdge = "";

  if(diffY > 60) return;

  if(diffX > 90 || diffX < -90){
    closeGamePopup();
  }
});


let introTimer1 = null;
let introTimer2 = null;
let introTimer3 = null;
let introCountTimer = null;

let gameIntroStarting = false;
let gameIntroRunId = 0;
function clearGameIntroTimers(){

  clearTimeout(introTimer1);
  clearTimeout(introTimer2);
  clearTimeout(introTimer3);
  clearTimeout(introCountTimer);

  introTimer1 = null;
  introTimer2 = null;
  introTimer3 = null;
  introCountTimer = null;
}
function hideIntroSteps(){
  document.querySelectorAll(".introStep")
    .forEach(step => step.classList.remove("active"));
}
async function startGameIntro(){

  /* Prevent double taps */
  if(gameIntroStarting || running){
    return;
  }

  gameIntroStarting = true;

  const currentRunId = ++gameIntroRunId;

  /*
    Important:
    Stop the old 3-second popup timer.
    Otherwise it can reopen Play Now during countdown.
  */
  clearTimeout(gameTimer);
  gameTimer = null;

  clearGameIntroTimers();
  stopGameVideo();

  const mainScreen =
    document.getElementById("mainScreen");

  const introScreen =
    document.getElementById("gameIntroScreen");

  /*
    Change screen immediately so the tap
    does not feel delayed.
  */
  mainScreen.style.display = "none";
  introScreen.style.display = "block";

  hideIntroSteps();

  document
    .getElementById("clockStep")
    ?.classList.add("active");

  try{

    if(!micStream){

      micStream =
        await navigator.mediaDevices.getUserMedia({
          audio:{
            echoCancellation:false,
            noiseSuppression:false,
            autoGainControl:false
          }
        });

      /*
        User may have closed/restarted while
        microphone permission was opening.
      */
      if(currentRunId !== gameIntroRunId){

        micStream
          .getTracks()
          .forEach(track => track.stop());

        micStream = null;
        gameIntroStarting = false;

        return;
      }

      audioContext = new AudioContext();

      analyser =
        audioContext.createAnalyser();

      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = .92;

      const mic =
        audioContext.createMediaStreamSource(
          micStream
        );

      mic.connect(analyser);

      dataArray =
        new Uint8Array(
          analyser.frequencyBinCount
        );
    }

    if(
      audioContext &&
      audioContext.state === "suspended"
    ){
      await audioContext.resume();
    }

  }catch(error){

    console.error(
      "Microphone permission error:",
      error
    );

    gameIntroStarting = false;

    hideIntroSteps();

    introScreen.style.display = "none";
    mainScreen.style.display = "block";

    updateCezooAttemptUI();

    return;
  }

  if(currentRunId !== gameIntroRunId){
    gameIntroStarting = false;
    return;
  }

  introTimer1 = setTimeout(() => {

    if(currentRunId !== gameIntroRunId){
      return;
    }

    hideIntroSteps();

    document
      .getElementById("timeStep")
      ?.classList.add("active");

  }, 1800);


  introTimer2 = setTimeout(() => {

    if(currentRunId !== gameIntroRunId){
      return;
    }

    hideIntroSteps();

    document
      .getElementById("countStep")
      ?.classList.add("active");

    const countEl =
      document.getElementById("countNumber");

    let count = 3;

    function showCount(){

      if(currentRunId !== gameIntroRunId){
        return;
      }

      countEl.className = "countNumber";

      if(count === 3){

        countEl.classList.add("leftAnim");
        countEl.innerText = "3";

      }else if(count === 2){

        countEl.classList.add("rightAnim");
        countEl.innerText = "2";

      }else if(count === 1){

        countEl.classList.add("zoomAnim");
        countEl.innerText = "1";

      }else{

        countEl.classList.add("goAnim");
        countEl.innerText = "GO!";
      }

      count--;

      if(count >= -1){

        introCountTimer =
          setTimeout(showCount, 700);

        return;
      }

      introCountTimer = setTimeout(() => {

        if(currentRunId !== gameIntroRunId){
          return;
        }

        hideIntroSteps();

        document
          .getElementById("welcomeStep")
          ?.classList.add("active");

        if(!useCezooGameAttempt()){

          hideIntroSteps();

          introScreen.style.display = "none";
          mainScreen.style.display = "block";

          updateCezooAttemptUI();

          const text =
            document.getElementById(
              "cezooAttemptText"
            );

          if(text){
            text.innerText =
              "No attempts left";
          }

          gameIntroStarting = false;

          return;
        }

        resetGame();

        running = true;
        gameIntroStarting = false;

        detectVoice();
        startTimer();

      }, 500);
    }

    showCount();

  }, 3600);
}

let audioContext, analyser, dataArray, micStream;
let currentScore = 0;
let targetScore = 0;
let maxScore = 0;
let timeLeft = 15;
let displayScore = 0;
let running = false;
let timerInterval;
let difficulty = "easy"; // easy / medium / hard

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const waterLayer = document.getElementById("waterLayer");
const skyOverlay = document.querySelector(".skyOverlay");

async function startGame(){
    try{
        if(!micStream){
          micStream = await navigator.mediaDevices.getUserMedia({
  audio:{
    echoCancellation:false,
    noiseSuppression:false,
    autoGainControl:false
  }
});
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 512;
            analyser.smoothingTimeConstant = .92;

            const mic = audioContext.createMediaStreamSource(micStream);
            mic.connect(analyser);

            dataArray = new Uint8Array(analyser.frequencyBinCount);
        }

        
        resetGame();
        running = true;
        detectVoice();
        startTimer();

    }catch(err){
        alert("Please allow microphone permission.");
    }
}
function resetGame(){
  currentScore = 0;
  targetScore = 0;
  maxScore = 0;
  displayScore = 0;
  loudFrames = 0;
  timeLeft = 15;
smoothMicVolume = 0;
previousMicVolume = 0;
micSpikeFrames = 0;

if(voiceAnimationFrame){
  cancelAnimationFrame(voiceAnimationFrame);
  voiceAnimationFrame = null;
}
  scoreEl.innerText = "0";
  scoreEl.classList.remove("finalZoom");
  timerEl.innerText = "15s";

  waterWaveTick = 0;

  waterLayer.style.transition =
    "transform .18s linear";

  waterLayer.style.transform =
    "translate3d(0,0,0) rotate(0deg)";

  skyOverlay.style.transform = "none";

  clearInterval(timerInterval);
}

function startTimer(){
  clearInterval(timerInterval);

  timerInterval = setInterval(()=>{
    timeLeft--;
    timerEl.innerText = timeLeft + "s";

    if(timeLeft <= 0){
      running = false;
      clearInterval(timerInterval);

      scoreEl.innerText = maxScore;

      scoreEl.classList.remove("finalZoom");
      void scoreEl.offsetWidth;
      scoreEl.classList.add("finalZoom");

     setTimeout(()=>{
  waterLayer.style.transition = "transform 1s ease-in-out";
  waterLayer.style.transform = `translateY(-${window.innerHeight + 600}px)`;

  setTimeout(()=>{
    showCouponResult();
  },1000);

},1200);
    }
  },1000);
}
function getDifficultyLimit(){

  if(currentScore < 35){
    difficulty = "easy";
    return 55;
  }

  if(currentScore < 55){
    difficulty = "medium";
    return 68;
  }

  if(currentScore < 70){
    difficulty = "hard";
    return 82;
  }

  difficulty = "superHard";
  return 100;
}


let loudFrames = 0;
let voiceAnimationFrame = null;
let smoothMicVolume = 0;
let previousMicVolume = 0;
let micSpikeFrames = 0;

function detectVoice(){

  if(!running){
    voiceAnimationFrame = null;
    return;
  }

  if(!analyser || !dataArray){
    voiceAnimationFrame = null;
    return;
  }

  analyser.getByteFrequencyData(dataArray);


  let total = 0;
  let strongBins = 0;
  let veryStrongBins = 0;
  let extremeBins = 0;


  for(let i = 0; i < dataArray.length; i++){

    const value = dataArray[i];

    total += value;


    if(value > 115){
      strongBins++;
    }


    if(value > 165){
      veryStrongBins++;
    }


    if(value > 205){
      extremeBins++;
    }

  }


  const rawVolume =
  total / dataArray.length;

/* Smooth sudden microphone changes */
smoothMicVolume =
  smoothMicVolume === 0
    ? rawVolume
    : (smoothMicVolume * 0.82) + (rawVolume * 0.18);

/* Detect impossible sudden spikes */
const suddenJump =
  rawVolume - previousMicVolume;

previousMicVolume = rawVolume;

if(suddenJump > 30){

  micSpikeFrames++;

}else{

  micSpikeFrames =
    Math.max(0, micSpikeFrames - 1);

}

/*
  Ignore a single-frame microphone glitch.
  Accept it only if loud input continues.
*/
const volume =
  micSpikeFrames === 1
    ? smoothMicVolume
    : rawVolume;


  /*
    SHOUT LEVEL CHECKS
  */

  const isRealShout =
    volume > 39 &&
    strongBins > 15 &&
    veryStrongBins > 4;


  const isVeryStrongShout =
    volume > 58 &&
    strongBins > 22 &&
    veryStrongBins > 9;


  const isExtremeShout =
    volume > 76 &&
    strongBins > 30 &&
    veryStrongBins > 14 &&
    extremeBins > 4;


  /*
    USER MUST HOLD THE SHOUT
  */

  if(isRealShout){

    loudFrames =
      Math.min(
        loudFrames + 1,
        30
      );

  }else{

    loudFrames =
      Math.max(
        loudFrames - 3,
        0
      );

  }


  /*
    BACKGROUND NOISE
  */

  if(
    volume < 30 ||
    strongBins < 7
  ){

    targetScore =
      Math.max(
        0,
        targetScore - 5
      );

  }


  /*
    NORMAL VOICE OR MODERATE SHOUT

    Maximum score: 44
    This cannot win because winning starts at 50.
  */

  else if(
    !isRealShout ||
    loudFrames < 6
  ){

    targetScore = Math.min(
      44,
      Math.max(
        5,
        Math.floor(
          (volume - 27) * 1.05
        )
      )
    );

  }


  /*
    PROPER SUSTAINED SHOUT

    Score range: 50–67
  */

  else if(
    isRealShout &&
    !isVeryStrongShout
  ){

    targetScore = Math.min(
      67,
      Math.floor(
        50 +
        ((volume - 39) * 0.72)
      )
    );

  }


  /*
    STRONG SUSTAINED SHOUT

    Score range: 68–85
  */

  else if(
    isVeryStrongShout &&
    !isExtremeShout
  ){

    targetScore = Math.min(
      85,
      Math.floor(
        68 +
        ((volume - 58) * 0.68)
      )
    );

  }


  /*
    EXTREME SUSTAINED SHOUT

    Score range: 86–100
  */

  else{

    targetScore = Math.min(
      100,
      Math.floor(
        86 +
        ((volume - 76) * 0.42)
      )
    );

  }


  /*
    SCORE MOVEMENT

    Rise slowly.
    Fall faster.
  */

  if(targetScore > currentScore){

    currentScore +=
      (targetScore - currentScore) *
      0.055;

  }else{

    currentScore +=
      (targetScore - currentScore) *
      0.13;

  }


  currentScore = Math.max(
    0,
    Math.min(
      100,
      currentScore
    )
  );


  const showScore =
    Math.round(currentScore);


  /*
    DISPLAY SCORE SMOOTHLY
  */

  if(displayScore < showScore){

    displayScore++;

  }
  else if(displayScore > showScore){

    displayScore--;

  }


  if(
    displayScore !==
    Number(scoreEl.innerText)
  ){

    scoreEl.classList.remove(
      "scoreJump"
    );

    void scoreEl.offsetWidth;

    scoreEl.classList.add(
      "scoreJump"
    );

  }


  scoreEl.innerText =
    displayScore;


  if(displayScore > maxScore){

    maxScore =
      displayScore;

  }


  /*
    WATER MOVEMENT
  */

  let moveUp;


  if(showScore >= 100){

    moveUp =
      window.innerHeight;

  }else{

    moveUp =
      showScore * 4.2;

  }


  waterWaveTick += 0.12;


  const waveX =
    Math.sin(waterWaveTick) * 8;


  const waveRotate =
    Math.sin(waterWaveTick) * 0.8;


  waterLayer.style.transform = `
    translate3d(
      ${waveX}px,
      -${moveUp}px,
      0
    )
    rotate(${waveRotate}deg)
  `;


  voiceAnimationFrame =
  requestAnimationFrame(
    detectVoice
  );

}
function generateCouponCode(){
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let code = "";

  for(let i = 0; i < 4; i++){
    code += letters[Math.floor(Math.random() * letters.length)];
  }

  for(let i = 0; i < 2; i++){
    code += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return code;
}
function getDiscountByScore(score){
  if(score < 50){
    return { won:false };
  }

  if(score < 60){
    return { won:true, percent:"10%", amount:"150" };
  }

  if(score < 70){
    return { won:true, percent:"12%", amount:"180" };
  }

  if(score < 80){
    return { won:true, percent:"15%", amount:"200" };
  }

  return { won:true, percent:"20%", amount:"250" };
}
function showCouponResult(){

  const coupon =
    document.getElementById("couponResultScreen");

  document.getElementById("gameIntroScreen")
    .style.display = "none";

  hideIntroSteps();

  const result =
    getDiscountByScore(maxScore);

  const attemptsLeft =
    getCezooAttemptsLeft();

  coupon.style.display = "flex";
  coupon.classList.add("playArc");

  document.getElementById(
    "couponScoreNumber"
  ).innerText = maxScore;

  const topText =
    coupon.querySelector(".topi");

  const offerBox =
    coupon.querySelector(".offered");

  const uptoBox =
    coupon.querySelector(".upto");

  const bottomText =
    coupon.querySelector(".bottom");

  const actionBtn =
    coupon.querySelector(".redeemBtn");


  /* =========================
     USER WON
  ========================= */

  if(result.won){

    topText.innerText = "YOU WON EXTRA";

    offerBox.innerHTML = `
      <span>${result.percent}</span>
      <span>OFF</span>
    `;

    uptoBox.style.display = "block";

    uptoBox.innerHTML = `
      UP TO ₹<span>${result.amount}</span>
    `;

    bottomText.innerHTML = `
      Applicable on Ordering Select Items<br>
      above ₹150
    `;


    localStorage.setItem(
      "cezooGameCoupon",
      JSON.stringify({
        code: "CREAMKULFI",
        score: maxScore,
        percent: Number(
          result.percent.replace("%","")
        ),
        maxDiscount: Number(result.amount)
      })
    );


    /* Winning button */

    actionBtn.style.display = "block";
    actionBtn.innerText = "REDEEM NOW";

    actionBtn.onclick = function(){
      openCezooRewardSheet();
    };

  }


  /* =========================
     USER LOST
  ========================= */

  else{

    topText.innerText = "OOPS!";

    offerBox.innerHTML = `
      <span style="
        font-size:30px;
        line-height:1.1;
      ">
        BETTER LUCK
      </span>

      <br>

      <span style="
        font-size:30px;
        line-height:1.1;
      ">
        NEXT TIME
      </span>
    `;

    uptoBox.style.display = "block";
    uptoBox.innerHTML = "&nbsp;";


    /* ATTEMPTS STILL AVAILABLE */

    if(attemptsLeft > 0){

      bottomText.innerHTML = `
        Attempts left: ${attemptsLeft}
      `;

      actionBtn.style.display = "block";
      actionBtn.innerText = "TRY AGAIN";

      actionBtn.onclick = function(){

        coupon.style.display = "none";
        coupon.classList.remove("playArc");

        document.getElementById(
          "gameIntroScreen"
        ).style.display = "none";

        hideIntroSteps();

        const mainScreen =
          document.getElementById("mainScreen");

        mainScreen.style.display = "block";

        updateCezooAttemptUI();
        playGameVideo();
      };

    }


    /* NO ATTEMPTS LEFT */

    else{

  bottomText.innerHTML = `
    No attempts left
  `;

  actionBtn.style.display = "none";

}
  }

}
function gameVideo(){
  return document.querySelector(".videoBox video");
}

function playGameVideo(){
  const v = gameVideo();
  if(!v) return;

  v.currentTime = 0;
  v.muted = true;
  v.play().catch(()=>{});
}

function stopGameVideo(){
  const v = gameVideo();
  if(!v) return;

  v.pause();
  v.currentTime = 0;
}
function stopMic(){

  running = false;

  if(voiceAnimationFrame){
    cancelAnimationFrame(voiceAnimationFrame);
    voiceAnimationFrame = null;
  }

  if(micStream){
    micStream.getTracks().forEach(track => track.stop());
    micStream = null;
  }

  if(audioContext){
    audioContext.close().catch(()=>{});
    audioContext = null;
  }

  analyser = null;
  dataArray = null;
}


let rewardProductsLoaded = false;

function openCezooRewardSheet(){

  const overlay =
    document.getElementById("cezooRewardOverlay");

  if(!overlay) return;

  overlay.classList.add("open");

  loadRewardIceCreamProducts();
}

function closeCezooRewardSheet(event){

    if(
        event &&
        event.target.id !== "cezooRewardOverlay"
    ){
        return;
    }

    document
        .getElementById("cezooRewardOverlay")
        ?.classList.remove("open");
}
async function loadRewardIceCreamProducts(){

  if(rewardProductsLoaded){
    restoreCartButtons(
      document.getElementById("rewardProductsGrid")
    );
    return;
  }

  const grid =
    document.getElementById("rewardProductsGrid");

  if(!grid) return;

  grid.innerHTML = Array(6).fill(`
    <div class="freshProductShimmerCard">
      <div class="freshProductShimmerImg"></div>
      <div class="freshProductShimmerPrice"></div>
      <div class="freshProductShimmerName"></div>
      <div class="freshProductShimmerQty"></div>
    </div>
  `).join("");

  const rewardIds =
    Array.from({length:26}, (_,i) => i + 1);

  const { data, error } =
    await supabaseClient
      .from("icecreams")
      .select("*")
      .in("id", rewardIds)
      .order("id", { ascending:true });

  if(error){
    console.error("Reward products error:", error);

    grid.innerHTML = `
      <div style="
        grid-column:1/-1;
        padding:30px 15px;
        text-align:center;
        font-weight:700;
      ">
        Products not loaded
      </div>
    `;

    return;
  }

  renderRewardIceCreamProducts(data || []);
  rewardProductsLoaded = true;
}

function renderRewardIceCreamProducts(products){

  const grid =
    document.getElementById("rewardProductsGrid");

  grid.innerHTML = products.map(p => `

    <div
      class="productCard"
      data-id="${p.id}"
      data-table="icecreams"
    >

      <div class="productImageWrap">

        <img
          class="productImage"
          src="${p.image1 || ''}"
          loading="lazy"
          alt="${p.name || ''}"
        >

        <button
          type="button"
          class="addBtn"
        >
          <span>+</span>
        </button>

      </div>

      <div class="productInfo">

        <div class="priceRow">

          <span class="discountPrice">
            ₹${p.discount_price || 0}
          </span>

          <span class="originalPrice">
            ₹${p.original_price || 0}
          </span>

        </div>

        <div class="productName">
          ${p.name || ''}
        </div>

        <div class="productNameTelugu">
          ${p.name_telugu || ''}
        </div>

        <div class="productQty">
          ${p.quantity || ''} ${p.unit || ''}
        </div>

      </div>

    </div>

  `).join("");

  grid.querySelectorAll(".productCard")
    .forEach(card => {

      const id = Number(card.dataset.id);

      const product = products.find(
        p => Number(p.id) === id
      );

      const addBtn =
        card.querySelector(".addBtn");

      addBtn.onclick = e => {
        return addToCart(e, addBtn, product);
      };

    });

  restoreCartButtons(grid);
}
