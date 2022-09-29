import React, { useEffect } from "react";
import * as edit from "./EditProductFlashSaleComponent.style";
import CreateNewFlashSaleComponent from "../CreateNewFlashSaleComponent/CreateNewFlashSaleComponent";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getSinlgeFlashSale } from "../../Redux/Actions/adminAction";

function EditProductFlashSaleComponent() {
   const params = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getSinlgeFlashSale(params.id));
   }, [params.id]);

   return (
      <edit.div>
         <CreateNewFlashSaleComponent param={params} />
      </edit.div>
   );
}

export default EditProductFlashSaleComponent;
