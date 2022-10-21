import React, { useLayoutEffect } from 'react';
import * as dashboard from './DashboardPanle.style';
import DashboardPanelSidebarComponent from '../../DashboardComponents/DashboardPanelSidebarComponent/DashboardPanelSidebarComponent';
import { Outlet, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function DashboardPanel() {
   const { auth } = useSelector((state) => state.auth);
   const navigation = useNavigate();

   useLayoutEffect(() => {
      if (!!auth && auth.success && auth.userObject.isAdmin === 'user') {
         navigation('/dashboard-auth/sign-in');
      }
   }, [auth]);

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
