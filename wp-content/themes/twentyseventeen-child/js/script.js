const DisplayMap = (zooomDisable) => {
  jQuery("#header-map").text("Loading.....");
  fetch("https://covid19.osinthk.org/wp-admin/admin-ajax.php?action=getData")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      jQuery("#header-map").text("");
      var statesData = data;

      var mapboxTiles = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          id: "mapbox/light-v9",
        }
      );

      var map = L.map("header-map", { zoomControl: false })
        .addLayer(mapboxTiles)
        .setView([22.572646, 88.363895], 4);

      var total_confirmed_cases = 0;
      var total_death = 0;
      var total_recovered = 0;
      var last_updated = "";

      for (var i = 0; i < statesData.features.length; i++) {
        // ========Stastatics Counting=====
        if (statesData.features[i].properties["Total Cases"] === "") {
          statesData.features[i].properties["Total Cases"] = 0;
        }
        if (statesData.features[i].properties.Deceased === "") {
          statesData.features[i].properties.Deceased = 0;
        }
        if (statesData.features[i].properties.Recovered === "") {
          statesData.features[i].properties.Recovered = 0;
        }

        total_confirmed_cases =
          total_confirmed_cases +
          parseInt(statesData.features[i].properties["Total Cases"]);
        total_death =
          total_death + parseInt(statesData.features[i].properties.Deceased);
        total_recovered =
          total_recovered +
          parseInt(statesData.features[i].properties.Recovered);
        last_updated = new Date(
          statesData.features[i].properties["Last Updated"]
        ).toLocaleString();

        circle = L.circle(
          [
            statesData.features[i].geometry.coordinates[1],
            statesData.features[i].geometry.coordinates[0],
          ],
          getRadiusVal(statesData.features[i].properties["Total Cases"]) * 10,
          {
            color: "red",
            fillColor: "red",
            fillOpacity: 0.5,
          }
        )
          .bindPopup(
            `
          <h3 class="popup-district">${
            statesData.features[i].properties.City
          } ${statesData.features[i].properties.Country}</h3>
          <h3 class="popup-number">Total Cases: <span>${
            statesData.features[i].properties["Total Cases"]
          }</span></h3>
          <h3 class="popup-number">Current Cases: <span>${
            statesData.features[i].properties["Current Cases"]
          }</span></h3>
          <h3 class="popup-number">Deceased: <span>${
            statesData.features[i].properties.Deceased
          }</span></h3>
          <h3 class="popup-number covid-recovered">Recovered: <span>${
            statesData.features[i].properties.Recovered
          }</span></h3>
          <h3 class="popup-number last-update">Last Updated: <span> ${new Date(
            statesData.features[i].properties["Last Updated"]
          ).toLocaleString()}</span></h3>
        `
          )
          .addTo(map);
      }

      var stastatics = L.control({ position: "bottomleft" });

      stastatics.onAdd = function (map) {
        this.stastaticsContent = L.DomUtil.create("div", "stastatics");
        this.filterFunc();
        return this.stastaticsContent;
      };

      stastatics.filterFunc = function (props) {
        this.stastaticsContent.innerHTML = `
          <div class="stastatics-display-area">
            <div class="stastatics-display-box total-confirmed-cases">
              <span class="stastatics-display-box-title">Total Confirmed</span>
              <span class="stastatics-display-box-counting">${total_confirmed_cases}</span>
            </div>
            <div class="stastatics-display-box total-recovered-cases">
              <span class="stastatics-display-box-title">Total Recovered</span>
              <span class="stastatics-display-box-counting">${total_recovered}</span>
            </div>
            <div class="stastatics-display-box total-death-cases">
              <span class="stastatics-display-box-title">Total Death</span>
              <span class="stastatics-display-box-counting">${total_death}</span>
            </div>
          </div>
          <div class="stastatics-updates-area">
            <span>Last Updated: ${last_updated}</span>
          </div>
        `;
      };

      stastatics.addTo(map);

      L.control
        .zoom({
          position: "bottomright",
        })
        .addTo(map);

      circle.on("click", function (e, fe) {
        circle.openPopup(e.latlng);
      });

      setTimeout(function () {
        map.invalidateSize(true);
      }, 4000);
    })

    .catch(function () {
      jQuery("#header-map").text(
        "Something went wrong. Please refresh the page"
      );
    });
};

const getRadiusVal = (val) => {
  if (val < 100) {
    return 100;
  } else if (val < 200) {
    return 200;
  } else if (val < 300) {
    return 300;
  } else if (val < 400) {
    return 400;
  } else if (val < 500) {
    return 500;
  } else if (val < 600) {
    return 600;
  } else if (val < 700) {
    return 700;
  } else if (val < 800) {
    return 800;
  } else if (val < 900) {
    return 900;
  } else if (val < 1000) {
    return 1000;
  } else if (val > 40000) {
    return 40000;
  } else {
    return val;
  }
};

jQuery(document).ready(function () {
  DisplayMap(false);
});
