  function getAEDbyID(id) {
    var AED = {};
    var csvFile;
    $.get("/data/aeds.csv", function(res) {
      csvFile = res;
      var result = $.csv.toObjects(csvFile);
      var i;
      for (i=0; i<result.length; i++) {
        if (result[i].id = id) {
          console.log(result[i]);
        }
      }
    });
  }
