import React, { useState, useEffect } from "react";
import HocSpnnerComponent from "../../Components/HocSpnnerComponent/HocSpnnerComponent";
import * as styled from "./ProductReportBarChartComponent.style";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import { useSelector } from "react-redux";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { useRef } from "react";

const productZeroData = {
   labels: new Array(10).fill(0),
   datasets: [
      {
         label: "Daly product upload",
         data: new Array(10).fill(0),
      },
   ],
};

function ProductReportBarChartComponent({ heading, line }) {
   const [DataSet, setDataSet] = useState(null);
   const Products = useRef(null);
   const { productGenralReport } = useSelector((state) => state.admin);

   useEffect(() => {
      if (
         !!productGenralReport &&
         productGenralReport?.success &&
         !!productGenralReport?.report.length
      ) {
         setDataSet({
            labels: productGenralReport.report.map((el) => el._id.date),
            datasets: [
               {
                  label: "Daly product upload",
                  data: productGenralReport.report.map((el) => el.totalProductUploded),
                  backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"],
                  borderWidth: 1,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.3,
               },
            ],
         });
      }

      if (
         !!line &&
         !!productGenralReport &&
         productGenralReport?.success &&
         !!productGenralReport?.report.length
      ) {
         const total = productGenralReport.report
            .map((el) => el.totalProductUploded)
            .reduce((acc, crv) => acc + crv);
         Products.current = total;
      }
   }, [productGenralReport]);

   return (
      <styled.div>
         <HeadingComponent
            Heading={!!line && Products.current ? `${heading} ${Products.current}` : heading}
         />
         {!!DataSet &&
         !!productGenralReport &&
         productGenralReport?.success &&
         productGenralReport?.report ? (
            !!line ? (
               <Line data={DataSet} />
            ) : (
               <Bar data={DataSet} />
            )
         ) : (
            <Bar data={productZeroData} />
         )}
      </styled.div>
   );
}

export default React.memo(HocSpnnerComponent(ProductReportBarChartComponent));
