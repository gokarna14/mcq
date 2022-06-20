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
                left: 10,
                bottom: 10,
              }}
            >
                <CartesianGrid strokeDasharray="1" />
                <XAxis dataKey="name" tick={false} label={props.xlabel}/>
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="score" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="correct%" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </div>}
      {/* </ResponsiveContainer> */}
      </>
      );
}

export default LineChartz;