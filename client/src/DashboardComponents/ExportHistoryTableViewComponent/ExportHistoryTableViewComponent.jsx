import React, { useEffect } from "react";
import * as history from "./ExportHistoryTableViewComponent.style";
import { getAllExportInfo } from "../../Redux/Actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import HocSpnnerComponent from "../../Components/HocSpnnerComponent/HocSpnnerComponent";

const row = [
   { value: "Date", key: 1 },
   { value: "File name", key: 2 },
   { value: "File id", key: 3 },
   { value: "History type", key: 4 },
   { value: "Actions", key: 5 },
];

function ExportHistoryTableViewComponent() {
   const dispatch = useDispatch();
   const { adminExportHistory } = useSelector((state) => state.admin);

   useEffect(() => {
      dispatch(getAllExportInfo());
   }, []);

   return (
      <history.div>
         <table>
            <tr>
               {row.map((el) => (
                  <th key={el.key}>{el.value}</th>
               ))}
            </tr>

            {!!adminExportHistory && adminExportHistory.success && !!adminExportHistory?.history?.exportsHistory.length
               ? adminExportHistory.history.exportsHistory.map((el) => (
                    <tr key={el._id}>
                       <td>{el.date}</td>
                       <td>{el.fileName}</td>
                       <td>{el._id}</td>
                       <td>{el.historyType}</td>
                    </tr>
                 ))
               : null}
         </table>
      </history.div>
   );
}

export default HocSpnnerComponent(ExportHistoryTableViewComponent);
