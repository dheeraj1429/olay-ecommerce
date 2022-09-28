import styled from "styled-components";

export const container = styled.div`
   padding: 1rem;

   .flexDiv {
      width: 100%;
      display: flex;

      .firstDiv {
         width: 70%;
         padding-right: 1rem;
      }

      .secondDiv {
         width: 30%;
      }
   }

   .overLayScreen {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
   }
`;

export const posDiv = styled.div`
   position: relative;
   width: 100%;
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
`;

export const selectedBrands = styled.div`
   padding: 1rem 0;

   p {
      color: var(--smooth-light-color);
   }

   .main {
      padding: 1rem 0;
   }

   .ProductimageView {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      overflow: hidden;
      margin-right: 1rem;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
`;
