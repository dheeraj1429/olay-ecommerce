import React, { useState } from 'react';
import * as card from './DashboardSidebarCardComponent.style';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';

function DashboardSidebarCardComponent({ children, heading, icon }) {
   const [DashboardCard, setDashboardCard] = useState('');

   const dashboardActiveHandler = function (e) {
      setDashboardCard(e.currentTarget.id);
   };

   return (
      <card.div ShowDrop={DashboardCard == heading ? true : false}>
         <card.flex
            onClick={(e) => {
               dashboardActiveHandler(e);
            }}
            id={heading}
         >
            <div className="icons_text_div">
               <card.iconDiv>{icon}</card.iconDiv>
               <p>{heading}</p>
            </div>
            <IoIosArrowForward />
         </card.flex>
         <card.dropDownItems className={DashboardCard === heading ? 'showDropDown-menu' : 'drop-down-items'}>{children}</card.dropDownItems>
      </card.div>
   );
}

export default React.memo(DashboardSidebarCardComponent);
