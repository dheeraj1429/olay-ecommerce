import React, { useState } from "react";
import * as upload from "./UploadProductComponent.style";
import DashboardNavbarComponent from "../DashboardNavbarComponent/DashboardNavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import ProductUploadFirstComponent from "../ProductUploadFirstComponent/ProductUploadFirstComponent";
import ProductUploadSecondComponent from "../ProductUploadSecondComponent/ProductUploadSecondComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { uplodNewProduct } from "../../Redux/Actions/adminAction";
import { useDispatch } from "react-redux";

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
   });

   const dispatch = useDispatch();

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setProduct({ ...Product, [name]: value });
   };

   const ImageGrabHandler = function (e) {
      const data = e.target.files[0];
      setProduct({ ...Product, productImage: data });
   };

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
      } = Product;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("salePrice", salePrice);
      formData.append("discription", discription);
      formData.append("category", category);
      formData.append("stockStatus", stockStatus);
      formData.append("weight", weight);
      formData.append("length", length);
      formData.append("wide", wide);
      formData.append("height", height);
      formData.append("productImage", productImage);
      formData.append("suggestedAge", suggestedAge);
      formData.append("brand", brand);

      return formData;
   };

   const SendDataHandler = function () {
      const formData = createFormDateHandler();
      dispatch(uplodNewProduct(formData));
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
                  />
                  <CustombuttonComponent innerText={"Clear"} btnCl={"Delete_btn"} />
               </upload.flex>
            </div>
         </upload.paddingDiv>
      </upload.div>
   );
}

export default UploadProductComponent;
