
var RiverDatum = function(site){

  this.DAYS = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  var self = this;

  this.data = [];

  this.endDate = parseDatum(site.observed.datum[0]);
  this.startDate = parseDatum(site.observed.datum[site.observed.datum.length-1]);
  this.interval = getInterval(site.observed.datum[0], site.observed.datum[1]);

  /*
   * get all the points
   */
  site.observed.datum.forEach(function(el, i){
      self.data.push(Number(el.primary.__text));
  });

  /**
   * converts datum to date
   */
  function parseDatum(datum){
      var dateText = datum.valid.__text;
      var d = dateText.match(/(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2})/);
      d[2] -= 1;
      return Date.UTC(d[1], d[2], d[3], d[4], d[5]);
  }

  /**
   * subtracts 1th from 0th to determin milliseconds between readings
   */
  function getInterval(datumZero, datumOne){
      return parseDatum(datumZero) - parseDatum(datumOne);
  }

};





