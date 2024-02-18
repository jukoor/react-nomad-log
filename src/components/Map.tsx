import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { DataItem } from "@amcharts/amcharts5";
import { IComponentDataItem } from "@amcharts/amcharts5/.internal/core/render/Component";
import { IMapPolygonSeriesDataItem } from "@amcharts/amcharts5/map";
import { useLayoutEffect } from "react";
import {
  setSelectedCountry,
  clearSelectedCountry,
} from "../store/countrySlice";
import {
  findCountryByCode,
  getEmojiFlagFromCc,
} from "../utils/countryDataUtils";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import styles from "../styles/Map.module.scss";

type CountryCode = string;

export const Map = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.User.selectedUser);
  const countryData = useAppSelector((state) => state.Country.countries);

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

    const zoomCtrl = am5map.ZoomControl.new(root, {});
    // const { minusButton, plusButton } = zoomCtrl;

    // if (plusButton && plusButton.get("background")) {
    //   plusButton.set("cursorOverStyle", "pointer");
    //   const background = plusButton.get("background");
    //   if (background) {
    //     background.setAll({
    //       cornerRadiusTL: 0,
    //       cornerRadiusTR: 0,
    //       cornerRadiusBR: 0,
    //       cornerRadiusBL: 0,
    //       fill: am5.color(0xe3e3e3),
    //       fillOpacity: 0.7,
    //     });
    //   }
    // }

    // minusButton.set("cursorOverStyle", "pointer");

    chart.set("zoomControl", zoomCtrl);

    // const zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    // Create polygon series
    const worldSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    worldSeries.mapPolygons.template.setAll({
      tooltipHTML:
        "<span class='mapTooltipEmoji'>{emoji}</span> <span class='mapTooltipText'>{name}</span>",
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
                let geodata = am5.JSONParser.parse(results[1].response);
                if (data && data.polygonSettings) {
                  countrySeries.setAll({
                    geoJSON: geodata,
                    fill: data.polygonSettings.fill,
                  });

                  dispatch(
                    setSelectedCountry(findCountryByCode(data.id, countryData))
                  );
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

    let countrySeries = chart.series.push(
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

    // Set up data for countries
    let data = [];
    for (let id in am5geodata_data_countries2) {
      if (am5geodata_data_countries2.hasOwnProperty(id)) {
        let country = am5geodata_data_countries2[id];
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

    worldSeries.mapPolygons.template.events.on("pointerover", function () {
      document.body.style.cursor = "pointer";
    });

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
      dispatch(clearSelectedCountry());
    });

    return () => root.dispose();
  }, [userData]);
  return <div className={styles.map} id="map"></div>;
};
