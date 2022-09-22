import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getSingleProductSizeVations } from "../../Redux/Actions/adminAction";
import VariationSwatchesComponent from "../VariationSwatchesComponent/VariationSwatchesComponent";

function ProductSizeVariationEditComponent() {
   const dispatch = useDispatch();
   const { id } = useParams();

   useEffect(() => {
      if (id) {
         dispatch(getSingleProductSizeVations(id));
      }
   }, [id]);

   return (
      <div>
         <VariationSwatchesComponent variation={"size"} edit={"size"} />
      </div>
   );
}

export default ProductSizeVariationEditComponent;
