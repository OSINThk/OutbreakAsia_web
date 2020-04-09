// var map;
// var nationalData;
// var regionsData;
// var allData;
// var windowWidth;

// const DisplayMap = (zooomDisable) => {
//   jQuery("#header-map").text("Loading.....");
//   fetch("https://covid19.osinthk.org/wp-admin/admin-ajax.php?action=getData")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       jQuery("#header-map").text("");
//       var statesData = data;

//       var mapboxTiles = L.tileLayer(
//         "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
//         {
//           maxZoom: 18,
//           id: "mapbox/light-v9",
//         }
//       );

//       // map = L.map("header-map", { zoomControl: false })
//       //   .addLayer(mapboxTiles)
//       //   .setView([22.572646, 88.363895], 4);

//       // =======================Current Location====================
//       var zoomLvl = 4;

//       if (windowWidth < 992) {
//         zoomLvl = 6;
//       } else if (windowWidth < 1120) {
//         zoomLvl = 5;
//       }

//       map = L.map("header-map", { zoomControl: false })
//         .addLayer(mapboxTiles)
//         .locate({ setView: true, maxZoom: zoomLvl });

//       var total_confirmed_cases = 0;
//       var total_death = 0;
//       var total_recovered = 0;
//       var last_updated = "";

//       const convertDate = (updateDate) => {
//         var DateTime = updateDate.split(" ");
//         var date = new Date(DateTime[0]);
//         var time = DateTime[1];
//         return `${date.toLocaleDateString()}, ${time}`;
//       };

//       for (var i = 0; i < statesData.features.length; i++) {
//         // =======================Stastatics Counting====================
//         if (statesData.features[i].properties["Total Cases"] === "") {
//           statesData.features[i].properties["Total Cases"] = 0;
//         }
//         if (statesData.features[i].properties.Deceased === "") {
//           statesData.features[i].properties.Deceased = 0;
//         }
//         if (statesData.features[i].properties.Recovered === "") {
//           statesData.features[i].properties.Recovered = 0;
//         }

//         if (statesData.features[i].properties["Data Type"] == "Regional") {
//           total_confirmed_cases =
//             total_confirmed_cases +
//             parseInt(statesData.features[i].properties["Total Cases"]);
//           total_death =
//             total_death + parseInt(statesData.features[i].properties.Deceased);
//           total_recovered =
//             total_recovered +
//             parseInt(statesData.features[i].properties.Recovered);
//           last_updated = convertDate(
//             statesData.features[i].properties["Last Updated"]
//           );
//         }
//       }

//       // =======================Add Div Fillter and Statcis====================
//       var filtersMap = L.control({ position: "topleft" });
//       var stastatics = L.control({ position: "bottomleft" });

//       stastatics.onAdd = function (map) {
//         this.stastaticsContent = L.DomUtil.create("div", "stastatics");
//         this.stastaticsReport();
//         return this.stastaticsContent;
//       };

//       filtersMap.onAdd = function (map) {
//         this.filtersMapContent = L.DomUtil.create("div", "filtersMap");
//         this.fillterRadio();
//         return this.filtersMapContent;
//       };

//       stastatics.stastaticsReport = function (props) {
//         this.stastaticsContent.innerHTML = `
//           <div class="stastatics-display-area">
//             <div class="stastatics-display-box total-confirmed-cases">
//               <span class="stastatics-display-box-title">Total Confirmed</span>
//               <span class="stastatics-display-box-counting">${total_confirmed_cases}</span>
//             </div>
//             <div class="stastatics-display-box total-recovered-cases">
//               <span class="stastatics-display-box-title">Total Recovered</span>
//               <span class="stastatics-display-box-counting">${total_recovered}</span>
//             </div>
//             <div class="stastatics-display-box total-death-cases">
//               <span class="stastatics-display-box-title">Total Death</span>
//               <span class="stastatics-display-box-counting">${total_death}</span>
//             </div>
//           </div>
//           <div class="stastatics-updates-area">
//             <span>Last Updated: ${last_updated}</span>
//           </div>
//         `;
//       };

