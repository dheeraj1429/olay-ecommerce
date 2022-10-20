import React from 'react';
import * as btn from './CustombuttonComponent.style';
import HocSpnnerComponent from '../HocSpnnerComponent/HocSpnnerComponent';

function CustombuttonComponent({ children, innerText, btnCl, onClick }) {
   return (
      <btn.div>
         <btn.button onClick={onClick ? onClick : null} className={btnCl ? btnCl : null}>
            {children ? children : innerText}
         </btn.button>
      </btn.div>
   );
}

export default HocSpnnerComponent(React.memo(CustombuttonComponent));
