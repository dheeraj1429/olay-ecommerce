import React from "react";
import * as DsHome from "./DashboardHomeComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";

function DashboardHomeComponent() {
   return (
      <DsHome.div>
         <DashboardNavbarComponent />
      </DsHome.div>
   );
}

export default DashboardHomeComponent;
