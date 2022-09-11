import React, { useState, useLayoutEffect, useCallback, useEffect } from "react";
import * as sidebar from "./DashboardPanelSidebarComponent.style";
import DashboardNavigationComponent from "../DashboardNavigationComponent/DashboardNavigationComponent";
import { RiHome5Line } from "@react-icons/all-files/ri/RiHome5Line";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router";
import DashboardSidebarCardComponent from "../DashboardSidebarCardComponent/DashboardSidebarCardComponent";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { FcGenealogy } from "@react-icons/all-files/fc/FcGenealogy";
import { FcUpload } from "@react-icons/all-files/fc/FcUpload";
import { FcHome } from "@react-icons/all-files/fc/FcHome";

function DashboardPanelSidebarComponent() {
   const [SmSidebar, setSmSidebar] = useState(false);
   const [Active, setActive] = useState("Home");
   const [DashboardCard, setDashboardCard] = useState("");
   const [ShowSubItems, setShowSubItems] = useState(false);
   const navigation = useNavigate();
   const [cookie] = useCookies(["user"]);
   const location = useLocation();

   const SmSidebarHandler = useCallback(
      function () {
         setSmSidebar(!SmSidebar);
      },
      [SmSidebar]
   );

   const ActiveHandler = function (e) {
      const target = e.currentTarget.id;
      setActive(target);
   };

   const HideSubControllerFunction = function (e) {
      setShowSubItems(false);
   };

   const dashboardActiveHandler = function (e) {
      setDashboardCard(e.currentTarget.id);
      setShowSubItems(true);
   };

   useLayoutEffect(() => {
      if (!!cookie && cookie.user) {
         return;
      } else {
         navigation("/admin/sign-in");
      }
   }, [cookie]);

   useEffect(() => {
      const splitPath = location.pathname.split("/");
      const [first, ...second] = splitPath[splitPath.length - 1].split("-");
      const firstCaps = first.slice(0, 1).toUpperCase() + first.slice(1).toLowerCase();
      const result = [firstCaps, ...second].join(" ");
      if (result === "Dashboard") {
         setActive("Home");
      } else {
         setActive(result);
      }
   }, []);

   return (
      <sidebar.div SmSidebar={SmSidebar ? SmSidebar : null}>
         <AiOutlineBars onClick={SmSidebarHandler} className="Margin_elm" />
         <div className="sidebar_fix_container">
            <DashboardSidebarCardComponent
               heading={"Home"}
               icon={<VscHome />}
               onClick={dashboardActiveHandler}
               show={DashboardCard}
               showSub={ShowSubItems}
            >
               <DashboardNavigationComponent
                  icon={<FcHome />}
                  innerText={"Home"}
                  activeBar={true}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />
            </DashboardSidebarCardComponent>

            <DashboardSidebarCardComponent
               heading={"Ecommerce"}
               icon={<AiOutlineShoppingCart />}
               onClick={dashboardActiveHandler}
               show={DashboardCard}
               showSub={ShowSubItems}
            >
               <DashboardNavigationComponent
                  icon={<FcUpload />}
                  innerText={"Upload products"}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />
               <DashboardNavigationComponent
                  icon={<FcGenealogy />}
                  innerText={"Product category"}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />
            </DashboardSidebarCardComponent>
         </div>
      </sidebar.div>
   );
}

export default DashboardPanelSidebarComponent;
