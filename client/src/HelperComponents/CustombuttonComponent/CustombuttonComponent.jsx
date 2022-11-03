import React from 'react';
import * as btn from './CustombuttonComponent.style';
import HocSpnnerComponent from '../HocSpnnerComponent/HocSpnnerComponent';

function CustombuttonComponent({ children, innerText, btnCl, onClick, type }) {
   return (
      <btn.div>
         <btn.button type={type ? type : 'button'} onClick={onClick ? onClick : null} className={btnCl ? btnCl : null}>
            {children ? children : innerText}
         </btn.button>
      </btn.div>
   );
}

export default HocSpnnerComponent(React.memo(CustombuttonComponent));
