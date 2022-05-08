import React from "react";
import { motion } from "framer-motion";


const LeftRight = (props)=>{
    return<>
        <motion.label
            whileInView={{
              x:[-props.dis, 0]
            }}
        >
            {props.left}                      
        </motion.label> 
        <motion.label
            whileInView={{
              x:[props.dis, 0]
            }}
        >
            {props.right}                      
        </motion.label> 
    </>
}

export default LeftRight;