import React from "react";
import * as Nav from "./DashboardNavigationComponent.style";
import { Link } from "react-router-dom";

function DashboardNavigationComponent({ icon, innerText, activeBar, isShow, onClick, Active, HideHandler }) {
   return (
      <Nav.main>
         <Link to={innerText === "Home" ? `/dashboard` : innerText.toLowerCase().split(" ").join("-")}>
            <Nav.div
               activeBar={Active === innerText ? true : null}
               className={Active === innerText ? "bar-active" : null}
               onClick={(e) => {
                  onClick(e);
                  HideHandler(e);
               }}
               id={innerText}
            >
               <Nav.flex className={activeBar ? "active-bar" : null}>
                  <Nav.iconDiv isShow={isShow ? isShow : null} activeBar={Active === innerText ? true : null}>
                     {icon}
                  </Nav.iconDiv>
                  <Nav.contentDiv>
                     <h5 className={Active !== innerText ? "non-active-heading" : null}>{innerText}</h5>
                  </Nav.contentDiv>
               </Nav.flex>
            </Nav.div>
         </Link>
      </Nav.main>
   );
}

export default React.memo(DashboardNavigationComponent);
