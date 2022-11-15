import React from 'react';
import * as styled from './CategorieTagShowComponent.style';
import { Link } from 'react-router-dom';

function CategorieTagShowComponent({ heading, name }) {
   return (
      <styled.div>
         <div className="side_padding_one d-flex align-item-center">
            <Link to={`/${heading === 'home' ? '' : heading}`}>
               <p>{heading}</p>
            </Link>
            <span className="ms-2"> / {name}</span>
         </div>
      </styled.div>
   );
}

export default CategorieTagShowComponent;
