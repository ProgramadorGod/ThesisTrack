import React from 'react'
import ReactEcharts from "echarts-for-react"
import "./Stadistics.css";

const Echart = () => {
    const option ={
        title:{
            text:"Ejemplo Estadísticas"
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
            text:"Ejemplo Estadísticas2"
        },
        tooltip:{},
        xAxis:{
            data:["mayo", "junio","julio","agosto"]
        },
        yAxis:{},
        series:[{
            name:"Proyectos",
            type:"line",
            data:[15,35,17,9,22]
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
