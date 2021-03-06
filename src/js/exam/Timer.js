import React, { useEffect, useState } from "react";
import Emphasize from "../animations/Emphasize";


const Timer =(props)=>{
    
    const [seconds, setSeconds] = useState(props.seconds);
    // useState(()=>{
    //     setTimeout(()=>{
    //         console.log('Time Out !');
    //     }, parseInt(props.seconds)*1000)
    // })
    
    setTimeout(()=>{
        props.handleTimeOff();
    }, parseInt(props.seconds)*1000)


    useEffect(() => {
        let timer = setInterval(() => {
            setSeconds(seconds => {
                if(seconds === 0){
                    props.handleTimeOff()
                }
                return seconds - 1;
            });
    
        }, 1000);
        return () => clearInterval(timer); // cleanup the timer
    }, []);


    const countDown = <>{parseInt(seconds/60)} Minutes {parseInt(seconds%60)} Seconds</>

        const clockIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>

    return(
        <div>
            
            <div type="button" class="btn btn-primary">
                    {clockIcon}
                <span class="badge badge-light">
                { seconds>0 ? countDown : 'Time Up !'}
                </span>
            </div>
            <i>
                <b>
                <Emphasize
                    content={props.text}
                ></Emphasize>
                </b>
            </i>
                
        </div>
    )

}
export default Timer;