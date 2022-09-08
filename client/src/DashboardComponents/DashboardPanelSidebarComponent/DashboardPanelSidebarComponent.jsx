import React, { useState, useLayoutEffect, useCallback, useEffect } from "react";
import * as sidebar from "./DashboardPanelSidebarComponent.style";
import DashboardNavigationComponent from "../DashboardNavigationComponent/DashboardNavigationComponent";
import { RiHome5Line } from "@react-icons/all-files/ri/RiHome5Line";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { BsBag } from "@react-icons/all-files/bs/BsBag";
import { GrFormUpload } from "@react-icons/all-files/gr/GrFormUpload";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { HiOutlineShoppingCart } from "@react-icons/all-files/hi/HiOutlineShoppingCart";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { HiOutlineDocumentDuplicate } from "@react-icons/all-files/hi/HiOutlineDocumentDuplicate";
import { useLocation } from "react-router";

function DashboardPanelSidebarComponent() {
   const [SmSidebar, setSmSidebar] = useState(false);
   const [Active, setActive] = useState("Home");
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
         <AiOutlineBars onClick={SmSidebarHandler} />
         <DashboardNavigationComponent
            icon={<RiHome5Line />}
            innerText={"Home"}
            activeBar={true}
            isShow={SmSidebar}
            onClick={ActiveHandler}
            Active={Active}
         />
         <DashboardNavigationComponent
            icon={<GrFormUpload />}
            innerText={"Upload products"}
            isShow={SmSidebar}
            onClick={ActiveHandler}
            Active={Active}
         />
         <DashboardNavigationComponent
            icon={<HiOutlineDocumentDuplicate />}
            innerText={"Product category"}
            isShow={SmSidebar}
            onClick={ActiveHandler}
            Active={Active}
         />
         <DashboardNavigationComponent
            icon={<BiUser />}
            innerText={"Users"}
            isShow={SmSidebar}
            onClick={ActiveHandler}
            Active={Active}
         />
         <DashboardNavigationComponent
            icon={<BsBag />}
            innerText={"Products"}
            isShow={SmSidebar}
            onClick={ActiveHandler}
            Active={Active}
         />

         <DashboardNavigationComponent
            icon={<HiOutlineShoppingCart />}
            innerText={"Orders"}
            isShow={SmSidebar}
            onClick={ActiveHandler}
            Active={Active}
         />
      </sidebar.div>
   );
}

export default DashboardPanelSidebarComponent;
