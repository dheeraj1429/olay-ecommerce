import React from 'react';
import * as styled from './UserProfileOptionComponent.style';
import { useSelector } from 'react-redux';
import backendConfigData from '../../backendConfig';
import { RiUser6Line } from '@react-icons/all-files/ri/RiUser6Line';
import { GoLocation } from '@react-icons/all-files/go/GoLocation';
import { CgShoppingCart } from '@react-icons/all-files/cg/CgShoppingCart';
import { AiOutlineTag } from '@react-icons/all-files/ai/AiOutlineTag';
import { AiOutlineSetting } from '@react-icons/all-files/ai/AiOutlineSetting';
import { VscLinkExternal } from '@react-icons/all-files/vsc/VscLinkExternal';
import { Link } from 'react-router-dom';

const Options = [
   { icon: <RiUser6Line />, text: 'My details', cl: 'mt-1' },
   { icon: <VscLinkExternal />, text: 'My account' },
   { icon: <GoLocation />, text: 'My address book' },
   { icon: <CgShoppingCart />, text: 'My orders' },
   { icon: <AiOutlineTag />, text: 'My newsletters' },
   { icon: <AiOutlineSetting />, text: 'Account setting', cl: 'mb-1' },
];

function UserProfileOptionComponent({ show, styles, hideProfile, hideOptions }) {
   const { auth } = useSelector((state) => state.auth);

   return (
      <styled.div show={show} style={styles ? styles : null}>
         {!!auth && auth.success && auth?.userObject ? (
            <>
               {!!hideProfile ? null : (
                  <div className="d-flex align-items-center border-bottom p-3">
                     <div className="userProfileDiv">
                        <img crossOrigin="anonymous" src={`${backendConfigData.URL}userProfiles/${auth.userObject.userProfileImage}`} alt="" />
                     </div>
                     <div className="user-info">
                        <h5>{auth.userObject.name}</h5>
                        <p>{auth.userObject.email}</p>
                     </div>
                  </div>
               )}

               <div className="options ">
                  {Options.map((el) => (
                     <Link to={el.text.toLowerCase() === 'my account' ? '/my-account' : `/my-account/${el.text.toLowerCase().replaceAll(' ', '-')}`}>
                        {!!hideOptions && hideOptions.includes(el.text) ? null : (
                           <div key={el.text} className={`optionsRow ${el.cl ? el.cl : ''}  d-flex align-items-center`}>
                              <div className="options_icon">{el.icon}</div>
                              <div className="options_content">
                                 <p className="mb-0">{el.text}</p>
                              </div>
                           </div>
                        )}
                     </Link>
                  ))}
               </div>
            </>
         ) : null}
      </styled.div>
   );
}

export default UserProfileOptionComponent;
