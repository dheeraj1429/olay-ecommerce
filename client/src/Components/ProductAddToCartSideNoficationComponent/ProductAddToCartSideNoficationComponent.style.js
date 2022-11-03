import styled from 'styled-components';

export const div = styled.div`
   position: fixed;
   bottom: 10px;
   right: ${(props) => (props.show ? '80px' : '-400px')};
   width: 300px;
   background-color: var(--main-cl);
   box-shadow: 0 0 10px 1px #e1e1e1;
   height: 65px;
   padding: 0.2rem 0.7rem;
   display: flex;
   align-items: center;
   border-radius: 8px;
   transition: all 0.3s ease;
   z-index: 100;

   .imagePrev {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      margin-right: 0.8rem;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }

   .content_div {
      display: flex;
      align-items: center;
      p {
         margin: 0;
      }
   }
`;
