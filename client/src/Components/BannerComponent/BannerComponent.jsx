import React from 'react';
import * as styled from './BannerComponent.style';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';

function BannerComponent({ heading, subHeading }) {
   return (
      <styled.div>
         <div className="side_padding_one">
            {heading}
            {subHeading}
            <CustombuttonComponent innerText={'DISCOVER NOW'} btnCl={'Discover_btn'} />
         </div>
      </styled.div>
   );
}

export default BannerComponent;
