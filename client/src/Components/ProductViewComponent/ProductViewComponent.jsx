import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as styled from './ProductViewComponent.style';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { prevSelectedProduct, productPrev } from '../../Redux/Actions/indexAppAction';
import { useDispatch, useSelector } from 'react-redux';
import backendConfigData from '../../backendConfig';
import { AiOutlinePlus } from '@react-icons/all-files/ai/AiOutlinePlus';
import { AiOutlineMinus } from '@react-icons/all-files/ai/AiOutlineMinus';
import { productAddToCart } from '../../Redux/Actions/indexActions';
import { addToCartLoadingHandler } from '../../Redux/Actions/indexAppAction';
import { useNavigate } from 'react-router';

function ProductViewComponent({ show }) {
   const [ProductQty, setProductQty] = useState(1);

   const navigation = useNavigate();
   const dispatch = useDispatch();
   const { selectedPrevProduct, selectedPrevProductLoading, addToCartLoading } = useSelector((state) => state.index);
   const { auth } = useSelector((state) => state.auth);

   const hideHandler = function () {
      dispatch(productPrev(false));
      dispatch(prevSelectedProduct());
      setProductQty(1);
   };

   const QuntityPlusHandler = function () {
      setProductQty((prev) => {
         if (prev < 0) {
            return 1;
         } else {
            return prev + 1;
         }
      });
   };
   const QuntityMinusHandler = function () {
      setProductQty((prev) => {
         if (prev <= 1) {
            return 1;
         } else {
            return prev - 1;
         }
      });
   };

   const CartHandler = function (productId, img) {
      const token = auth?.userObject?.token;
      if (token) {
         const data = {
            productId,
            token,
            qty: ProductQty,
         };
         dispatch(addToCartLoadingHandler(true));
         dispatch(productAddToCart(data, img));
      } else {
         navigation('/auth/signin');
      }
   };

   return ReactDOM.createPortal(
      <styled.div show={show}>
         <styled.mainDiv show={show}>
            <div className="close_btn" onClick={hideHandler}>
               <VscClose />
            </div>
            {selectedPrevProductLoading ? (
               <div className="spen">
                  <SpnnerComponent blackSpenner={true} />
               </div>
            ) : null}
            {!!selectedPrevProduct && selectedPrevProduct.success && selectedPrevProduct?.product ? (
               <styled.flexDiv>
                  <div className="image_prv_div">
                     <div className="product_big_image">
                        <img
                           crossOrigin="anonymous"
                           src={`${backendConfigData.URL}productImages/${selectedPrevProduct?.product?.productImage}`}
                           alt=""
                        />
                     </div>
                  </div>

                  <div className="product_content_div">
                     <h5>{selectedPrevProduct?.product.name}</h5>
                     {selectedPrevProduct?.product?.brand && selectedPrevProduct?.product?.brand?.name ? (
                        <styled.flexDiv className="brandDiv">
                           <div className="brandHeadingSpaceDiv">
                              <p>Brand</p>
                           </div>
                           <p>{selectedPrevProduct?.product?.brand?.name}</p>
                           {!!selectedPrevProduct?.product?.brand?.brandIcon ? (
                              <div className="brandIconDiv">
                                 {selectedPrevProduct?.product?.brand.website ? (
                                    <a href={`${selectedPrevProduct?.product?.brand.website}`}>
                                       <img
                                          src={`${backendConfigData.URL}/brandImagesCompress/${selectedPrevProduct?.product?.brand?.brandIcon}`}
                                          crossorigin="anonymous"
                                       />
                                    </a>
                                 ) : (
                                    <img
                                       src={`${backendConfigData.URL}/brandImagesCompress/${selectedPrevProduct?.product?.brand?.brandIcon}`}
                                       crossorigin="anonymous"
                                    />
                                 )}
                              </div>
                           ) : null}
                        </styled.flexDiv>
                     ) : null}
                     {!!selectedPrevProduct?.product?.category ? (
                        <styled.flexDiv className="brandDiv">
                           <div className="brandHeadingSpaceDiv">
                              <p>Category</p>
                           </div>
                           <p>{selectedPrevProduct?.product?.category.name}</p>
                        </styled.flexDiv>
                     ) : null}
                     <hr />
                     <div className="price_div">
                        {selectedPrevProduct?.product?.salePrice ? (
                           <p>${selectedPrevProduct?.product?.salePrice}</p>
                        ) : null}
                        <strike>${selectedPrevProduct?.product?.price}</strike>
                        {selectedPrevProduct?.product?.salePrice ? (
                           <>
                              <span>
                                 ( -
                                 {(
                                    ((selectedPrevProduct?.product.price - selectedPrevProduct?.product.salePrice) /
                                       selectedPrevProduct?.product.price) *
                                    100
                                 ).toFixed(2)}
                                 % )
                              </span>
                           </>
                        ) : null}
                     </div>
                     {!!selectedPrevProduct?.product.stockStatus ? (
                        <div className="stock">
                           <h5>Status :</h5>
                           <div className={selectedPrevProduct?.product.stockStatus.toLowerCase().split(' ').join('-')}>
                              {selectedPrevProduct?.product.stockStatus}
                           </div>
                        </div>
                     ) : null}

                     <hr />
                     <p className="description">{selectedPrevProduct?.product?.discription}</p>
                     <hr />

                     {/* <div className="selected_div">
                        <p>Size*</p>
                        <select>
                           <option value="-Please select-">-Please select-</option>
                           <option value="s">s</option>
                           <option value="sl">sl</option>
                           <option value="sxl">sxl</option>
                        </select>

                        <p>Color*</p>
                        <select>
                           <option value="-Please select-">-Please select-</option>
                           <option value="red">red</option>
                           <option value="white">white</option>
                           <option value="yellow">yellow</option>
                        </select>
                     </div> */}

                     <div className="quntityGrDiv">
                        <span>Quantity</span>
                        <styled.flexDiv className="quntity_group">
                           <div className="quntityDiv">
                              <div className="qtyBtn" onClick={QuntityMinusHandler}>
                                 <AiOutlineMinus />
                              </div>
                              <div>
                                 <p>{ProductQty}</p>
                              </div>
                              <div className="qtyBtn" onClick={QuntityPlusHandler}>
                                 <AiOutlinePlus />
                              </div>
                           </div>

                           {addToCartLoading ? (
                              <CustombuttonComponent btnCl={'addToCart_2'}>
                                 <SpnnerComponent />
                              </CustombuttonComponent>
                           ) : (
                              <CustombuttonComponent
                                 onClick={() =>
                                    CartHandler(
                                       selectedPrevProduct?.product._id,
                                       selectedPrevProduct?.product?.productImage
                                    )
                                 }
                                 innerText={'ADD TO CART'}
                                 btnCl={'addToCart'}
                              />
                           )}
                        </styled.flexDiv>
                     </div>
                  </div>
               </styled.flexDiv>
            ) : null}
         </styled.mainDiv>
      </styled.div>,
      document.getElementById('product_view')
   );
}

export default ProductViewComponent;
