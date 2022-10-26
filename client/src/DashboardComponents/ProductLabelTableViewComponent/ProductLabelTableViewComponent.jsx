import React from 'react';
import * as tableView from './ProductLabelTableViewComponent.style';
import ProductSwatchesTableComponent from '../ProductSwatchesTableComponent/ProductSwatchesTableComponent';

function ProductLabelTableViewComponent() {
   return (
      <tableView.div>
         <ProductSwatchesTableComponent dataTarget={'label'} />
      </tableView.div>
   );
}

export default ProductLabelTableViewComponent;
