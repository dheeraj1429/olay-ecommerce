import React, { useState, useEffect } from "react";
import * as signIn from "./DashboardSingInComponent.styl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { adminSignIn } from "../../Redux/Actions/adminAction";

function DashboardSingInComponent() {
   const [SignInDetails, setSignInDetails] = useState({
      email: "",
      password: "",
   });
   const [Error, setError] = useState(null);
   const dispatch = useDispatch();
   const auth = useSelector((state) => state.auth.auth);
   const isLoading = useSelector((state) => state.auth.isLoading);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setSignInDetails({ ...SignInDetails, [name]: value });
   };

   const SendData = function () {
      const { email, password } = SignInDetails;

      if (email && password) {
         dispatch(adminSignIn({ email, password }));
      } else {
         setError("Please fill all fileds*");
      }
   };

   useEffect(() => {
      if (auth && !!auth) {
         if (!auth.success) {
            setError(auth.message);
         } else if (auth.success) {
            setError(null);
         }
      }
   }, [auth]);

   return (
      <signIn.div>
         <h1>Welcome back</h1>
         <p>Welcome back! please enter your details</p>

         <Box
            component="form"
            sx={{
               "& > :not(style)": { my: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
         >
            <TextField
               id="outlined-basic"
               label="Email"
               type={"email"}
               name="email"
               value={SignInDetails.email}
               variant="outlined"
               onChange={ChangeHandler}
            />
            <TextField
               id="outlined-basic"
               label="Password"
               type={"password"}
               name="password"
               value={SignInDetails.password}
               variant="outlined"
               onChange={ChangeHandler}
            />
         </Box>
         {Error ? <h4>{Error}</h4> : null}
         {isLoading ? (
            <img src="/images/spneer.svg" />
         ) : (
            <CustombuttonComponent
               onClick={SendData}
               innerText={"Sign In"}
               btnCl={"admin-signin"}
            />
         )}
      </signIn.div>
   );
}

export default DashboardSingInComponent;
