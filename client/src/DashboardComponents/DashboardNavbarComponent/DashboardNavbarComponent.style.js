import styled from "styled-components";

export const div = styled.div`
   padding: 1rem;
   border-bottom: 1px solid var(--spec-error-background);
   background-color: var(--spec-background-gry-cl);
   border-radius: 7px 7px 0px 0;

   svg {
      cursor: pointer;
      fill: var(--icon-cl);
      font-size: 15px;
   }
`;

export const spaceFlex = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
`;

export const searchDiv = styled.div`
   display: flex;
   align-items: center;
   width: 300px;
   height: 40px;
   border-radius: 30px;
   overflow: hidden;
   background-color: var(--dark-gray-spec-color);
   padding-right: 0.5rem;
   margin-left: 1rem;

   .inc_div {
      height: 100%;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      color: var(--main-cl);
   }
`;
