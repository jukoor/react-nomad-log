import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import { DataItem } from "@amcharts/amcharts5";
import { IMapPolygonSeriesDataItem } from "@amcharts/amcharts5/map";
import { IComponentDataItem } from "@amcharts/amcharts5/.internal/core/render/Component";
import styles from "../styles/Map.module.scss";
import { useAppSelector } from "../hooks/hooks";
import { loadUserDataFromFb } from "../services/firebaseHelper";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import { Button } from "@mui/material";
import { getEmojiFlagFromCc } from "../utils/countryDataUtils";
import { get } from "firebase/database";

type CountryCode = string;

export const Map = () => {
  loadUserDataFromFb();

  const userData = useAppSelector((state) => state.User.selectedUser);

  useLayoutEffect(() => {
    const root = am5.Root.new("map");
    const colors = am5.ColorSet.new(root, {});

    // Define a mapping of country ISO codes to colors
    const countryColors: any = {};
    const visitedCountriesColor = am5.color(0x009876); // Specified color for visited countries

    // Assign the specified color to all visited countries
    if (userData.countriesVisited) {
      userData.countriesVisited.forEach((countryCode: CountryCode) => {
        countryColors[countryCode] = visitedCountriesColor;
      });
    }

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
      })
    );

    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    // Create polygon series
    const worldSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    worldSeries.mapPolygons.template.setAll({
      tooltipText: "{emoji} {name}",
      interactive: true,
      fill: am5.color(0xaaaaaa),
      templateField: "polygonSettings",
      stroke: am5.color("#ffffff"),
      strokeWidth: 1,
    });

    worldSeries.mapPolygons.template.states.create("hover", {
      //   fill: am5.color(0x677935),
      fill: colors.getIndex(13),
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
          ]).then(
            (
              results: [
                void | undefined,
                am5.net.INetLoadResult<am5map.MapChart>
              ]
            ) => {
              if (results[1].response) {
                var geodata = am5.JSONParser.parse(results[1].response);
                if (data && data.polygonSettings) {
                  countrySeries.setAll({
                    geoJSON: geodata,
                    fill: data.polygonSettings.fill,
                  });
                } else {
                  // Handle the case where data or data.polygonSettings is undefined
                  // You might want to set a default fill color or handle the error appropriately
                }

                countrySeries.show();
                worldSeries.hide(100);
                backButton.show();
              }
            }
          );
        }
      }
    );

    var countrySeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        visible: false,
      })
    );

    countrySeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0xaaaaaa),
    });

    countrySeries.mapPolygons.template.states.create("hover", {
      fill: colors.getIndex(9),
    });

    // var continents: { [key: string]: number } = {
    //   AF: 0,
    //   AN: 1,
    //   AS: 2,
    //   EU: 3,
    //   NA: 4,
    //   OC: 5,
    //   SA: 6,
    // };

    // Set up data for countries
    var data = [];
    for (var id in am5geodata_data_countries2) {
      if (am5geodata_data_countries2.hasOwnProperty(id)) {
        var country = am5geodata_data_countries2[id];
        if (country.maps.length) {
          data.push({
            id: id,
            emoji: getEmojiFlagFromCc(id),
            map: country.maps[0],
            polygonSettings: {
              // fill: colors.getIndex(continents[country.continent_code]),
              fill: am5.color(0xaaaaaa),
            },
          });
        }
      }
    }
    worldSeries.data.setAll(data);

    worldSeries.mapPolygons.template.events.on("pointerover", function (ev) {
      document.body.style.cursor = "pointer";
    });

    // series.columns.template.events.on("pointerout", function (ev) {
    //     document.body.style.cursor = "default";
    // });

    // Add back button
    const backButton = chart.children.push(
      am5.Button.new(root, {
        x: am5.percent(1),
        dy: 10,
        label: am5.Label.new(root, {
          text: "Back",
        }),
        visible: false,
      })
    );

    backButton.events.on("click", function () {
      chart.goHome();
      worldSeries.show();
      countrySeries.hide();
      backButton.hide();
    });

    return () => root.dispose();
  }, [userData]);

  return <div className={styles.map} id="map"></div>;
};

export default Map;
