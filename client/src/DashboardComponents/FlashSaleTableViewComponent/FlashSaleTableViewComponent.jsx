import React from "react";
import * as sale from "./FlashSaleTableViewComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import FlashSaleTableComponent from "../FlashSaleTableComponent/FlashSaleTableComponent";

function FlashSaleTableViewComponent() {
   return (
      <sale.div>
         <DashboardNavbarComponent />
         <sale.spaceDiv>
            <FlashSaleTableComponent />
         </sale.spaceDiv>
      </sale.div>
   );
}

export default FlashSaleTableViewComponent;
