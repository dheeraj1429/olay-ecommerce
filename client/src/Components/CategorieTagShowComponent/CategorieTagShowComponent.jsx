import React from 'react';
import * as styled from './CategorieTagShowComponent.style';

function CategorieTagShowComponent({ heading, name }) {
   return (
      <styled.div>
         <div className="side_padding_one d-flex align-item-center">
            <p>{heading}</p> <span className="ms-2"> / {name}</span>
         </div>
      </styled.div>
   );
}

export default CategorieTagShowComponent;