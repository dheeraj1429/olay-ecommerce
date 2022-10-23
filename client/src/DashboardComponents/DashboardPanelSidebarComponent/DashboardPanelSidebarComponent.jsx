import React, { useState, useEffect } from 'react';
import * as sidebar from './DashboardPanelSidebarComponent.style';
import DashboardNavigationComponent from '../DashboardNavigationComponent/DashboardNavigationComponent';
import { useLocation } from 'react-router';
import DashboardSidebarCardComponent from '../DashboardSidebarCardComponent/DashboardSidebarCardComponent';
import { AiOutlineShoppingCart } from '@react-icons/all-files/ai/AiOutlineShoppingCart';
import { VscHome } from '@react-icons/all-files/vsc/VscHome';
import { BsPhone } from '@react-icons/all-files/bs/BsPhone';
import { GoGitBranch } from '@react-icons/all-files/go/GoGitBranch';
import { AiOutlineLaptop } from '@react-icons/all-files/ai/AiOutlineLaptop';
import { GoVersions } from '@react-icons/all-files/go/GoVersions';
import { GoRepoClone } from '@react-icons/all-files/go/GoRepoClone';
import { VscTextSize } from '@react-icons/all-files/vsc/VscTextSize';
import { GoZap } from '@react-icons/all-files/go/GoZap';
import { MdLabelOutline } from '@react-icons/all-files/md/MdLabelOutline';
import { GoTools } from '@react-icons/all-files/go/GoTools';
import { FaFileImport } from '@react-icons/all-files/fa/FaFileImport';
import { AiOutlineExport } from '@react-icons/all-files/ai/AiOutlineExport';
import { VscHistory } from '@react-icons/all-files/vsc/VscHistory';
import { AiOutlineHome } from '@react-icons/all-files/ai/AiOutlineHome';
import { AiOutlineInfo } from '@react-icons/all-files/ai/AiOutlineInfo';
import { VscLocation } from '@react-icons/all-files/vsc/VscLocation';
import { SiWebmoney } from '@react-icons/all-files/si/SiWebmoney';
import { SiBloglovin } from '@react-icons/all-files/si/SiBloglovin';
import { VscFile } from '@react-icons/all-files/vsc/VscFile';

function DashboardPanelSidebarComponent() {
   const [Active, setActive] = useState('Dashboard');
   const [DashboardCard, setDashboardCard] = useState('');
   const location = useLocation();

   const ActiveHandler = function (e) {
      const target = e.currentTarget.id;
      setActive(target);
   };

   const dashboardActiveHandler = function (e) {
      setDashboardCard(e.currentTarget.id);
   };

   useEffect(() => {
      const splitPath = location.pathname.split('/');
      const [first, ...second] = splitPath[splitPath.length - 1].split('-');
      const firstCaps = first.slice(0, 1).toUpperCase() + first.slice(1).toLowerCase();
      const result = [firstCaps, ...second].join(' ');
      if (result !== 'Dashboard') {
         setActive(result);
      }
   }, [location.pathname]);

   return (
      <sidebar.div>
         <h1>Dashboard</h1>
         <div className="sidebar_fix_container">
            <DashboardSidebarCardComponent
               heading={'Home'}
               icon={<VscHome />}
               onClick={dashboardActiveHandler}
               show={DashboardCard}
            >
               <DashboardNavigationComponent
                  icon={<SiWebmoney />}
                  innerText={'Website'}
                  activeBar={true}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<AiOutlineHome />}
                  innerText={'Dashboard'}
                  activeBar={true}
                  onClick={ActiveHandler}
                  Active={Active}
               />
            </DashboardSidebarCardComponent>

            <DashboardSidebarCardComponent
               heading={'Ecommerce'}
               icon={<AiOutlineShoppingCart />}
               onClick={dashboardActiveHandler}
               show={DashboardCard}
            >
               <DashboardNavigationComponent
                  icon={<BsPhone />}
                  innerText={'All products'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<GoGitBranch />}
                  innerText={'Product category'}
                  onClick={ActiveHandler}
                  Active={Active}
               />

               <DashboardNavigationComponent
                  icon={<AiOutlineLaptop />}
                  innerText={'Product brands'}
                  onClick={ActiveHandler}
                  Active={Active}
               />

               <DashboardNavigationComponent
                  icon={<GoZap />}
                  innerText={'Flash sale'}
                  onClick={ActiveHandler}
                  Active={Active}
               />

               <DashboardNavigationComponent
                  icon={<GoVersions />}
                  innerText={'Variation swatches'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<VscTextSize />}
                  innerText={'Product size variation'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<GoRepoClone />}
                  innerText={'Product variation'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<MdLabelOutline />}
                  innerText={'Product label'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<AiOutlineInfo />}
                  innerText={'Information'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<VscLocation />}
                  innerText={'Store locators'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
            </DashboardSidebarCardComponent>
            <DashboardSidebarCardComponent
               heading={'Tools'}
               icon={<GoTools />}
               onClick={dashboardActiveHandler}
               show={DashboardCard}
            >
               <DashboardNavigationComponent
                  icon={<FaFileImport />}
                  innerText={'Import product'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<AiOutlineExport />}
                  innerText={'Export product'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
               <DashboardNavigationComponent
                  icon={<VscHistory />}
                  innerText={'Export history'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
            </DashboardSidebarCardComponent>
            <DashboardSidebarCardComponent
               heading={'Blog'}
               icon={<SiBloglovin />}
               onClick={dashboardActiveHandler}
               show={DashboardCard}
            >
               <DashboardNavigationComponent
                  icon={<VscFile />}
                  innerText={'Post'}
                  onClick={ActiveHandler}
                  Active={Active}
               />
            </DashboardSidebarCardComponent>
         </div>
      </sidebar.div>
   );
}

export default DashboardPanelSidebarComponent;
