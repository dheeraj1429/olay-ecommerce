import React, { useEffect } from 'react';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import ProductSectionFeatureComponent from '../ProductSectionFeatureComponent/ProductSectionFeatureComponent';
import * as table from './ProductSwatchesTableComponent.style';
import {
   getproductSwatches,
   removeAllProductSwatches,
   getAllProductLable,
   deletAllProductLabel,
} from '../../Redux/Actions/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import { FcAlphabeticalSortingAz } from '@react-icons/all-files/fc/FcAlphabeticalSortingAz';
import { FcAlphabeticalSortingZa } from '@react-icons/all-files/fc/FcAlphabeticalSortingZa';
import { FcIcons8Cup } from '@react-icons/all-files/fc/FcIcons8Cup';
import AllSwatchTableComponent from '../AllSwatchTableComponent/AllSwatchTableComponent';

const link = '/dashboard/variation-swatches/create';
const linkTwo = '/dashboard/product-label/create';

const items = [
   { value: '', Option: 'None' },
   { value: 'Sort A - Z', Option: 'Sort A - Z', icon: <FcAlphabeticalSortingAz /> },
   { value: 'Sort Z - A', Option: 'Sort Z - A', icon: <FcAlphabeticalSortingZa /> },
   { value: 'Delete all', Option: 'Delete all', icon: <FcIcons8Cup /> },
];

const row = [
   { elm: 'Edit', value: 'Edit' },
   { elm: 'Delete', value: 'Delete' },
   { elm: 'Color', value: 'Color' },
   { elm: 'Name', value: 'Name' },
   { elm: 'Slug', value: 'Slug' },
   { elm: 'Description', value: 'Description' },
];

function ProductSwatchesTableComponent({ dataTarget }) {
   const dispatch = useDispatch();

   const { allProductSwatches, productSwatchesLoading, allProductLabel } = useSelector((state) => state.admin);

   useEffect(() => {
      if (!dataTarget) {
         dispatch(getproductSwatches());
      } else {
         dispatch(getAllProductLable());
      }
   }, []);

   return (
      <table.div>
         <DashboardNavbarComponent />

         <table.spaceDiv>
            <ProductSectionFeatureComponent
               state={dataTarget ? allProductLabel : allProductSwatches}
               pageLink={dataTarget ? linkTwo : link}
               field={dataTarget ? 'allLabels' : 'allSwatches'}
               items={items}
               action={dataTarget ? deletAllProductLabel : removeAllProductSwatches}
            />
            <AllSwatchTableComponent
               variation={dataTarget ? allProductLabel : allProductSwatches}
               field={dataTarget ? 'allLabels' : 'allSwatches'}
               isLoading={productSwatchesLoading}
               row={row}
               color={true}
               dataTarget={!!dataTarget ? dataTarget : 'product color sawatches'}
            />
         </table.spaceDiv>
      </table.div>
   );
}

export default ProductSwatchesTableComponent;
