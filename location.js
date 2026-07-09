function showCartLocationBar(){
  document
    .querySelector(".cezooMapNoticeBar")
    ?.classList.add("show");
}

function hideCartLocationBar(){
  document
    .querySelector(".cezooMapNoticeBar")
    ?.classList.remove("show");
}
let cartMap;
let cartMapLat = Number(localStorage.getItem("cezooUserLat")) || 16.5062;
let cartMapLng = Number(localStorage.getItem("cezooUserLon")) || 81.5212;
let cartMapAddress = "";
let cartMapSearchTimer;

function openCartLocationMap(){
  document.getElementById("cartMapPage").classList.add("show");

  setTimeout(()=>{
    if(!cartMap){
      cartMap = L.map("cartRealMap",{ zoomControl:false })
        .setView([cartMapLat, cartMapLng], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom:19
      }).addTo(cartMap);

      cartMap.on("moveend", ()=>{
        const c = cartMap.getCenter();
        cartMapLat = c.lat;
        cartMapLng = c.lng;
        getCartMapAddress(cartMapLat, cartMapLng);
      });
    }

    cartMap.invalidateSize();
    cartMap.setView([cartMapLat, cartMapLng], 15);
    getCartMapAddress(cartMapLat, cartMapLng);
  },300);
}

function closeCartLocationMap(){
  document.getElementById("cartMapPage").classList.remove("show");
}

async function getCartMapAddress(lat,lng){
  document.getElementById("cartSelectedAddress").innerText =
    lat.toFixed(6)+", "+lng.toFixed(6)+" - Fetching address...";

  try{
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );

    const data = await res.json();
    const a = data.address || {};

    cartMapAddress = [
      a.village || a.town || a.city || a.hamlet || a.suburb || "",
      a.county || a.state_district || "",
      a.state || "",
      a.postcode || ""
    ].filter(Boolean).join(", ");

    if(!cartMapAddress){
      cartMapAddress = data.display_name || "";
    }

    document.getElementById("cartSelectedAddress").innerText =
      cartMapAddress + "\n" + lat.toFixed(6) + ", " + lng.toFixed(6);

  }catch(e){
    cartMapAddress = lat.toFixed(6)+", "+lng.toFixed(6);
    document.getElementById("cartSelectedAddress").innerText = cartMapAddress;
  }
}

function confirmCartMapLocation(){
  localStorage.setItem("cezooUserLat", cartMapLat);
  localStorage.setItem("cezooUserLon", cartMapLng);

  if(document.getElementById("street")){
    document.getElementById("street").innerText = cartMapAddress;
  }

  if(document.getElementById("cartHeaderStreet")){
    document.getElementById("cartHeaderStreet").innerText = cartMapAddress;
  }

  document
    .querySelector(".cezooMapNoticeBar")
    ?.classList.add("locationReady");

  if(document.getElementById("cartPagePopup")?.classList.contains("open")){
    renderCartPage();
  }

  closeCartLocationMap();
}

function cartUseCurrentLocation(){
  navigator.geolocation.getCurrentPosition(pos=>{
    cartMapLat = pos.coords.latitude;
    cartMapLng = pos.coords.longitude;
    cartMap.setView([cartMapLat, cartMapLng],17);
    getCartMapAddress(cartMapLat, cartMapLng);
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  const input = document.getElementById("cartMapSearchInput");
  if(!input) return;

  input.addEventListener("input",()=>{
    clearTimeout(cartMapSearchTimer);
    const q = input.value.trim();
    if(q.length < 3) return;

    cartMapSearchTimer = setTimeout(async()=>{
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=in&q=${encodeURIComponent(q)}`
      );
      const data = await res.json();
      if(!data.length) return;

      cartMapLat = Number(data[0].lat);
      cartMapLng = Number(data[0].lon);
      cartMap.flyTo([cartMapLat, cartMapLng],17);
      getCartMapAddress(cartMapLat, cartMapLng);
    },600);
  });
});
