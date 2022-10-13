import React, { useEffect } from 'react';
import * as styled from './GenralProductUploadResultComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import { getProductGenralReport } from '../../Redux/Actions/adminAction';
import { productReportLoading } from '../../Redux/Actions/appAction';
import ProductReportBarChartComponent from '../ProductReportBarChartComponent/ProductReportBarChartComponent';

function GenralProductUploadResultComponent() {
   const dispatch = useDispatch();
   const { productGenralReportLoading } = useSelector((state) => state.admin);

   useEffect(() => {
      dispatch(getProductGenralReport());
      dispatch(productReportLoading());
   }, []);

   return (
      <styled.div>
         {/* <ProductReportBarChartComponent
            isLoading={productGenralReportLoading}
            heading={"Product upload report"}
         /> */}
         <ProductReportBarChartComponent isLoading={productGenralReportLoading} heading={'Total Products'} line={true} />
      </styled.div>
   );
}

export default React.memo(GenralProductUploadResultComponent);
