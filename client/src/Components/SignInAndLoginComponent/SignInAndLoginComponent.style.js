import styled from 'styled-components';

export const div = styled.div`
   height: 100%;

   .flex {
      display: flex;
      height: 100%;
   }

   .image_prv {
      width: 47%;
      background-image: url(https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80);
      background-position: center;
      background-size: cover;
      border-radius: 8px 0 0 8px;
   }

   .content_div {
      width: 50%;
      padding: 1rem;

      h1 {
         font-size: 55px;
         font-weight: 400;
         margin: 0;
         color: var(--main-cl);
      }

      p {
         color: var(--main-cl);
         margin-bottom: 2rem;
      }
   }

   span {
      color: var(--spec-brand-link-text);
      margin-bottom: 0.8rem;
   }
`;
