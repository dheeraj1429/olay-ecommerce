import React, { useState, useEffect } from "react";
import * as upload from "./UploadProductComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import ProductUploadFirstComponent from "../ProductUploadFirstComponent/ProductUploadFirstComponent";
import ProductUploadSecondComponent from "../ProductUploadSecondComponent/ProductUploadSecondComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import {
   uplodNewProduct,
   fetchSingleProduct,
   editSingleProduct,
} from "../../Redux/Actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
   removeUploadProductInfo,
   uploadLoading,
   editSingleProductLoading,
   removeEditProductInfo,
} from "../../Redux/Actions/appAction";
import { useParams } from "react-router";

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
   const [Tags, setTags] = useState([]);
   const param = useParams();

   const dispatch = useDispatch();
   const {
      uploadProduct,
      uploadProductLoading,
      productEditLoading,
      singleProductFetch,
      productEditInfo,
   } = useSelector((state) => state.admin);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setProduct({ ...Product, [name]: value });
   };

   const ImageGrabHandler = function (e) {
      const data = e.target.files[0];
      setProduct({ ...Product, productImage: data });
   };

   const TagHandler = function (value) {
      setTags(value);
   };

   const info = (msg) => {
      message.info(msg);
   };

   useEffect(() => {
      if (!!uploadProduct) {
         info(uploadProduct.message);
         dispatch(removeUploadProductInfo(null));
      }

      if (!!productEditInfo) {
         info(productEditInfo.message);
         dispatch(removeEditProductInfo(null));
      }
   }, [uploadProduct, productEditInfo]);

   useEffect(() => {
      if (param?.id) {
         dispatch(fetchSingleProduct(param.id));
      }
   }, [param.id]);

   useEffect(() => {
      if (param && param?.id && !!singleProductFetch && singleProductFetch.success) {
         setProduct({
            ...Product,
            name: singleProductFetch.product?.name || "",
            price: singleProductFetch.product?.price || "",
            salePrice: singleProductFetch.product?.salePrice || "",
            discription: singleProductFetch.product?.discription || "",
            category: singleProductFetch.product?.category?._id || "",
            stockStatus: singleProductFetch.product?.stockStatus || "",
            weight: singleProductFetch.product?.weight || "",
            length: singleProductFetch.product?.length || "",
            wide: singleProductFetch.product?.wide || "",
            height: singleProductFetch.product?.height || "",
            suggestedAge: singleProductFetch.product?.suggestedAge || "",
            brand: singleProductFetch.product?.brand?._id || "",
            productStatusInfo: singleProductFetch.product?.productStatusInfo || "Draft",
         });
      }
   }, [singleProductFetch]);

   const checkTrueValues = function (formData, string, filde) {
      if (!!string) {
         formData.append(filde, string);
      }

      return formData;
   };

   const createFormDateHandler = function () {
      const formData = new FormData();
      checkTrueValues(formData, Product.name, "name");
      checkTrueValues(formData, Product.price, "price");
      checkTrueValues(formData, Product.salePrice, "salePrice");
      checkTrueValues(formData, Product.discription, "discription");
      checkTrueValues(formData, Product.category, "category");
      checkTrueValues(formData, Product.stockStatus, "stockStatus");
      checkTrueValues(formData, Product.weight, "weight");
      checkTrueValues(formData, Product.length, "length");
      checkTrueValues(formData, Product.wide, "wide");
      checkTrueValues(formData, Product.height, "height");
      checkTrueValues(formData, Product.productImage, "productImage");
      checkTrueValues(formData, Product.suggestedAge, "suggestedAge");
      checkTrueValues(formData, Product.brand, "brand");
      checkTrueValues(formData, Product.productStatusInfo, "productStatusInfo");
      // formData.append("tags[]", JSON.stringify(Tags));

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

   const updateHandler = function () {
      if (param?.id) {
         const formData = createFormDateHandler();
         dispatch(editSingleProduct(formData, param.id, singleProductFetch.product._id));
         dispatch(editSingleProductLoading(true));
      } else {
         throw Error("Id is reuqired!");
      }
   };

   return (
      <upload.div>
         <DashboardNavbarComponent />
         <upload.paddingDiv>
            <HeadingComponent
               Heading={param?.id ? "Edit product" : "Upload Product"}
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
               TagHandler={TagHandler}
            />

            <div className="margin-left">
               <upload.flexEnd>
                  <CustombuttonComponent
                     innerText={param?.id ? "Update" : "Save"}
                     btnCl={"category_upload"}
                     onClick={param?.id ? updateHandler : SendDataHandler}
                     isLoading={!param?.id ? uploadProductLoading : productEditLoading}
                  />
               </upload.flexEnd>
            </div>
         </upload.paddingDiv>
      </upload.div>
   );
}

export default UploadProductComponent;
