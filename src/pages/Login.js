import React from 'react'
import styled from 'styled-components'
import loginImg from '../images/login-img.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { BsBoxArrowInRight } from 'react-icons/bs';


const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 1.7rem;
    text-shadow: 4px 4px 6px var(--clr-grey-6);
  }
`;

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Wrapper>
            <div className='container'>
                <img src={loginImg} alt='github user' />
                <h2>Github User</h2>
                <button className='btn' 
                        onClick={loginWithRedirect}>
                    <strong>LogIn</strong><BsBoxArrowInRight style={{padding:'0.1px'}} />
                </button>
            </div>  
        </Wrapper>
    )
}

export default Login
