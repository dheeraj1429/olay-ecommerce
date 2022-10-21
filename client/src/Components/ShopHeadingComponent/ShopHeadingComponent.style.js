import styled from 'styled-components';

export const div = styled.div`
   padding: 2rem 0;

   .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   .line_div {
      width: 35%;
      border-top: 1px solid var(--spec-text-secondary);
   }

   .headingSpace {
      text-align: center;
      margin: 0;
   }

   p {
      text-align: center;
   }

   .view {
      cursor: pointer;
      font-size: 14px;
      color: var(--spec-static-brand-black);
   }

   hr {
      border: transparent;
      border-top: 1px solid var(--smooht-gray-cl);
   }
`;
