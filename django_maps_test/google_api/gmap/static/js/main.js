// {
//     var map;

//     /**
//      * The CenterControl adds a control to the map that recenters the map on
//      * Chicago.
//      * This constructor takes the control DIV as an argument.
//      * @constructor
//      */
//     function CenterControl(controlDiv, map) {

//     // Set CSS for the control border.
//     var controlUI = document.createElement('div');
//     controlUI.style.backgroundColor = '#fff';
//     controlUI.style.border = '2px solid #fff';
//     controlUI.style.borderRadius = '3px';
//     controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
//     controlUI.style.cursor = 'pointer';
//     controlUI.style.marginBottom = '22px';
//     controlUI.style.textAlign = 'center';
//     controlUI.title = 'Click to recenter the map';
//     controlDiv.appendChild(controlUI);

//     // Set CSS for the control interior.
//     var controlText = document.createElement('div');
//     controlText.style.color = 'rgb(25,25,25)';
//     controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
//     controlText.style.fontSize = '16px';
//     controlText.style.lineHeight = '38px';
//     controlText.style.paddingLeft = '5px';
//     controlText.style.paddingRight = '5px';
//     controlText.innerHTML = 'Customer Search';
//     controlUI.appendChild(controlText);

//     controlUI.addEventListener('click', function() {

//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//             setMarker(JSON.parse(this.responseText));
//             }
//         };
//         xhttp.open("GET", "api/customer/?format=json", true);
//         xhttp.setRequestHeader("Content-type", "application/json");
//         xhttp.send();

//     });

//     }

//     function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 35.681236, lng: 139.767125},
//         zoom: 8
//     });

//     var centerControlDiv = document.createElement('div');
//     var centerControl = new CenterControl(centerControlDiv, map);

//     centerControlDiv.index = 1;
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

//     }

//     function setMarker(customerJson) {

//     for(var i = 0; i < customerJson.length; i++){

//         var infowindow = new google.maps.InfoWindow({
//         content: customerJson[i].name + ' ' + customerJson[i].address
//         });

//         var marker = new google.maps.Marker({
//         position: {lat: Number(customerJson[i].lat), lng: Number(customerJson[i].lng)},
//         map: map
//         });

//         bindInfoWindow(marker, map, infowindow);
//     }
//     }

//     function bindInfoWindow(marker, map, infowindow) {
//     marker.addListener('click', function() {
//         infowindow.open(map, this);
//     });
//     }

// }



//スクレイピング用

{
    'use strict'


let map;

function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15, //地図の縮尺
    center: locations[0], //地図の中心座標
    mapTypeId: 'roadmap' , //地図の種類
  });

//   単発のマーカー表示
//   var marker = new google.maps.Marker({
//     position: {lat: 35.665498, lng: 139.75964},
//     map: map
//   });

//   複数マーカーの表示
   locations.forEach(function(location){
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      marker.addListener('click', () => {
        var infoWindow = new google.maps.InfoWindow({
            position: location,
            content: `<div class="gmap-info-window"><p class="gmap-info-window-title"> ${location.name} </p><p class="gmap-info-window-address"> </br>
            <a href = ${location.url} target="_blank">${location.url}</a></p></div>`,
            // infowindowsの表示位置の調整
            pixelOffset: new google.maps.Size( 0, -30 ) ,
            // 位置座標の自動修正
            disableAutoPan: false ,
          })
          infoWindow.open(map);
      })
  });
};


