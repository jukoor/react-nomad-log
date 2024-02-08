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

type CountryCode = string;

export const Map = () => {
  loadUserDataFromFb();

  const userData = useAppSelector((state) => state.User.selectedUser);

  useLayoutEffect(() => {
    const root = am5.Root.new("map");
    const colors = am5.ColorSet.new(root, {});

    // Define a mapping of country ISO codes to colors
    const countryColors: any = {};
    const visitedCountriesColor = am5.color(0xff5733); // Specified color for visited countries

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
        projection: am5map.geoEqualEarth(),
      })
    );

    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    // Create polygon series
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      fill: am5.color(0xaaaaaa),
      templateField: "polygonSettings",
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      //   fill: am5.color(0x677935),
      fill: colors.getIndex(13),
    });

    polygonSeries.events.on("datavalidated", function () {
      polygonSeries.mapPolygons.each(function (polygon) {
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

    polygonSeries.mapPolygons.template.events.on(
      "click",
      (ev: am5.ISpritePointerEvent) => {
        const dataItem: DataItem<IComponentDataItem> | undefined =
          ev.target.dataItem;
        const data: any = dataItem?.dataContext;
        if (dataItem) {
          const zoomAnimation = polygonSeries.zoomToDataItem(
            dataItem as DataItem<IMapPolygonSeriesDataItem>
          );

          Promise.all([
            zoomAnimation?.waitForStop(),
            am5.net.load(
              "https://cdn.amcharts.com/lib/5/geodata/json/" +
                // data.map +
                "russia" +
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
                countrySeries.setAll({
                  geoJSON: geodata,
                  fill: data.polygonSettings.fill,
                });

                countrySeries.show();
                polygonSeries.hide(100);
                backContainer.show();
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

    // Add button to go back to continents view
    var backContainer = chart.children.push(
      am5.Container.new(root, {
        x: am5.p100,
        centerX: am5.p100,
        dx: -10,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        y: 30,
        interactiveChildren: false,
        layout: root.horizontalLayout,
        cursorOverStyle: "pointer",
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0.2,
        }),
        visible: false,
      })
    );

    var backLabel = backContainer.children.push(
      am5.Label.new(root, {
        text: "Back to world map",
        centerY: am5.p50,
      })
    );

    var backButton = backContainer.children.push(
      am5.Graphics.new(root, {
        width: 32,
        height: 32,
        centerY: am5.p50,
        fill: am5.color(0x555555),
        svgPath: "",
      })
    );

    backContainer.events.on("click", function () {
      chart.goHome();
      polygonSeries.show();
      countrySeries.hide();
      backContainer.hide();
    });

    return () => root.dispose();
  }, [userData]);

  return <div className={styles.map} id="map"></div>;
};

export default Map;