//       filtersMap.fillterRadio = function (props) {
//         this.filtersMapContent.innerHTML = `
//           <div class="filter-map-wrapper">
//             <h6>Data Show by National / Regional</h6>

//             <div class="btn-group" role="group" aria-label="Basic example">
//               <button type="button" id="allDataFillter" class="btn btn-secondary active map-filter-btn" onClick="filterData(event, 'allDataFillter')">All</button>
//               <button type="button" id="nationalDateFillter" class="btn btn-secondary map-filter-btn" onClick="filterData(event, 'nationalDateFillter')">National</button>
//               <button type="button" id="regionalDataFillter" class="btn btn-secondary map-filter-btn" onClick="filterData(event, 'regionalDataFillter')">Regional</button>
//             </div>

//           </div>
//         `;
//       };

//       stastatics.addTo(map);
//       filtersMap.addTo(map);
//       // =======================End Add Div Fillter and Statcis====================

//       // =======================Data Fillters By ====================
//       nationalData = L.geoJson(statesData, {
//         filter: function (feature, layer) {
//           return feature.properties["Data Type"] == "National";
//         },
//         pointToLayer: function (feature, latlng) {
//           return L.circle(
//             [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
//             getRadiusVal(feature.properties["Total Cases"]) * 10,
//             {
//               color: "red",
//               fillColor: "red",
//               fillOpacity: 0.5,
//               radius: 15,
//               weight: 2,
//             }
//           )
//             .on("click", function () {
//               this.bindPopup(popUpContent(feature)).openPopup();
//             })
//             .on("mouseover", function (e) {
//               e.target.bringToFront();
//             });
//         },
//       });

//       regionsData = L.geoJson(statesData, {
//         filter: function (feature, layer) {
//           return feature.properties["Data Type"] == "Regional";
//         },
//         pointToLayer: function (feature, latlng) {
//           return L.circle(
//             [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
//             getRadiusVal(feature.properties["Total Cases"]) * 10,
//             {
//               color: "orangered",
//               fillColor: "orangered",
//               fillOpacity: 0.5,
//               radius: 15,
//               weight: 2,
//             }
//           )
//             .on("click", function () {
//               this.bindPopup(popUpContent(feature)).openPopup();
//             })
//             .on("mouseover", function (e) {
//               e.target.bringToFront();
//             });
//         },
//       });

//       allData = L.geoJson(statesData, {
//         pointToLayer: function (feature, latlng) {
//           return L.circle(
//             [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
//             getRadiusVal(feature.properties["Total Cases"]) * 10,
//             {
//               color:
//                 feature.properties["Data Type"] == "Regional"
//                   ? "orange"
//                   : "red",
//               fillColor:
//                 feature.properties["Data Type"] == "Regional"
//                   ? "orange"
//                   : "red",
//               fillOpacity: 0.5,
//               radius: 1000,
//               weight: 2,
//             }
//           )
//             .on("click", function () {
//               this.bindPopup(popUpContent(feature)).openPopup();
//             })
//             .on("mouseover", function (e) {
//               e.target.bringToFront();
//               this.setStyle({
//                 weight: 10,
//                 fillOpacity: 1,
//               });
//             })
//             .on("mouseout", function (e) {
//               this.setStyle({
//                 weight: 2,
//                 fillOpacity: 0.5,
//               });
//             });
//         },
//       });

