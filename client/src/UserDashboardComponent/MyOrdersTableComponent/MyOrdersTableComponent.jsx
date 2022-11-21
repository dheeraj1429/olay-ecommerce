import React from 'react';
import * as styled from './MyOrdersTableComponent.style';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import backendConfigData from '../../backendConfig';
import { IoMdInformationCircle } from '@react-icons/all-files/io/IoMdInformationCircle';
import { Link } from 'react-router-dom';
const ROW = [{ name: 'Image' }, { name: 'Product Name' }, { name: 'Quntity' }, { name: 'Status' }, { name: 'Price' }, { name: 'Total' }, { name: 'Order date' }, { name: 'Actions' }];

function MyOrdersTableComponent() {
   const { userOrders } = useSelector((state) => state.index);

   console.log(userOrders);

   return (
      <styled.div className="mt-3">
         {!!userOrders && userOrders.success && userOrders.order.length ? (
            <table>
               <tr>
                  {ROW.map((el) => (
                     <th className="px-0 py-1 text-dark font-semibold">{el.name}</th>
                  ))}
               </tr>
               {userOrders.order[0].orderItems.map((el) => (
                  <tr key={el.productInformation._id}>
                     <td className="flex items-center justify-center">
                        <div className="w-12 h-12 p-1 bg-white rounded-lg shadow overflow-hidden">
                           <img crossOrigin="anonymous" className="w-fill h-full" src={`${backendConfigData.URL}/productImages/${el.productInformation.productImage}`} />
                        </div>
                     </td>
                     <td className="productname_section pe-2">
                        <Link to={`/products/${el.productInformation.name.split(' ').join('-')}/${el.productInformation._id}`}>
                           <p className="text-gray-800 mb-0 hover:text-blue-800 cursor-pointer transition-all">{el.productInformation.name}</p>
                        </Link>
                     </td>
                     <td>
                        <p className=" text-gray-800 mb-0">{el.qty}</p>
                     </td>
                     <td>
                        <div className=" mr-3 bg-red-800 p-1 flex items-center justify-center text-white rounded-md shadow">{el.paymentStatus}</div>
                     </td>
                     <td>
                        <p className=" text-gray-800 mb-0">
                           {userOrders.order[0]._id.currencySymbol}
                           {el?.salePrice && !!el.salePrice ? el.salePrice : el.price}
                        </p>
                     </td>
                     <td>
                        <p className=" text-gray-800 mb-0">
                           {userOrders.order[0]._id.currencySymbol}
                           {el?.salePrice && !!el.salePrice ? el.salePrice * el.qty : el.price * el.qty}
                        </p>
                     </td>
                     <td>
                        <p className=" text-gray-800 mb-0">{dayjs(el.orderPlaceDate).format('DD-MM-YYYY, h:m:s A')}</p>
                     </td>
                     <td className="icon_div">
                        <div className="inner_div">
                           <div className="hover_div px-3 py-1 bg-slate-900 flex items-center justify-center rounded-sm">
                              <p className="text-white mb-0">View</p>
                           </div>
                           <Link to={`/my-orders/single-product-info?variationId=${el.productInformation._id}&productId=${el.parentProductId}`}>
                              <IoMdInformationCircle className=" fill-slate-900 cursor-pointer" />
                           </Link>
                        </div>
                     </td>
                  </tr>
               ))}
            </table>
         ) : (
            <div className=" flex items-center justify-center">
               <p className="text-gray-800">No Products</p>
            </div>
         )}
      </styled.div>
   );
}

export default MyOrdersTableComponent;
