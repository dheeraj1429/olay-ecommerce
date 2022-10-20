import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 0;
   right: ${(props) => (props.show ? '0' : '-300px')};
   width: 300px;
   height: 100%;
   padding: 1rem;
   background-color: var(--main-cl);
   box-shadow: 0 0 10px 1px var(--smooht-gray-cl);
   z-index: 100;
   transition: all 0.3s ease;

   svg {
      cursor: pointer;
   }
`;
