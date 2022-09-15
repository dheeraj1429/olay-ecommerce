import React, { useState, useEffect } from "react";
import * as upload from "./UploadProductComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import ProductUploadFirstComponent from "../ProductUploadFirstComponent/ProductUploadFirstComponent";
import ProductUploadSecondComponent from "../ProductUploadSecondComponent/ProductUploadSecondComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { uplodNewProduct } from "../../Redux/Actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { removeUploadProductInfo, uploadLoading } from "../../Redux/Actions/appAction";

const sugAge = [
   { value: "18 - 25", label: "18 - 25" },
   { value: "25 - 30", label: "25 - 30" },
   { value: "30 - 35", label: "30 - 35" },
   { value: "35 - 40", label: "35 - 40" },
   { value: "40 - 50", label: "40 - 50" },
];

const inStock = [
   { value: "Out of stock", label: "Out of stock" },
   { value: "On backorder", label: "On backorder" },
];

const brandStatus = [
   { value: "Published", label: "Published" },
   { value: "Draft", label: "Draft" },
   { value: "Pending", label: "Pending" },
];

function UploadProductComponent() {
   const [Product, setProduct] = useState({
      name: "",
      price: "",
      salePrice: "",
      discription: "",
      category: "",
      stockStatus: "",
      weight: "",
      length: "",
      wide: "",
      height: "",
      productImage: "",
      suggestedAge: "",
      brand: "",
      productStatusInfo: "Draft",
   });

   const dispatch = useDispatch();
   const uploadProduct = useSelector((state) => state.admin.uploadProduct);
   const uploadProductLoading = useSelector((state) => state.admin.uploadProductLoading);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setProduct({ ...Product, [name]: value });
   };

   const ImageGrabHandler = function (e) {
      const data = e.target.files[0];
      setProduct({ ...Product, productImage: data });
   };

   const checkTrueValues = function (formData, string, filde) {
      if (!!string) {
         formData.append(filde, string);
      }

      return formData;
   };

   const info = (msg) => {
      message.info(msg);
   };

   useEffect(() => {
      if (!!uploadProduct) {
         info(uploadProduct.message);
         dispatch(removeUploadProductInfo(null));
      }
   }, [uploadProduct]);

   const createFormDateHandler = function () {
      const {
         name,
         price,
         salePrice,
         discription,
         category,
         stockStatus,
         weight,
         length,
         wide,
         height,
         productImage,
         suggestedAge,
         brand,
         productStatusInfo,
      } = Product;

      const formData = new FormData();
      checkTrueValues(formData, name, "name");
      checkTrueValues(formData, price, "price");
      checkTrueValues(formData, salePrice, "salePrice");
      checkTrueValues(formData, discription, "discription");
      checkTrueValues(formData, category, "category");
      checkTrueValues(formData, stockStatus, "stockStatus");
      checkTrueValues(formData, weight, "weight");
      checkTrueValues(formData, length, "length");
      checkTrueValues(formData, wide, "wide");
      checkTrueValues(formData, height, "height");
      checkTrueValues(formData, productImage, "productImage");
      checkTrueValues(formData, suggestedAge, "suggestedAge");
      checkTrueValues(formData, brand, "brand");
      checkTrueValues(formData, productStatusInfo, "productStatusInfo");

      return formData;
   };

   const SendDataHandler = function () {
      if (!!Product.name && !!Product.price) {
         const formData = createFormDateHandler();
         dispatch(uplodNewProduct(formData));
         dispatch(uploadLoading(true));
      } else {
         info("Product name and product price is required!!");
      }
   };

   return (
      <upload.div>
         <DashboardNavbarComponent />
         <upload.paddingDiv>
            <HeadingComponent
               Heading={"Upload Product"}
               subHeading={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
               }
            />

            <ProductUploadFirstComponent
               inStock={inStock}
               ChangeHandler={ChangeHandler}
               state={Product}
               productStatusInfo={brandStatus}
            />
            <ProductUploadSecondComponent
               sugAge={sugAge}
               ChangeHandler={ChangeHandler}
               state={Product}
               ImageGrabHandler={ImageGrabHandler}
            />

            <div className="margin-left">
               <upload.flex>
                  <CustombuttonComponent
                     innerText={"Save"}
                     btnCl={"category_upload"}
                     onClick={SendDataHandler}
                     isLoading={uploadProductLoading}
                  />
               </upload.flex>
            </div>
         </upload.paddingDiv>
      </upload.div>
   );
}

export default UploadProductComponent;
