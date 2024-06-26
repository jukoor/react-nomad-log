import styles from "../../styles/DonutChart.module.scss";

type DonutChartProps = {
  id: number;
  percent: number;
  text: string;
};

export const DonutChart = (props: DonutChartProps) => {
  const { id, percent, text } = props;

  const percentAsDegrees = percent * 3.6;
  const degreeString = percentAsDegrees + "deg";

  // Set transofrmed percentage as global css variable to access it dynamically from module scss file
  return (
    <div
      className={styles.chart}
      data-chart={id}
      style={
        {
          "--degrees": `${degreeString}`,
        } as React.CSSProperties
      }
    >
      <div className={styles.donutChart} data-percent={text}></div>
    </div>
  );
};
