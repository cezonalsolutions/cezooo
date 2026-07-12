const villageImages = document.querySelectorAll(".villageImg");

const villageObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const villageImg = entry.target;

            if(!villageImg.src){
                villageImg.src = villageImg.dataset.src;
            }

            villageImg.onload = ()=>{
                villageImg.classList.add("villageLoaded");
                villageImg.closest(".villageImageBox")
                    .classList.add("villageImageLoaded");
            };

            villageObserver.unobserve(villageImg);
        }
    });
},{
    root:null,
    threshold:0.2,
    rootMargin:"120px"
});

villageImages.forEach(img=>{
    villageObserver.observe(img);
});


const mallipudiImages = document.querySelectorAll(".mallipudiImg");

const mallipudiObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img = entry.target;

            if(!img.src){
                img.src = img.dataset.src;
            }

            img.onload = ()=>{
                img.classList.add("mallipudiLoaded");
                img.closest(".mallipudiCard")
                   .classList.add("mallipudiImageLoaded");
            };

            mallipudiObserver.unobserve(img);
        }
    });
},{
    threshold:0.2,
    rootMargin:"120px"
});

mallipudiImages.forEach(img=>{
    mallipudiObserver.observe(img);
});


const rajupalemImages = document.querySelectorAll(".rajupalemImg");

const rajupalemObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img = entry.target;

            if(!img.src){
                img.src = img.dataset.src;
            }

            img.onload = ()=>{
                img.classList.add("rajupalemLoaded");
                img.closest(".rajupalemCard")
                   .classList.add("rajupalemImageLoaded");
            };

            rajupalemObserver.unobserve(img);
        }
    });
},{
    root:null,
    threshold:0.1,
    rootMargin:"150px"
});

rajupalemImages.forEach(img=>{
    rajupalemObserver.observe(img);
});

const kovvurImages = document.querySelectorAll(".kovvurImg");

const kovvurObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img = entry.target;

            if(!img.src){
                img.src = img.dataset.src;
            }

            img.onload = ()=>{
                img.classList.add("kovvurLoaded");
                img.closest(".kovvurCard")
                   .classList.add("kovvurImageLoaded");
            };

            kovvurObserver.unobserve(img);
        }
    });
},{
    threshold:0.1,
    rootMargin:"160px"
});

kovvurImages.forEach(img=>{
    kovvurObserver.observe(img);
});

const tanukuImages = document.querySelectorAll(".tanukuImg");

const tanukuObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img = entry.target;

            if(!img.src){
                img.src = img.dataset.src;
            }

            img.onload = ()=>{
                img.classList.add("tanukuLoaded");
                img.closest(".tanukuCard")
                   .classList.add("tanukuImageLoaded");
            };

            tanukuObserver.unobserve(img);
        }
    });
},{
    threshold:0.1,
    rootMargin:"160px"
});

tanukuImages.forEach(img=>{
    tanukuObserver.observe(img);
});

const giftTypeObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(!entry.isIntersecting) return;

        const img = entry.target;
        img.src = img.dataset.src;

        img.onload = ()=>{
            img.classList.add("giftTypeLoaded");
            img.parentElement.classList.add("giftTypeImageLoaded");
        };

        giftTypeObserver.unobserve(img);
    });
},{
    threshold:0.15
});

document.querySelectorAll(".giftTypeImg").forEach(img=>{
    giftTypeObserver.observe(img);
});

const giftBannerTrack = document.getElementById("giftBannerTrack");
const giftBannerDots = document.querySelectorAll(".giftBannerDot");
const giftBannerImages = document.querySelectorAll(".giftBannerImg");

giftBannerTrack.addEventListener("scroll", ()=>{
  const index = Math.round(
    giftBannerTrack.scrollLeft / giftBannerTrack.clientWidth
  );

  giftBannerDots.forEach(dot => dot.classList.remove("active"));
  giftBannerDots[index]?.classList.add("active");
});

const giftBannerObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;

    const img = entry.target;

    if(!img.src){
      img.src = img.dataset.src;
    }

    img.onload = ()=>{
      img.classList.add("giftBannerLoaded");
      img.closest(".giftBannerSlide")
         .classList.add("giftBannerImageLoaded");
    };

    giftBannerObserver.unobserve(img);
  });
},{
  threshold:0.15,
  rootMargin:"160px"
});

giftBannerImages.forEach(img=>{
  giftBannerObserver.observe(img);
});

const vijayawadaBannerTrack =
  document.getElementById("vijayawadaBannerTrack");

const vijayawadaBannerDots =
  document.querySelectorAll(".vijayawadaBannerDot");

const vijayawadaBannerImages =
  document.querySelectorAll(".vijayawadaBannerImg");


/* DOT CHANGE ON SCROLL */

vijayawadaBannerTrack.addEventListener("scroll", ()=>{

  const index = Math.round(
    vijayawadaBannerTrack.scrollLeft /
    vijayawadaBannerTrack.clientWidth
  );

  vijayawadaBannerDots.forEach(dot=>{
    dot.classList.remove("active");
  });

  vijayawadaBannerDots[index]?.classList.add("active");

});


/* LAZY LOAD IMAGES */

const vijayawadaBannerObserver =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      const img = entry.target;

      if(!img.src){
        img.src = img.dataset.src;
      }

      img.onload = ()=>{

        img.classList.add(
          "vijayawadaBannerLoaded"
        );

        img.closest(".vijayawadaBannerSlide")
          .classList.add(
            "vijayawadaBannerImageLoaded"
          );
      };

      vijayawadaBannerObserver.unobserve(img);

    });

  },{
    threshold:0.15,
    rootMargin:"160px"
  });


vijayawadaBannerImages.forEach(img=>{
  vijayawadaBannerObserver.observe(img);
});

const pervaliImages =
  document.querySelectorAll(".pervaliImg");


const pervaliObserver =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;


      const img = entry.target;


      /* LOAD ONLY WHEN NEAR VIEW */

      if(!img.src){
        img.src = img.dataset.src;
      }


      img.onload = ()=>{

        img.classList.add(
          "pervaliLoaded"
        );

        img.closest(".pervaliCard")
          .classList.add(
            "pervaliImageLoaded"
          );

      };


      pervaliObserver.unobserve(img);

    });

  },{
    root:null,
    threshold:0.1,
    rootMargin:"120px"
  });


pervaliImages.forEach(img=>{

  pervaliObserver.observe(img);

});



/* ==============================
   RIGHT IMAGE LAZY LOAD
============================== */

const ravulapalemImages =
  document.querySelectorAll(
    ".ravulapalemImg"
  );


const ravulapalemObserver =
  new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


      if(!entry.isIntersecting){
        return;
      }


      const img = entry.target;


      if(!img.src){

        img.src =
          img.dataset.src;

      }


      img.onload = ()=>{


        img.classList.add(
          "ravulapalemLoaded"
        );


        img.closest(
          ".ravulapalemImageBox"
        )
        .classList.add(
          "ravulapalemImageLoaded"
        );


      };


      ravulapalemObserver
        .unobserve(img);


    });


  },{
    root:null,

    threshold:0.1,

    rootMargin:"120px"
  });


ravulapalemImages.forEach(img=>{

  ravulapalemObserver
    .observe(img);

});



/* ==============================
   LEFT IMAGE LAZY LOAD
============================== */

const ravulapalemLeftImages =
  document.querySelectorAll(
    ".ravulapalemLeftImg"
  );


