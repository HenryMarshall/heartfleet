require([
  "esri/map",
  "esri/dijit/Search",
  "esri/symbols/Font",
  "esri/geometry/Point",
  "esri/SpatialReference",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/Color",
  "esri/symbols/TextSymbol",

  "dijit/registry",
  "dijit/form/Button",
  "dojo/parser",
  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane",
  "dojo/domReady!"
], function (
  Map,
  Search,
  Font,
  Point,
  SpatialReference,
  SimpleMarkerSymbol,
  PictureMarkerSymbol,
  SimpleLineSymbol,
  Color,
  TextSymbol,
  registry,
  Button,
  parser
) {
  parser.parse();

  var map = new Map("map", {
    basemap: "dark-gray",
    center: [-74, 40.728], // lon, lat
    zoom: 12
  });

  //Do not provide a srcNode dom for the Search widget as the UI is not displayed. 

  var search = new Search({
    enableLabel: true,
    enableInfoWindow: false,
    map: map
  }, "");

  search.startup();

  $("#address").on("submit", function(e) {
    e.preventDefault()
    var address = $("#address input").val()
    doSearchValue(address)
    // maxsFunction(address)
  })

  function doSearchValue(location) {

    //highlight symbol
    var sms = new SimpleMarkerSymbol(
      SimpleMarkerSymbol.STYLE_CIRCLE,
      12,
      new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID,
        new Color([255, 0, 0]),
        0.8
      ),
      new Color([0, 0, 0, 0.35])
    );

    //label text symbol
    var ls = new TextSymbol()
      .setColor(new Color([0, 0, 0, 0.9]))
      .setFont(new Font("16px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Arial"))
      .setOffset(15, -5)
      .setAlign(TextSymbol.ALIGN_START);

    search.sources[0].highlightSymbol = sms; //set the symbol for the highlighted symbol
    search.sources[0].labelSymbol = ls; //set the text symbol for the label

    //If multiple results are found, it will default and select the first.
    search.search(location);
  }
});
