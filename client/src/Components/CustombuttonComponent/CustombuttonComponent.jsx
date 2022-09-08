import React from "react";
import * as btn from "./CustombuttonComponent.style";

function CustombuttonComponent({ children, innerText, btnCl, onClick }) {
   return (
      <btn.div>
         <btn.button onClick={onClick ? onClick : null} className={btnCl ? btnCl : null}>
            {children ? children : innerText}
         </btn.button>
      </btn.div>
   );
}

export default CustombuttonComponent;
