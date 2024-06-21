import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { DataItem } from "@amcharts/amcharts5";
import { IComponentDataItem } from "@amcharts/amcharts5/.internal/core/render/Component";
import { IMapPolygonSeriesDataItem, MapChart } from "@amcharts/amcharts5/map";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  setSelectedCountry,
  clearSelectedCountry,
} from "../../store/countrySlice";
import { getCountryData, getEmojiFlag } from "../../utils/countryDataUtils";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import styles from "../../styles/Map.module.scss";
import {
  setCountryActionsBar,
  setMapZoomIn,
  setMapZoomOut,
  toggleMapProjection,
} from "../../store/appSlice";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import PublicIcon from "@mui/icons-material/Public";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import {
  updateCountriesBucketList,
  updateCountriesLived,
  updateCountriesVisited,
} from "../../store/userSlice";
import { CountryCca2Type } from "../../types/CountryCca2Type";

type CountryCode = string;

export const Map = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.User.selectedUser);
  const userCountryVisitedTemp = useAppSelector(
    (state) => state.User.countryVisitedTemp
  );
  const userCountryBucketListTemp = useAppSelector(
    (state) => state.User.countryBucketListTemp
  );
  const userCountryLivedTemp = useAppSelector(
    (state) => state.User.countryLivedTemp
  );

  const countryData = useAppSelector((state) => state.Country.countries);
  const actionBarOpen = useAppSelector(
    (state) => state.App.countryActionsBarOpen
  );
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );
  const mapZoomIn = useAppSelector((state) => state.App.mapZoomIn);
  const mapZoomOut = useAppSelector((state) => state.App.mapZoomOut);
  const mapProjection = useAppSelector((state) => state.App.mapProjectionGlobe);

  const chartRef = useRef<MapChart>();
  const worldSeriesRef = useRef<am5map.MapPolygonSeries>();
  const countrySeriesRef = useRef<am5map.MapPolygonSeries>();

  useEffect(() => {
    return () => {
      dispatch(clearSelectedCountry());
    };
  }, []);

  useLayoutEffect(() => {
    let root: am5.Root | null = null;
    if (!root && countryData.length > 0) {
      root = am5.Root.new("map");
      const colors = am5.ColorSet.new(root, {});

      // Define a mapping of country ISO codes to colors
      const countryColors: any = {};
      const bucketListColors: any = {};
      const livedColors: any = {};

      const visitedCountriesColor = am5.color("#009876");
      const bucketListColor = am5.color("#FFC107");
      const livedCountriesColor = am5.color("#00BCD4");

      // Only apply visited countries' colors if the user is logged in
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
          projection: am5map.geoMercator(),
          // projection: am5map.geoOrthographic(),
        })
      );

      // Create polygon series
      const worldSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"], // Antartiqua
        })
      );

      worldSeries.mapPolygons.template.setAll({
        tooltipHTML:
          "<span class='mapTooltipEmoji'>{emoji}</span> <span class='mapTooltipText'>{name}</span>",
        interactive: true,
        fill: am5.color("#cacaca"),
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
        fill: am5.color("#ffc0cb"), // pink
      });

      worldSeries.events.on("datavalidated", function () {
        worldSeries.mapPolygons.each(function (polygon) {
          if (
            polygon.dataItem &&
            polygon.dataItem.dataContext !== null &&
            typeof polygon.dataItem.dataContext === "object" &&
            "id" in polygon.dataItem.dataContext
          ) {
            const countryId = polygon.dataItem.dataContext.id as CountryCode;
            if (countryColors[countryId]) {
              polygon.set("fill", countryColors[countryId]);
            }
            if (bucketListColors[countryId]) {
              polygon.set("fill", bucketListColors[countryId]);
            }
            if (livedColors[countryId]) {
              polygon.set("fill", livedColors[countryId]);
            }
          }
        });
      });

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
                      }
                    } else {
                      console.log("polygon fill error");
                    }

                    countrySeries.show();
                    worldSeries.hide(100);
                  }
                }
              )
              .catch((error) => {
                console.log(error);
              });
          }
        }
      );

      let countrySeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          visible: false,
        })
      );

      countrySeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        stroke: am5.color("#FFFFFF"), // White border color
        strokeWidth: 2,
        interactive: true,
        fill: am5.color(0xffa3f6),
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
        fill: colors.getIndex(9),
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
                // Todo
                // fill: colors.getIndex(continents[country.continent_code]),
                fill: am5.color("#cacaca"),
              },
            });
          }
        }
      }
      worldSeries.data.setAll(data);

      // Set refs to make elements accessible
      chartRef.current = chart;
      worldSeriesRef.current = worldSeries;
      countrySeriesRef.current = countrySeries;
    }

    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, [userData, countryData]);

  // Custom effect to open the country details top bar
  useEffect(() => {
    if (actionBarOpen) {
      chartRef.current?.goHome();
      worldSeriesRef.current?.show();
      countrySeriesRef.current?.hide();
      dispatch(clearSelectedCountry());
      dispatch(setCountryActionsBar(false));

      // update temp state after returning home so changes get visible
      if (userCountryVisitedTemp) {
        setTimeout(() => {
          dispatch(updateCountriesVisited(userCountryVisitedTemp));
        }, 1000);
      }

      if (userCountryBucketListTemp) {
        setTimeout(() => {
          dispatch(updateCountriesBucketList(userCountryBucketListTemp));
        }, 1000);
      }

      if (userCountryLivedTemp) {
        setTimeout(() => {
          dispatch(updateCountriesLived(userCountryLivedTemp));
        }, 1000);
      }
    }
  }, [actionBarOpen]);

  // Custom Zoom in
  useEffect(() => {
    if (mapZoomIn) {
      chartRef.current?.zoomIn();
      dispatch(setMapZoomIn(false));
    }
  }, [mapZoomIn]);

  // Custom Zoom out
  useEffect(() => {
    if (mapZoomOut) {
      chartRef.current?.zoomOut();
      dispatch(setMapZoomOut(false));
    }
  }, [mapZoomOut]);

  useEffect(() => {
    if (mapProjection === false) {
      chartRef.current?.set("projection", am5map.geoMercator());
    } else if (mapProjection === true) {
      chartRef.current?.set("projection", am5map.geoOrthographic());
    }
  }, [mapProjection]);

  return (
    <>
      <div className={styles.map} id="map"></div>
      <Box className={styles.zoomControl}>
        {mapProjection === true ? (
          <Tooltip title="Change globe to map" placement="right" arrow>
            <IconButton
              className={`${styles.actionBtn} ${styles.first}`}
              onClick={() => dispatch(toggleMapProjection())}
            >
              <MapOutlinedIcon sx={{ width: "0.9em", height: "0.9em" }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Change map to globe" placement="right" arrow>
            <IconButton
              className={`${
                selectedCountry
                  ? `${styles.actionBtn} ${styles.first} ${styles.disabled}`
                  : `${styles.actionBtn} ${styles.first}`
              }`}
              onClick={() => dispatch(toggleMapProjection())}
            >
              <PublicIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Zoom in" placement="right" arrow>
          <IconButton
            className={`${styles.actionBtn} ${styles.middle}`}
            onClick={() => dispatch(setMapZoomIn(true))}
          >
            <AddOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom out" placement="right" arrow>
          <IconButton
            className={`${styles.actionBtn} ${styles.last}`}
            onClick={() => dispatch(setMapZoomOut(true))}
          >
            <RemoveOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};
