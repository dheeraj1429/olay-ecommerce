import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as email from './EmailInfoComponent.style';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { hideEmailBoxFn } from '../../Redux/Actions/adminAppAction';
import { useDispatch, useSelector } from 'react-redux';
import { sendHistoryFileWithEmail } from '../../Redux/Actions/adminAction';
import { message } from 'antd';
import { sendMailLoadingFn, removerMailInfo } from '../../Redux/Actions/adminAppAction';

function EmailInfoComponent({ show }) {
   const [Email, setEmail] = useState('');

   const dispatch = useDispatch();
   const { hideEmailBox, sendMailLoading, mailInfo } = useSelector((state) => state.admin);

   const hideEmailBoxHandler = function () {
      dispatch(hideEmailBoxFn({ show: false, file: null }));
      setEmail('');
   };

   const sendEmail = function () {
      if (!Email) {
         message.info('plase enter the email address');
         return;
      }
      if (!hideEmailBox.file) {
         message.info('file is not selected');
         return;
      }

      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
         dispatch(sendHistoryFileWithEmail({ email: Email, file: hideEmailBox.file }));
         dispatch(sendMailLoadingFn(true));
      } else {
         message.info('Please enter the valid email address');
      }
   };

   useEffect(() => {
      const hideHandler = function (e) {
         if (show) {
            if (e.target.id == 'overlay') {
               dispatch(hideEmailBoxFn({ show: false, file: null }));
               dispatch(removerMailInfo(null));
               setEmail('');
            }
         }
      };

      window.addEventListener('click', hideHandler);

      return () => {
         window.removeEventListener('click', hideHandler);
      };
   }, [show]);

   useEffect(() => {
      if (!!mailInfo && mailInfo?.success) {
         message.success('mail sent');
      }
   }, [mailInfo]);

   return ReactDOM.createPortal(
      <email.div show={show} id="overlay">
         <div className={show ? 'showCard cardInner' : 'cardInner'}>
            <div className="closeBtn" onClick={hideEmailBoxHandler}>
               <VscClose />
            </div>
            <h5>Send history to the email</h5>
            <p>To send the history file into the email address, please enter your email address here.</p>
            <input
               onChange={(e) => setEmail(e.target.value)}
               value={Email}
               type={'email'}
               placeholder="Email address"
            />
            <CustombuttonComponent
               onClick={sendEmail}
               innerText={'Send'}
               btnCl={'category_upload'}
               isLoading={sendMailLoading}
               spennerBlack={true}
            />
         </div>
      </email.div>,
      document.getElementById('email_info')
   );
}

export default EmailInfoComponent;
