import { FcAlphabeticalSortingAz } from '@react-icons/all-files/fc/FcAlphabeticalSortingAz';
import { FcAlphabeticalSortingZa } from '@react-icons/all-files/fc/FcAlphabeticalSortingZa';
import { FcIcons8Cup } from '@react-icons/all-files/fc/FcIcons8Cup';
import React, { useEffect } from 'react';
import DashboardNavbarComponent from '../DashboardNavbarComponent/DashboardNavbarComponent';
import ProductSectionFeatureComponent from '../ProductSectionFeatureComponent/ProductSectionFeatureComponent';
import * as size from './ProductSizeVariationTableComponent.style';
import { getAllProductSizeVariations, removeAllProductSizeVaration } from '../../Redux/Actions/adminAction';
import AllSwatchTableComponent from '../AllSwatchTableComponent/AllSwatchTableComponent';
import { useDispatch, useSelector } from 'react-redux';

const link = '/dashboard/product-size-variation/create';

const items = [
   { value: '', Option: 'None' },
   { value: 'Sort A - Z', Option: 'Sort A - Z', icon: <FcAlphabeticalSortingAz /> },
   { value: 'Sort Z - A', Option: 'Sort Z - A', icon: <FcAlphabeticalSortingZa /> },
   { value: 'Delete all', Option: 'Delete all', icon: <FcIcons8Cup /> },
];

const row = [
   { elm: 'Edit', value: 'Edit' },
   { elm: 'Delete', value: 'Delete' },
   { elm: 'Date', value: 'Date' },
   { elm: 'Name', value: 'Name' },
   { elm: 'Slug', value: 'Slug' },
   { elm: 'Description', value: 'Description' },
];

function ProductSizeVariationTableComponent() {
   const dispatch = useDispatch();
   const allSizeVariations = useSelector((state) => state.admin.allSizeVariations);

   useEffect(() => {
      dispatch(getAllProductSizeVariations());
   }, []);

   return (
      <size.div>
         <DashboardNavbarComponent />

         <size.spaceDiv>
            <ProductSectionFeatureComponent
               state={allSizeVariations}
               pageLink={link}
               field={'sizeVariations'}
               items={items}
               action={removeAllProductSizeVaration}
            />

            <AllSwatchTableComponent
               dataTarget={'product size variation'}
               color={false}
               variation={allSizeVariations}
               row={row}
               field={'sizeVariations'}
            />
         </size.spaceDiv>
      </size.div>
   );
}

export default ProductSizeVariationTableComponent;
