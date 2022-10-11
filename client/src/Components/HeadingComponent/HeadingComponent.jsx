import React from "react";
import * as heading from "./HeadingComponent.style";

function HeadingComponent({ Heading, subHeading, cl, dark }) {
   return (
      <heading.div>
         <h1
            style={
               dark
                  ? {
                       color: "var(--spec-background-gry-cl)",
                    }
                  : {
                       color: "var(--smooth-light-heading-color)",
                    }
            }
            className={cl ? cl : null}
         >
            {Heading}
         </h1>
         {subHeading ? <p>{subHeading}</p> : null}
      </heading.div>
   );
}

export default HeadingComponent;
