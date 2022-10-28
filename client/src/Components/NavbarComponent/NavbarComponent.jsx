import React from 'react';
import { Link } from 'react-router-dom';
import * as styled from './NavbarComponent.style';
import { MdKeyboardArrowDown } from '@react-icons/all-files/md/MdKeyboardArrowDown';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { AiOutlineShoppingCart } from '@react-icons/all-files/ai/AiOutlineShoppingCart';
import { AiOutlineBars } from '@react-icons/all-files/ai/AiOutlineBars';
import { RiUser6Line } from '@react-icons/all-files/ri/RiUser6Line';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import CardSidebarComponent from '../CardSidebarComponent/CardSidebarComponent';
import { useDispatch } from 'react-redux';
import { showAndHideCartSideBar } from '../../Redux/Actions/indexAppAction';

const navigationRow = [
   { name: 'Home', link: '/' },
   { name: 'Shop', link: 'shop' },
   { name: 'Blog', link: '/blog' },
   { name: 'pages', link: '/pages' },
   { name: 'Contact', link: '/contact' },
];

function NavbarComponent() {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);
   const { cartItems } = useSelector((state) => state.index);

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
                              <div>
                                 <MdKeyboardArrowDown />
                              </div>
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
                     <Badge
                        badgeContent={!!cartItems && cartItems.cartItems.length ? cartItems.cartItems.length : 0}
                        color="primary"
                     >
                        <AiOutlineShoppingCart />
                     </Badge>
                     <p>Cart</p>
                  </div>
                  {!!auth && auth.success && auth.userObject ? (
                     <Avatar alt="Remy Sharp" src=".." sx={{ width: 24, height: 24, marginRight: '1rem' }} />
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
