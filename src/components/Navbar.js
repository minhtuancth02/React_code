import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { BsBoxArrowInRight } from "react-icons/bs";

const Navbar = () => {
  const { 
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    isLoading,
  } = useAuth0();

  // return user-obj if isAuthenticated = true
  const UserHere = isAuthenticated && user;
  // console.log(UserHere);

  return (
    <Wrapper>
      {UserHere && user.picture && (<img src={user.picture} alt={user.name} />) }
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
          LogOut
        </button>
      ) : (
        <button onClick={loginWithRedirect}> LogIn<BsBoxArrowInRight style={{paddingTop:'0.8px'}} /> </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1.5rem;
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
    font-size: 1.1rem
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-primary-4);
    cursor: pointer;
    justify-content: right
  }
  button:hover {
    text-shadow: 2px 2px 3px var(--clr-grey-7);
  }
`;

export default Navbar;