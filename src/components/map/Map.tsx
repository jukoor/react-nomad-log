import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import am5geodata_worldHigh from "@amcharts/amcharts5-geodata/worldHigh";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Color, DataItem } from "@amcharts/amcharts5";
import { IComponentDataItem } from "@amcharts/amcharts5/.internal/core/render/Component";
import { IMapPolygonSeriesDataItem, MapChart } from "@amcharts/amcharts5/map";
import { useEffect, useRef, useState } from "react";
import {
  setSelectedCountry,
  clearSelectedCountry,
} from "../../store/countrySlice";
import { getCountryData, getEmojiFlag } from "../../utils/countryDataUtils";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import styles from "../../styles/Map.module.scss";
import {
  setMapZoomIn,
  setMapZoomOut,
  setCountryDetailView,
  toggleMapProjection,
  setMapProjection,
} from "../../store/appSlice";

import { CountryCca2Type } from "../../types/CountryCca2Type";
import { MapControls } from "./MapControls";
import { Badge, FormControlLabel, Switch } from "@mui/material";
import { useCapitalsGeoPointsData } from "./CapitalsGeoPoints";
import { useToggleCountryInList } from "../../hooks/useToggleCountryInList";
import { CountryList } from "../../types/CountryList";

type CountryCode = string;

interface CountryColorMapping {
  [key: string]: Color;
}

