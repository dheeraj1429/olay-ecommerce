import React, { useState, useEffect, useRef } from "react";
import * as sale from "./CreateNewFlashSaleComponent.style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import FetchListComponent from "../FetchListComponent/FetchListComponent";
import { useSelector, useDispatch } from "react-redux";
import { showFetchSaleComponent } from "../../Redux/Actions/appAction";
import SaleSelectedProductComponent from "../SaleSelectedProductComponent/SaleSelectedProductComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { MenuItem } from "@mui/material";
import { message } from "antd";
import { insertNewProductFlashSale } from "../../Redux/Actions/adminAction";

const STATUS = [
   { value: "Published", label: "Published" },
   { value: "Draft", label: "Draft" },
   { value: "Pending", label: "Pending" },
];

function CreateNewFlashSaleComponent() {
   const [SaleInfo, setSaleInfo] = useState({
      name: "",
      statusInfo: "",
   });

   const productRef = useRef();
   const dispatch = useDispatch();
   const showFlashSaleComponent = useSelector((state) => state.admin.showFlashSaleComponent);
   const selectedFlashSaleProducts = useSelector((state) => state.admin.selectedFlashSaleProducts);
   const storeSelectedProductSaleLoading = useSelector((state) => state.admin.storeSelectedProductSaleLoading);

   const ChangeHandler = function (e, id = undefined) {
      const name = e.target.name;
      const value = e.target.value;

      if (!id) {
         setSaleInfo({ ...SaleInfo, [name]: value });
      } else {
         setSaleInfo({
            ...SaleInfo,
            selectedProduct: {
               ...SaleInfo.selectedProduct,
               [id]: {
                  ...SaleInfo.selectedProduct[id],
                  [name]: value,
               },
            },
         });
      }
   };

   const handleChange = (event) => {
      setSaleInfo({ ...SaleInfo, statusInfo: event.target.value });
   };

   const showProductHandlers = function () {
      if (!showFlashSaleComponent) {
         dispatch(showFetchSaleComponent(true));
      }
   };

   const info = (msg) => {
      message.info(msg);
   };

   const StoreSelectedProductInfo = function (data) {
      setSaleInfo({
         ...SaleInfo,
         selectedProduct: {
            ...SaleInfo.selectedProduct,
            [data]: { salePrice: "", quntity: "" },
         },
      });
   };

   const SendHandler = function () {
      if (SaleInfo.name) {
         dispatch(insertNewProductFlashSale(SaleInfo));
      } else {
         info("Sale name is required");
      }
   };

   return (
      <sale.container>
         <HeadingComponent
            Heading={"Product flash sale"}
            subHeading={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,`}
         />
         <div className="flexDiv">
            <div className="firstDiv">
               <Box
                  component="form"
                  sx={{
                     "& > :not(style)": { my: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <TextField
                     id="outlined-basic"
                     onChange={ChangeHandler}
                     type={"text"}
                     value={SaleInfo.name}
                     name="name"
                     label="Name"
                     variant="outlined"
                  />
               </Box>

               <div
                  id="overLayOptionDiv"
                  className="overLayScreen"
                  onClick={() => dispatch(showFetchSaleComponent(false))}
                  style={
                     showFlashSaleComponent
                        ? {
                             opacity: 1,
                             visibility: "visible",
                          }
                        : {
                             opacity: 0,
                             visibility: "hidden",
                          }
                  }
               ></div>

               <sale.posDiv>
                  <Box
                     component="form"
                     sx={{
                        "& > :not(style)": { my: 1, width: "100%" },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <TextField
                        id="outlined-basic"
                        onClick={showProductHandlers}
                        name="Products"
                        type={"search"}
                        label="Products"
                        variant="outlined"
                     />
                  </Box>

                  <FetchListComponent
                     show={showFlashSaleComponent}
                     TargetHandler={StoreSelectedProductInfo}
                     ref={(el) => (productRef.current = el)}
                  />

                  {!!selectedFlashSaleProducts.length ? (
                     <sale.selectedBrands>
                        <p>Selected products :</p>
                        {!!selectedFlashSaleProducts.length
                           ? selectedFlashSaleProducts.map((el) => (
                                <SaleSelectedProductComponent onChange={ChangeHandler} key={el.id} state={SaleInfo} data={el} />
                             ))
                           : null}
                     </sale.selectedBrands>
                  ) : null}
               </sale.posDiv>
            </div>
            <div className="secondDiv">
               <Box
                  component="form"
                  sx={{
                     "& > :not(style)": { my: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <TextField
                     id="outlined-select-currency"
                     onChange={handleChange}
                     select
                     label="Select"
                     value={SaleInfo.statusInfo}
                     helperText="Please select your status"
                     name="statusInfo"
                  >
                     {STATUS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </TextField>
               </Box>

               <CustombuttonComponent
                  onClick={SendHandler}
                  isLoading={storeSelectedProductSaleLoading}
                  innerText={"Save"}
                  btnCl={"category_upload"}
               />
            </div>
         </div>
      </sale.container>
   );
}

export default CreateNewFlashSaleComponent;