const ravulapalemLeftObserver =
  new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


      if(!entry.isIntersecting){
        return;
      }


      const img = entry.target;


      if(!img.src){

        img.src =
          img.dataset.src;

      }


      img.onload = ()=>{


        img.classList.add(
          "ravulapalemLeftLoaded"
        );


        img.closest(
          ".ravulapalemLeftImageBox"
        )
        .classList.add(
          "ravulapalemLeftImageLoaded"
        );


      };


      ravulapalemLeftObserver
        .unobserve(img);


    });


  },{
    threshold:0.1,

    rootMargin:"120px"
  });


ravulapalemLeftImages.forEach(img=>{

  ravulapalemLeftObserver
    .observe(img);

});



/* ==============================
   CENTER IMAGE LAZY LOAD
============================== */

const ravulapalemCenterImages =
  document.querySelectorAll(
    ".ravulapalemCenterImg"
  );


const ravulapalemCenterObserver =
  new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


      if(!entry.isIntersecting){
        return;
      }


      const img = entry.target;


      if(!img.src){

        img.src =
          img.dataset.src;

      }


      img.onload = ()=>{


        img.classList.add(
          "ravulapalemCenterLoaded"
        );


        img.closest(
          ".ravulapalemCenterImageBox"
        )
        .classList.add(
          "ravulapalemCenterImageLoaded"
        );


      };


      ravulapalemCenterObserver
        .unobserve(img);


    });


  },{
    threshold:0.1,

    rootMargin:"120px"
  });


ravulapalemCenterImages.forEach(img=>{

  ravulapalemCenterObserver
    .observe(img);

});
const kanuruBanner =
  document.getElementById("kanuruBanner");

let kanuruTimers = [];
let kanuruRunning = false;

function clearKanuruTimers(){
  kanuruTimers.forEach(timer=>{
    clearTimeout(timer);
  });

  kanuruTimers = [];
}

function resetKanuruBanner(){
  kanuruBanner.classList.remove(
    "kanuruShowIce",
    "kanuruHideIce",
    "kanuruShowPlay",
    "kanuruHidePlay"
  );
}

function runKanuruLoop(){
  if(!kanuruRunning){
    return;
  }

  resetKanuruBanner();

  void kanuruBanner.offsetWidth;

  kanuruBanner.classList.add("kanuruShowIce");

  kanuruTimers.push(
    setTimeout(()=>{
      kanuruBanner.classList.add("kanuruHideIce");
    },3500)
  );

  kanuruTimers.push(
    setTimeout(()=>{
      kanuruBanner.classList.add("kanuruShowPlay");
    },4100)
  );

  kanuruTimers.push(
    setTimeout(()=>{
      kanuruBanner.classList.add("kanuruHidePlay");
    },6500)
  );

  kanuruTimers.push(
    setTimeout(()=>{
      if(kanuruRunning){
        runKanuruLoop();
      }
    },7200)
  );
}

const kanuruObserver =
  new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{

      if(entry.isIntersecting){

        if(kanuruRunning){
          return;
        }

        kanuruRunning = true;

        clearKanuruTimers();
        runKanuruLoop();

      }else{

        kanuruRunning = false;

        clearKanuruTimers();
        resetKanuruBanner();

      }

    });
  },{
    threshold:0.35
  });

kanuruObserver.observe(kanuruBanner);


const depaaTrack = document.getElementById("depaaTrack");
const depaaDots = document.querySelectorAll(".depaaDot");
const depaaImages = document.querySelectorAll(".depaaImg");

depaaTrack.addEventListener("scroll", ()=>{
  const index = Math.round(
    depaaTrack.scrollLeft / depaaTrack.clientWidth
  );

  depaaDots.forEach(dot=>{
    dot.classList.remove("active");
  });

  depaaDots[index]?.classList.add("active");
});


const depaaObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{

    if(!entry.isIntersecting) return;

    const img = entry.target;

    if(!img.src){
      img.src = img.dataset.src;
    }

    img.onload = ()=>{
      img.classList.add("depaaLoaded");

      img.closest(".depaaSlide")
        .classList.add("depaaImageLoaded");
    };

    depaaObserver.unobserve(img);

  });
},{
  threshold:0.15,
  rootMargin:"160px"
});

