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


    /* TOKEN EMPTY */

    if(!deviceToken){

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

    console.error(
      "CEZOO device token save error:",
      error
    );

    return false;

  }

};
