import React from 'react'
import Card from '../components/Card';
import Followers from './Follower';
import styled from 'styled-components'

const User = () => {
    return (
        <section className='section'>
            <Wrapper className='section-center'>
                <Card />
                <Followers />
            </Wrapper>
    </section>
    )
};

const Wrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  /* align-items: start; */
`;

export default User
