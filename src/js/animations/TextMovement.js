import React from "react";
import { motion } from "framer-motion";


const TextMovement = (props)=>{
    return<>
        <motion.div
            animate={props.animate}
            transition={{ ease: "easeOut", duration: 2 }}
            variants = {{
                visible: { opacity: 1 },
                hidden: { opacity: 0 },
            }}
            whileHover={{ rotate: [0, 2, 0] }}
            // whileTap={{ scale: 0.9 }}
            // whileInView={{ x: [0, 20, 0] }}
            // whileFocus={{ x: [0, 20, 0] }}
        >
            {props.content}                      
        </motion.div>  
    </>
}

export default TextMovement;