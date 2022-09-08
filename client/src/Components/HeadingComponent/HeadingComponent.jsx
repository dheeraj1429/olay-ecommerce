import React from "react";
import * as heading from "./HeadingComponent.style";

function HeadingComponent({ Heading, subHeading, cl }) {
   return (
      <heading.div>
         <h1 className={cl ? cl : null}>{Heading}</h1>
         {subHeading ? <p>{subHeading}</p> : null}
      </heading.div>
   );
}

export default HeadingComponent;
