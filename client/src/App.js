import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { setLoginUser } from "./Redux/Actions/appAction";
import { useDispatch } from "react-redux";

// components
import DashboardSingInComponent from "./DashboardComponents/DashboardSingInComponent/DashboardSingInComponent";

// pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardPanel from "./Pages/DashboardPanel/DashboardPanel";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
   const [cookie] = useCookies(["user"]);
   const dispatch = useDispatch();

   useEffect(() => {
      if (cookie && cookie.user) {
         dispatch(setLoginUser(cookie.user));
      }
   }, [cookie.user]);

   return (
      <div className="App">
         <Routes>
            <Route path="/admin" element={<Dashboard />}>
               <Route path="sign-in" element={<DashboardSingInComponent />} />
            </Route>
            <Route path="dashboard" element={<DashboardPanel />} />
            <Route path="*" element={<PageNotFound />} />
         </Routes>
      </div>
   );
}

export default App;
