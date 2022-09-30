import React, { useState, useLayoutEffect, useCallback, useEffect } from "react";
import * as sidebar from "./DashboardPanelSidebarComponent.style";
import DashboardNavigationComponent from "../DashboardNavigationComponent/DashboardNavigationComponent";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router";
import DashboardSidebarCardComponent from "../DashboardSidebarCardComponent/DashboardSidebarCardComponent";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { FcHome } from "@react-icons/all-files/fc/FcHome";
import { BsPhone } from "@react-icons/all-files/bs/BsPhone";
import { GoGitBranch } from "@react-icons/all-files/go/GoGitBranch";
import { AiOutlineLaptop } from "@react-icons/all-files/ai/AiOutlineLaptop";
import { GoVersions } from "@react-icons/all-files/go/GoVersions";
import { GoRepoClone } from "@react-icons/all-files/go/GoRepoClone";
import { VscTextSize } from "@react-icons/all-files/vsc/VscTextSize";
import { GoZap } from "@react-icons/all-files/go/GoZap";

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
   }, [location.pathname]);

   return (
      <sidebar.div SmSidebar={SmSidebar ? SmSidebar : null}>
         {/* <AiOutlineBars onClick={SmSidebarHandler} className="Margin_elm" /> */}
         <h1>Dashboard</h1>
         <div className="sidebar_fix_container">
            <DashboardSidebarCardComponent
               heading={"Home"}
               icon={<VscHome />}
               onClick={dashboardActiveHandler}
               show={DashboardCard}
               showSub={ShowSubItems}
               isShow={SmSidebar}
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
               isShow={SmSidebar}
            >
               <DashboardNavigationComponent
                  icon={<BsPhone />}
                  innerText={"All products"}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />
               <DashboardNavigationComponent
                  icon={<GoGitBranch />}
                  innerText={"Product category"}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />

               <DashboardNavigationComponent
                  icon={<AiOutlineLaptop />}
                  innerText={"Product brands"}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />

               <DashboardNavigationComponent
                  icon={<GoZap />}
                  innerText={"Flash sale"}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />

               <DashboardNavigationComponent
                  icon={<GoVersions />}
                  innerText={"Variation swatches"}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />
               <DashboardNavigationComponent
                  icon={<VscTextSize />}
                  innerText={"Product size variation"}
                  isShow={SmSidebar}
                  onClick={ActiveHandler}
                  Active={Active}
                  HideHandler={HideSubControllerFunction}
               />
               <DashboardNavigationComponent
                  icon={<GoRepoClone />}
                  innerText={"Product variation"}
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
