import React from "react";
import ReactECharts from "echarts-for-react";

const ProjectsByCareerChart = ({ data, isMobile }) => {
  const option = {
    title: {
      text: "Proyectos Por Carrera",
      left: "center",
      textStyle: { fontFamily: "Apple" },
    },
    tooltip: {
      trigger: "item",
      formatter: (params) => `<div style="white-space: normal;" className="hoverable">${params.seriesName}<br/>${params.name}: ${params.value} (${params.percent}%)</div>`,
      textStyle: {
        fontSize: isMobile ? 12 : 15,
        lineHeight: 20,
        fontFamily: "Apple",
      },
      extraCssText: `
        white-space: normal;
        max-width: ${isMobile ? "120px" : "300px"};
        padding: 8px;
      `,
    },
    legend: isMobile
      ? { show: false }
      : {
          orient: "vertical",
          className: "hoverable",
          show: true,
          left: "left",
          textStyle: {
            fontSize: 9,
            fontFamily: "Apple",
            color: "#333",
          },
          itemGap: 10,
          type: "scroll",
          formatter: (name) =>
            name.length > 25 ? name.substring(0, 25) + "..." : name,
        },
    series: [
      {
        name: "Proyectos",
        type: "pie",
        radius: isMobile ? ["20%", "50%"] : ["35%", "85%"],
        avoidLabelOverlap: true,
        data: data,
        label: {
          fontFamily: "Apple",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "70vh", width: "100vw" }} />
  );
};

export default ProjectsByCareerChart;
