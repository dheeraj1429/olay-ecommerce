import React, { useState } from 'react';
import * as styled from './InputComponent.style';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewsLetter } from '../../Redux/Actions/indexActions';
import { useNavigate } from 'react-router-dom';
import { newsLetterMailLadingHandler } from '../../Redux/Actions/indexAppAction';
import SpnnerComponent from '../../HelperComponents/SpnnerComponent/SpnnerComponent';

function InputComponent() {
   const [Email, setEmail] = useState('');

   const navigation = useNavigate();
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);
   const { newsLetterMailLoading, newsLetterMailInfo } = useSelector((state) => state.index);

   const changeHandler = function (e) {
      const value = e.target.value;
      setEmail(value);
   };

   const sendHandler = function () {
      const { name, token } = auth?.userObject;
      if (name) {
         if (Email) {
            dispatch(newsLetterMailLadingHandler(true));
            dispatch(sendNewsLetter({ email: Email, userName: name, token: token }));
         }
      } else {
         navigation('/auth/signin');
      }
   };

   return (
      <styled.div>
         <div className="flex_div">
            <input placeholder="Email Address" onChange={changeHandler} value={Email} name="email" type={'email'} />
            <CustombuttonComponent innerText={'Subscribe'} btnCl={'subscribe'} onClick={newsLetterMailLoading ? null : sendHandler}>
               {newsLetterMailLoading ? <SpnnerComponent /> : null}
            </CustombuttonComponent>
         </div>

         {!!newsLetterMailInfo && newsLetterMailInfo?.message ? <p className="subHeading">{newsLetterMailInfo.message}</p> : null}
      </styled.div>
   );
}

export default InputComponent;
