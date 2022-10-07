import React, { useEffect } from "react";
import * as history from "./ExportHistoryTableViewComponent.style";
import { getAllExportInfo, deleteSingleProductHistory } from "../../Redux/Actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
import HocSpnnerComponent from "../../Components/HocSpnnerComponent/HocSpnnerComponent";
import { FcDownload } from "@react-icons/all-files/fc/FcDownload";
import { FcFullTrash } from "@react-icons/all-files/fc/FcFullTrash";

const row = [
   { value: "Date", key: 1 },
   { value: "File name", key: 2 },
   { value: "History id", key: 3 },
   { value: "History type", key: 4 },
   { value: "Export Products", key: 5 },
   { value: "Actions", key: 6 },
];

function ExportHistoryTableViewComponent() {
   const dispatch = useDispatch();
   const { adminExportHistory } = useSelector((state) => state.admin);

   const deleteHandler = function (id, fileName) {
      dispatch(deleteSingleProductHistory(id, fileName));
   };

   useEffect(() => {
      dispatch(getAllExportInfo());
   }, []);

   return (
      <>
         {!!adminExportHistory &&
         adminExportHistory.success &&
         !!adminExportHistory?.history?.exportsHistory.length ? (
            <history.div>
               <table>
                  <tr>
                     {row.map((el) => (
                        <th key={el.key}>{el.value}</th>
                     ))}
                  </tr>

                  {adminExportHistory.history.exportsHistory.map((el) => (
                     <tr key={el._id}>
                        <td>{el.date}</td>
                        <td>{el.fileName}</td>
                        <td>{el._id}</td>
                        <td>{el.historyType}</td>
                        <td>{el.exportProducts}</td>
                        <td>
                           <div className="flex_div">
                              <div className="icons_div">
                                 <FcDownload />
                              </div>
                              <div
                                 className="icons_div"
                                 onClick={() => deleteHandler(el._id, el.fileName)}
                              >
                                 <FcFullTrash />
                              </div>
                           </div>
                        </td>
                     </tr>
                  ))}
               </table>
            </history.div>
         ) : (
            <history.notification>
               <div className="notifiaction_div">
                  <p>No History</p>
               </div>
            </history.notification>
         )}
      </>
   );
}

export default HocSpnnerComponent(ExportHistoryTableViewComponent);
