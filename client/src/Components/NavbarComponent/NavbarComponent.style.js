import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   padding: 2rem 0;

   ul {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
   }

   ul li {
      list-style: none;
      margin-left: 2rem;
      display: flex;

      a {
         color: var(--spec-background-cl);
      }

      div {
         margin-left: 0.5rem;
         svg {
            margin-top: 6px;
         }
      }
   }

   svg {
      cursor: pointer;
      font-size: 17px;
   }

   .flex_div {
      display: flex;
      align-items: center;

      svg {
         margin-right: 0.5rem;
         fill: var(--light-gray);
      }
   }

   p {
      margin: 0;
      font-size: 16px;
   }

   .ms-1 {
      margin-right: 1rem;
   }

   .hove_parent_div {
      position: relative;
   }

   .hove_parent_div:hover .hove_div {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
   }

   .hove_div {
      position: absolute;
      width: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.1rem;
      top: 30px;
      left: -100%;
      color: var(--main-cl);
      background-color: var(--extra-dark-cl);
      border-radius: 14px;
      transition: all 0.3s ease;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
   }
`;

export const flex = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;
