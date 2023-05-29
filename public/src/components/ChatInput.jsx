import React ,{useEffect,useState}from 'react'
import styled from 'styled-components'
import Picker,{EmojiStyle} from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsApple, BsEmojiSmileFill, BsFacebook} from 'react-icons/bs'

function ChatInput({message}) {

    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [msg,setmsg] = useState('')
    const [emojipop,setemojipop] =useState(false);

    
   
  const onEmojiClick = (event, emojiObject) => {
     setChosenEmoji(event);
     let message = msg;
     message+=event.emoji;  
     setmsg(message)
     
    
  };
  const handlesubmit = (event)=>{
    event.preventDefault()
    if(msg.length>0){
        message(msg)
        setmsg('')
    }
  }

  const handleChange=(e)=>{
    setmsg(e.target.value)
  }
  const handleemoji= ()=>{
    setemojipop(!emojipop)
  }

//   useEffect(()=>{
//     console.log(chosenEmoji.emoji);
// },[chosenEmoji])

  return (
    <>
        <Container>
            <div className='emojiselector'>
            <BsEmojiSmileFill onClick={handleemoji} />
            {emojipop?<Picker onEmojiClick={(event,emojiObject)=>onEmojiClick(event,emojiObject)} size="25" searchDisabled  height="24em" width="20em"/>:''}
            
            </div>
            <form className='inputContainer' method='post' onSubmit={(e)=>handlesubmit(e)}>
                <input placeholder='type your message' value={msg} onChange={(e)=>{handleChange(e)}}></input>
                <button type='submit'><IoMdSend/></button>
            </form>
        </Container>
    </>
    
  )
}

const Container = styled.div`
    background-color:#080420;
    display:grid;
    grid-template-columns:3% 97%;
    align-items:center;
    padding:1rem;
    .emojiselector{
        position:relative;
        svg{
            font-size:1.5rem;
            color:#ffff00c8;
            cursor:pointer;
        }
        .EmojiPickerReact {
        position:absolute;
        top:-400px;
        background-color:#080420;
        box-shadow:0 5px 10px #9a86f3;
        border-color:#9186f3;
        .epr-emoji-category-label{
            background-color:#080420;
        }
        .epr-body::-webkit-scrollbar{
            background-color:#9186f3;
            height:5px;
            width:5px;
            &-thumb {
                background-color:#9186f3;
            }
        }
        .emoji-categories{
            button{
                filter:contrast(0);

            }
        }
        .emoji-search{
            background-color:transparent;
            border-color:#9186f3;
        }
        .emoji-group:before{
            background-color:#080420;

        }
    }
    }
    .inputContainer{
        width:100%;
        height:70%;
        background-color:#ffffff34;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        gap:1rem;
        border-radius:2rem;

        input{
            width:90%;
            height:100%;
            border-radius:0.4rem;
            background-color:transparent;
            border: none;
            color:white;
            padding-left:0.5rem;
            font-size:1.5rem;
            &:selection{
                background:#9186f3;
            }
            &:focus{
                outline:none;
            }
        }
        button{
            display:flex;
            align-items:center;
            padding:0.3rem 2rem;
            border-radius:2rem;
            justify-content:center;
            border:none;
            svg{
                font-size:1.5rem;
                color:white;
            };
            background-color:#9a86f3;
        }
        
    }

    
    
`

export default ChatInput