import React from 'react'
import ReactEcharts from "echarts-for-react"
import "./Stadistics.css";

const Echart = () => {
    const option ={
        title:{
            text:"Example Echarts"
        },
        tooltip:{},
        xAxis:{
            data:["A", "B","C","D"]
        },
        yAxis:{},
        series:[{
            name:"Ventas",
            type:"bar",
            data:[5,20,17,30,12]
        }]
    }


    return (
        <div id='StadisticsComponent'>
            <ReactEcharts option={option}/>
        
        </div>
    )
}

export default Echart
