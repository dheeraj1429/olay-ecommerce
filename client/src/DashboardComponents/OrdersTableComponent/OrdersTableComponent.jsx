import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as styled from './OrdersTableComponent.style';
import { ROW } from './OrderTableHeader';
import dayjs from 'dayjs';
import { IoIosInformationCircle } from '@react-icons/all-files/io/IoIosInformationCircle';
import { RiUser4Line } from '@react-icons/all-files/ri/RiUser4Line';
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { AiOutlineDownload } from '@react-icons/all-files/ai/AiOutlineDownload';
import { downloadOrderInvoice, deleteUserOrder } from '../../Redux/Actions/adminAction';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import { invoiceDownlaodLoading, showOrderPrev, showOrderPrevLoading } from '../../Redux/Actions/adminAppAction';
import { Popconfirm } from 'antd';
import OrderViewPreviewComponent from '../OrderViewPreviewComponent/OrderViewPreviewComponent';

function OrdersTableComponent() {
   const dispatch = useDispatch();

   const { allOrders, userOrderInvoiceLoading } = useSelector((state) => state.admin);

   const DeleteOrderHandler = function (id) {
      dispatch(deleteUserOrder(id));
   };

   const downloadInvoiceHandler = function (id) {
      dispatch(invoiceDownlaodLoading({ loading: true, id: id }));
      dispatch(downloadOrderInvoice({ orderId: id }));
   };

   const showPrevHandler = function (data) {
      dispatch(showOrderPrev(data));
      dispatch(showOrderPrevLoading(true));
   };

   return (
      <styled.div className="mt-4">
         <OrderViewPreviewComponent />
         {!!allOrders && allOrders.success && allOrders?.ordersData && allOrders?.ordersData.length ? (
            <div className="scroll_div">
               <table>
                  <tr>
                     {ROW.map((el) => (
                        <td>{el.name}</td>
                     ))}
                  </tr>
                  {allOrders.ordersData.map((el) => (
                     <tr key={el._id}>
                        <td>{el?._id._id}</td>
                        <td className="flex">
                           <RiUser4Line className="me-2" />
                           {el?._id?.userInformation.name}
                        </td>
                        <td>{el?._id?.userInformation.email}</td>
                        <td>
                           {el._id.currencySymbol}
                           {el.orderItems.map((elm) => (elm?.salePrice && !!elm.salePrice ? elm.salePrice * elm.qty : elm.price * elm.qty)).reduce((acc, crv) => acc + crv, 0)}
                        </td>
                        <td>00.00</td>
                        <td>00.00</td>
                        <td>{el._id.paymentMethod}</td>
                        <td>
                           <div className={el._id.orderStatus.toLowerCase()}>{el?._id.orderStatus}</div>
                        </td>
                        <td>
                           <div className={el._id.paymentStatus.toLowerCase()}>{el?._id.paymentStatus}</div>
                        </td>
                        <td>{dayjs(el._id.orderCreateAt).format('DD-MM-YYYY, h-m-s A')}</td>
                        <td className="d-flex align-items-center">
                           <div className="me-3 hover_div_parent">
                              <div className="hover_div">
                                 <p>View</p>
                              </div>
                              <IoIosInformationCircle onClick={() => showPrevHandler({ show: true, id: el._id._id })} />
                           </div>
                           <div className="me-3 hover_div_parent">
                              <div className="hover_div">
                                 <p>Edit</p>
                              </div>
                              <AiFillEdit />
                           </div>
                           <div className="me-3 hover_div_parent">
                              <div className="hover_div">
                                 <p>Delete</p>
                              </div>
                              <Popconfirm title="Are your sure you want to delete the user order ?" onConfirm={() => DeleteOrderHandler(el._id._id)} okText="Yes" cancelText="No">
                                 <VscClose />
                              </Popconfirm>
                           </div>
                           <div className="me-3 hover_div_parent">
                              <div className="hover_div">
                                 <p>Invoice</p>
                              </div>
                              {!!userOrderInvoiceLoading.id && userOrderInvoiceLoading.loading && userOrderInvoiceLoading.id === el._id._id ? (
                                 <SpnnerComponent />
                              ) : (
                                 <AiOutlineDownload onClick={() => downloadInvoiceHandler(el._id._id)} />
                              )}
                           </div>
                        </td>
                     </tr>
                  ))}
               </table>
            </div>
         ) : (
            <div className="center-div">
               <p>No Orders</p>
            </div>
         )}
      </styled.div>
   );
}

export default OrdersTableComponent;