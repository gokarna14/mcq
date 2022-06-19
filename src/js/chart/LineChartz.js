import React, { useEffect, useState } from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
    AreaChart,
  } from 'recharts';


  const data = [
    {name: 'normal', correct: 32, score: 16},
    {name: 'normal1', correct: 32, score: 16},
    {name: 'normal2', correct: 32, score: 16},
    {name: 'normal3', correct: 32, score: 16},
    {name: 'normal4', correct: 32, score: 16},
    {name: 'normal6', correct: 32, score: 16},
    {name: 'normal7', correct: 32, score: 16},
    {name: 'normal8', correct: 32, score: 16},
    {name: 'normal9', correct: 0, score: 0},
    {name: 'quick9', correct: 0, score: 0},
    {name: 'quick8', correct: 25, score: 2},
    {name: 'quick7', correct: 0, score: 0},
    {name: 'quick6', correct: 50, score: 4},5
  ];

  
  const LineChartz=(props)=>{
    
    useEffect(()=>{
        // console.log(receivedData);
        // console.log(data);
    }, [])

    const [receivedData, setReceivedData] = useState(props.data)
    const [width, setWidth] = useState(window.innerWidth)

    // if (width !== window.innerWidth){
    //   setWidth(window.innerWidth);
    // }

    useEffect(() => {
      function updateSize() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    

    return(
      <>
      {/* <ResponsiveContainer width={"100%"} height={"100%"}> */}
          <button
            onClick={()=>{console.log(receivedData)}}
          >LOG DATA</button>
            { receivedData.length > 0 &&
            <div style={{textAlign:'center'}}>
              <AreaChart
              width={window.innerWidth}
              height={400}
              data={receivedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false} label={'Time'}/>
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="score" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="correct%" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </div>}
      {/* </ResponsiveContainer> */}
      </>
      );
}

export default LineChartz;