depaaImages.forEach(img=>{
  depaaObserver.observe(img);
});

const jalandharBannerTrack =
  document.getElementById("jalandharBannerTrack");

const jalandharBannerDots =
  document.querySelectorAll(".jalandharBannerDot");

const jalandharBannerImages =
  document.querySelectorAll(".jalandharBannerImg");

jalandharBannerTrack.addEventListener("scroll", ()=>{

  const slideWidth =
    jalandharBannerTrack.querySelector(".jalandharBannerSlide").offsetWidth + 12;

  const index = Math.round(
    jalandharBannerTrack.scrollLeft / slideWidth
  );

  jalandharBannerDots.forEach(dot=>{
    dot.classList.remove("active");
  });

  jalandharBannerDots[index]?.classList.add("active");
});

const jalandharBannerObserver =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      const img = entry.target;

      if(!img.src){
        img.src = img.dataset.src;
      }

      img.onload = ()=>{

        img.classList.add("jalandharBannerLoaded");

        img.closest(".jalandharBannerSlide")
          .classList.add("jalandharBannerImageLoaded");
      };

      jalandharBannerObserver.unobserve(img);
    });

  },{
    threshold:0.15,
    rootMargin:"160px"
  });

jalandharBannerImages.forEach(img=>{
  jalandharBannerObserver.observe(img);
});


const phagwaraBannerTrack =
  document.getElementById("phagwaraBannerTrack");

const phagwaraBannerDots =
  document.querySelectorAll(".phagwaraBannerDot");

const phagwaraBannerImages =
  document.querySelectorAll(".phagwaraBannerImg");


/* DOT CHANGE */

phagwaraBannerTrack.addEventListener("scroll", ()=>{

  const slide =
    phagwaraBannerTrack.querySelector(".phagwaraBannerSlide");

  const slideWidth =
    slide.offsetWidth + 12;

  const index = Math.round(
    phagwaraBannerTrack.scrollLeft / slideWidth
  );

  phagwaraBannerDots.forEach(dot=>{
    dot.classList.remove("active");
  });

  phagwaraBannerDots[index]?.classList.add("active");

});


/* LAZY LOAD */

const phagwaraBannerObserver =
  new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

      if(!entry.isIntersecting) return;

      const img = entry.target;

      if(!img.src){
        img.src = img.dataset.src;
      }

      img.onload = ()=>{

        img.classList.add("phagwaraBannerLoaded");

        img.closest(".phagwaraBannerSlide")
          .classList.add("phagwaraBannerImageLoaded");
      };

      phagwaraBannerObserver.unobserve(img);

    });

  },{
    threshold:0.15,
    rootMargin:"160px"
  });


phagwaraBannerImages.forEach(img=>{
  phagwaraBannerObserver.observe(img);
});
function initializePriyaaShimmer(){

  document
    .querySelectorAll(".priyaaProductArea img")
    .forEach(img => {

      if(img.dataset.priyaaReady === "true"){
        return;
      }

      img.dataset.priyaaReady = "true";

      function finishPriyaaLoading(){

        img.classList.add("priyaaLoaded");

        img
          .closest(".priyaaProductArea")
          ?.querySelector(".priyaaShimmer")
          ?.remove();
      }

      if(img.complete && img.naturalWidth > 0){

        finishPriyaaLoading();

      }else{

        img.addEventListener(
          "load",
          finishPriyaaLoading,
          { once:true }
        );

        img.addEventListener(
          "error",
          finishPriyaaLoading,
          { once:true }
        );
      }

    });
}

document.addEventListener(
  "DOMContentLoaded",
  initializePriyaaShimmer
);

window.openReportIssuePopup = function(){

  document
    .getElementById("reportIssuePopup")
    ?.classList.add("open");

  document.body.style.overflow = "hidden";
};