// 複数マーカー設置
let locations = [

 {'name': '権八 渋谷 （GONPACHI）',
  'address': '東京都渋谷区円山町3-6Ｅ・スペースタワー14F',
  'url': 'https://www.hotpepper.jp/strJ000641701/?vos=nhppalsa000016',
  'lat': 35.6575110437,
  'lng': 139.6955368013},
 {'name': '鮨 やじま',
  'address': '東京都渋谷区東１-26-31 大島ビルB1',
  'url': 'https://www.hotpepper.jp/strJ000805248/?vos=nhppalsa000016',
  'lat': 35.6555754549,
  'lng': 139.7069414654},
 {'name': 'グルメ廻転寿司  まぐろ問屋 三浦三崎港 恵み 渋谷ヒカリエ店 ',
  'address': '東京都渋谷区渋谷２-21-1 渋谷ヒカリエ6F',
  'url': 'https://www.hotpepper.jp/strJ001009249/?vos=nhppalsa000016',
  'lat': 35.6587583266,
  'lng': 139.7030694446},
 {'name': 'ざうお 渋谷店',
  'address': '東京都渋谷区神南１－１９－３\u3000ハイマンテン神南ビル\u3000B1F',
  'url': 'https://www.hotpepper.jp/strJ001028556/?vos=nhppalsa000016',
  'lat': 35.6624828272,
  'lng': 139.7000723278},
 {'name': '肉天国',
  'address': '東京都渋谷区宇田川町13-8ちとせ会館３F',
  'url': 'https://www.hotpepper.jp/strJ001146759/?vos=nhppalsa000016',
  'lat': 35.6611290492,
  'lng': 139.6985161254},
 {'name': '寿司 魚がし日本一 渋谷センター街店 ',
  'address': '東京都渋谷区宇田川町２５－６ B1Ｆ',
  'url': 'https://www.hotpepper.jp/strJ000662136/?vos=nhppalsa000016',
  'lat': 35.6604058051,
  'lng': 139.6988086295},
 {'name': 'おもてなし 青山本店',
  'address': '東京都渋谷区渋谷２-8-10\u3000青山FMビルB1F',
  'url': 'https://www.hotpepper.jp/strJ001153988/?vos=nhppalsa000016',
  'lat': 35.6605640732,
  'lng': 139.707439001},
 {'name': '居酒屋 肴とり',
  'address': '東京都渋谷区円山町1-3猪鼻ビル2F',
  'url': 'https://www.hotpepper.jp/strJ001176565/?vos=nhppalsa000016',
  'lat': 35.6596094159,
  'lng': 139.6954370035},
 {'name': '権八 渋谷 （GONPACHI）',
  'address': '東京都渋谷区円山町3-6Ｅ・スペースタワー14F',
  'url': 'https://www.hotpepper.jp/strJ000641701/?vos=nhppalsa000016',
  'lat': 35.6575110437,
  'lng': 139.6955368013},
 {'name': '鮨 やじま',
  'address': '東京都渋谷区東１-26-31 大島ビルB1',
  'url': 'https://www.hotpepper.jp/strJ000805248/?vos=nhppalsa000016',
  'lat': 35.6555754549,
  'lng': 139.7069414654},
  {'name': 'グルメ廻転寿司  まぐろ問屋 三浦三崎港 恵み 渋谷ヒカリエ店 ',
  'address': '東京都渋谷区渋谷２-21-1 渋谷ヒカリエ6F',
  'url': 'https://www.hotpepper.jp/strJ001009249/?vos=nhppalsa000016',
  'lat': 35.6587583266,
  'lng': 139.7030694446},
 {'name': 'ざうお 渋谷店',
  'address': '東京都渋谷区神南１－１９－３\u3000ハイマンテン神南ビル\u3000B1F',
  'url': 'https://www.hotpepper.jp/strJ001028556/?vos=nhppalsa000016',
  'lat': 35.6624828272,
  'lng': 139.7000723278},
 {'name': '肉天国',
  'address': '東京都渋谷区宇田川町13-8ちとせ会館３F',
  'url': 'https://www.hotpepper.jp/strJ001146759/?vos=nhppalsa000016',
  'lat': 35.6611290492,
  'lng': 139.6985161254},
 {'name': '寿司 魚がし日本一 渋谷センター街店 ',
  'address': '東京都渋谷区宇田川町２５－６ B1Ｆ',
  'url': 'https://www.hotpepper.jp/strJ000662136/?vos=nhppalsa000016',
  'lat': 35.6604058051,
  'lng': 139.6988086295},
 {'name': 'おもてなし 青山本店',
  'address': '東京都渋谷区渋谷２-8-10\u3000青山FMビルB1F',
  'url': 'https://www.hotpepper.jp/strJ001153988/?vos=nhppalsa000016',
  'lat': 35.6605640732,
  'lng': 139.707439001},
 {'name': '居酒屋 肴とり',
  'address': '東京都渋谷区円山町1-3猪鼻ビル2F',
  'url': 'https://www.hotpepper.jp/strJ001176565/?vos=nhppalsa000016',
  'lat': 35.6596094159,
  'lng': 139.6954370035},

]
}