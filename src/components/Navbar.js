import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { 
    isAuthenticated,
    loginWithRedirect,
    logout,
    user
  } = useAuth0();

  // return user-obj if isAuthenticated = true
  const UserHere = isAuthenticated && user;
  // console.log(UserHere);

  return (
    <Wrapper>
      {UserHere && user.picture && <img src={user.picture} alt={user.name} />}
      {UserHere && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {UserHere ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          <strong>LOG OUT</strong>
        </button>
      ) : (
        <button onClick={loginWithRedirect}>
          <strong>LogIn</strong>
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 2rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
    font-size: 1.1rem;
    background: transparent;
  }
  img {
    width: 37px !important;
    height: 37px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border-radius: 5px;
    margin-left: 11px;
    color: var(--clr-primary-4);
    border: none;
    border-color: transparent;
    padding: 0.5rem 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    background: var(--clr-primary-5);
    color: var(--clr-white);
    transition: var(--transition);
    cursor: pointer;
  }
  button:hover {
    background: var(--clr-primary-7);
    color: var(--clr-primary-1);
  }
`;

export default Navbar;