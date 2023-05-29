import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'

function Contact({contacts,user,change}) {
  const [currentSelected,setCurrentSelected]=useState(undefined)
  const handleselection = (index,contact)=>{
    setCurrentSelected(index)
    change(contact)
  }
  return (
    
        <Constainer>
            <div className='brand'>
              
            <img src={logo} />
            <h1>snappy</h1>
              
            </div>
            <div className='contacts'>
              {
                contacts.map((contact,index)=>{
                  return(
                    <div className={`contact ${currentSelected===index?"selected":" "}` } onClick={()=>{handleselection(index,contact)}} key={index}>
                      <div className='avatar'>
                      <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
                      <h3>{contact.username}</h3>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='user'>
              <img src={`data:image/svg+xml;base64,${user.avatarImage}`} className='userimg'/>
              <h2>{user.username}</h2>
            </div>
        </Constainer>
   
  )
}

const Constainer = styled.div`
  display:grid;
  grid-template-rows: 10% 75% 15%;
  overflow:hidden;
  .contacts{
    padding:0.5rem;
    flex-direction:columns;
    &::-webkit-scrollbar{
      width:0.5rem;
      &-thumb{
        background-color:#ffffff39;
        width:0.1rem;
        border-radius:1rem;
      }
    }
    .contact{
    diaplay:flex;
    padding:0.5rem;
    
  }
  }
  
  img{
    height:2rem;
  }
  h1{
    color:white;
  }
  h2{

    color:white;
  }
  h3{
    color:white;
  }
.avatar{
  display:flex;
  justify-content:flex-start;
  align-items:center;
  gap:1rem;
  background-color:#ffffff39;
  width:80%;
  padding:0.5rem;
  cursor:pointer;
  border-radius:0.2rem;

}
  .brand{
    
    display:flex;
    justify-content:flex-start;
    align-items:center;
    padding:0.5rem;
    gap:0.3rem;
  }
  
  .user{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    gap:1rem;
    background-color:#0d0d30;
    width:80%;
    border-radius:0.2rem;
    padding:2rem;
    .userimg{
    height:5rem;
  }
  }
  .selected{
    background-color:#9186f3;
    width:80%;
  }
  
`

export default Contact