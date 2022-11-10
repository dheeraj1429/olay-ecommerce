import React from 'react';
import * as sidebar from './DashboardPanelSidebarComponent.style';
import DashboardNavigationComponent from '../DashboardNavigationComponent/DashboardNavigationComponent';
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
import { VscSymbolRuler } from '@react-icons/all-files/vsc/VscSymbolRuler';
import { VscCircuitBoard } from '@react-icons/all-files/vsc/VscCircuitBoard';
import { GiShoppingCart } from '@react-icons/all-files/gi/GiShoppingCart';

function DashboardPanelSidebarComponent() {
   return (
      <sidebar.div>
         <h1>Dashboard</h1>
         <div className="sidebar_fix_container">
            <DashboardSidebarCardComponent heading={'Home'} icon={<VscHome />}>
               <DashboardNavigationComponent icon={<SiWebmoney />} innerText={'Website'} activeBar={true} />
               <DashboardNavigationComponent icon={<AiOutlineHome />} innerText={'Dashboard'} activeBar={true} />
            </DashboardSidebarCardComponent>

            <DashboardSidebarCardComponent heading={'Ecommerce'} icon={<AiOutlineShoppingCart />}>
               <DashboardNavigationComponent icon={<BsPhone />} innerText={'All products'} />
               <DashboardNavigationComponent icon={<GoGitBranch />} innerText={'Product category'} />
               <DashboardNavigationComponent icon={<AiOutlineLaptop />} innerText={'Product brands'} />
               <DashboardNavigationComponent icon={<GoZap />} innerText={'Flash sale'} />
               <DashboardNavigationComponent icon={<GiShoppingCart />} innerText={'Orders'} />
               <DashboardNavigationComponent icon={<GoVersions />} innerText={'Variation swatches'} />
               <DashboardNavigationComponent icon={<VscTextSize />} innerText={'Product size variation'} />
               <DashboardNavigationComponent icon={<GoRepoClone />} innerText={'Product variation'} />
               <DashboardNavigationComponent icon={<MdLabelOutline />} innerText={'Product label'} />
               <DashboardNavigationComponent icon={<AiOutlineInfo />} innerText={'Information'} />
               <DashboardNavigationComponent icon={<VscLocation />} innerText={'Store locators'} />
            </DashboardSidebarCardComponent>

            <DashboardSidebarCardComponent heading={'Tools'} icon={<GoTools />}>
               <DashboardNavigationComponent icon={<FaFileImport />} innerText={'Import product'} />
               <DashboardNavigationComponent icon={<AiOutlineExport />} innerText={'Export product'} />
               <DashboardNavigationComponent icon={<VscHistory />} innerText={'Export history'} />
            </DashboardSidebarCardComponent>

            <DashboardSidebarCardComponent heading={'Blog'} icon={<SiBloglovin />}>
               <DashboardNavigationComponent icon={<VscSymbolRuler />} innerText={'Post'} />
               <DashboardNavigationComponent icon={<VscCircuitBoard />} innerText={'Blog categories'} />
            </DashboardSidebarCardComponent>
         </div>
      </sidebar.div>
   );
}

export default React.memo(DashboardPanelSidebarComponent);
