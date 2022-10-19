import React from 'react';
import * as nav from './DashboardNavbarComponent.style';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { RiBarChartLine } from '@react-icons/all-files/ri/RiBarChartLine';
import DashboardUserProfileComponent from '../DashboardUserProfileComponent/DashboardUserProfileComponent';

function DashboardNavbarComponent() {
   return (
      <nav.div>
         <nav.spaceFlex>
            <div>
               <nav.flex>
                  <RiBarChartLine />
                  <nav.searchDiv>
                     <div className="inc_div">
                        <BsSearch />
                     </div>
                     <input type="search" placeholder="Search." />
                  </nav.searchDiv>
               </nav.flex>
            </div>
            <div>
               <DashboardUserProfileComponent />
            </div>
         </nav.spaceFlex>
      </nav.div>
   );
}

export default React.memo(DashboardNavbarComponent);
