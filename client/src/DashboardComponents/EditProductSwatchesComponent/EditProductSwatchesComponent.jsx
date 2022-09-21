import React, { useEffect } from "react";
import { fetchSingleProductColorSwatches } from "../../Redux/Actions/adminAction";
import VariationSwatchesComponent from "../VariationSwatchesComponent/VariationSwatchesComponent";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

function EditProductSwatchesComponent() {
   const params = useParams();
   const dispatch = useDispatch();

   useEffect(() => {
      if (params?.id) {
         dispatch(fetchSingleProductColorSwatches(params?.id));
      }
   }, [params?.id]);

   return (
      <div>
         <VariationSwatchesComponent editId={params?.id} />
      </div>
   );
}

export default EditProductSwatchesComponent;
