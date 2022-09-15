import React, { useState } from "react";
import * as feature from "./ProductSectionFeatureComponent.style";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { bulkAction } from "../../Redux/Actions/appAction";
import { FcAlphabeticalSortingAz } from "@react-icons/all-files/fc/FcAlphabeticalSortingAz";
import { FcAlphabeticalSortingZa } from "@react-icons/all-files/fc/FcAlphabeticalSortingZa";
import { FcPaid } from "@react-icons/all-files/fc/FcPaid";
import { FcOk } from "@react-icons/all-files/fc/FcOk";
import { FcIcons8Cup } from "@react-icons/all-files/fc/FcIcons8Cup";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { Link } from "react-router-dom";

const items = [
   { value: "", Option: "None" },
   { value: "Sort A - Z", Option: "Sort A - Z", icon: <FcAlphabeticalSortingAz /> },
   { value: "Sort Z - A", Option: "Sort Z - A", icon: <FcAlphabeticalSortingZa /> },
   { value: "Sort by order", Option: "Sort by order", icon: <FcPaid /> },
   { value: "Published", Option: "Published", icon: <FcOk /> },
   { value: "Delete all", Option: "Delete all", icon: <FcIcons8Cup /> },
];

function ProductSectionFeatureComponent({ state, pageLink, field, action }) {
   const [Filter, setFilter] = useState("");
   const dispatch = useDispatch();

   const ChangeHandler = (event) => {
      setFilter(event.target.value);
   };

   const info = (mse) => {
      message.info(mse);
   };

   const filterHandler = function () {
      if (!!Filter && !!state && state.success && !!state[field].length) {
         dispatch(bulkAction({ filter: Filter, filde: field }));
      } else if (!!state && !!!state[field].length && !!Filter) {
         info("There is no product brands exists");
      } else {
         info("Please select the filter option");
      }
   };

   const DeleteAllBrandHandler = function () {
      if (!!Filter && !!state && state.success && !!state[field].length) {
         dispatch(action());
      } else {
         info("There is no product brands exists");
      }
   };

   return (
      <feature.div>
         <feature.spaceBetween>
            <div>
               <feature.flex>
                  <Box>
                     <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                        <InputLabel id="demo-select-small">Bulk Actions</InputLabel>
                        <Select
                           labelId="demo-select-small"
                           id="demo-select-small"
                           value={Filter}
                           label="Bulk Action"
                           onChange={ChangeHandler}
                        >
                           {items.map((el) => (
                              <MenuItem value={el.value}>
                                 <feature.spaceBetween>
                                    {el.Option}
                                    <div
                                       className="filter_icons"
                                       style={{
                                          marginLeft: "1rem",
                                       }}
                                    >
                                       {el.icon}
                                    </div>
                                 </feature.spaceBetween>
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </Box>

                  {Filter !== "Delete all" ? (
                     <CustombuttonComponent
                        innerText={"Filter"}
                        btnCl={"category_upload margin-0"}
                        onClick={filterHandler}
                     />
                  ) : (
                     <Popconfirm
                        title="Are you sure？"
                        onConfirm={DeleteAllBrandHandler}
                        icon={
                           <QuestionCircleOutlined
                              style={{
                                 color: "red",
                              }}
                           />
                        }
                     >
                        <CustombuttonComponent
                           innerText={"Delete all"}
                           btnCl={"Delete_btn margin-0"}
                        />
                     </Popconfirm>
                  )}
               </feature.flex>
            </div>
            <div>
               <Link to={pageLink}>
                  <CustombuttonComponent
                     innerText={"Create"}
                     btnCl={"category_upload margin-0"}
                  />
               </Link>
            </div>
         </feature.spaceBetween>
      </feature.div>
   );
}

export default ProductSectionFeatureComponent;
