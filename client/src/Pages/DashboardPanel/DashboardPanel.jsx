import React from "react";
import * as dashboard from "./DashboardPanle.style";
import DashboardPanelSidebarComponent from "../../DashboardComponents/DashboardPanelSidebarComponent/DashboardPanelSidebarComponent";
import { Outlet } from "react-router";

function DashboardPanel() {
   return (
      <dashboard.div>
         <dashboard.flexDiv>
            <DashboardPanelSidebarComponent />
            <dashboard.renderDiv>
               <dashboard.innerDiv>
                  <Outlet />
               </dashboard.innerDiv>
            </dashboard.renderDiv>
         </dashboard.flexDiv>
      </dashboard.div>
   );
}

export default DashboardPanel;
