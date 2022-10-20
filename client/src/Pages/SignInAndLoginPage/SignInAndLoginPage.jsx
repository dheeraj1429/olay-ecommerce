import React from 'react';
import * as styled from './SignInAndLoginPage.style';
import { Outlet } from 'react-router';

function SignInAndLoginPage() {
   return (
      <styled.div>
         <styled.centerDiv>
            <Outlet />
         </styled.centerDiv>
      </styled.div>
   );
}

export default SignInAndLoginPage;