export const Map = () => {
  const dispatch = useAppDispatch();
  const { toggleCountryInList } = useToggleCountryInList();

  const userData = useAppSelector((state) => state.User.selectedUser);
  const visitedTempAction = useAppSelector(
    (state) => state.User.visitedCountryTemp
  );
  const bucketListTempAction = useAppSelector(
    (state) => state.User.bucketListCountryTemp
  );
  const livedTempAction = useAppSelector(
    (state) => state.User.livedCountryTemp
  );

  const countryData = useAppSelector((state) => state.Country.countries);
  const countryDetailView = useAppSelector(
    (state) => state.App.countryDetailView
  );

  const mapZoomIn = useAppSelector((state) => state.App.mapZoomIn);
  const mapZoomOut = useAppSelector((state) => state.App.mapZoomOut);
  const mapProjection = useAppSelector((state) => state.App.mapProjectionGlobe);

  const capitals = useCapitalsGeoPointsData();

  const chartRef = useRef<MapChart>();
  const worldSeriesRef = useRef<am5map.MapPolygonSeries>();
  const countrySeriesRef = useRef<am5map.MapPolygonSeries>();
  const pointSeriesRef = useRef<am5map.MapPointSeries>();
  const graticuleSeriesRef = useRef<am5map.GraticuleSeries>();

  const [isCountryToggleVisible, setIsCountryToggleVisible] = useState(false);
  const [showVisited, setShowVisited] = useState(true);
  const [showBucketList, setShowBucketList] = useState(false);
  const [showLived, setShowLived] = useState(false);

  const toggleVisited = () => {
    setShowVisited(!showVisited);
    setShowBucketList(false);
    setShowLived(false);
  };

  const toggleBucketList = () => {
    setShowBucketList(!showBucketList);
    setShowVisited(false);
    setShowLived(false);
  };

  const toggleLived = () => {
    setShowLived(!showLived);
    setShowVisited(false);
    setShowBucketList(false);
  };

  useEffect(() => {
    let root: am5.Root | null = null;
    if (!root && countryData.length > 0 && userData) {
      root = am5.Root.new("map");
      console.log("Ok");
      // Define a mapping of country ISO codes to colors
      const countryColors: CountryColorMapping = {};
      const bucketListColors: CountryColorMapping = {};
      const livedColors: CountryColorMapping = {};

      const visitedCountriesColor = am5.color("#4bc69b"); // light green
      const bucketListColor = am5.color("#8795df"); // light blue
      const livedCountriesColor = am5.color("#FFAB91"); // light orange
      const countryDefaultBgColor = am5.color("#d3d6de"); // light grey/blue

      // Only apply country colors if the user is logged in
      if (userData && userData.countriesVisited) {
        // Assign the specified color to all visited countries
        userData.countriesVisited.forEach((country: CountryCode) => {
          countryColors[country] = visitedCountriesColor;
        });
      }

      if (userData && userData.countriesBucketList) {
        userData.countriesBucketList.forEach((country: CountryCode) => {
          bucketListColors[country] = bucketListColor;
        });
      }

      if (userData && userData.countriesLived) {
        userData.countriesLived.forEach((country: CountryCode) => {
          livedColors[country] = livedCountriesColor;
        });
      }

      root.setThemes([am5themes_Animated.new(root)]);

      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "rotateX",
          // panY: mapProjection ? "none" : "rotateY",
          projection: mapProjection
            ? am5map.geoOrthographic()
            : am5map.geoMercator(),
          width: am5.percent(86),
          height: am5.percent(86),
          paddingLeft: Math.round(window.innerWidth * 0.07),
          paddingTop: Math.round(window.innerWidth * 0.07),
        })
      );

      var graticuleSeries = chart.series.insertIndex(
        0,
        am5map.GraticuleSeries.new(root, {})
      );

      graticuleSeries.mapLines.template.setAll({
        stroke: am5.color(0x000000),
        strokeOpacity: 0.1,
      });

      if (!mapProjection) {
        graticuleSeries.hide();
      }

      // Create world map polygon series
      const worldSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldHigh,
          exclude: mapProjection !== true ? ["AQ"] : [], // Exclude Antartiqua in map view
        })
      );

      worldSeries.mapPolygons.template.setAll({
        tooltipHTML:
          "<span class='mapTooltipEmoji'>{emoji}</span> <span class='mapTooltipText'>{name}</span>",
        interactive: true,
        fill: am5.color("#696999"),
        templateField: "polygonSettings",
        stroke: am5.color("#eeeeee"),
        strokeWidth: 2,
      });

      let tooltip = am5.Tooltip.new(root, {
        getFillFromSprite: false,
      });

      const background = tooltip.get("background");
      if (background) {
        background.setAll({
          fill: am5.color("#ffffff"),
          stroke: am5.color("#727272"),
          fillOpacity: 0.8,
        });
      }

      worldSeries.set("tooltip", tooltip);

      worldSeries.mapPolygons.template.states.create("hover", {
        cursorOverStyle: "pointer",
        fill: am5.color("#eec1d0"), // pink
      });

      worldSeries.mapPolygons.template.events.on("pointerover", function () {
        document.body.style.cursor = "pointer";
      });

      worldSeries.mapPolygons.template.events.on("pointerout", function () {
        document.body.style.cursor = "default";
      });

      // highlight country lists each with unique color
      worldSeries.events.on("datavalidated", function () {
        worldSeries.mapPolygons.each(function (polygon) {
          if (
            polygon.dataItem &&
            polygon.dataItem.dataContext !== null &&
            typeof polygon.dataItem.dataContext === "object" &&
            "id" in polygon.dataItem.dataContext
          ) {
            const countryId = polygon.dataItem.dataContext.id as CountryCode;

            polygon.set("fill", countryDefaultBgColor);

            if (showVisited && countryColors[countryId]) {
              polygon.set("fill", countryColors[countryId]);
            }
            if (showBucketList && bucketListColors[countryId]) {
              polygon.set("fill", bucketListColors[countryId]);
            }
            if (showLived && livedColors[countryId]) {
              polygon.set("fill", livedColors[countryId]);
            }
          }
        });
      });

      //   On country click zoom in and show detailed map of country, also show country action bar
      worldSeries.mapPolygons.template.events.on(
        "click",
        (ev: am5.ISpritePointerEvent) => {
          const dataItem: DataItem<IComponentDataItem> | undefined =
            ev.target.dataItem;
          const data: any = dataItem?.dataContext;
          if (dataItem) {
            const zoomAnimation = worldSeries.zoomToDataItem(
              dataItem as DataItem<IMapPolygonSeriesDataItem>
            );
            // hide capitals
            pointSeries.hide();

            // hide country toggles
            setIsCountryToggleVisible(false);
            Promise.all([
              zoomAnimation?.waitForStop(),
              am5.net.load(
                "https://cdn.amcharts.com/lib/5/geodata/json/" +
                  data.map +
                  ".json",
                chart
              ),
            ])
              .then(
                (
                  results: [
                    void | undefined,
                    am5.net.INetLoadResult<am5map.MapChart>
                  ]
                ) => {
                  if (results[1].response) {
                    let geodata = am5.JSONParser.parse(results[1].response);
                    if (data && data.polygonSettings) {
                      countrySeries.setAll({
                        geoJSON: geodata,
                        fill: data.polygonSettings.fill,
                      });
                      if (countryData) {
                        dispatch(
                          setSelectedCountry(
                            getCountryData(data.id, countryData)
                          )
                        );
                        dispatch(setCountryDetailView(false));
                      }
                    } else {
                      console.log("polygon fill error");
                    }
                    worldSeries.hide(1000);
                    countrySeries.show(2000);
                  }
                }
              )
              .catch((error) => {
                console.log(error);
              });
          }
        }
      );

      // Create capitals point series
      const pointSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {})
      );

      pointSeries.bullets.push(function () {
        if (root) {
          var circle = am5.Circle.new(root, {
            radius: 3,
            tooltipY: 0,
            opacity: 0.8,
            fill: am5.color("#009688"),
            stroke: root.interfaceColors.get("background"),
            strokeWidth: 0,
            tooltipText: "{title}",
          });

          return am5.Bullet.new(root, {
            sprite: circle,
          });
        }
      });

      const addCity = (longitude: number, latitude: number, title: string) => {
        pointSeries.data.push({
          geometry: { type: "Point", coordinates: [longitude, latitude] },
          title: title,
        });
      };

      for (var i = 0; i < capitals.length; i++) {
        var city = capitals[i];
        addCity(city.longitude, city.latitude, city.title);
      }

      let countrySeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          visible: false,
        })
      );

      countrySeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        stroke: am5.color("#FFFFFF"),
        strokeWidth: 2,
        interactive: true,
        fill: am5.color("#FFFFFF"),
      });

      let countryTooltip = am5.Tooltip.new(root, {
        getFillFromSprite: false,
      });

      const countryTtBackground = countryTooltip.get("background");
      if (countryTtBackground) {
        countryTtBackground.setAll({
          fill: am5.color("#ffffff"),
          stroke: am5.color("#727272"),
          fillOpacity: 0.8,
        });
      }

      countrySeries.set("tooltip", countryTooltip);

      countrySeries.mapPolygons.template.states.create("hover", {
        fill: am5.color("#ffc0cb"),
      });

      // Set up data for countries
      let data = [];
      for (let id in am5geodata_data_countries2) {
        if (am5geodata_data_countries2.hasOwnProperty(id)) {
          let country = am5geodata_data_countries2[id];
          if (country.maps.length) {
            data.push({
              id: id,
              emoji: getEmojiFlag(id as CountryCca2Type),
              map: country.maps[0],
              polygonSettings: {
                fill: am5.color("#cacaca"),
              },
            });
          }
        }
      }
      worldSeries.data.setAll(data);

      chart.appear(1000, 300);

      console.log(mapProjection);
      setIsCountryToggleVisible(true);

      // Set refs to make elements accessible
      chartRef.current = chart;
      worldSeriesRef.current = worldSeries;
      countrySeriesRef.current = countrySeries;
      pointSeriesRef.current = pointSeries;
      graticuleSeriesRef.current = graticuleSeries;
    }

    return () => {
      if (root) {
        root.dispose();
        console.log("okig?");
        // dispatch(setCountryDetailView(true));
        dispatch(clearSelectedCountry());
        dispatch(setMapProjection(false));
        setIsCountryToggleVisible(true);
      }
    };
  }, [
    userData,
    countryData,
    mapProjection,
    showVisited,
    showBucketList,
    showLived,
  ]);

  // Custom effect to open the country details top bar
  useEffect(() => {
    // back to world map button on country action bar
    if (countryDetailView) {
      chartRef.current?.goHome();
      worldSeriesRef.current?.show();
      countrySeriesRef.current?.hide();
      pointSeriesRef.current?.show();

      setTimeout(() => {
        setIsCountryToggleVisible(true);

        // Temp adding/removing countries, so the map can zoom out before reloading
        if (visitedTempAction) {
          toggleCountryInList(
            visitedTempAction.action,
            visitedTempAction.countryList as CountryList
          );
        }

        if (bucketListTempAction) {
          toggleCountryInList(
            bucketListTempAction.action,
            bucketListTempAction.countryList as CountryList
          );
        }

        if (livedTempAction) {
          toggleCountryInList(
            livedTempAction.action,
            livedTempAction.countryList as CountryList
          );
        }
      }, 1000);
    }
  }, [countryDetailView]);

  useEffect(() => {
    if (mapProjection) {
      document.getElementById("root")?.classList.add("globe");
    } else if (mapProjection === false) {
      document.getElementById("root")?.classList.remove("globe");
    }

    () => {
      document.getElementById("root")?.classList.remove("globe");
    };
  }, [mapProjection]);

  // Zoom in
  useEffect(() => {
    if (mapZoomIn) {
      chartRef.current?.zoomIn();
      dispatch(setMapZoomIn(false));
    }
  }, [mapZoomIn]);

  // Zoom out
  useEffect(() => {
    if (mapZoomOut) {
      chartRef.current?.zoomOut();
      dispatch(setMapZoomOut(false));
    }
  }, [mapZoomOut]);

  return (
    <>
      <div className={styles.map} id="map"></div>
      <MapControls />

      {isCountryToggleVisible && (
        <div className={styles.listToggles}>
          <FormControlLabel
            control={
              <Switch
                checked={showVisited}
                onChange={toggleVisited}
                name="countriesVisited"
              />
            }
            label="Visited"
          />
          <Badge
            badgeContent={
              userData?.countriesVisited
                ? "" + userData?.countriesVisited?.length
                : "0"
            }
            color="secondary"
            sx={{ right: "-10px", top: "-23px" }}
          ></Badge>

          <FormControlLabel
            control={
              <Switch
                checked={showBucketList}
                onChange={toggleBucketList}
                name="countriesBucketList"
              />
            }
            label="Bucket List"
          />
          <Badge
            badgeContent={
              userData?.countriesBucketList
                ? "" + userData?.countriesBucketList?.length
                : "0"
            }
            color="secondary"
            sx={{ right: "-10px", top: "-23px" }}
          ></Badge>

          <FormControlLabel
            control={
              <Switch
                checked={showLived}
                onChange={toggleLived}
                name="countriesLived"
              />
            }
            label="Lived"
          />

          <Badge
            badgeContent={
              userData?.countriesLived
                ? "" + userData?.countriesLived?.length
                : "0"
            }
            color="secondary"
            sx={{ right: "-10px", top: "-23px" }}
          ></Badge>
        </div>
      )}
    </>
  );
};
