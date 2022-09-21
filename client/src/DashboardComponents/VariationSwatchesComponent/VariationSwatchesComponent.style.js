import styled from "styled-components";

export const div = styled.div`
   p {
      color: var(--smooth-light-color);
   }

   .color-picker {
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
   }
`;

export const spaceDiv = styled.div`
   padding: 1rem;
`;

export const contentDiv = styled.div`
   margin-top: 2rem;
`;

export const colorBox = styled.div`
   .rcp {
      position: absolute;
      left: 30%;
      bottom: 43px;
      z-index: 100;
   }
`;

export const AciverBackgrond = styled.div`
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   z-index: 99;
`;

export const pickerColorBox = styled.div`
   width: 40px !important;
   height: 40px;
   border-radius: 8px;
   border: 2px solid var(--main-cl);
   position: relative;
   cursor: pointer;
`;
