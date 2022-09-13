import React from "react";
import * as card from "./DashboardSidebarCardComponent.style";
import { IoIosArrowForward } from "@react-icons/all-files/io/IoIosArrowForward";

function DashboardSidebarCardComponent({
   children,
   heading,
   icon,
   onClick,
   show,
   showSub,
   isShow,
}) {
   return (
      <card.div ShowDrop={show == heading ? true : false}>
         <card.flex
            onClick={(e) => {
               onClick(e);
            }}
            id={heading}
         >
            <div className="icons_text_div">
               <card.iconDiv>{icon}</card.iconDiv>
               {isShow ? null : <p>{heading}</p>}
            </div>
            <IoIosArrowForward />
         </card.flex>
         <card.dropDownItems
            className={
               show === heading && showSub ? "showDropDown-menu" : "drop-down-items"
            }
         >
            {children}
         </card.dropDownItems>
      </card.div>
   );
}

export default DashboardSidebarCardComponent;
