import React, { useEffect, useState } from 'react';
import * as Nav from './DashboardNavigationComponent.style';
import { Link } from 'react-router-dom';
import { GetUrlValue } from '../../helpers/helper';
import { useLocation, useNavigate } from 'react-router';

function DashboardNavigationComponent({ icon, innerText, activeBar }) {
   const [Active, setActive] = useState('Dashboard');
   const location = useLocation();
   const navigation = useNavigate();

   const ActiveHandler = function (e, urlPathName) {
      const target = e.currentTarget.id;
      setActive(target);
      navigation(urlPathName === 'Dashboard' ? `/dashboard` : innerText === 'Website' ? '/' : innerText.toLowerCase().split(' ').join('-'));
   };

   useEffect(() => {
      const result = GetUrlValue(location);
      if (result !== 'Dashboard') {
         setActive(result);
      }
   }, [location.pathname]);

   return (
      <Nav.main>
         <Nav.div
            activeBar={Active === innerText ? true : null}
            className={Active === innerText ? 'bar-active' : null}
            onClick={(e) => {
               ActiveHandler(e, innerText);
            }}
            id={innerText}
         >
            <Nav.flex className={activeBar ? 'active-bar' : null}>
               <Nav.iconDiv activeBar={Active === innerText ? true : null}>{icon}</Nav.iconDiv>
               <Nav.contentDiv>
                  <h5 className={Active !== innerText ? 'non-active-heading' : null}>{innerText}</h5>
               </Nav.contentDiv>
            </Nav.flex>
         </Nav.div>

         {/* <Link to={innerText === 'Dashboard' ? `/dashboard` : innerText === 'Website' ? '/' : innerText.toLowerCase().split(' ').join('-')}> */}
         {/* </Link> */}
      </Nav.main>
   );
}

export default React.memo(DashboardNavigationComponent);
