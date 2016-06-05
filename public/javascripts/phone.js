
var map;

require([
  "esri/map", 
  "esri/geometry/Point", 
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/graphic",
  "dojo/_base/array",
  "dojo/dom-style",
  "dojox/widget/ColorPicker", 
  "dojo/domReady!"
], function(
  Map,
  Point,
  SimpleMarkerSymbol,
  PictureMarkerSymbol,
  Graphic,
  arrayUtils,
  domStyle,
  ColorPicker
) {

  map = new Map("map",{
    basemap: "dark-gray",
    center: [-74, 40.728], // lon, lat
    zoom: 12,
    minZoom: 2
  });

  map.on("load", function() {
    var pathname = window.location.pathname
    var aedId = pathname.substr(pathname.lastIndexOf('/') + 1)
    getAedById(aedId, mapLoaded)
  });

  function getAedById(id, callback) {
    var AED = {};
    var csvFile;
    $.get("/data/aeds.csv", function(res) {
      csvFile = res;
      var result = $.csv.toObjects(csvFile);
      var i;
      for (i=0; i<result.length; i++) {
        if (result[i] === null) {
        }
        if (result[i].id == id) {
          console.log(result[i]);

          var point = [result[i].longitude, result[i].latitude]
          callback(point)
        }
      }
    });
  }

  function mapLoaded(point){
    var points = [point]
    // var points = [[19.82,41.33]];

    var initColor = "#ce641d";
    arrayUtils.forEach(points, function(point) {
      var pms = new PictureMarkerSymbol("/images/aed.png", 37, 24)
      
      var graphic = new Graphic(new Point(point), pms);
      map.graphics.add(graphic)
    });

    var colorPicker = new ColorPicker({}, "picker1");
    colorPicker.setColor(initColor);
    domStyle.set(colorPicker, "left", "500px");
    colorPicker.on("change", function(){
      var colorCode = this.hexCode.value;
      map.graphics.graphics.forEach(function(graphic){
        graphic.setSymbol(createSymbol(iconPath, colorCode));
      });
    });
  }

  function createSymbol(path, color){
    var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
    markerSymbol.setPath(path);
    markerSymbol.setColor(new dojo.Color(color));
    markerSymbol.setOutline(null);
    return markerSymbol;
  }
});
