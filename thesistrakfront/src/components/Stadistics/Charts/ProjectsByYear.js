import React from "react";
import ReactECharts from "echarts-for-react";

const ProjectsByYearChart = ({ yearData }) => {
  const option = {
    title: {
      text: "Cantidad De Proyectos Por Año",
      left: "center",
      textStyle: {
        fontFamily: "Apple",
      },
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        fontFamily: "Apple",
      },
    },
    xAxis: {
      type: "category",
      data: yearData.years || [],
      boundaryGap: false,
      axisLabel: {
        fontFamily: "Apple",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontFamily: "Apple",
      },
    },
    grid: {
      left: 50,
    },
    series: [
      {
        name: "Proyectos",
        textStyle: {
          fontFamily: "Apple",
        },
        type: "line",
        data: yearData.totals || [],
        label: {
          fontFamily: "Apple",
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "70vh", width: "100vw" }} />
  );
};

export default ProjectsByYearChart;
