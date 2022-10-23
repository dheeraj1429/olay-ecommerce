import React, { useEffect } from 'react';
import * as dashboard from './DashboardPanle.style';
import DashboardPanelSidebarComponent from '../../DashboardComponents/DashboardPanelSidebarComponent/DashboardPanelSidebarComponent';
import { Outlet, useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

function DashboardPanel() {
   const [cookie] = useCookies('user');
   const navigation = useNavigate();

   useEffect(() => {
      if (!!cookie && cookie.user && cookie.user.isAdmin === 'user') {
         navigation('/dashboard-auth/sign-in');
      } else if (!!cookie && cookie.user && cookie.user.isAdmin === 'admin') {
         return;
      } else {
         navigation('/');
      }
   }, []);

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
