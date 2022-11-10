import React, { useEffect, useState } from 'react';
import * as styled from './UserAddressTableViewComponent.style';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddress } from '../../Redux/Actions/indexActions';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical';
import { deleteUserAddress } from '../../Redux/Actions/indexActions';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { useNavigate } from 'react-router';

function UserAddressTableViewComponent() {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const navigation = useNavigate();
   const dispatch = useDispatch();

   const { auth } = useSelector((state) => state.auth);
   const { userAddresses } = useSelector((state) => state.index);

   const DeleteHandler = function (id) {
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         setAnchorEl(null);
         dispatch(deleteUserAddress(id, !!auth && auth?.userObject && auth?.userObject?.token));
      }
   };

   const EditHandler = function (id) {
      navigation(`/my-account/my-address-book/edit/${id}`);
   };

   useEffect(() => {
      if (!!auth && auth?.userObject && auth?.userObject?.token) {
         dispatch(getUserAddress(auth.userObject.token));
      }
   }, []);

   return (
      <styled.div>
         <div className="d-flex align-items-center justify-content-between">
            <h4 className="mb-0">My Address</h4>
            <CustombuttonComponent innerText={'Create'} btnCl={'category_upload'} onClick={() => navigation('/my-account/my-address-book/create')} />
         </div>

         {!!userAddresses && userAddresses.success && userAddresses?.address && userAddresses.address.length ? (
            <div className="scrollDiv">
               <div className="mt-3 table_view_Div p-2" style={userAddresses.address.length ? null : { width: '100%', overflowX: 'hidden' }}>
                  <div className="row mb-3">
                     <div className="col-12 col-sm-12 col-md-2 center_div">
                        <p>Phone number</p>
                     </div>
                     <div className="col-12 col-sm-12 col-md-2 center_div">
                        <p>Country</p>
                     </div>
                     <div className="col-12 col-sm-12 col-md-2 center_div">
                        <p>State</p>
                     </div>
                     <div className="col-12 col-sm-12 col-md-2 center_div">
                        <p>City</p>
                     </div>
                     <div className="col-12 col-sm-12 col-md-3 center_div">
                        <p>Address</p>
                     </div>
                     <div className="col-12 col-sm-12 col-md-1 center_div">
                        <p>Action</p>
                     </div>
                  </div>

                  {!!userAddresses && userAddresses.success && userAddresses.address.length
                     ? userAddresses.address.map((el) => (
                          <div className="address_view_div container-fluid" key={el._id}>
                             <div className="row">
                                <div className="col-12 col-sm-12 col-md-2 center_div">
                                   <p>{el.phone}</p>
                                </div>
                                <div className="col-12 col-sm-12 col-md-2 center_div">
                                   <p>{el.country}</p>
                                </div>
                                <div className="col-12 col-sm-12 col-md-2 center_div">
                                   <p>{el.state}</p>
                                </div>
                                <div className="col-12 col-sm-12 col-md-2 center_div">
                                   <p>{el.city}</p>
                                </div>
                                <div className="col-12 col-sm-12 col-md-3 center_div">
                                   <p>{el.address}</p>
                                </div>
                                <div className="col-12 col-sm-12 col-md-1 center_div">
                                   <div className="d-flex align-items-center">
                                      <div>
                                         <Button id="fade-button" aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                                            <BsThreeDotsVertical />
                                         </Button>
                                         <Menu
                                            id="fade-menu"
                                            MenuListProps={{
                                               'aria-labelledby': 'fade-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            TransitionComponent={Fade}
                                         >
                                            <MenuItem onClick={() => EditHandler(el._id)}>Edit</MenuItem>
                                            <MenuItem onClick={() => DeleteHandler(el._id)}>Delete</MenuItem>
                                         </Menu>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                       ))
                     : null}
               </div>
            </div>
         ) : (
            <div className="w-100 text-center">
               <p>No address</p>
            </div>
         )}
      </styled.div>
   );
}

export default UserAddressTableViewComponent;
