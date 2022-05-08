import React from "react";
import { motion } from "framer-motion";

import Emphasize from "../animations/Emphasize";
import LeftRight from "../animations/LeftRight";
import { dummyList } from "../essentials/essentials";


const SecondPart=()=>{


      
      return (
        <>
        <hr />
        <br />
            <LeftRight
              left={
                <h1>Welcome to ou</h1>
              }
              right={
                <h1>r platform !</h1>
              }
              dis={300}
            ></LeftRight>

            <Emphasize
              content={
                <>
                  <h3>Features</h3>
                </>
              }
              onHover={true}
            ></Emphasize>

              {dummyList}

        </>
      )

}

export default SecondPart;