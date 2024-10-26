import React from 'react'
import ReactEcharts from "echarts-for-react"
import "./Stadistics.css";

const Echart = () => {
    const option ={
        title:{
            text:"Proyectos Por Carrera"
        },
        tooltip:{},
        xAxis:{
            data:["Infor", "Agron","Artes","MVZ"]
        },
        yAxis:{},
        series:[{
            name:"Proyectos",
            type:"bar",
            data:[5,20,17,30,12]
        }]
    }

    const option2 ={
        title:{
            text:"Tendencia Por Año"
        },
        tooltip:{},
        xAxis:{
            data:["2015","2016","2017","2018","2019", "2020","2021","2022"]
        },
        yAxis:{},
        series:[{
            name:"Proyectos",
            type:"line",
            data:[15,35,17,9,22,40,50,92]
        }]
    }

    return (
        <div id='StadisticsComponent'>
            <div className='StadisticItem'>
                <ReactEcharts option={option}/>
            </div>

            <div className='StadisticItem'>
                <ReactEcharts option={option2}/>
            </div>

        </div>
    )
}

export default Echart
