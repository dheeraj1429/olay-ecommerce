import React, { useState, useEffect } from 'react';
import * as styled from './SignInAndLoginComponent.style';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustombuttonComponent from '../../HelperComponents/CustombuttonComponent/CustombuttonComponent';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { signInUsers, userLoginIn } from '../../Redux/Actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoginLoadingHandler } from '../../Redux/Actions/authAppAction';

function SignInAndLoginComponent() {
   const [User, setUser] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
   });
   const [Error, setError] = useState('');

   const dispatch = useDispatch();
   const navigation = useNavigate();
   const location = useLocation();

   const { isLoading, auth } = useSelector((state) => state.auth);

   const ChangeHandler = function (e) {
      const name = e.target.name;
      const value = e.target.value;
      setUser({ ...User, [name]: value });
   };

   const sendHandler = function () {
      if (!User.name && !User.email && !User.password) {
         return setError('Please fill all fileds*');
      }

      const userInfo = {
         name: User.name,
         email: User.email,
         password: User.password,
      };

      if (location.pathname === '/auth/login') {
         dispatch(userLoginIn(userInfo));
         setError('');
         dispatch(userLoginLoadingHandler(true));
      } else {
         if (User.password !== User.confirmPassword) {
            return setError('Password or confrim password is not the same*');
         }
         dispatch(signInUsers(userInfo));
         setError('');
         dispatch(userLoginLoadingHandler(true));
      }
   };

   useEffect(() => {
      if (!!auth && auth.success && auth.userObject) {
         navigation('/');
      }
   }, [auth]);

   return (
      <styled.div>
         <div className="flex">
            <div className="image_prv"></div>
            <div className="content_div">
               <h1>{location.pathname === '/auth/login' ? 'Log in' : 'Sign In'}</h1>
               <p>{location.pathname === '/auth/login' ? 'Fill your login details to access your account' : 'Ready for the new shoot ?'}</p>

               <Box
                  component="form"
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  {location.pathname === '/auth/login' ? null : <TextField name="name" value={User.name} onChange={ChangeHandler} id="outlined-basic" label="Name" type={'text'} variant="outlined" />}
                  <TextField name="email" value={User.email} onChange={ChangeHandler} id="outlined-basic" label="Email" type={'email'} variant="outlined" />
                  {location.pathname === '/auth/login' ? (
                     <>
                        <TextField name="password" value={User.password} onChange={ChangeHandler} id="outlined-basic" type={'password'} label="Password" variant="outlined" />
                     </>
                  ) : (
                     <>
                        <TextField name="password" value={User.password} onChange={ChangeHandler} id="outlined-basic" type={'password'} label="Password" variant="outlined" />
                        <TextField name="confirmPassword" value={User.confirmPassword} onChange={ChangeHandler} id="outlined-basic" type={'password'} label="Confirm password" variant="outlined" />
                     </>
                  )}
               </Box>
               <div>
                  <div>{Error ? <span>{Error}</span> : null}</div>
                  {location.pathname === '/auth/login' ? <Link to={'/auth/signin'}>Don't have an account sing in</Link> : <Link to={'/auth/login'}>Already have an account ?</Link>}
                  <div>
                     <span>{!!auth && auth.success && auth?.message ? auth.message : null}</span>
                  </div>
               </div>

               <CustombuttonComponent isLoading={isLoading} onClick={sendHandler} innerText={location.pathname === '/auth/login' ? 'Log in' : 'Sign In'} btnCl={'category_upload'} />
            </div>
         </div>
      </styled.div>
   );
}

export default SignInAndLoginComponent;
