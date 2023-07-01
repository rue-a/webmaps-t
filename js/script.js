// function getColorFor(str) { // java String#hashCode
    //   var hash = 0;
    //   for (var i = 0; i < str.length; i++) {
    //     hash = str.charCodeAt(i) + ((hash << 5) - hash);
    //   }
    //   var red = (hash >> 24) & 0xff;
    //   var grn = (hash >> 16) & 0xff;
    //   var blu = (hash >>  8) & 0xff;
    //   return 'rgb(' + red + ',' + grn + ',' + blu + ')';
    // }
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    var osm = L.tileLayer(osmUrl, {
      maxZoom: 18,
      attribution: osmAttrib
    });
    var map = L.map('map', {
      layers: [osm],
      center: new L.LatLng(18.3, 73.5),
      zoom: 8
    });
    var timeline;
    var timelineControl;

    function onLoadData(data) {
      timeline = L.timeline(data, {
        style: function(data) {
          return {
            stroke: false,
            // color: getColorFor(data.properties.name),
            color: 'black',
            fillOpacity: 0.5
          }
        },
        waitToUpdateMap: true,
        onEachFeature: function(feature, layer) {
          layer.bindTooltip(feature.properties.name);
        }
      });

      timelineControl = L.timelineSliderControl({
        formatOutput: function(date) {
          date = new Date(date)
          var day = date.getDate();
          var monthIndex = date.getMonth();
          var year = date.getFullYear();
          return `${day}/${monthIndex}/${year}`
        },
        enableKeyboardControls: true,
      });
      timeline.addTo(map);
      timelineControl.addTo(map);
      timelineControl.addTimelines(timeline);
      createVisTimeline(data, 'horizontal');
    }
