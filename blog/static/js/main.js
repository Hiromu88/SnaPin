//スクレイピング用

let infoWindows = [];

    'use strict'

let map;
  // 複数マーカー設置
let locations //  = JSON.parse(['{{ final_list|safe }}']);
// window.print(locations);

function setLocation(finalList) {
    const tmp = finalList.replaceAll("'", '"');
    locations = JSON.parse(tmp || "null");
};

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15, //地図の縮尺
        center: {lat: locations[1]['lat'], lng: locations[1]['lng']}, //地図の中心座標
        mapTypeId: 'roadmap' , //地図の種類
    });

    console.log(`locations: ${locations}`);

    addCurrentPosition();
    // 自分の位置情報を表示
//     infoWindow2 = new google.maps.InfoWindow();
//     const locationButton = document.createElement("button");
//     locationButton.textContent = "Pan to Current Location";
//     locationButton.classList.add("custom-map-control-button");
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//     locationButton.addEventListener("click", () => {
//       // Try HTML5 geolocation.
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const pos = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             };
//             infoWindow2.setPosition(pos);
//             infoWindow2.setContent("Location found.");
//             infoWindow2.open(map);
//             map.setCenter(pos);
//           },
//           () => {
//             handleLocationError(true, infoWindow2, map.getCenter());
//           }
//         );
//       } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow2, map.getCenter());
//       }
//     });
//   }

//   function handleLocationError(browserHasGeolocation, infoWindow2, pos) {
//     infoWindow2.setPosition(pos);
//     infoWindow2.setContent(
//       browserHasGeolocation
//         ? "Error: The Geolocation service failed."
//         : "Error: Your browser doesn't support geolocation."
//     );
//     infoWindow2.open(map);

//   単発のマーカー表示
//   var marker = new google.maps.Marker({
//     position: {lat: 35.665498, lng: 139.75964},
//     map: map
//   });

};

let sampleMarker;
let sampleWindow;
//   複数マーカーの表示
// function addPin() {
//     locations.forEach(function(location, index){
//         const marker = new google.maps.Marker({
//           position: location,
//           map: map,
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//         });
//         marker.setValues({type: "point", id: "1"});
//         marker.addListener('click', () => {
//           var infoWindow = new google.maps.InfoWindow({
//               position: location,
//               content: `<div class="gmap-info-window"><p class="gmap-info-window-title"> ${location.name} </p><p class="gmap-info-window-address"> </br>
//               <a href = ${location.url} target="_blank">${location.url}</a></p></div>`,
//               // infowindowsの表示位置の調整
//               pixelOffset: new google.maps.Size( 0, -30 ) ,
//               // 位置座標の自動修正
//               disableAutoPan: false ,
//             })
//             infoWindow.open(map, marker);
//         })
//     });
//   };


// let infoWindows = [];