window.closeReportIssuePopup = function(){

  document
    .getElementById("reportIssuePopup")
    ?.classList.remove("open");

  document.body.style.overflow = "hidden";
};


const reportIssueMessage =
  document.getElementById("reportIssueMessage");

const reportIssueCharCount =
  document.getElementById("reportIssueCharCount");


reportIssueMessage?.addEventListener(
  "input",
  function(){

    reportIssueCharCount.innerText =
      String(this.value.length);

  }
);


window.submitReportIssue = async function(){
  const issueType =
    document
      .getElementById("reportIssueType")
      ?.value;

  const orderId =
    document
      .getElementById("reportIssueOrderId")
      ?.value
      ?.trim();

  const message =
    document
      .getElementById("reportIssueMessage")
      ?.value
      ?.trim();

  const status =
    document.getElementById("reportIssueStatus");


  status.className = "reportIssueStatus";
  status.innerText = "";


  if(!issueType){

    status.classList.add("error");
    status.innerText = "Please select an issue.";

    setTimeout(() => {
      status.className = "reportIssueStatus";
      status.innerText = "";
    }, 5000);

    return;
  }


  if(!message){

    status.classList.add("error");
    status.innerText = "Please describe your issue.";

    setTimeout(() => {
      status.className = "reportIssueStatus";
      status.innerText = "";
    }, 5000);

    return;
  }


  const user = JSON.parse(
    localStorage.getItem("cezooUser") || "null"
  );


  const { error } =
await window._supabaseClient
  .from("reported_issues")
  .insert([{

    issue_type: issueType,

    order_id: orderId || null,

    message: message,

    user_name: user?.name || "",

    user_mobile: user?.mobile || ""

  }]);

if(error){

  status.className = "reportIssueStatus error";
  status.innerText = "Unable to submit issue.";

  setTimeout(() => {
    status.className = "reportIssueStatus";
    status.innerText = "";
  }, 5000);

  return;
}


 const submitBtn =
  document.querySelector(".reportIssueSubmitBtn");

submitBtn.disabled = true;

submitBtn.innerHTML = `
  <span class="reportIssueSuccessTick">
    ✓
  </span>
`;

document.getElementById("reportIssueType").value = "";
document.getElementById("reportIssueOrderId").value = "";
document.getElementById("reportIssueMessage").value = "";

reportIssueCharCount.innerText = "0";

setTimeout(() => {

  submitBtn.disabled = false;

  submitBtn.innerHTML = "Submit Issue";

}, 5000);

};
let reportIssueStartX = 0;
let reportIssueStartY = 0;

const reportIssuePopupBox =
  document.getElementById("reportIssuePopup");


reportIssuePopupBox?.addEventListener(
  "touchstart",
  function(e){

    e.stopPropagation();

    const touch = e.touches[0];

    reportIssueStartX = touch.clientX;
    reportIssueStartY = touch.clientY;

  },
  { passive:true }
);


reportIssuePopupBox?.addEventListener(
  "touchend",
  function(e){

    e.stopPropagation();

    const touch = e.changedTouches[0];

    const diffX =
      touch.clientX - reportIssueStartX;

    const diffY =
      touch.clientY - reportIssueStartY;


    if(
      Math.abs(diffX) > 90 &&
      Math.abs(diffY) < 70
    ){
      closeReportIssuePopup();
    }

  },
  { passive:true }
);


window.openFaqPopup = function(){

  document
    .getElementById("faqPopup")
    ?.classList.add("open");

  document.body.style.overflow = "hidden";

};


window.closeFaqPopup = function(){

  document
    .getElementById("faqPopup")
    ?.classList.remove("open");

  // Profile popup is still open
  document.body.style.overflow = "hidden";

};


/* ===========================
   FAQ SWIPE BACK
=========================== */

let tirupathiiStartX = 0;
let tirupathiiStartY = 0;

