import React, { useEffect } from "react";
import * as inner from "./AllProductTableInnerComponent.style";
import HocSpnnerComponent from "../../Components/HocSpnnerComponent/HocSpnnerComponent";
import { Checkbox } from "antd";
import { FiEdit2 } from "@react-icons/all-files/fi/FiEdit2";
import { VscClose } from "@react-icons/all-files/vsc/VscClose";
import backendConfigData from "../../backendConfig";
import {
   selectedItemLimit,
   removeSelectedItems,
   removeAllSelctedIds,
} from "../../Redux/Actions/appAction";
import { useDispatch } from "react-redux";
import { Popconfirm } from "antd";
import { deleteOneProduct } from "../../Redux/Actions/adminAction";
import { Link } from "react-router-dom";

function AllProductTableInnerComponent({ allProducts }) {
   const dispatch = useDispatch();

   const onChange = (e, elm) => {
      let id = elm._id;

      if (e.target.checked) {
         dispatch(selectedItemLimit(id));
      } else {
         dispatch(removeSelectedItems(id));
      }
   };

   const confirm = (id) => {
      dispatch(deleteOneProduct(id));
   };

   useEffect(() => {
      return () => {
         dispatch(removeAllSelctedIds([]));
      };
   }, []);

   return (
      <>
         {!!allProducts && allProducts.success && allProducts.products.length
            ? allProducts.products.map((el) => (
                 <>
                    <inner.tr>
                       <inner.td className="checkbox">
                          <Checkbox onChange={(e) => onChange(e, el)} />
                       </inner.td>
                       <inner.td>
                          <Link to={`/dashboard/product/edit/${el._id}`}>
                             <FiEdit2 />
                          </Link>
                       </inner.td>
                       <inner.td>
                          <Popconfirm
                             title="Are you sure to delete this product?"
                             onConfirm={() => confirm(el._id)}
                             okText="Yes"
                             cancelText="No"
                          >
                             <VscClose />
                          </Popconfirm>
                       </inner.td>
                       <inner.td>
                          <div className="product_image_prv">
                             <img
                                crossOrigin="anonymous"
                                src={`${backendConfigData.URL}productImagesCompress/${el.productImage}`}
                                alt=""
                             />
                          </div>
                       </inner.td>
                       <inner.td>{el.name.slice(0, 40)}</inner.td>
                       <inner.td>{el.price}</inner.td>
                       <inner.td>
                          {el?.salePrice && !!el.salePrice ? (
                             <div className="Sale">{el.salePrice}</div>
                          ) : (
                             <div className="no_sale">No Sale</div>
                          )}
                       </inner.td>
                       <inner.td></inner.td>
                       <inner.td>
                          {el?.stockStatus && el.stockStatus ? (
                             <div className={el.stockStatus.split(" ").join("-")}>
                                {el.stockStatus}
                             </div>
                          ) : null}
                       </inner.td>
                       <inner.td>{el?.weight ? el.weight : "-"}</inner.td>
                       <inner.td>{el?.length ? el.length : "-"}</inner.td>
                       <inner.td>{el?.wide ? el.wide : "-"}</inner.td>
                       <inner.td>{el?.height ? el.height : "-"}</inner.td>
                       <inner.td>{el?.suggestedAge ? el.suggestedAge : "-"}</inner.td>
                       <inner.td>
                          {el?.brand ? el.brand.name : <div>No Brand</div>}
                       </inner.td>
                       <inner.td>
                          {el?.category ? el.category.name : <div>Uncategory</div>}
                       </inner.td>
                       <inner.td>
                          {el?.createdAt
                             ? (function () {
                                  const date = String(new Date(el.createdAt)).split(
                                     "GMT"
                                  )[0];
                                  return <p>{`${date}`}</p>;
                               })()
                             : null}
                       </inner.td>
                       <inner.td>
                          {el?.productStatusInfo ? (
                             <div className={el.productStatusInfo}>
                                {el.productStatusInfo}
                             </div>
                          ) : null}
                       </inner.td>
                    </inner.tr>
                 </>
              ))
            : null}
      </>
   );
}

export default HocSpnnerComponent(AllProductTableInnerComponent);
