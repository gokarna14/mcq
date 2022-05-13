import React from "react";


// import {ChartData} from 'chart.js'

const SideBySide = (props)=>{

      


    return<>
     <div className= 'h1F' >
                    <div className='h2F'>
                        <div className='sideBySide1'>
                            {props.left}
                        </div>
                        <div className='sideBySide2'>
                           {props.right}
                        </div>
                    </div>
                </div>
    </>
}

export default SideBySide;