import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import Lottie from "lottie-react"; // Intenta importar así
import "./Stadistics.css";
import { Link, Element } from "react-scroll";
import bookanimation from "../../media/bookanimation.json";
import { color } from "framer-motion";

const Echart = () => {
  const [carrerData, setCarrerData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const API_BASE_URL = "http://127.0.0.1:8000/";
  // const API_BASE_URL =  process.env.REACT_APP_API_URL;
  const [carrersList, setCarrersList] = useState([]);
  const [documentsByYear, setDocumentsByYear] = useState({});
  const [trendData, setTrendData] = useState([]); // Para la nueva gráfica de tendencias

  let dataAxis = [
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ];

  let dataaverage = [92];

  function fillArrayWithSameValue(array, value, times) {
    array.length = 0; // Vacía el array
    for (let i = 0; i < times; i++) {
      array.push(value);
    }
  }

  fillArrayWithSameValue(dataaverage, 92, 24);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 801);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let data = [
    80.6,
    83.87,
    92.02,
    108.73,
    89.12,
    100.62,
    88.32,
    88.48,
    103.71,
    104.88,
    108.75,
    105.94,
    98.72,
    105.18,
    { value: 112.1, itemStyle: { color: "#a90000" } },
    96.51,
    98.65,
    97.02,
    81.47,
    71.7,
    74.62,
    67.72,
    68.71,
    79.18,
  ];

  let yMax = 150; // Asumiendo que el máximo valor es 150 para las barras
  let dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }

  // Fetch de los datos para Proyectos por Carrera
  useEffect(() => {
    fetch(API_BASE_URL + "api/document-count-by-carrer-and-year/")
      .then((response) => response.json())
      .then((data) => {
        // Organizar datos por año y carrera
        const organizedData = data.reduce((acc, item) => {
          const { year, carrer__name, total_documents } = item;

          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push({ carrera: carrer__name, total_documents });
          return acc;
        }, {});

        // Ordenar los años en orden ascendente
        const sortedData = Object.keys(organizedData)
          .sort((a, b) => a - b) // Ordenar años numéricamente
          .reduce((obj, key) => {
            obj[key] = organizedData[key];
            return obj;
          }, {});

        setDocumentsByYear(sortedData);
        console.log("Datos organizados y ordenados: ", sortedData);
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  console.log(trendData);

  useEffect(() => {
    fetch(API_BASE_URL + "api/document-count-by-carrer/")
      .then((response) => response.json())
      .then((data) => {
        // Ordenar los datos por cantidad de documentos
        const sortedData = data.sort(
          (a, b) => b.total_documents - a.total_documents
        );

        // Separar los cuatro principales y sumar los demás
        const topFour = sortedData.slice(0, 5);
        const others = sortedData.slice(5);
        // Formatear los datos finales
        const formattedData = [
          ...topFour.map((item) => ({
            value: item.total_documents,
            name: item.carrer__name,
            label: { show: true }, // Mostrar etiquetas para las 4 carreras principales
          })),
          ...others.map((item) => ({
            value: item.total_documents,
            name: item.carrer__name,
            label: { show: false },
          })),
        ];

        setCarrerData(formattedData);
      })
      .catch((error) => console.error("Error fetching carrer data:", error));
  }, []);

  // Fetch de los datos para Tendencia Por Año
  useEffect(() => {
    fetch(API_BASE_URL + "api/document-count-by-year/")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.year - b.year);
        const years = sortedData.map((item) => item.year);
        const totals = sortedData.map((item) => item.total_documents);
        setYearData({ years, totals });
      })
      .catch((error) => console.error("Error fetching year data:", error));
  }, []);

  useEffect(() => {
    fetch(API_BASE_URL + "api/document-count-by-carrer-and-year/")
      .then((response) => response.json())
      .then((data) => {
        // Organizar datos por carrera
        const organizedData = data.reduce((acc, item) => {
          const { year, carrer__name, total_documents } = item;
          if (!acc[carrer__name]) {
            acc[carrer__name] = [];
          }
          acc[carrer__name].push({ year, total_documents });
          return acc;
        }, {});

        // Determina el rango de años completo desde 2001 hasta el año más reciente
        const allYears = Array.from(
          { length: new Date().getFullYear() - 2001 + 1 },
          (_, i) => i + 2001
        );

        // Agregar años faltantes con total_documents = 0
        const filledData = Object.keys(organizedData).map((carrera) => {
          const dataByYear = organizedData[carrera].reduce(
            (acc, { year, total_documents }) => {
              acc[year] = total_documents;
              return acc;
            },
            {}
          );

          // Completa los años faltantes con 0
          const fullData = allYears.map((year) => ({
            year,
            total_documents: dataByYear[year] || 0,
          }));

          return {
            carrera,
            data: fullData,
          };
        });

        setTrendData(filledData);
        console.log("Datos completos con años faltantes: ", filledData);
      })
      .catch((error) =>
        console.error("Error al obtener los datos de tendencia:", error)
      );
  }, []);

  // Configuración del gráfico de pastel (Proyectos por Carrera)
  const option = {
    title: {
      text: "Proyectos Por Carrera",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      show: true,
    },


    legend: isMobile
      ? { show: false }
      : {
          orient: "vertical",
          show: true,
          left: "left",
          textStyle: {
            fontSize: 9,
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
        data: carrerData,
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

  // Configuración del gráfico de línea (Tendencia Por Año)
  const option2 = {
    title: {
      text: "Cantidad De Proyectos Por Año",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: yearData.years || [],
    },
    yAxis: {
      type: "value",
    },
    grid: {
      left: 50,
    },
    series: [
      {
        name: "Proyectos",
        type: "line",
        data: yearData.totals || [],
      },
    ],
  };

  const option3 = {
    title: { text: "Crecimiento por Carrera", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { top: "bottom" },
    xAxis: {
      type: "category",
      name: "Año",
      data: Object.keys(documentsByYear),
    },
    yAxis: { type: "value", name: "Documentos" },
    series: Object.keys(
      documentsByYear[Object.keys(documentsByYear)[0]] || {}
    ).map((carrer) => ({
      name: carrer,
      type: "line",
      data: Object.keys(documentsByYear).map(
        (year) => documentsByYear[year][carrer] || 0
      ),
      showSymbol: false,
      emphasis: { focus: "series" },
      labelLayout: { moveOverlap: "shiftY" },
    })),
  };

  const trendOption = {
    title: {
      text: "Tendencia por Carrera y Año",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        fontSize: 13,
      },
      formatter: function (params) {
        let tooltipContent = "";
        params.forEach((param) => {
          const [year, totalDocuments] = param.value; // Desestructuramos el array en año y cantidad

          if (totalDocuments !== 0) {
            tooltipContent += `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:${param.color};margin-right:5px;"></span> ${param.seriesName} : ${totalDocuments}<br>`;
          }
        });
        return tooltipContent ? tooltipContent : "Sin datos";
      },
    },
    xAxis: {
      type: "category",
      name: "Año",
    },
    yAxis: {
      type: "value",
      name: "Total Documentos",
    },

    ...(isMobile
      ? { legend: { show: false } }
      : {
          legend: {
            show: true,
            data: trendData.map((item) => item.carrera),
            left: "left",
            orient: "vertical",
            top: "top",
            type: "scroll",
            textStyle: {
              fontSize: 8, // Cambia el tamaño de la fuente aquí
              color: "#000", // Opcional: establece el color de la leyenda
            },

            formatter: function (carrera) {
              return carrera.length > 25
                ? carrera.substring(0, 25) + "..."
                : carrera; // Limitar a 20 caracteres
            },
          },
        }),
    grid: {
      left: isMobile ? 56:190,
      right: 56,
      top: 40 , // Ajusta este valor según el espacio que quieras entre el título y el gráfico
    },
    series: trendData.map((carrera) => ({
      name: carrera.carrera,
      type: "line",
      showSymbol: false,
      data: carrera.data.map((d) => [d.year, d.total_documents]),
    })),
  };

  const option4 = {
    title: {
      text: "Promedio De Páginas Por Año",
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      data: dataAxis,
    },

    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "line",
        data: dataaverage,
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            return `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:${params.color};margin-right:5px;"></span> Promedio: ${params.value}`;
          },
        },
      },
      {
        type: "bar",
        data: data,
        itemStyle: { color: "#000000c5" },
      },
    ],
    grid: {
      left: 50,
    },
  };

  return (
    <div id="StadisticsComponent">
      {/* Elemento 1 */}
      <Element name="section1" className="StadisticItem" id="Cake">
        <div>
          <h2 id="GraphTitle">
            <p id="p">DETALLES AVANZADOS</p>
          </h2>

          {/* Gráfico u otro contenido */}
          <div className="ChartContainer">
            <ReactEcharts
              option={option}
              style={{ height: "70vh", width: "100vw" }}
            />
          </div>
        </div>
      </Element>

      {/* Elemento 2 */}
      <Element name="section2" className="StadisticItem" id="TimeLapse">
        {/* Gráfico u otro contenido */}
        <ReactEcharts
          option={option2}
          style={{ height: "80vh", width: "80vw" }}
        />
      </Element>
      <Element name="section3" className="StadisticItem" id="Combination">
        {/* Gráfico u otro contenido */}
        <ReactEcharts
          option={trendOption}
          style={{ height: "70vh", width: "90vw" }}
        />
      </Element>

      <Element className="StadisticItem" id="Pages">
        <ReactEcharts
          option={option4}
          style={{ height: "80vh", width: "90vw" }}
        />
      </Element>

      {/* Botones para moverse entre las secciones */}

      {/* <Link to="section1" smooth={true} duration={500}>
        Ir a Sección 1
      </Link>
      <Link to="section2" smooth={true} duration={500}>
        Ir a Sección 2
      </Link> */}
    </div>
  );
};

export default Echart;
