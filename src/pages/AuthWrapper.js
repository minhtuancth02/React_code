import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import loadingGif from '../images/preloader.gif';
import styled from 'styled-components';

function AuthWrapper({ children }) {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <h2>Wait For Loading!</h2>
        <img src={loadingGif} alt='spinner' />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h1>Oops... {error.message}</h1>
      </Wrapper>
    );
  }
  
  return <>{ !error && children }</>;
}

// styled component
const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;

export default AuthWrapper;