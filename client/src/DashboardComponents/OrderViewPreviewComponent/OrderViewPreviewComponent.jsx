import React, { useEffect } from 'react';
import * as styled from './OrderViewPreviewComponent.style';
import ReactDOM from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getUserOrderAllInfo } from '../../Redux/Actions/adminAction';
import { showOrderPrev } from '../../Redux/Actions/adminAppAction';
import backendConfigData from '../../backendConfig';
import dayjs from 'dayjs';

const StateAr = [{ name: 'Subtotal' }, { name: 'Shipping' }, { name: 'Total' }];

function OrderViewPreviewComponent() {
   const dispatch = useDispatch();

   const { orderFullInfo, orderFullInfoLoading, showOrderPreviewComponent } = useSelector((state) => state.admin);

   const HidePrevHandler = function () {
      dispatch(showOrderPrev({ show: false, id: null }));
   };

   useEffect(() => {
      if (!!showOrderPreviewComponent.show && !!showOrderPreviewComponent.id) {
         dispatch(getUserOrderAllInfo(showOrderPreviewComponent.id));
      }
   }, [showOrderPreviewComponent.show]);

   return ReactDOM.createPortal(
      <styled.div show={showOrderPreviewComponent.show}>
         <styled.mainDiv show={showOrderPreviewComponent.show} className="scroll_div">
            <div className="closeBtn_div top_left" onClick={HidePrevHandler}>
               <VscClose />
            </div>
            {!!orderFullInfoLoading ? (
               <div className="loading_spneer_div">
                  <SpnnerComponent blackSpenner={true} />
               </div>
            ) : !!orderFullInfo && orderFullInfo.success && orderFullInfo?.order && !orderFullInfoLoading ? (
               <div>
                  <div className="container-fluid p-0 ">
                     <div className="row">
                        <div className="col-12 col-sm-12 col-md-8">
                           <div className="product_listing mt-1">
                              <div className="col-12">
                                 <h1>Order Information</h1>
                                 <p className={`${orderFullInfo.order[0]._id.orderStatus} mb-2 bag`}>{orderFullInfo.order[0]._id.orderStatus}</p>
                                 <p className="mb-1">
                                    <strong className="me-2">Order Date </strong>
                                    {dayjs(orderFullInfo.order[0]._id.orderCreateAt).format('DD/MM/YY d:h:s-A')}
                                 </p>
                                 <p className="mb-1">
                                    <strong className="me-2">Payment method</strong>
                                    {orderFullInfo.order[0]._id.paymentMethod}
                                 </p>
                                 <p className="mb-1">
                                    <strong className="me-2">Payment status</strong>
                                    {orderFullInfo.order[0]._id.paymentStatus}
                                 </p>
                                 <p className="mb-1">
                                    <strong className="me-2">Order Status</strong>
                                    {orderFullInfo.order[0]._id.orderStatus}
                                 </p>
                                 <h5 className="mt-4">Products</h5>
                                 {orderFullInfo?.order[0].orderItems && orderFullInfo?.order[0].orderItems.length
                                    ? orderFullInfo.order[0].orderItems.map((el) => (
                                         <div className="product_sm_div d-flex align-items-center mt-4">
                                            <div className="row d-flex w-100">
                                               <div className="col-12 col-sm-12 col-md-2">
                                                  <div className="product_image_div">
                                                     <img crossorigin="anonymous" src={`${backendConfigData.URL}productImagesCompress/${el.productInformation.productImage}`} />
                                                  </div>
                                               </div>
                                               <div className="col-12 col-sm-12 col-md-8">
                                                  <div className="row order_content_div">
                                                     <div className="col-12 col-sm-12 col-md-10">
                                                        <p>{el.productInformation.name}</p>
                                                     </div>
                                                     <div className="col-12 col-sm-12 col-md-4">
                                                        <span>
                                                           {orderFullInfo.order[0]._id.currencySymbol}
                                                           {el.productInformation?.salePrice && !!el.productInformation.salePrice
                                                              ? el.productInformation.salePrice
                                                              : el.productInformation.price} * {el.qty}
                                                        </span>
                                                     </div>
                                                  </div>
                                               </div>
                                               <div className="col-12 col-sm-12 col-md-2 order_content_div">
                                                  <h5 className="mb-1">
                                                     {orderFullInfo.order[0]._id.currencySymbol}{' '}
                                                     {el.productInformation?.salePrice && !!el.productInformation.salePrice
                                                        ? el.productInformation.salePrice * el.qty
                                                        : el.productInformation.price * el.qty}{' '}
                                                  </h5>
                                                  <span>Subtotal</span>
                                               </div>
                                            </div>
                                         </div>
                                      ))
                                    : null}
                              </div>
                           </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-4">
                           <div className="user_order_delivery_information">
                              <div className="d-flex align-items-center">
                                 <div className="profile_Div">
                                    <img crossorigin="anonymous" src={`${backendConfigData.URL}userProfiles/${orderFullInfo.order[0]._id.userInformation.userProfileImage}`} />
                                 </div>
                                 <div className="user_info">
                                    <h5>{orderFullInfo.order[0]._id.userInformation.name}</h5>
                                    <h4>{orderFullInfo.order[0]._id.userInformation.email}</h4>
                                 </div>
                              </div>

                              <h5 className="mt-4">Shipping Information</h5>

                              {Object.keys(orderFullInfo.order[0]._id.deliveryAddress).map((el) => (
                                 <div className="col-12 mt-1">
                                    <div className="row">
                                       <div className="col-12 col-sm-12 col-md-3">
                                          <span>
                                             <strong>{el}</strong>
                                          </span>
                                       </div>
                                       <div className="col-12 col-sm-12 col-md-9">
                                          <span>{orderFullInfo.order[0]._id.deliveryAddress[el]}</span>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                              <hr />
                              {StateAr.map((el) => (
                                 <div className="col-12 mt-1">
                                    <div className="row">
                                       <div className="col-12 col-sm-12 col-md-3">
                                          <span>
                                             <strong>{el.name}</strong>
                                          </span>
                                       </div>
                                       <div className="col-12 col-sm-12 col-md-9">
                                          <span>
                                             {orderFullInfo.order[0]._id.currencySymbol}{' '}
                                             {el.name === 'Shipping'
                                                ? '00.00'
                                                : orderFullInfo.order[0].orderItems
                                                     .map((el) => (el?.salePrice && !!el.salePrice ? el.salePrice * el.qty : el.price * el.qty))
                                                     .reduce((acc, crv) => acc + crv, 0)}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="text-center">
                  <p>Something worng</p>
               </div>
            )}
         </styled.mainDiv>
      </styled.div>,
      document.getElementById('orderViewPrev')
   );
}

export default OrderViewPreviewComponent;
