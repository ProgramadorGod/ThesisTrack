import React, { useEffect, useState } from 'react';
import ReactEcharts from "echarts-for-react";
import "./Stadistics.css";

const Echart = () => {
    const [carrerData, setCarrerData] = useState([]);
    const [yearData, setYearData] = useState([]);
    const [carrersList, setCarrersList]  = useState([]);
    const [documentsByYear, setDocumentsByYear] = useState({});
    const [trendData, setTrendData] = useState([]); // Para la nueva gráfica de tendencias

    // Fetch de los datos para Proyectos por Carrera
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/document-count-by-carrer-and-year/")
            .then(response => response.json())
            .then(data => {
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
            .catch(error => console.error("Error al obtener los datos:", error));



    },[])

    console.log(trendData)


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/document-count-by-carrer/")
            .then(response => response.json())
            .then(data => {
                // Ordenar los datos por cantidad de documentos
                const sortedData = data.sort((a, b) => b.total_documents - a.total_documents);

                // Separar los cuatro principales y sumar los demás
                const topFour = sortedData.slice(0,5);
                const others = sortedData.slice(5);
                // Formatear los datos finales
                const formattedData = [
                    ...topFour.map(item => ({
                        value: item.total_documents,
                        name: item.carrer__name,
                        label: { show: true }, // Mostrar etiquetas para las 4 carreras principales
                    })),
                    ...others.map(item => ({
                        value: item.total_documents,
                        name: item.carrer__name,
                        label : {show:false},

                    })),
                    
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


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/document-count-by-carrer-and-year/")
            .then(response => response.json())
            .then(data => {
                // Organizar datos por carrera
                const organizedData = data.reduce((acc, item) => {
                    const { year, carrer__name, total_documents } = item;
                    if (!acc[carrer__name]) {
                        acc[carrer__name] = [];
                    }
                    acc[carrer__name].push({ year, total_documents });
                    return acc;
                }, {});
    
                // Ordenar los años dentro de cada carrera
                const sortedData = Object.keys(organizedData).map(carrera => ({
                    carrera,
                    data: organizedData[carrera].sort((a, b) => a.year - b.year)
                }));
    
                // Ordenar las carreras por el año más antiguo de cada carrera
                sortedData.sort((a, b) => {
                    const firstYearA = a.data[0]?.year || Infinity; // Año de inicio de la carrera A
                    const firstYearB = b.data[0]?.year || Infinity; // Año de inicio de la carrera B
                    return firstYearA - firstYearB; // Orden ascendente por el año de inicio
                });
    
                setTrendData(sortedData);
                console.log("Datos ordenados: ", sortedData);
            })
            .catch(error => console.error("Error al obtener los datos de tendencia:", error));
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
            
            left: 'left',
            textStyle: {
                fontSize: 9, // Cambia el tamaño de la fuente aquí
                color: '#333' // Opcional: establece el color de la leyenda
            },
            itemGap: 5,
            formatter: function (name, value) {
                
                return name.length > 25 ? name.substring(0, 25) + '...' : name; // Limitar a 20 caracteres
            },
            
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

    const option3 = {
        title: { text: "Crecimiento por Carrera", left: 'center' },
        tooltip: { trigger: 'axis' },
        legend: { top: 'bottom' },
        xAxis: { type: 'category', name: 'Año', data: Object.keys(documentsByYear) },
        yAxis: { type: 'value', name: 'Documentos' },
        series: Object.keys(documentsByYear[Object.keys(documentsByYear)[0]] || {}).map(carrer => ({
            name: carrer,
            type: 'line',
            data: Object.keys(documentsByYear).map(year => documentsByYear[year][carrer] || 0),
            showSymbol: false,
            emphasis: { focus: 'series' },
            labelLayout: { moveOverlap: 'shiftY' }
        }))
    };


    const trendOption = {
        title: {
            text: 'Tendencia por Carrera y Año',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            name: 'Año',
        },
        yAxis: {
            type: 'value',
            name: 'Total Documentos'
        },
        legend: {
            data: trendData.map(item => item.carrera),
            left: 'left',
            orient: 'vertical',
            formatter: function (carrera) {
                
                return carrera.length > 25 ? carrera.substring(0, 25) + '...' : carrera; // Limitar a 20 caracteres
            },
        },
        series: trendData.map(carrera => ({
            name: carrera.carrera,
            type: 'line',
            showSymbol: false,
            data: carrera.data.map(d => [d.year, d.total_documents])
        })),
        
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
            <div className='StadisticItem' id='TimeLapse'>
                <ReactEcharts option={trendOption} />
            </div>
        </div>
    );
};

export default Echart;
