import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <Wrapper>
            <div>
                <h1>404</h1>
                <h3>Sorry, the page you tried cannot be found</h3>
                <Link to='/' className='btn' >
                    <button>Back Home Page</button>
                </Link>
            </div>            
        </Wrapper>
    )
};

// Custom Style section component
const Wrapper = styled.section
    `   min-height: 100vh;
        display: grid;
        place-items: center;
        background: var(--clr-primary-10);
        text-align: center;
        h1 {
            font-size: 9.5rem;
            color: red;
        }
        h3 {
            color: var(--clr-grey-3);
            margin-bottom: 1.5rem;
        }
        button {
            padding: 10px 24px;
            background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
            color: #fff;
            border: none;
            cursor: pointer;
            box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
        }
    `
;

export default Error
