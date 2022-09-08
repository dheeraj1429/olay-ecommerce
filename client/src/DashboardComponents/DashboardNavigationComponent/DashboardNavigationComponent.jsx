import React from "react";
import * as Nav from "./DashboardNavigationComponent.style";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function DashboardNavigationComponent({ icon, innerText, activeBar, isShow, onClick, Active }) {
   const location = useLocation();
   return (
      <Nav.main>
         <Link
            to={innerText === "Home" ? `/dashboard` : innerText.toLowerCase().split(" ").join("-")}
         >
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
         </Link>
      </Nav.main>
   );
}

export default React.memo(DashboardNavigationComponent);
