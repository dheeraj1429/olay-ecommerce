import React from "react";
import * as flash from "./ProductFlashSaleComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import CreateNewFlashSaleComponent from "../CreateNewFlashSaleComponent/CreateNewFlashSaleComponent";

function ProductFlashSaleComponent() {
   return (
      <flash.div>
         <DashboardNavbarComponent />
         <CreateNewFlashSaleComponent />
      </flash.div>
   );
}

export default ProductFlashSaleComponent;
