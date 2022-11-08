import React from 'react';
import * as table from './AllProductTableComponent.style';
import ProductSectionFeatureComponent from '../ProductSectionFeatureComponent/ProductSectionFeatureComponent';
import { useSelector } from 'react-redux';
import TableFooterComponent from '../TableFooterComponent/TableFooterComponent';
import AllProductsTableComponent from '../AllProductsTableComponent/AllProductsTableComponent';
import { FcAlphabeticalSortingAz } from '@react-icons/all-files/fc/FcAlphabeticalSortingAz';
import { FcAlphabeticalSortingZa } from '@react-icons/all-files/fc/FcAlphabeticalSortingZa';
import { FcOk } from '@react-icons/all-files/fc/FcOk';
import { FcIcons8Cup } from '@react-icons/all-files/fc/FcIcons8Cup';
import { FcHighPriority } from '@react-icons/all-files/fc/FcHighPriority';
import { deleteAllProducts, deleteSelectedproducts, fetchUploadProducts } from '../../Redux/Actions/adminAction';
import { fetchLoadingProducts } from '../../Redux/Actions/adminAppAction';

const items = [
   { value: '', Option: 'None' },
   { value: 'Sort A - Z', Option: 'Sort A - Z', icon: <FcAlphabeticalSortingAz /> },
   { value: 'Sort Z - A', Option: 'Sort Z - A', icon: <FcAlphabeticalSortingZa /> },
   { value: 'Published', Option: 'Published', icon: <FcOk /> },
   { value: 'Out of stock', Option: 'Out of stock', icon: <FcHighPriority /> },
   { value: 'Delete all', Option: 'Delete all', icon: <FcIcons8Cup /> },
];

const link = '/dashboard/upload-products';

function AllProductTableComponent() {
   const allProducts = useSelector((state) => state.admin.allProducts);

   return (
      <table.div>
         <ProductSectionFeatureComponent state={allProducts} pageLink={link} field={'products'} items={items} action={deleteAllProducts} />
         <AllProductsTableComponent />
         <TableFooterComponent state={allProducts} action={'products'} eventLoading={fetchLoadingProducts(true)} eventHandler={fetchUploadProducts} multiDeletHandler={deleteSelectedproducts} />
      </table.div>
   );
}

export default AllProductTableComponent;
