import React, { useState } from 'react';
import * as signIn from './DashboardSingInComponent.styl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { userLoginIn } from '../../Redux/Actions/authAction';
import { userLoginLoging } from '../../Redux/Actions/authAppAction';

function DashboardSingInComponent() {
   const [SignInDetails, setSignInDetails] = useState({
      email: '',
      password: '',
   });
   const [Error, setError] = useState(null);
   const dispatch = useDispatch();
   const { auth, isLoading } = useSelector((state) => state.auth);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;

      setSignInDetails({ ...SignInDetails, [name]: value });
   };

   const SendData = function () {
      const { email, password } = SignInDetails;

      if (email && password) {
         setError('');
         dispatch(userLoginIn({ email, password }));
         dispatch(userLoginLoging(true));
      } else {
         setError('Please fill all fileds*');
      }
   };

   return (
      <signIn.div>
         <h1>Welcome back</h1>
         <p>Welcome back! please enter your details</p>

         <Box
            component="form"
            sx={{
               '& > :not(style)': { my: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
         >
            <TextField id="outlined-basic" label="Email" type={'email'} name="email" value={SignInDetails.email} variant="outlined" onChange={ChangeHandler} />
            <TextField id="outlined-basic" label="Password" type={'password'} name="password" value={SignInDetails.password} variant="outlined" onChange={ChangeHandler} />
         </Box>
         {!!auth && auth?.success ? <h4>{auth.message}</h4> : null}
         {!!Error ? <h4>{Error}</h4> : null}
         {isLoading ? (
            <div className="Loding">
               <img src="/images/spneer.svg" />
            </div>
         ) : (
            <CustombuttonComponent onClick={SendData} innerText={'Sign In'} btnCl={'admin-signin'} />
         )}
      </signIn.div>
   );
}

export default DashboardSingInComponent;
