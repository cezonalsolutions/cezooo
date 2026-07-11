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
