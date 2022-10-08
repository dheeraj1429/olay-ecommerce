import styled from "styled-components";

export const div = styled.div`
   .fileUpload_div {
      width: 100%;
      border: 1px solid var(--spec-static-brand-black);
      padding: 1rem;
      border-radius: 5px;
      color: var(--main-cl);
      transition: all 0.2s ease;

      &:hover {
         border-radius: 7px;
      }
   }
`;

export const spaceDiv = styled.div`
   padding: 1rem;
`;

export const flexDiv = styled.div`
   display: flex;
   align-items: center;

   .margin {
      margin-left: 1rem;
   }
`;