//       const popUpContent = (feature) => {
//         return `
//             <div class="d-flex flex-column popup-content-wrapper">
//               <div class="text-center popup-content-heading">
//                 <span>${feature.properties.City} ${
//           feature.properties.Country
//         }</span>
//               </div>
//               <div class="d-flex justify-content-between popup-stats popup-stats-total">
//                 <span class="stats-sub">Total Cases</span>
//                 <span>${feature.properties["Total Cases"]}</span>
//               </div>
//               <div class="stats-divider"></div>
//               <div class="d-flex justify-content-between popup-stats">
//                 <span class="stats-sub"><span class="cstm-badge active-badge"></span>Active</span>
//                 <span>${feature.properties["Current Cases"]}</span>
//               </div>
//               <div class="d-flex justify-content-between popup-stats">
//                 <span class="stats-sub"><span class="cstm-badge deceased-badge"></span>Deceased</span>
//                 <span>${feature.properties.Deceased}</span>
//               </div>
//               <div class="d-flex justify-content-between popup-stats">
//                 <span class="stats-sub"><span class="cstm-badge recovered-badge"></span>Recovered</span>
//                 <span>${feature.properties.Recovered}</span>
//               </div>
//               <div class="stats-divider"></div>
//               <div class="d-flex justify-content-between popup-stats update-date">
//                 <span class="stats-sub">Last Updated</span>
//                 <span> ${convertDate(feature.properties["Last Updated"])}</span>
//               </div>
//             </div>
//         `;
//       };

//       allData.addTo(map);

//       L.control
//         .zoom({
//           position: "bottomright",
//         })
//         .addTo(map);

//       setTimeout(function () {
//         map.invalidateSize(true);
//       }, 4000);
//     })

//     .catch(function () {
//       jQuery("#header-map").text(
//         "Something went wrong. Please refresh the page"
//       );
//     });
// };

// const filterData = (e, filterName) => {
//   jQuery(".map-filter-btn").removeClass("active");
//   jQuery("#" + filterName).addClass("active");

//   switch (filterName) {
//     case "allDataFillter":
//       map.removeLayer(regionsData);
//       map.removeLayer(nationalData);
//       map.addLayer(allData);
//       break;
//     case "nationalDateFillter":
//       map.removeLayer(allData);
//       map.removeLayer(regionsData);
//       map.addLayer(nationalData);
//       break;
//     case "regionalDataFillter":
//       map.removeLayer(allData);
//       map.removeLayer(nationalData);
//       map.addLayer(regionsData);
//       break;
//   }
// };

// jQuery(document).ready(function () {
//   windowWidth = jQuery(window).width();
//   DisplayMap(false);
// });

// // const getRadiusVal = (val) => {
// //   if (windowWidth < 1024 && val < 2500) {
// //     return 2500;
// //   }

// //   if (val < 2000) {
// //     return 2000;
// //   } else if (val > 40000) {
// //     return 20000;
// //   } else {
// //     return val;
// //   }
// // };

// const getRadiusVal = (val) => {
//   if (windowWidth < 1120) {
//     if (val < 500) {
//       return 500;
//     } else if (val < 600) {
//       return 600;
//     } else if (val < 700) {
//       return 700;
//     } else if (val < 800) {
//       return 800;
//     } else if (val < 900) {
//       return 900;
//     } else if (val < 1000) {
//       return 1000;
//     } else if (val > 40000) {
//       return 40000;
//     } else {
//       return val;
//     }
//   }

//   if (val < 100) {
//     return 100;
//   } else if (val < 200) {
//     return 200;
//   } else if (val < 300) {
//     return 300;
//   } else if (val < 400) {
//     return 400;
//   } else if (val < 500) {
//     return 500;
//   } else if (val < 600) {
//     return 600;
//   } else if (val < 700) {
//     return 700;
//   } else if (val < 800) {
//     return 800;
//   } else if (val < 900) {
//     return 900;
//   } else if (val < 1000) {
//     return 1000;
//   } else if (val > 40000) {
//     return 40000;
//   } else {
//     return val;
//   }
// };

var map;
var nationalData;
var regionsData;
var allData;
var windowWidth;

