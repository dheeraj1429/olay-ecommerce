import { TextField } from "@mui/material";
import React from "react";
import * as from from "./InputComponent.style";

function InputComponent({ heading, type, name, label, value, subHeading, help, onChange }) {
   return (
      <from.flexDiv>
         <from.spaceDiv>
            <p>{heading}</p>
         </from.spaceDiv>
         <TextField
            id="outlined-basic"
            value={value}
            type={type}
            className="input"
            label={label}
            name={name}
            variant="outlined"
            helperText={help}
            required
            onChange={onChange}
         />
         <from.spaceRight>
            <p>{subHeading}</p>
         </from.spaceRight>
      </from.flexDiv>
   );
}

export default InputComponent;
