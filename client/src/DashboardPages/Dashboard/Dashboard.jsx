import React from 'react';
import * as dashboard from './Dashboard.style';
import { Outlet } from 'react-router';

function Dashboard() {
   return (
      <dashboard.div>
         <div className="container-fluid p-0 renderDiv">
            <div className="row ">
               <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex justify-content-center">
                  <Outlet />
               </div>
               <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                  <dashboard.imageDiv />
               </div>
            </div>
         </div>
      </dashboard.div>
   );
}

export default Dashboard;
