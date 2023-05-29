import React from 'react'
import styled from 'styled-components'
import robo from '../assets/robot.gif'



function Welcome({user}) {
  return (
    <Container>
        <img src={robo} />
        <h2>Welcome <span>{user.username}</span></h2>
        <h3>Select a contact to start chatting</h3>
    </Container>
  )
}

const Container= styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    h2,h3{
        color:white;
    }
    img{
        height:20rem;
    }
    span{
        color:#4e00ff; 
    }
`
export default Welcome