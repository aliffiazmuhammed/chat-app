import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {loginRoute }from '../utils/APIRoutes'

function Login() {
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[])

  const vallidationFormat = {
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }

  

  const [userData,setUserData] = useState({
    username:"",
    password:""
  })

  const handleChange = (event)=>{
    setUserData(
      {...userData,[event.target.name]:event.target.value}
    )
  }
  const handleSubmit = async(event)=>{
    event.preventDefault();
    const userValidated = await userValidation()
    console.log(userValidated)
    if(userValidated === true){
      navigate('/')
    }else{
      toast.error(userValidated, vallidationFormat );
    }
    
  }

  const userValidation = async()=>{
    const {username,password} = userData;
    const {data} = await axios.post(loginRoute,{
      username,
      password,
  })
  if(data.status === true){
    localStorage.setItem('chat-app-user',JSON.stringify(data.user));
    return true;
  }else{

    return data.msg
  }

  }
  return (
    <>
    <FormContainer>

    <form onSubmit={(event)=>{handleSubmit(event)}}>
    <div className='brand'>
          <img src={logo} alt=''/>
          <h1>snappy</h1>
        </div>
        <input
          type='text'
          name='username'
          placeholder='username'
          onChange={(event)=>{handleChange(event)}}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          onChange={(event)=>{handleChange(event)}}
        />

        <button type='submit'>Login</button>
        <span>Don't have an account?<Link to="/register"> REGISTER</Link></span>
    </form>
        
    </FormContainer>
    <ToastContainer/>
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
            input:focus{
            background: transparent;
            }
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

export default Login