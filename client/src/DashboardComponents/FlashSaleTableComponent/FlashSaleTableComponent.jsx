import React, { useEffect } from 'react';
import HeadingComponent from '../../HelperComponents/HeadingComponent/HeadingComponent';
import * as tableView from './FlashSaleTableComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFlashSales, deleteAllFlashSales } from '../../Redux/Actions/adminAction';
import TableFooterComponent from '../TableFooterComponent/TableFooterComponent';
import ProductSectionFeatureComponent from '../ProductSectionFeatureComponent/ProductSectionFeatureComponent';
import { FcAlphabeticalSortingAz } from '@react-icons/all-files/fc/FcAlphabeticalSortingAz';
import { FcAlphabeticalSortingZa } from '@react-icons/all-files/fc/FcAlphabeticalSortingZa';
import { FcOk } from '@react-icons/all-files/fc/FcOk';
import { FcIcons8Cup } from '@react-icons/all-files/fc/FcIcons8Cup';
import FlashSaleInnerTableComponent from '../FlashSaleInnerTableComponent/FlashSaleInnerTableComponent';
import { getAllFlashSalesLoading } from '../../Redux/Actions/adminAppAction';

const link = '/dashboard/flash-sale/create';

const items = [
   { value: '', Option: 'None' },
   { value: 'Sort A - Z', Option: 'Sort A - Z', icon: <FcAlphabeticalSortingAz /> },
   { value: 'Sort Z - A', Option: 'Sort Z - A', icon: <FcAlphabeticalSortingZa /> },
   { value: 'Published', Option: 'Published', icon: <FcOk /> },
   { value: 'Delete all', Option: 'Delete all', icon: <FcIcons8Cup /> },
];

function FlashSaleTableComponent() {
   const dispatch = useDispatch();

   const allSales = useSelector((state) => state.admin.allSales);
   const allSaleLoading = useSelector((state) => state.admin.allSaleLoading);

   useEffect(() => {
      dispatch(getAllFlashSales(0));
   }, []);

   return (
      <tableView.div>
         <HeadingComponent
            Heading={'Flash Sales'}
            subHeading={`Save Huge With Latest Flash Sales | \n
             Today's Best Deals & Offers On Mobiles, Fashion, \n
             Electronics, Hotels, Flights & Bus Ticket Bookings.`}
         />
         <ProductSectionFeatureComponent state={allSales} pageLink={link} field={'sales'} items={items} action={deleteAllFlashSales} />

         {!!allSales && allSales.success && allSales.sales.length ? (
            <>
               <FlashSaleInnerTableComponent isLoading={allSaleLoading} />
               <TableFooterComponent state={allSales} action={'sales'} eventHandler={getAllFlashSales} eventLoading={getAllFlashSalesLoading(true)} />
            </>
         ) : (
            <div className="center_heading">
               <p>No Sales</p>
            </div>
         )}
      </tableView.div>
   );
}

export default FlashSaleTableComponent;
