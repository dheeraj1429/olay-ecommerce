import React, { useState } from "react";
import * as tags from "./ProductTagsContainerComponent.style";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function ProductTagsContainerComponent() {
   const [Tags, setTags] = useState([]);
   const [TagString, setTagString] = useState("");

   // const allTags = useSelector((state) => state.admin.allTags);
   // const singleProductFetch = useSelector((state) => state.admin.singleProductFetch);

   const ChangeHandler = function (e) {
      let str = "";
      str += e.target.value;
      setTagString(str);
   };

   const SendHandler = function (e) {
      e.preventDefault();
      setTags((prev) => [...prev, TagString]);
      setTagString("");
   };

   return (
      <tags.parent>
         <Box
            component={"form"}
            sx={{
               "& > :not(style)": { mb: 2, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={SendHandler}
         >
            <TextField
               id="outlined-basic"
               onChange={ChangeHandler}
               label="Tags"
               value={TagString}
               variant="outlined"
            />
         </Box>
         <tags.div>
            <>
               <div className="tag-container">
                  <div className="flex">
                     {Tags.length
                        ? Tags.map((el) => <div className={"checkBox_items"}>{el}</div>)
                        : null}
                  </div>
               </div>
            </>
         </tags.div>
      </tags.parent>
   );
}

export default ProductTagsContainerComponent;
