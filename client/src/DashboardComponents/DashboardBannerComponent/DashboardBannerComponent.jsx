import React from "react";
import * as styled from "./DashboardBannerComponent.style";

function DashboardBannerComponent({ Heading, subHeading }) {
   return (
      <styled.div>
         <h1>{Heading}</h1>
         <p>{subHeading}</p>
      </styled.div>
   );
}

export default DashboardBannerComponent;
