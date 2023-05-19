// eslint-disable-next-line 
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../assets/logo.svg'

function Register() {


    const handleSubmit = (event)=>{
        event.preventDefault();
        alert("form");
    }

    const handleChange = (event)=>{}
  return (
    <>
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className='brand'>
                    <img src={logo} alt='' />
                    <h1>snappy</h1>
                </div>

                <input
                type='text' 
                placeholder='name'
                name='name'
                onChange={(event)=>handleChange(event)}
                />

                <input
                type='email' 
                placeholder='email'
                name='email'
                onChange={(event)=>handleChange(event)}
                />

                <input
                type='password' 
                placeholder='password'
                name='password'
                onChange={(event)=>handleChange(event)}
                />
                <input
                type='password' 
                placeholder='confirm password'
                name='confirmPassword'
                onChange={(event)=>handleChange(event)}
                />

                <button type='submit'>Create Account</button>
                <span>Already have an account ? <Link to="/login">login</Link></span>

            </form>
        </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:1rem;
    background-color:#131324;
    .brand{
        display: flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
        height:5rem;
    }
        }

        form{
            display:flex;
            flex-direction : column;
            align-items:center;
            justify-content:center;
            gap:2rem;
            padding: 3rem 5rem;
            background-color:#00000076;
            border-radius:2rem;
        }
        h1{
            color: white;
            text-transform:uppercase;
        }
        input{
            padding:0.4rem;
            border-radius:0.4rem;
            background: transparent;
            border-color: white;
            border: 0.1rem solid #4e0eff;
            width:100%;
            padding:0.6rem;
            color:white;
        }
        button{
            padding:0.3rem;
            border:none;
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
        }
        button:hover{
            background-color:white;
            color:black;
        }
        span{
            color:white;
        }
        a{
            text-decoration:none;
            color:#4e0eff;
        }
    
`;

export default Register