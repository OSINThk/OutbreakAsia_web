var map;
var nationalData;
var regionsData;
var allData;
var windowWidth;
var searchControl;
var statesData;
var showCountriesInFilter;
var IpLocation;
var canvas;
var osm;
var baseMaps;

function timeSince(updateDate) {
  if (updateDate){
    updateDate = updateDate.replace(/-/g, "/");
  }
  var TDMap = new Date(updateDate);
  var tzOffset = new Date().getTimezoneOffset();
  var TD = new Date();
  TD.setMinutes(TD.getMinutes() + tzOffset)
  
  var seconds = Math.floor((TD - TDMap) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval}  ${TranslateText("years ago")}`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval}  ${TranslateText("months ago")}`; 
  }
  interval = Math.floor(seconds / 86400); 
  if (interval > 1) {
    return `${interval}  ${TranslateText("days ago")}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval}  ${TranslateText("hours ago")}`; 
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval}  ${TranslateText("minutes ago")}`; 
  }
  return `${Math.floor(seconds)}  ${TranslateText("seconds ago")}`;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const popUpContent = (feature) => {
  return `
        <div class="d-flex flex-column popup-content-wrapper">
            <div class="text-center popup-content-heading">
              <span>${feature.properties.City} ${feature.properties.Country}</span>
          </div>
          <div class="stats-divider"></div>
          <div class="d-flex flex-column total-confirmed-cases-row">
            <span class="total-confirmed-cases-heading">${TranslateText("Total confirmed cases")}</span>
            <span class="total-confirmed-cases-updatedate">${TranslateText("Updated")} ${timeSince(feature.properties["Last Updated"])}</span>
            <span class="total-confirmed-cases-couting">${numberWithCommas(feature.properties["Total Cases"])}</span>
          </div>
          <div class="stats-divider"></div>
          <div class="d-flex justify-content-between popup-stats">
            <span class="stats-sub"><span class="cstm-badge active-badge"></span>${TranslateText("Active cases")}</span>
            <span>${numberWithCommas(feature.properties["Current Cases"])}</span>
          </div>
          <div class="d-flex justify-content-between popup-stats">
            <span class="stats-sub"><span class="cstm-badge deceased-badge"></span>${TranslateText("Deceased cases")}</span>
            <span>${numberWithCommas(feature.properties.Deceased)}</span>
          </div>
          <div class="d-flex justify-content-between popup-stats">
            <span class="stats-sub"><span class="cstm-badge recovered-badge"></span>${TranslateText("Recovered cases")}</span>
            <span>${numberWithCommas(feature.properties.Recovered)}</span>
          </div>
      
        ${feature.properties["Data Type"] == "National" ?
          `
            <div class="d-flex justify-content-between popup-stats">
              <span class="stats-sub"><span class="cstm-badge deceased-badge"></span>${TranslateText("Total Tests")}</span>
              <span>${numberWithCommas(feature.properties["Total Tests"])}</span>
            </div>
            <div class="d-flex justify-content-between popup-stats">
              <span class="stats-sub"><span class="cstm-badge total-case-badge"></span>${TranslateText("Total Cases/1M pop")}</span>
              <span>${numberWithCommas(feature.properties["Total Cases/1M pop"])}</span>
            </div>
            <div class="d-flex justify-content-between popup-stats">
              <span class="stats-sub"><span class="cstm-badge deceased-badge"></span>${TranslateText("Deaths/1M pop")}</span>
              <span>${numberWithCommas(feature.properties["Deaths/1M pop"])}</span>
            </div>
          `
        : ''}
      </div>
  `;
};

const convertDate = (updateDate) => {
  var DateTime = updateDate.split(" ");
  var date = new Date(DateTime[0]);
  var time = DateTime[1];
  return `${date.toLocaleDateString()}, ${time}`;
};


const DisplayMap = (zooomDisable) => {
  jQuery("#header-map").text("Loading.....");
  fetch(`${COVID19BASE_URL}/wp-admin/admin-ajax.php?action=getData`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      statesData = data['map_data'];
      IpLocation = data.location;
      var total_confirmed_cases = 0;
      var total_death = 0;
      var total_recovered = 0;
      var last_updated = "";
      var targetContries = ['China', 'South Korea', 'Japan', 'Taiwan', 'Philippines', 'Indonesia', 'Malaysia', 'Vietnam', 'Laos', 'Cambodia', 'Thailand', 'Myanmar'];

      // =======================Stats Content====================

      jQuery("#header-map").text("");

      // =======================Add Search Key====================


      for (var i = 0; i < statesData.features.length; i++) {      

        if(statesData.features[i].properties.City === ''){
          statesData.features[i].properties.searchkey = `${statesData.features[i].properties.Country}`  
        }else{
          statesData.features[i].properties.searchkey = `${statesData.features[i].properties.City} ${statesData.features[i].properties.Country}`
        }

        if(statesData.features[i].properties.Country === 'World'){

          total_death = statesData.features[i].properties.Deceased;
          total_recovered = statesData.features[i].properties.Recovered;
          total_confirmed_cases = statesData.features[i].properties["Total Cases"];
          last_updated = convertDate(statesData.features[i].properties["Last Updated"]);
          statesData.features.splice(i, 1);
          i--;
        }

        if(statesData.features[i].properties["Total Cases"] === "0"){
          statesData.features.splice(i, 1);
          i--;
        }
      }  

      // =======================Fillter Country Data for====================
      showCountriesInFilter = statesData.features;
      showCountriesInFilter = showCountriesInFilter.filter(function(feature) {
        return targetContries.includes(feature.properties.Country); 
      })

      // =======================Intialize Map====================
      canvas = L.canvas();

      var mapboxTiles = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          minZoom: 2,
          id: "mapbox/light-v9",
          continuousWorld: false,
          noWrap: true,
          bounds: [
            [-90, -180],
            [90, 180]
          ]
        }
      );
      var zoomLvl = 5;
      if (windowWidth < 992) {
        zoomLvl = 6;
      } else if (windowWidth < 1120) {
        zoomLvl = 5;
      }

      map = L.map('header-map', { 
          zoomControl: false,
          preferCanvas: true,
          renderer: canvas
        }).addLayer(mapboxTiles).setView(
        [ IpLocation.client_lat === null ? 37.8 : IpLocation.client_lat, 
          IpLocation.client_long === null ? -96 : IpLocation.client_long
        ], zoomLvl);


      L.control.fullscreen({position: 'bottomright',forcePseudoFullscreen: true,}).addTo(map)

      // =======================Add Div Fillter and Statcis====================

      var filtersMap = L.control({ position: "topleft" });
      var stastatics = L.control({ position: "bottomleft" });

      stastatics.onAdd = function (map) {
        this.stastaticsContent = L.DomUtil.create("div", "stastatics");
        this.stastaticsReport();
        return this.stastaticsContent;
      };

      filtersMap.onAdd = function (map) {
        var fillterDiv = L.DomUtil.create("div", "filtersMap");
        this.filtersMapContent = fillterDiv;
        L.DomEvent.on( fillterDiv, 'mousewheel touchstart', L.DomEvent.stopPropagation);
        this.fillterRadio();
        return this.filtersMapContent;
      };

      stastatics.stastaticsReport = function (props) {
        this.stastaticsContent.innerHTML = `
          <div class="stastatics-display-area">
            <div class="stastatics-display-box total-confirmed-cases">
              <span class="stastatics-display-box-title">${TranslateText("Total Confirmed")}</span>
              <span class="stastatics-display-box-counting">${numberWithCommas(total_confirmed_cases)}</span>
            </div>
            <div class="stastatics-display-box total-recovered-cases">
              <span class="stastatics-display-box-title">${TranslateText("Total Recovered")}</span>
              <span class="stastatics-display-box-counting">${numberWithCommas(total_recovered)}</span>
            </div>
            <div class="stastatics-display-box total-death-cases">
              <span class="stastatics-display-box-title">${TranslateText("Total Death")}</span>
              <span class="stastatics-display-box-counting">${numberWithCommas(total_death)}</span>
            </div>
          </div>
          <div class="stastatics-updates-area">
            <span>${TranslateText("Updated")}: ${timeSince(last_updated)}</span>
          </div>
        `;
      };

      filtersMap.fillterRadio = function (props) {
        this.filtersMapContent.innerHTML = `
          <div class="filter-map-wrapper">

            <div class="filter-sec-first">
              <h6>${TranslateText("Data Show by National / Regional")}</h6>

              <div class="btn-group" role="group" aria-label="Filter Map">
                <button type="button" id="allDataFillter" class="btn btn-secondary active map-filter-btn" onClick="filterData(event, 'allDataFillter')">${TranslateText("All")}</button>
                <button type="button" id="nationalDateFillter" class="btn btn-secondary map-filter-btn" onClick="filterData(event, 'nationalDateFillter')">${TranslateText("National")}</button>
                <button type="button" id="regionalDataFillter" class="btn btn-secondary map-filter-btn" onClick="filterData(event, 'regionalDataFillter')">${TranslateText("Regional")}</button>
              </div>

              <div class="filter-map-divider"></div>
            </div>

            <div class="filter-sec-second">
              <div class="d-flex justify-content-between align-items-center selected-country-wrapper">
                <span class="selected-country"></span>
                <button class="remove-country" onclick="removeCountry()">x</button>
              </div>
              <div class="filter-map-divider"></div>
            </div>

            <div class="filter-sec-third">
                <h6>Filter by Location</h6>
                <ul class="country-list">                  
                  ${showCountriesInFilter.sort((a, b) => a.properties.Country !== b.properties.Country ? a.properties.Country < b.properties.Country ? -1 : 1 : 0).map(feature => feature.properties["Data Type"] === 'National' ?
                     `<li data-feature='${JSON.stringify(feature)}' onclick="moveLocations(this)">${feature.properties.Country}</li>`
                     : null
                    ).join(' ')}
                </ul>
                <ul class="city-list"></ul>
            </div>

          </div>
        `;
      };

      stastatics.addTo(map);
      filtersMap.addTo(map);

      // =======================End Add Div Fillter and Statcis====================

      // =======================Data Fillters By ====================     

      allData = L.geoJson(statesData, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(popUpContent(feature), {keepInView: true});
        },
        pointToLayer: function (feature, latlng) {
          return L.circle(
            [
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0],
            ],
            getRadiusVal(parseInt(feature.properties["Total Cases"])) * 10,
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
        renderer: canvas
      }); 

      allData.addTo(map);

      L.control.zoom({
        position: "bottomright",
      }).addTo(map);

      searchControl = new L.control.search({
        position:'topright',
        layer: allData,
        propertyName: 'searchkey',  
        hideMarkerOnCollapse: true          
      }).on('search:locationfound', function(event) {
          event.layer.openPopup();
      });

      map.addControl(searchControl);

      setTimeout(function () {
        map.invalidateSize(true);
      }, 4000);

      map.on('fullscreenchange', function () {
          if (map.isFullscreen()) {
              jQuery('body').addClass('leaflet-fullscreen-mode-on');
              map.invalidateSize(true);
              setTimeout(function () {
                map.invalidateSize(true);
              }, 1000);
          }else{
              jQuery('body').removeClass('leaflet-fullscreen-mode-on');
          }
      });
        
    })

    .catch(function (e) {
      console.log(e);
      jQuery("#header-map").text(
        "Something went wrong. Please refresh the page"
      );
    });
};

const filterData = (e, filterName) => {
  jQuery('.search-button').click();
  jQuery(".map-filter-btn").removeClass("active");
  jQuery("#" + filterName).addClass("active");

  setTimeout(function () {
    map.closePopup();
    map.removeControl(searchControl);
    map.removeLayer(allData);

    var filterFunction = function(){}

    switch (filterName) {
      case "allDataFillter":
        filterFunction = function(feature, layer) {
          return true;
        }
      break;

      case "nationalDateFillter":
        filterFunction = function(feature, layer) {
          return feature.properties["Data Type"] == "National";
        }
      break;

      case "regionalDataFillter":
        filterFunction = function(feature, layer) {
          return feature.properties["Data Type"] == "Regional";
        }
      break;
    }


    allData = L.geoJson(statesData, {
      filter: filterFunction,
      onEachFeature: function (feature, layer) {
        layer.bindPopup(popUpContent(feature), {keepInView: true});
      },
      pointToLayer: function (feature, latlng) {
        return L.circle(
          [
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ],
          getRadiusVal(parseInt(feature.properties["Total Cases"])) * 10,
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
      renderer: canvas
    }); 
    map.addLayer(allData);
    searchControl = new L.control.search({
      position:'topright',
      layer: allData,
      propertyName: 'searchkey',
      textPlaceholder:'Search...',
      hideMarkerOnCollapse: true
    }).on('search:locationfound', function(event) {
          event.layer.openPopup();
    });
    map.addControl(searchControl);

  }, 600);
};


const moveLocations = (element) => {
  var selectedFeature = element.getAttribute("data-feature");
  if(selectedFeature){
    selectedFeature = JSON.parse(selectedFeature);    

    document.getElementsByClassName('filter-sec-second')[0].style.display = "block";
    if(selectedFeature.properties["Data Type"] === 'Regional'){
      document.getElementsByClassName('selected-country')[0].innerHTML = selectedFeature.properties.City;
    }else{
      document.getElementsByClassName('selected-country')[0].innerHTML = selectedFeature.properties.Country;
    }

    map.flyTo([selectedFeature.geometry.coordinates[1], selectedFeature.geometry.coordinates[0]], 6);

    map.on('click', onMapClick);

    function onMapClick(e) {
      console.log('Chala fir')
      var popup = L.popup()
      .setLatLng([selectedFeature.geometry.coordinates[1], selectedFeature.geometry.coordinates[0]])
      .setContent(popUpContent(selectedFeature))
      .openOn(map);
      map.off('click', onMapClick);
    };

  
  
    if(selectedFeature.properties["Data Type"] === 'Regional'){
      return
    }

    if(selectedFeature.properties["Data Type"] === 'National'){

      var cityList = '';
      document.getElementsByClassName('city-list')[0].innerHTML = '';
      for(var i = 0; i < showCountriesInFilter.length; i++){

        if(showCountriesInFilter[i].properties.Country === selectedFeature.properties.Country){
        
          if(showCountriesInFilter[i].properties['Data Type'] === 'Regional'){    
            document.getElementsByClassName('country-list')[0].style.display = "0%";
            document.getElementsByClassName('country-list')[0].style.display = "none";
            document.getElementsByClassName('city-list')[0].style.display = "block";  
            document.getElementsByClassName('city-list')[0].style.height = "87%";            
            cityList += `<li data-feature='${JSON.stringify(showCountriesInFilter[i])}' onclick="moveLocations(this)">${showCountriesInFilter[i].properties.City}</li>`; 
          }
          
        }
      }
      document.getElementsByClassName('city-list')[0].innerHTML = cityList;
    }
    // setTimeout(function () {
    //     map.off('click', onMapClick);
    // }, 4000);
  }
}

const removeCountry = () => {  
  map.closePopup();
  document.getElementsByClassName('filter-sec-second')[0].style.display = "none";
  document.getElementsByClassName('city-list')[0].style.height = "0%";   
  document.getElementsByClassName('city-list')[0].style.display = "none"; 
  document.getElementsByClassName('country-list')[0].style.display = "block";
  document.getElementsByClassName('country-list')[0].style.display = "87%";     
}

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