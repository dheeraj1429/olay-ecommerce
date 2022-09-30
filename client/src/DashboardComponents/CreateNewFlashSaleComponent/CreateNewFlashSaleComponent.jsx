import React, { useState, useEffect, useRef } from "react";
import * as sale from "./CreateNewFlashSaleComponent.style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import FetchListComponent from "../FetchListComponent/FetchListComponent";
import { useSelector, useDispatch } from "react-redux";
import {
   removeSingleFlashSaleData,
   removeUpdateFlashSaleInfo,
   showFetchSaleComponent,
   insertNewSaleCollectionLodingFn,
   removeFlashSaleInfo,
   loadingUpdateSingleFlashSale,
} from "../../Redux/Actions/appAction";
import SaleSelectedProductComponent from "../SaleSelectedProductComponent/SaleSelectedProductComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { MenuItem } from "@mui/material";
import { message } from "antd";
import { insertNewProductFlashSale, updateSingleFlashSale } from "../../Redux/Actions/adminAction";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLayoutEffect } from "react";

const STATUS = [
   { value: "Published", label: "Published" },
   { value: "Draft", label: "Draft" },
   { value: "Pending", label: "Pending" },
];

function CreateNewFlashSaleComponent({ param }) {
   const [SaleInfo, setSaleInfo] = useState({
      name: "",
      statusInfo: "",
      dateOfend: "",
   });

   const productRef = useRef();
   const dispatch = useDispatch();
   const showFlashSaleComponent = useSelector((state) => state.admin.showFlashSaleComponent);
   const selectedFlashSaleProducts = useSelector((state) => state.admin.selectedFlashSaleProducts);
   const storeSelectedProductSaleLoading = useSelector(
      (state) => state.admin.storeSelectedProductSaleLoading
   );
   const storeSelectedProductSale = useSelector((state) => state.admin.storeSelectedProductSale);
   const singleFlashSale = useSelector((state) => state.admin.singleFlashSale);
   const updateFlashSaleLoading = useSelector((state) => state.admin.updateFlashSaleLoading);
   const updateFlashSale = useSelector((state) => state.admin.updateFlashSale);

   const DataChangeHandler = (newValue) => {
      setSaleInfo({ ...SaleInfo, dateOfend: newValue.$d });
   };

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
         if (!param) {
            dispatch(insertNewProductFlashSale(SaleInfo));
            dispatch(insertNewSaleCollectionLodingFn(true));
         } else {
            dispatch(updateSingleFlashSale(SaleInfo));
            dispatch(loadingUpdateSingleFlashSale(true));
         }
      } else {
         info("Sale name is required");
      }
   };

   useEffect(() => {
      if (!!storeSelectedProductSale) {
         info(storeSelectedProductSale.message);
         dispatch(removeFlashSaleInfo(null));
      }
   }, [storeSelectedProductSale]);

   useEffect(() => {
      if (!!singleFlashSale) {
         const dataConvertObject = {};

         if (!!selectedFlashSaleProducts.length) {
            for (let i = 0; i < selectedFlashSaleProducts.length; i++) {
               dataConvertObject[selectedFlashSaleProducts[i].id] = {
                  salePrice: selectedFlashSaleProducts[i].salePrice,
                  quntity: selectedFlashSaleProducts[i].quntity,
               };
            }
         }

         setSaleInfo({
            name: singleFlashSale.sale.name,
            statusInfo: singleFlashSale.sale.statusInfo,
            flashSaleId: singleFlashSale.sale._id,
            dateOfend: singleFlashSale.sale.dateOfend,
            selectedProduct: dataConvertObject,
         });
      }
   }, [singleFlashSale, selectedFlashSaleProducts]);

   useEffect(() => {
      if (!!updateFlashSale) {
         info(updateFlashSale.message);
         dispatch(removeUpdateFlashSaleInfo(null));
      }
   }, [updateFlashSale]);

   useLayoutEffect(() => {
      const currentData = Date.$d;
      setSaleInfo({ ...SaleInfo, dateOfend: currentData });
   }, []);

   useEffect(() => {
      return () => {
         dispatch(removeSingleFlashSaleData());
      };
   }, []);

   return (
      <sale.container>
         <HeadingComponent
            Heading={param ? "Edit product flash sale" : "Product flash sale"}
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

                  {SaleInfo?.selectedProduct && !!selectedFlashSaleProducts.length ? (
                     <sale.selectedBrands>
                        <p>Selected products :</p>
                        {!!selectedFlashSaleProducts.length
                           ? selectedFlashSaleProducts.map((el) => (
                                <SaleSelectedProductComponent
                                   onChange={ChangeHandler}
                                   key={el.id}
                                   state={SaleInfo}
                                   data={el}
                                />
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DesktopDatePicker
                        disablePast
                        label="Last date of sale"
                        inputFormat="MM/DD/YYYY"
                        value={SaleInfo.dateOfend}
                        onChange={DataChangeHandler}
                        renderInput={(params) => <TextField {...params} />}
                     />
                  </LocalizationProvider>
               </Box>

               <CustombuttonComponent
                  onClick={SendHandler}
                  isLoading={param ? updateFlashSaleLoading : storeSelectedProductSaleLoading}
                  innerText={param ? "Update" : "Save"}
                  btnCl={"category_upload"}
               />
            </div>
         </div>
      </sale.container>
   );
}

export default CreateNewFlashSaleComponent;
