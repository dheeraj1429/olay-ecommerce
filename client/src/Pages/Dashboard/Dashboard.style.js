import styled from "styled-components";

export const div = styled.div`
   width: 100%;
   height: 100vh;
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
`;

export const renderDiv = styled.div`
   width: 50%;
   padding: 2rem;
   background-image: url(/images/login-image.jpg);
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
   height: 100%;
   display: flex;
   align-items: center;
`;

export const imageDiv = styled.div`
   width: 50%;
   height: 100%;
   background-position: center;
   background-size: cover;
   background-repeat: no-repeat;
   background-image: url(/images/nature.jpg);
`;