const DisplayMap = (zooomDisable) => {
  jQuery("#header-map").text("Loading.....");
  fetch("https://covid19.osinthk.org/wp-admin/admin-ajax.php?action=getData")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var statesData = data;
      var total_confirmed_cases = 0;
      var total_death = 0;
      var total_recovered = 0;
      var last_updated = "";

      const convertDate = (updateDate) => {
        var DateTime = updateDate.split(" ");
        var date = new Date(DateTime[0]);
        var time = DateTime[1];
        return `${date.toLocaleDateString()}, ${time}`;
      };

      // =======================Stats Content====================
      fetch(
        "https://covid19.osinthk.org/wp-admin/admin-ajax.php?action=getStatsData"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          jQuery("#header-map").text("");

          total_death = data.deaths;
          total_recovered = data.recoveries;
          total_confirmed_cases = data.infected;
          last_updated = convertDate(data.last_updated);

          var mapboxTiles = L.tileLayer(
            "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
            {
              maxZoom: 18,
              id: "mapbox/light-v9",
            }
          );

          // =======================Current Location====================

          var zoomLvl = 5;
          if (windowWidth < 992) {
            zoomLvl = 6;
          } else if (windowWidth < 1120) {
            zoomLvl = 5;
          }

          map = L.map("header-map", { zoomControl: false })
            .addLayer(mapboxTiles)
            .locate({ setView: true, maxZoom: zoomLvl });

          // =======================Add Div Fillter and Statcis====================
          var filtersMap = L.control({ position: "topleft" });
          var stastatics = L.control({ position: "bottomleft" });

          stastatics.onAdd = function (map) {
            this.stastaticsContent = L.DomUtil.create("div", "stastatics");
            this.stastaticsReport();
            return this.stastaticsContent;
          };

          filtersMap.onAdd = function (map) {
            this.filtersMapContent = L.DomUtil.create("div", "filtersMap");
            this.fillterRadio();
            return this.filtersMapContent;
          };

          stastatics.stastaticsReport = function (props) {
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

          filtersMap.fillterRadio = function (props) {
            this.filtersMapContent.innerHTML = `
              <div class="filter-map-wrapper">
                <h6>Data Show by National / Regional</h6>

                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" id="allDataFillter" class="btn btn-secondary active map-filter-btn" onClick="filterData(event, 'allDataFillter')">All</button>
                  <button type="button" id="nationalDateFillter" class="btn btn-secondary map-filter-btn" onClick="filterData(event, 'nationalDateFillter')">National</button>
                  <button type="button" id="regionalDataFillter" class="btn btn-secondary map-filter-btn" onClick="filterData(event, 'regionalDataFillter')">Regional</button>
                </div>

              </div>
            `;
          };

          stastatics.addTo(map);
          filtersMap.addTo(map);
          // =======================End Add Div Fillter and Statcis====================

          // =======================Data Fillters By ====================
          nationalData = L.geoJson(statesData, {
            filter: function (feature, layer) {
              return feature.properties["Data Type"] == "National";
            },
            pointToLayer: function (feature, latlng) {
              return L.circle(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                getRadiusVal(feature.properties["Total Cases"]) * 10,
                {
                  color: "red",
                  fillColor: "red",
                  fillOpacity: 0.5,
                  radius: 15,
                  weight: 2,
                }
              )
                .on("click", function () {
                  this.bindPopup(popUpContent(feature)).openPopup();
                })
                .on("mouseover", function (e) {
                  e.target.bringToFront();
                });
            },
          });

          regionsData = L.geoJson(statesData, {
            filter: function (feature, layer) {
              return feature.properties["Data Type"] == "Regional";
            },
            pointToLayer: function (feature, latlng) {
              return L.circle(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                getRadiusVal(feature.properties["Total Cases"]) * 10,
                {
                  color: "orangered",
                  fillColor: "orangered",
                  fillOpacity: 0.5,
                  radius: 15,
                  weight: 2,
                }
              )
                .on("click", function () {
                  this.bindPopup(popUpContent(feature)).openPopup();
                })
                .on("mouseover", function (e) {
                  e.target.bringToFront();
                });
            },
          });

          allData = L.geoJson(statesData, {
            pointToLayer: function (feature, latlng) {
              return L.circle(
                [
                  feature.geometry.coordinates[1],
                  feature.geometry.coordinates[0],
                ],
                getRadiusVal(feature.properties["Total Cases"]) * 10,
                {
                  color:
                    feature.properties["Data Type"] == "Regional"
                      ? "orange"
                      : "red",
                  fillColor:
                    feature.properties["Data Type"] == "Regional"
                      ? "orange"
                      : "red",
                  fillOpacity: 0.5,
                  radius: 1000,
                  weight: 2,
                }
              )
                .on("click", function () {
                  this.bindPopup(popUpContent(feature)).openPopup();
                })
                .on("mouseover", function (e) {
                  e.target.bringToFront();
                  this.setStyle({
                    weight: 10,
                    fillOpacity: 1,
                  });
                })
                .on("mouseout", function (e) {
                  this.setStyle({
                    weight: 2,
                    fillOpacity: 0.5,
                  });
                });
            },
          });

          const popUpContent = (feature) => {
            return `
                <div class="d-flex flex-column popup-content-wrapper">
                  <div class="text-center popup-content-heading">
                    <span>${feature.properties.City} ${
              feature.properties.Country
            }</span>
                  </div>
                  <div class="d-flex justify-content-between popup-stats popup-stats-total">
                    <span class="stats-sub">Total Cases</span>
                    <span>${feature.properties["Total Cases"]}</span>
                  </div>
                  <div class="stats-divider"></div>
                  <div class="d-flex justify-content-between popup-stats">
                    <span class="stats-sub"><span class="cstm-badge active-badge"></span>Active</span>
                    <span>${feature.properties["Current Cases"]}</span>
                  </div>
                  <div class="d-flex justify-content-between popup-stats">
                    <span class="stats-sub"><span class="cstm-badge deceased-badge"></span>Deceased</span>
                    <span>${feature.properties.Deceased}</span>
                  </div>
                  <div class="d-flex justify-content-between popup-stats">
                    <span class="stats-sub"><span class="cstm-badge recovered-badge"></span>Recovered</span>
                    <span>${feature.properties.Recovered}</span>
                  </div>
                  <div class="stats-divider"></div>
                  <div class="d-flex justify-content-between popup-stats update-date">
                    <span class="stats-sub">Last Updated</span>
                    <span> ${convertDate(
                      feature.properties["Last Updated"]
                    )}</span>
                  </div>
                </div>
            `;
          };

          allData.addTo(map);

          L.control
            .zoom({
              position: "bottomright",
            })
            .addTo(map);

          map.touchZoom.enable();
          map.tap.enable();

          setTimeout(function () {
            map.invalidateSize(true);
          }, 4000);
        });
    })

    .catch(function () {
      jQuery("#header-map").text(
        "Something went wrong. Please refresh the page"
      );
    });
};

