import React, { useState } from "react";
import * as card from "./DashboardSidebarCardComponent.style";
import { GrFormDown } from "@react-icons/all-files/gr/GrFormDown";

function DashboardSidebarCardComponent({ children, heading, icon, onClick, show }) {
   return (
      <card.div ShowDrop={show == heading ? true : false}>
         <card.flex onClick={onClick} id={heading}>
            <div className="icons_text_div">
               <card.iconDiv>{icon}</card.iconDiv>
               <p>{heading}</p>
            </div>
            <GrFormDown />
         </card.flex>
         <card.dropDownItems className={show === heading ? "showDropDown-menu" : null}>
            {children}
         </card.dropDownItems>
      </card.div>
   );
}

export default DashboardSidebarCardComponent;
