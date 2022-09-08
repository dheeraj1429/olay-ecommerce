import React from "react";
import * as Nav from "./DashboardNavigationComponent.style";

function DashboardNavigationComponent({ icon, innerText, activeBar, isShow, onClick, Active }) {
   return (
      <Nav.div
         activeBar={Active === innerText ? true : null}
         onClick={onClick ? onClick : null}
         id={innerText}
      >
         <Nav.flex className={activeBar ? "active-bar" : null}>
            <Nav.iconDiv isShow={isShow ? isShow : null}>{icon}</Nav.iconDiv>
            {!isShow ? (
               <Nav.contentDiv>
                  <h5>{innerText}</h5>
               </Nav.contentDiv>
            ) : null}
         </Nav.flex>
      </Nav.div>
   );
}

export default React.memo(DashboardNavigationComponent);