const filterData = (e, filterName) => {
  jQuery(".map-filter-btn").removeClass("active");
  jQuery("#" + filterName).addClass("active");

  switch (filterName) {
    case "allDataFillter":
      map.removeLayer(regionsData);
      map.removeLayer(nationalData);
      map.addLayer(allData);
      break;
    case "nationalDateFillter":
      map.removeLayer(allData);
      map.removeLayer(regionsData);
      map.addLayer(nationalData);
      break;
    case "regionalDataFillter":
      map.removeLayer(allData);
      map.removeLayer(nationalData);
      map.addLayer(regionsData);
      break;
  }
};

jQuery(document).ready(function () {
  windowWidth = jQuery(window).width();
  DisplayMap(false);
});

const getRadiusVal = (val) => {
  var multiply = 5;

  if (val < 100) {
    return 100 * multiply;
  } else if (val < 200) {
    return 200 * multiply;
  } else if (val < 300) {
    return 300 * multiply;
  } else if (val < 400) {
    return 400 * multiply;
  } else if (val < 500) {
    return 500 * multiply;
  } else if (val < 600) {
    return 600 * multiply;
  } else if (val < 700) {
    return 700 * multiply;
  } else if (val < 800) {
    return 800 * multiply;
  } else if (val < 900) {
    return 900 * multiply;
  } else if (val < 1000) {
    return 1000 * multiply;
  } else if (val > 20000) {
    var value1 = 20000 + ((val - 20000) * 20) / 100;
    return value1;
  } else {
    return val;
  }
};
