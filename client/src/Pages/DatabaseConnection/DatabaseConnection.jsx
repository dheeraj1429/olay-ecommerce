import React, { useState } from "react";
import * as style from "./DatabaseConnection.style";
import InputComponent from "../../DashboardComponents/InputComponent/InputComponent";
import CustombuttonComponent from "../../Components/CustombuttonComponent/CustombuttonComponent";
import { databaseConenctionFn } from "../../Redux/Actions/adminAction";
import { useDispatch } from "react-redux";
import { message } from "antd";

function DatabaseConnection() {
   const [DatabaseInfo, setDatabaseInfo] = useState({
      name: "",
      mongodb: "",
      password: "",
   });

   const dispatch = useDispatch();

   const info = (msg) => {
      message.info("This is a normal message");
   };

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setDatabaseInfo({ ...DatabaseInfo, [name]: value });
   };

   const SendHalder = function () {
      if (DatabaseInfo.name && DatabaseInfo.mongodb && DatabaseInfo.password) {
         dispatch(databaseConenctionFn(DatabaseInfo));
      } else {
         info("please fill the all fileds");
      }
   };

   return (
      <style.div>
         <style.mainDiv>
            <p className="headingPara">
               Below you should enter your database connnection details. If you're not sure these, contact your host.
            </p>

            <InputComponent
               heading={"Database Name"}
               label="Name"
               type={"text"}
               name="name"
               value={DatabaseInfo.name}
               subHeading={"The name of the database you want to run WP in."}
               onChange={ChangeHandler}
            />
            <InputComponent
               heading={"mongodb"}
               label="mongodb+srv"
               type={"text"}
               name="mongodb"
               value={DatabaseInfo.mongodb}
               subHeading={"Mongo db database connection url"}
               help={"mongodb+srv://{.. database url ..}/?retryWrites=true&w=majority"}
               onChange={ChangeHandler}
            />
            <InputComponent
               heading={"Password"}
               label="Password"
               type={"password"}
               name="password"
               value={DatabaseInfo.password}
               subHeading={"Database access password authentication"}
               onChange={ChangeHandler}
            />

            <CustombuttonComponent onClick={SendHalder} innerText={"Save"} btnCl={"category_upload"} />
         </style.mainDiv>
      </style.div>
   );
}

export default DatabaseConnection;
