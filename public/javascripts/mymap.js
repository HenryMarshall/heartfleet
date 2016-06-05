require([
  // Map/Search stuff
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

  // CSV specific stuff
  "esri/layers/CSVLayer",
  "esri/renderers/SimpleRenderer",
  "esri/InfoTemplate",
  "esri/urlUtils",

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

  // CSV specifc stuff
  CSVLayer,
  SimpleRenderer,
  InfoTemplate,
  urlUtils,

  registry,
  Button,
  parser
) {
  parser.parse();

  // urlUtils.addProxyRule({
  //   proxyUrl: "/proxy/",
  //   urlPrefix: "earthquake.usgs.gov"
  // });

  var map = new Map("map", {
    basemap: "dark-gray",
    center: [-74, 40.728], // lon, lat
    zoom: 14
  });

  // var csv = new CSVLayer("/data/quakes.csv", {
  //   copyright: "USGS.gov"
  // });
  var csv = new CSVLayer("/data/aeds.csv", {
    copyright: "MIT"
  })
  var marker = new PictureMarkerSymbol("/images/aed.png", 37, 24)
  var renderer = new SimpleRenderer(marker);
  csv.setRenderer(renderer);
  var template = new InfoTemplate("${name}", "${address}");
  csv.setInfoTemplate(template);
  map.addLayer(csv);

  //Do not provide a srcNode dom for the Search widget as the UI is not displayed. 

  var search = new Search({
    enableLabel: true,
    enableInfoWindow: false,
    map: map
  }, "");

  search.startup();

  $("#address input").focus(function(e) {
    $("#logo").addClass("cloaked")
    $("#dispatch").removeClass("cloaked")
    // wait until the fade completes
    window.setTimeout(function() {
      $("#address").addClass("wide")
    }, 250)
  })

  $("#address input").blur(function(e) {
    $("#address").removeClass("wide")
    $("#dispatch").addClass("cloaked")
    window.setTimeout(function() {
      $("#logo").removeClass("cloaked")
    }, 800)
  })

  $("#address").on("submit", submitAddress)
  $("#dispatch").on("click", submitAddress)

  function submitAddress(e) {
    e.preventDefault()
    var address = $("#address input").val().trim()
    if (address) {
      doSearchValue(address)
      sendPostmate(address)
    }
    else {
      console.error("Address is blank!")
    }
  }

  $("#is-a-boss").on("click", function(e) {
    e.preventDefault()
    $.ajax({
      url: "twilio",
      method: "POST",
      data: {
        phoneNumber: "+13472245274",
        AEDlink: "https://www.google.com"
      }
    })
  })

  function choosenAedLocation(dropoffAddress) {
    // TODO
    return "Penn Station"
  }

  function sendPostmate(dropoffAddress) {
    var pickupAddress = choosenAedLocation(dropoffAddress)

    $.ajax({
      url: "/postmate",
      method: "POST",
      data: {
        manifest: "AED",
        pickup_name: "AED",
        pickup_address: pickupAddress,
        pickup_phone_number: "555-555-5555",
        pickup_notes: "This is an AED!",
        dropoff_name: "Victim",
        dropoff_address: dropoffAddress,
        dropoff_phone_number: "415-555-1234", //really want a real one
        dropoff_notes: "Optional note to ring the bell", //maybe nice, not that big a deal
        robo_pickup: "00:10:00",
        robo_pickup_complete: "00:20:00",
        robo_dropoff: "00:21:00",
        robo_delivered: "00:34:00"

      },
      success: function(response) {
        console.log(response)
      },
      error: function(error) {
        console.log(error)
      }
    })
  }

  function doSearchValue(location) {

    //highlight symbol
    var sms = new PictureMarkerSymbol("/images/callerLocation.png", 32, 48)

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
