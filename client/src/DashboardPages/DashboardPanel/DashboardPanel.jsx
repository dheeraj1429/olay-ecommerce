import React from 'react';
import * as dashboard from './DashboardPanle.style';
import DashboardPanelSidebarComponent from '../../DashboardComponents/DashboardPanelSidebarComponent/DashboardPanelSidebarComponent';
import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

function DashboardPanel() {
   const { auth } = useSelector((state) => state.auth);

   if (!!auth && auth?.userObject && auth.userObject?.isAdmin === 'user') {
      return <Navigate to={'/dashboard-auth/sign-in'} />;
   }

   if (!auth) {
      return <Navigate to={'/auth/signin'} />;
   }

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
