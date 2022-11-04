import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as styled from './NavbarComponent.style';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { AiOutlineShoppingCart } from '@react-icons/all-files/ai/AiOutlineShoppingCart';
import { AiOutlineBars } from '@react-icons/all-files/ai/AiOutlineBars';
import { RiUser6Line } from '@react-icons/all-files/ri/RiUser6Line';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import CardSidebarComponent from '../CardSidebarComponent/CardSidebarComponent';
import { useDispatch } from 'react-redux';
import { showAndHideCartSideBar } from '../../Redux/Actions/indexAppAction';
import { useNavigate } from 'react-router-dom';
import backendConfigData from '../../backendConfig';
import UserProfileOptionComponent from '../UserProfileOptionComponent/UserProfileOptionComponent';

const navigationRow = [
   { name: 'Home', link: '/' },
   { name: 'Shop', link: 'shop' },
   { name: 'Blog', link: '/blog' },
   { name: 'pages', link: '/pages' },
   { name: 'Contact', link: '/contact' },
];

function NavbarComponent() {
   const [Show, setShow] = useState(false);

   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);
   const { cartItems } = useSelector((state) => state.index);

   const navigation = useNavigate();

   const showCartSideBarHandler = function () {
      dispatch(showAndHideCartSideBar(true));
   };

   return (
      <styled.div>
         <CardSidebarComponent />
         <div className="side_padding_one">
            <styled.flex>
               <div>
                  <img src="/images/logo.webp" alt="" />
               </div>

               <div>
                  <ul>
                     {navigationRow.map((el) => {
                        return (
                           <li key={el.name}>
                              <Link to={el.link}>
                                 <p>{el.name}</p>
                              </Link>
                           </li>
                        );
                     })}
                  </ul>
               </div>

               <div className="flex_div">
                  <div className="flex_div ms-1">
                     <BsSearch />
                     <p>Search</p>
                  </div>
                  <div className="flex_div ms-1">
                     <Badge badgeContent={!!cartItems && cartItems.cartItems.length ? cartItems.cartItems.length : 0} color="primary">
                        <AiOutlineShoppingCart onClick={() => navigation('/cart')} />
                     </Badge>
                     <p>Cart</p>
                  </div>
                  {!!auth && auth.success && auth.userObject ? (
                     <>
                        <div className="avatar_div">
                           <div className="userImage">
                              <img crossOrigin="anonymous" onClick={() => setShow(!Show)} src={`${backendConfigData.URL}userProfiles/${auth.userObject.userProfileImage}`} alt="" />
                           </div>
                           <UserProfileOptionComponent show={Show} />
                        </div>
                     </>
                  ) : (
                     <Link to={'/auth/signin'}>
                        <div className="flex_div hove_parent_div">
                           <RiUser6Line />
                           <div className="hove_div">Sign In</div>
                        </div>
                     </Link>
                  )}
                  <div className="flex_div hove_parent_div">
                     <AiOutlineBars onClick={showCartSideBarHandler} />
                     <div className="hove_div">Bar</div>
                  </div>
               </div>
            </styled.flex>
         </div>
      </styled.div>
   );
}

export default NavbarComponent;
