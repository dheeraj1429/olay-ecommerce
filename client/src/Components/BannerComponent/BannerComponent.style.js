import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 800px;
   background-image: url('/images/home-banner-img-1.jpg');
   background-position: center;
   background-size: cover;
   padding: 2rem 0;
   display: flex;
   align-items: center;

   div h1 {
      font-size: 70px;
      margin: 0;
      line-height: 83px;
      font-family: 'Lato', sans-serif;
   }

   div p {
      margin-top: 1.5rem;
      font-size: 15px;
   }
`;
