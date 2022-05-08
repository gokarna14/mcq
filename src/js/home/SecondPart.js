import React from "react";
import { motion } from "framer-motion";



const SecondPart=()=>{

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
      
      return (
        <motion.div
        animate={{ y: [0, 100, 0] }}
        transition={{ ease: "easeOut", duration: 2 }}
        variants = {{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
        }}
      >

        here

      </motion.div>
      )

}

export default SecondPart;