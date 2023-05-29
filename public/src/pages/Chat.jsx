import React,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { host } from '../utils/APIRoutes'
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom'
import {getUsersRoute} from '../utils/APIRoutes'
import Contact from '../components/Contact'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'

function Chat() {

  const navigate = useNavigate();
  const socket = useRef();
  const [user,setUser] = useState({});
  const [contacts,setContacts] = useState([]);
  const [changechat,setChangeChat] = useState(undefined)

  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login');
    }
  },[])

  const handleChange = (chat)=>{
    setChangeChat(chat)
  }

  

  useEffect(()=>{
    const getuserdata = async()=>{
      try {
        const users=await JSON.parse(localStorage.getItem('chat-app-user'));
        console.log(users)
        setUser(users) 
      } catch (error) {
        console.log(error)
      }
      
      // if(user.isAvatarImageSet === false){
      //   navigate('/setavatar')
      // }
    }
    getuserdata();
    
  },[])


  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);
  // const getuserdata = async()=>{
  //   try {
  //     const users=await JSON.parse(localStorage.getItem('chat-app-user'));
  //   setUser(users) 
  //   console.log(user)
  //   } catch (error) {
  //     console.log(error)
  //   }
    
  //   // if(user.isAvatarImageSet === false){
  //   //   navigate('/setavatar')
  //   // }
  // }
  // getuserdata();

  useEffect(()=>{
    const getallusers = async()=>{
      const data = await axios.get(`${getUsersRoute}/${user._id}`,{user});
      
      setContacts(data.data);
    }
    getallusers();
  },[user])

  return (
    
    <>
      <Container>
        <div className='container'>
          <Contact contacts={contacts} user={user} change = {handleChange}/>
          {
            changechat === undefined?<Welcome user={user}/>:<ChatContainer socket={socket} currentchat = {changechat} currentuser={user}/>
          }
          
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  background-color:#131324;
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  width:100vw;
  .container{
    height:85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns: 25% 75%;
    .contacts{
      
    }

  }
`

export default Chat