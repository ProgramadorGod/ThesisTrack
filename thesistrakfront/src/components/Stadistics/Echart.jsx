import React, { useEffect, useState } from 'react';
import ReactEcharts from "echarts-for-react";
import "./Stadistics.css";

const Echart = () => {
    const [carrerData, setCarrerData] = useState([]);
    const [yearData, setYearData] = useState([]);

    // Fetch de los datos para Proyectos por Carrera
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/document-count-by-carrer/")
            .then(response => response.json())
            .then(data => {
                // Ordenar los datos por cantidad de documentos
                const sortedData = data.sort((a, b) => b.total_documents - a.total_documents);

                // Separar los cuatro principales y sumar los demás
                const topFour = sortedData.slice(0, 7);
                const others = sortedData.slice(7);
                const totalOthers = others.reduce((sum, item) => sum + item.total_documents, 0);

                // Formatear los datos finales
                const formattedData = [
                    ...topFour.map(item => ({
                        value: item.total_documents,
                        name: item.carrer__name,
                        label: { show: true }, // Mostrar etiquetas para las 4 carreras principales
                    })),
                    {
                        value: totalOthers,
                        name: "Otras Carreras",
                        label: { show: true } // Mostrar etiqueta para "Otras Carreras"
                    }
                ];

                setCarrerData(formattedData);
            })
            .catch(error => console.error("Error fetching carrer data:", error));
    }, []);

    // Fetch de los datos para Tendencia Por Año
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/document-count-by-year/")
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => a.year - b.year);
                const years = sortedData.map(item => item.year);
                const totals = sortedData.map(item => item.total_documents);
                setYearData({ years, totals });
            })
            .catch(error => console.error("Error fetching year data:", error));
    }, []);

    // Configuración del gráfico de pastel (Proyectos por Carrera)
    const option = {
        title: {
            text: "",
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            
            left: 'left'
        },
        series: [
            {
                name: "Proyectos",
                type: "pie",
                radius: ["30%", "75%"], // Añade más espacio al gráfico
                avoidLabelOverlap: true, // Evita superposición de etiquetas
                data: carrerData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // Configuración del gráfico de línea (Tendencia Por Año)
    const option2 = {
        title: {
            text: "Tendencia Por Año",
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: yearData.years || []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: "Proyectos",
                type: "line",
                data: yearData.totals || []
            }
        ]
    };

    return (
        <div id='StadisticsComponent'>
            <h2>Proyectos / Programa</h2>
            <div className='StadisticItem'>
                <ReactEcharts option={option} />
            </div>
            <div className='StadisticItem' id='TimeLapse'>
                <ReactEcharts option={option2} />
            </div>
        </div>
    );
};

export default Echart;
