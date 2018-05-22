window.lat = 0;
window.lng = 0;
var url = "http://www.mapquestapi.com/geocoding/v1/reverse?key=kFNMhlge8uFUbXGvjW1WR7ezgxubYcWk&location={lat},{lng}&includeRoadMetadata=true&includeNearestIntersection=true";

function getLocation() {
  if(window.lat === 0)
    navigator.geolocation.getCurrentPosition(showPosition);
  else
    navigator.geolocation.getCurrentPosition(updateCoord);
}

function showPosition(position) {
  url = url.replace("{lat}",position.coords.latitude)
  url = url.replace("{lng}",position.coords.longitude);
  window.lat = position.coords.latitude;
  window.lng = position.coords.longitude;
  console.log(url);
  $.ajax({url:url}).done(function(data){
    console.log(data["results"][0]["locations"][0]);
    $("#address").html(data["results"][0]["locations"][0].street);
    $("#postalCode").html(data["results"][0]["locations"][0].postalCode);
    $("#postalCode").html(data["results"][0]["locations"][0].postalCode);
    $("#td2").html(data["results"][0]["locations"][0].adminArea1);
    $("#td1").html(data["results"][0]["locations"][0].adminArea1Type);
    $("#td4").html(data["results"][0]["locations"][0].adminArea3);
    $("#td3").html(data["results"][0]["locations"][0].adminArea3Type);
    $("#td6").html(data["results"][0]["locations"][0].adminArea5);
    $("#td5").html(data["results"][0]["locations"][0].adminArea5Type);
  });
}

function updateCoord(position){
  window.lat = position.coords.latitude;
  window.lng = position.coords.longitude;
}



function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function myFunction() {

  var cores = ['#FF6633', '#FFB399', '#00B3E6', 
  '#E6B333', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3'];

  var z = Math.floor((Math.random() * cores.length));

  //mudar background color
  var cor = hexToRgb(cores[z]);
  $("body").css("background-color","rgba("+cor.r+","+cor.g+","+cor.b+",0.5)");
  document.getElementById("buttonCuriosidades").style.color = cores[z];
  document.getElementById("distancia").innerHTML = "";



  if (document.getElementById('td6').text != ''){

    var frases = ["Blandy's Wine Lodge tem vinho.", "O Ribeiro Frio é lá em cima.", "O La Vie é um centro comercial.", "As piscinas do Porto Moniz são fixes.", "O Roseiral do Arco tem rosas.", "A praia da Calheta é porreira."];


    var local = [
    {nome: "La Vie", longitude:-16.914049, latitude:32.647471},
    {nome: "Roseiral do Arco", longitude:-16.955045, latitude:32.825686, img: 'madeira.jpg'},
    {nome: "Calheta", longitude:-17.179113, latitude:32.738242},
    {nome: "Porto Moniz", longitude:-17.170608, latitude:32.866684},
    {nome: "Blandy's Wine", longitude:-16.910601, latitude:32.647857},
    {nome: "Ribeiro Frio", longitude:-16.883333, latitude:32.733333}
    ];

    var x = Math.floor((Math.random() * frases.length));
    document.getElementById("demo").innerHTML = frases[x];
    var flag = true;

    local.forEach(function(ele){
      if(frases[x].includes(ele.nome) && flag){
        getDistanceFromLatLonInKm(window.lat, window.lng, ele.latitude, ele.longitude,'Km');
        if(typeof ele.img !== "undefined"){
          $(".bg-1").css({
            "background-image":"url('madeira.jpg')",
            "background-size":"100% 100%",

            "background-repeat":"no-repeat"
          });
        }else{
          $(".bg-1").css({
            "background-image":"",
            "background-color":"#1abc9c"
          });
        }
        flag = false;
      }
    })  

  }
  else {
    document.getElementById("demo").innerHTML = "Precisas de activar o GPS. Reinicia a app se o problema persistir.";
  }
}

function getDistanceFromLatLonInKm(latitude1,longitude1,latitude2,longitude2,units) {
  var p = 0.017453292519943295;    //This is  Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((latitude2 - latitude1) * p)/2 + 
          c(latitude1 * p) * c(latitude2 * p) * 
          (1 - c((longitude2 - longitude1) * p))/2;
  var R = 6371; //  Earth distance in km so it will return the distance in km
  var dist = 2 * R * Math.asin(Math.sqrt(a)); 
  document.getElementById("distancia").innerHTML = (Math.round(dist * 10) / 10)+" Km"; 
}

function showPage() {
  document.getElementById("loader").style.display = "none";
}

$(document).ready(function(){
  getLocation();
  showPage();
});