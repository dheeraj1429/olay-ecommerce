import styled from 'styled-components';

export const div = styled.div`
   .wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 142px;
      height: 40px;
      margin: -20px 0 0 -71px;
      background: white;
      filter: contrast(20);
   }
   .dot {
      position: absolute;
      width: 10px;
      height: 10px;
      top: 12px;
      left: 5px;
      filter: blur(4px);
      background: #000;
      border-radius: 50%;
      transform: translateX(0);
      animation: dot 2.8s infinite;
   }
   .dots {
      transform: translateX(0);
      margin-top: 12px;
      margin-left: 31px;
      animation: dots 2.8s infinite;
   }
   span {
      display: block;
      float: left;
      width: 10px;
      height: 10px;
      margin-left: 16px;
      filter: blur(4px);
      background: #000;
      border-radius: 50%;
   }

   @keyframes dot {
      50% {
         transform: translateX(96px);
      }
   }
   @keyframes dots {
      50% {
         transform: translateX(-31px);
      }
   }
`;