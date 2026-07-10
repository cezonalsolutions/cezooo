/* =========================================
   RECEIVE iOS DEVICE TOKEN
========================================= */

window.onCezooDeviceTokenReceived = function(tokenData){

  try{

    let deviceToken = "";

    const statusEl =
      document.getElementById(
        "cezooDeviceTokenStatus"
      );


    if(typeof tokenData === "string"){

      deviceToken = tokenData;

    }else if(
      tokenData &&
      typeof tokenData === "object"
    ){

      deviceToken =
        tokenData.token ||
        tokenData.deviceToken ||
        "";

    }


    deviceToken =
      String(deviceToken)
        .trim();


    /* TOKEN NOT RECEIVED */

    if(!deviceToken){

      console.warn(
        "CEZOO device token is empty"
      );


      if(statusEl){

        statusEl.innerHTML = `
          Device Token Not Received
          <i
            class="fa-solid fa-circle-xmark"
            style="
              color:#e53935;
              font-size:11px;
              margin-left:4px;
            "
          ></i>
        `;

        statusEl.style.color =
          "#e53935";

      }


      return false;

    }


    /* SAVE TOKEN */

    localStorage.setItem(
      "cezooDeviceToken",
      deviceToken
    );


    localStorage.setItem(
      "cezooDeviceTokenUpdatedAt",
      new Date().toISOString()
    );


    console.log(
      "✅ CEZOO device token saved:",
      deviceToken
    );


    /* SHOW GREEN RECEIVED STATUS */

    if(statusEl){

      statusEl.innerHTML = `
        Device Token Received
        <i
          class="fa-solid fa-circle-check"
          style="
            color:#10b84f;
            font-size:11px;
            margin-left:4px;
          "
        ></i>
      `;

      statusEl.style.color =
        "#10b84f";

    }


    window.dispatchEvent(
      new CustomEvent(
        "cezooDeviceTokenUpdated",
        {
          detail:{
            token:deviceToken
          }
        }
      )
    );


    return true;


  }catch(error){

    console.error(
      "CEZOO device token save error:",
      error
    );


    const statusEl =
      document.getElementById(
        "cezooDeviceTokenStatus"
      );


    if(statusEl){

      statusEl.innerHTML = `
        Device Token Not Received
        <i
          class="fa-solid fa-circle-xmark"
          style="
            color:#e53935;
            font-size:11px;
            margin-left:4px;
          "
        ></i>
      `;

      statusEl.style.color =
        "#e53935";

    }


    return false;

  }

};


/* =========================================
   CHECK SAVED TOKEN ON PAGE LOAD
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function(){

    const statusEl =
      document.getElementById(
        "cezooDeviceTokenStatus"
      );


    if(!statusEl) return;


    const savedToken =
      localStorage.getItem(
        "cezooDeviceToken"
      );


    if(savedToken){

      statusEl.innerHTML = `
        Device Token Received
        <i
          class="fa-solid fa-circle-check"
          style="
            color:#10b84f;
            font-size:11px;
            margin-left:4px;
          "
        ></i>
      `;

      statusEl.style.color =
        "#10b84f";

    }else{

      statusEl.innerHTML = `
        Device Token Not Received
        <i
          class="fa-solid fa-circle-xmark"
          style="
            color:#e53935;
            font-size:11px;
            margin-left:4px;
          "
        ></i>
      `;

      statusEl.style.color =
        "#e53935";

    }

  }
);