const tirupathiiPopup =
  document.getElementById("faqPopup");


tirupathiiPopup?.addEventListener(
  "touchstart",
  function(e){

    e.stopPropagation();

    const touch = e.touches[0];

    tirupathiiStartX = touch.clientX;
    tirupathiiStartY = touch.clientY;

  },
  { passive:true }
);


tirupathiiPopup?.addEventListener(
  "touchend",
  function(e){

    e.stopPropagation();

    const touch = e.changedTouches[0];

    const diffX =
      touch.clientX - tirupathiiStartX;

    const diffY =
      touch.clientY - tirupathiiStartY;

    if(
      Math.abs(diffX) > 90 &&
      Math.abs(diffY) < 70
    ){

      closeFaqPopup();

    }

  },
  { passive:true }
);



window.openSuggestProductPopup = function(){

  document
    .getElementById("suggestProductPopup")
    ?.classList.add("open");

  document.body.style.overflow = "hidden";

};


window.closeSuggestProductPopup = function(){

  document
    .getElementById("suggestProductPopup")
    ?.classList.remove("open");

  document.body.style.overflow = "hidden";

};



window.submitSuggestedProduct = async function(){

  const productName =
    document
      .getElementById("shiridiProductName")
      ?.value
      ?.trim();

  const brandName =
    document
      .getElementById("shiridiBrandName")
      ?.value
      ?.trim();

  const approxPrice =
    document
      .getElementById("shiridiPrice")
      ?.value
      ?.trim();

  const status =
    document.getElementById("shiridiStatus");


  status.className = "reportIssueStatus";
  status.innerText = "";


  if(!productName){

    status.classList.add("error");
    status.innerText =
      "Please enter the product name.";

    setTimeout(()=>{

      status.className =
        "reportIssueStatus";

      status.innerText = "";

    },5000);

    return;
  }


  const user = JSON.parse(
    localStorage.getItem("cezooUser") || "null"
  );


  const { error } =
    await window._supabaseClient

      .from("product_suggestions")

      .insert([{

        product_name: productName,

        brand_name: brandName || null,

        approx_price: approxPrice || null,

        user_name: user?.name || "",

        user_mobile: user?.mobile || ""

      }]);


  if(error){

    status.classList.add("error");

    status.innerText =
      "Unable to submit suggestion.";

    setTimeout(()=>{

      status.className =
        "reportIssueStatus";

      status.innerText = "";

    },5000);

    return;
  }


  const submitBtn =
    document.querySelector(".shiridiSubmitBtn");


  submitBtn.disabled = true;

  submitBtn.innerHTML = `
    <span class="shiridiSuccessTick">
      ✓
    </span>
  `;


  document.getElementById(
    "shiridiProductName"
  ).value = "";

  document.getElementById(
    "shiridiBrandName"
  ).value = "";

  document.getElementById(
    "shiridiPrice"
  ).value = "";


  setTimeout(()=>{

    submitBtn.disabled = false;

    submitBtn.innerHTML =
      "Submit Suggestion";

  },5000);

};

let shiridiStartX = 0;
let shiridiStartY = 0;

const shiridiPopup =
document.getElementById(
  "suggestProductPopup"
);

shiridiPopup?.addEventListener(
  "touchstart",
  function(e){

    const touch = e.touches[0];

    shiridiStartX =
      touch.clientX;

    shiridiStartY =
      touch.clientY;

  },
  {passive:true}
);


shiridiPopup?.addEventListener(
  "touchend",
  function(e){

    const touch =
      e.changedTouches[0];

    const diffX =
      touch.clientX -
      shiridiStartX;

    const diffY =
      touch.clientY -
      shiridiStartY;

    if(
      Math.abs(diffX) > 90 &&
      Math.abs(diffY) < 70
    ){

      closeSuggestProductPopup();

    }

  },
  {passive:true}
);
