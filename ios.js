/* =========================================
   RECEIVE iOS DEVICE TOKEN
========================================= */

window.onCezooDeviceTokenReceived = function(tokenData){

  try{

    let deviceToken = "";

    /* GET TOKEN */

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

    deviceToken = String(deviceToken).trim();

    const tokenStatus =
      document.getElementById(
        "cezooDeviceTokenStatus"
      );

    /* TOKEN EMPTY */

    if(!deviceToken){

      if(tokenStatus){

        tokenStatus.style.marginTop = "8px";
        tokenStatus.style.fontSize = "11px";
        tokenStatus.style.lineHeight = "1.4";
        tokenStatus.style.wordBreak = "break-all";
        tokenStatus.style.color = "#e53935";

        tokenStatus.textContent =
          "Device token not received";

      }

      console.warn(
        "CEZOO device token is empty"
      );

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

    /* SHOW TOKEN */

    if(tokenStatus){

      tokenStatus.style.marginTop = "8px";
      tokenStatus.style.fontSize = "11px";
      tokenStatus.style.lineHeight = "1.4";
      tokenStatus.style.wordBreak = "break-all";
      tokenStatus.style.color = "#0aaa43";

      tokenStatus.textContent =
        "Device Token: " + deviceToken;

    }

    console.log(
      "✅ CEZOO device token saved:",
      deviceToken
    );

    /* NOTIFY OTHER JS */

    window.dispatchEvent(
      new CustomEvent(
        "cezooDeviceTokenUpdated",
        {
          detail:{
            token: deviceToken
          }
        }
      )
    );

    return true;

  }catch(error){

    const tokenStatus =
      document.getElementById(
        "cezooDeviceTokenStatus"
      );

    if(tokenStatus){

      tokenStatus.style.color = "#e53935";
      tokenStatus.textContent =
        "Device token error";

    }

    console.error(
      "CEZOO device token save error:",
      error
    );

    return false;

  }

};
