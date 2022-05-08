import React from "react";
import { motion } from "framer-motion";


const Emphasize = (props)=>{
    return<>
        <motion.div
            whileInView={{
              scale:[1, 0.5, 0.8, 1]
            }}
            whileHover={props.onHover ? {
                scale:[1, 0.5, 0.8, 1]
            }:{}}
        >
            {props.content}                      
        </motion.div>  
    </>
}

export default Emphasize;