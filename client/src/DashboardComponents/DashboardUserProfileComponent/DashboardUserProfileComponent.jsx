import React, { useState } from "react";
import * as profile from "./DashboardUserProfileComponent.style";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import backendConfigData from "../../backendConfig";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { removeUser } from "../../Redux/Actions/appAction";

function DashboardUserProfileComponent() {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const user = useSelector((state) => state.auth.auth);
   const [cookies, setCookie, removeCookie] = useCookies(["user"]);
   const navigation = useNavigate();
   const dispatch = useDispatch();
   const auth = useSelector((state) => state.auth.auth);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const LogOutHandler = function () {
      removeCookie("user");
      navigation("/admin/sign-in");
      dispatch(removeUser(null));
      console.log(cookies);
   };

   return (
      <profile.div>
         {!!auth && auth.success && auth?.userObject ? (
            <>
               <p>Hi! {auth.userObject.name}</p>
               <profile.user
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
               >
                  {user && user.success && user.userObject ? (
                     <img
                        crossorigin="anonymous"
                        src={`${backendConfigData.URL}images/${user.userObject.userProfileImage}`}
                     />
                  ) : null}
               </profile.user>
               <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                     "aria-labelledby": "basic-button",
                  }}
               >
                  <MenuItem
                     onClick={() => {
                        handleClose();
                        LogOutHandler();
                     }}
                  >
                     Logout
                  </MenuItem>
               </Menu>
            </>
         ) : null}
      </profile.div>
   );
}

export default DashboardUserProfileComponent;
