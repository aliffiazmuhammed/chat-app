import React, { useEffect, useState ,useRef} from 'react'
import styled from 'styled-components'
import ChatDisplay from './ChatDisplay'
import ChatInput from './ChatInput'
import axios from 'axios'
import { v4 as uuidv4 } from "uuid";
import { postmsgRoute,getmsgRoute} from '../utils/APIRoutes'

function ChatContainer({currentchat,currentuser,socket}) {

    const [msg,setmsg] = useState('')
    const [allmessages,setAllMessages] = useState([])
    const scrollRef = useRef(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(()=>{
        const getmessages = async()=>{
            const data = await axios.post(getmsgRoute,{
                to:currentchat._id,
                from:currentuser._id,
            });

            setAllMessages(data.data)
        }
        getmessages();
    },[currentchat])

    const handlemsg = async(msgs)=>{

        try {

            console.log('hello')
            socket.current.emit("send-msg", {
                to: currentchat._id,
                from: currentuser._id,
                msgs,
              });
        const {data} = await axios.post(postmsgRoute,{
            to:currentchat._id,
            from:currentuser._id,
            msg:msgs
        })
        const msgss = [...allmessages];
        msgss.push({ fromself: true, message: msgs });
        setAllMessages(msgss);

        console.log(data.msg)

        } catch (error) {
            console.log(error.response)
        }
        
    }
    useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromself: false, message: msg });
          });
        }
      }, []);
    
      useEffect(() => {
        arrivalMessage && setAllMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);
    
      useEffect(() => {
        console.log(scrollRef)
        if(scrollRef.current !== null){
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
        
      }, [allmessages]);
    

  return (
    <>
 <Container>
        <div className='header'>
            <div className='username'>
                <h2>{currentchat.username}</h2>
            </div>
            <div className='useravatar'>
                <img src={`data:image/svg+xml;base64,${currentchat.avatarImage}`} alt='avatar image'/>
            </div>
        </div>
        <div className='display my_scroll_div'>
            {
                allmessages.map((message)=>{
                    return(
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromself? 'sended':'recieved'}`}>
                                <div className='content'>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <ChatInput message={handlemsg}/>
    </Container>
    </>
   
    
  )
}

const Container = styled.div`
    display:grid;
    grid-template-rows: 10% 80% 10%;
    overflow:hidden;
    .header{
        display:flex;
        justify-content:center;
        align-items:center;
        gap:1rem;
        padding:3rem;
        .username{
            color:white;
        }
        img{
            height:3rem;
        }
    }
    .display::-webkit-scrollbar {
        background-color:#9186f3;
            height:5px;
            width:5px;
            
}
.display::-webkit-scrollbar-thumb{
    background-color:#9186f3;
}
    .display{
        display:flex;
        flex-direction:column;
        padding:1rem 2rem;
        color:white;
        gap:1rem;
        overflow-y: scroll;
        scrollbar-width: thin;
        
        .message{
            display:flex;
            align-items:center;
            font-size:1.5rem;

            .content{
                padding:1rem;
                border-radius:0.5rem;
                overflow-wrap:break-word;
            }
        }
    }
    .sended{
        display:flex;
        justify-content:flex-end;
        .content{
            background-color:#4f04ff21;
        }
            }  
    .recieved{
        display:flex;
        justify-content:flex-start;
        .content{
            background-color:#9900ff20;
        }
            }     
    
`

export default ChatContainer