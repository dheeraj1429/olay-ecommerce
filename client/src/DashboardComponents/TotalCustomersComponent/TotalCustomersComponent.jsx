import React, { useState, useEffect } from 'react';
import * as styled from './TotalCustomersComponent.style';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs } from 'chart.js/auto';
import { useSelector } from 'react-redux';

function TotalCustomersComponent({ heading }) {
   const [DateSet, setDataSet] = useState(null);

   const { totalSignInUserReport } = useSelector((state) => state.admin);

   useEffect(() => {
      if (!!totalSignInUserReport && totalSignInUserReport.success) {
         if (totalSignInUserReport.report.length) {
            setDataSet({
               labels: totalSignInUserReport.report.map((el) => el._id.date),
               datasets: [
                  {
                     label: 'Sign in users',
                     data: totalSignInUserReport.report.map((el) => el.TotalUserSignIn),
                     fill: false,
                     borderColor: 'rgb(255, 99, 132)',
                     tension: 0.4,
                     borderWidth: 1,
                  },
               ],
            });
         }
      }
   }, [totalSignInUserReport]);

   return (
      <styled.div>
         <div className="cardDiv">
            <h5>{heading}</h5>
            {!!DateSet ? (
               <div className="chart">
                  <Line data={DateSet} height="250px" />
               </div>
            ) : null}
         </div>
      </styled.div>
   );
}

export default React.memo(TotalCustomersComponent);
