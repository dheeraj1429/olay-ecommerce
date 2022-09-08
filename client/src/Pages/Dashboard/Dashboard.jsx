import React, { useLayoutEffect } from "react";
import * as dashboard from "./Dashboard.style";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
   const auth = useSelector((state) => state.auth.auth);
   const navigation = useNavigate();

   console.log(auth);

   useLayoutEffect(() => {
      if (!!auth && auth.success && auth.userObject.isAdmin === "admin") {
         navigation("/dashboard");
      } else if (!!auth && auth.success && auth.userObject.isAdmin === "user") {
         navigation("/");
      }
   }, [auth]);

   return (
      <dashboard.div>
         <dashboard.flex>
            <dashboard.renderDiv>
               <Outlet />
            </dashboard.renderDiv>
            <dashboard.imageDiv />
         </dashboard.flex>
      </dashboard.div>
   );
}

export default Dashboard;