function addPin() {
    (locations || [] ).filter(location => location.id !== "").forEach(function(location, index){
        const marker = new google.maps.Marker({
        position: location,
        map: map,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        const wifi = location.wifi === "あり" ? `<svg version="1.1" class = "svg_wifi_icon"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><path d="M663.5,721.7c-16.4,0-32.7-6.8-44.5-20.2c-30.4-34.4-73.7-54.1-118.9-54.1c-45.9,0-88.1,19.1-118.8,53.8c-22.3,25.2-60.2,27.2-84.9,4.2c-24.6-22.9-26.5-61.7-4.2-86.9c53-59.9,128.7-94.2,207.8-94.2c79,0,154.8,34.4,207.9,94.5c22.3,25.2,20.4,64.1-4.2,86.9C692.4,716.5,677.9,721.7,663.5,721.7L663.5,721.7z M796.9,567.7c-15.3,0-30.7-6-42.4-17.9c-68-69.3-158.4-107.4-254.4-107.4c-96.2,0-186.6,38.1-254.5,107.2c-23.5,24-61.6,23.8-85-0.2c-23.4-24.1-23.3-63.1,0.2-87c90.6-92.2,211.1-143,339.2-143c128,0,248.4,50.9,339.2,143.3c23.5,24,23.6,62.9,0.2,87.1C827.8,561.6,812.3,567.7,796.9,567.7L796.9,567.7z M929.9,414c-15,0-29.9-5.7-41.6-17.1C783.4,294,645.5,237.2,500.1,237.2c-145.8,0-283.7,56.6-388.3,159.5c-23.9,23.5-62,22.7-85-1.8c-23-24.5-22.2-63.5,1.7-87C155.6,182.9,323.1,114,500,114c176.6,0,344,68.9,471.5,193.9c24,23.5,24.8,62.5,1.8,87C961.5,407.7,945.7,414,929.9,414L929.9,414z M427.5,811.6c0,41.1,32.5,74.3,72.6,74.3c40.1,0,72.6-33.3,72.6-74.3c0-41.1-32.5-74.3-72.6-74.3C460,737.4,427.5,770.6,427.5,811.6L427.5,811.6z"/></g>
        </svg>` : `<svg version="1.1" class="svg_wifi_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><path d="M432.4,837.9c0,37.3,30.3,67.6,67.6,67.6c37.3,0,67.6-30.3,67.6-67.6c0-37.3-30.3-67.6-67.6-67.6C462.7,770.3,432.4,800.6,432.4,837.9z"/><path d="M190.3,256C129,284.2,74.1,319.9,29.8,361C17.6,372.6,10,388.9,10,407.1c0,35,28.1,63.4,62.8,63.4c20.3,0,37.3-12.5,49.8-24.8c43.6-34.6,91.2-62.8,141.6-84.1L190.3,256z"/><path d="M972.3,363.1C847.5,252.5,680.5,187.4,500,187.4c-25.5,0-51,1.5-76.3,4.2l85.9,122.6c135.1,2.1,263,48.1,367.8,131.3c14.7,14,29.5,24.9,49.8,24.9c34.7,0,62.8-28.4,62.8-63.4C990,390,983.3,374.5,972.3,363.1z"/><path d="M559.1,385l112.5,160.7c26.8,12.2,52.2,27.1,75.6,44.5c13.5,10.9,27.9,19.7,45.9,19.7c34.7,0,62.8-28.4,62.8-63.4c0-18.2-7.6-34.5-19.8-46.1C758.1,438.2,663.2,396.5,559.1,385z"/><path d="M303.7,418C251,438,203.4,465.5,166,498.4c-13.4,11.6-22,28.8-22,48.1c0,35,28.1,63.4,62.8,63.4c19.1,0,42.5-16.2,48.3-21.5c37.3-27.2,79.3-48.3,124.4-62L303.7,418z"/><path d="M503.2,702.9l-82.3-117.5c-47.2,10.8-90.3,30.4-114.7,54.5c-9.7,11.2-15.7,25.7-15.7,41.8c0,35,28.1,63.4,62.8,63.4c16.1,0,30.3-8.8,41.8-16.2c31.3-16.6,67-26,104.7-26C501.1,702.8,502.1,702.8,503.2,702.9z"/><path d="M312.7,121.5c-20.1-28.7-59.6-35.6-88.2-15.6s-35.6,59.6-15.6,88.2L645,817c20.1,28.7,59.6,35.6,88.3,15.6c28.7-20.1,35.6-59.6,15.6-88.2L312.7,121.5z"/></g>
        </svg>`;

        // infoWindows[index] = new google.maps.InfoWindow({
            infoWindows[index] = new google.maps.InfoWindow({
            position: location,
            content: `<div class="gmap-info-window">
            <p class="gmap-info-window-title"> ${location.name} </p>
            <p  class="gmap-info-window-title">${wifi}</p>
            <p class="gmap-info-window-address"></br>
            <a href = ${location.url} target="_blank">予約する</a>
            </p></div>`,
            // infowindowsの表示位置の調整
            pixelOffset: new google.maps.Size( 0, -30 ) ,
            // 位置座標の自動修正
            disableAutoPan: false ,
            })
        marker.addListener('click', () => {
            openInfoWindow(index);
        })
    });
};

// リストをクリックしてピンを表示
function click_pin(infoWindowIndex) {
    openInfoWindow(infoWindowIndex);
}

let myLat;
let myLng;

function openInfoWindow(infoWindowIndex) {


    const loc = locations[infoWindowIndex];

    // const latLng = new google.maps.LatLng(loc['lat', loc['lng']])
    infoWindows.forEach(infoWindow => infoWindow.close());
    // infoWindows.forEach(infoWindows => infoWindows.close());
    infoWindows[infoWindowIndex].open(map);
    map.panTo(new google.maps.LatLng(loc['lat'], loc['lng']));


    // if( navigator.geolocation ){
    //     } else {
    //     // 現在位置を取得できない場合の処理
    //     console.log("使えない")
    //     }


}

function addCurrentPosition() {
    function success(result) {
        // console.log('success')
        // console.log(result)
        //   // 現在位置を取得できる場合の処理
        // console.log("使える")
        const mylocation = result.coords
        myLat = mylocation['latitude'];
        myLng = mylocation['longitude'];
        new google.maps.Marker({
            position:  {lat: mylocation['latitude'], lng: mylocation['longitude']},
            map: map,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            icon: {
                url:'/static/images/profile_square.001.png',
                scaledSize: new google.maps.Size(50,50),
            },
            // center: {lat: mylocation['latitude'], lng: mylocation['longitude']}, //地図の中心座標
            });
    };
    function error(error) {
        console.log('error')
        console.log(error)
    }
    const option = {
        "enableHighAccuracy": true,
        "timeout": 10000 ,
        "maximumAge": 0 ,
        } ;
        // ここを呼ぶ
    navigator.geolocation.getCurrentPosition(success, error, option);
}

function mylocation(){

    map.panTo(new google.maps.LatLng(myLat, myLng));


}




