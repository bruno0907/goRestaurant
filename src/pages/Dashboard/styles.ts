import styled from 'styled-components';

export const FoodsContainer = styled.div`
  width: 100%;  
  margin: 0 auto;
  padding: 40px 80px;
  margin-top: -140px;

  @media(max-width: 640px){ padding: 40px 20px }

  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(355px, 1fr));  
  
  grid-gap: 32px;
`;
