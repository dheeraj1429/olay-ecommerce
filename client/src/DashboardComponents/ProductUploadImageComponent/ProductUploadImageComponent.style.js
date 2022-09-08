import styled from "styled-components";

export const main = styled.div`
   .image_div {
      text-align: center;
      p {
         font-size: 12px;
         margin-bottom: 0.5rem;
      }
   }
   input {
      display: none;
   }
`;

export const div = styled.div`
   width: 200px;
   height: 200px;
   border: 1px dashed var(--spec-text-disabled);
   border-radius: 12px;
   margin-right: 1rem;
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
   overflow: hidden;

   img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
   }
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
`;
