import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {avatarRoute }from '../utils/APIRoutes'
import { Buffer } from 'buffer';



function SetAvatar() {
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
          navigate('/login');
        }
      },[])
    const navigate = useNavigate();

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

    const [avatars,setAvatar] = useState([]);
    const [isloading,setIsloading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);

    const avatarapi = "https://api.multiavatar.com/"

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = [];
            for (let i = 0; i < 4; i++) {
                //?apikey=ShPdyK82MWiZpm
              const response = await axios.get(`${avatarapi}${Math.round(Math.random() * 10000)}`);
              const buffer = Buffer.from(response.data);
              data.push(buffer.toString('base64'));
            }
            console.log(data);
            setAvatar(data);
            setIsloading(false)
          } catch (error) {
            console.log("An error occurred while fetching data:", error);
            // Handle the error appropriately
          }
        };
      
        fetchData();
      }, []);
      
    // console.log(avatars)
        
    const setProfile= async()=>{
        if(selectedAvatar === undefined){
            toast.error('profile picture not selected', vallidationFormat );
        }else{

            try {
                const imageData = avatars[selectedAvatar]

            const user = await JSON.parse(localStorage.getItem('chat-app-user'))
            console.log(user)
            
            const {data} = await axios.post(`${avatarRoute}/${user._id}`,{imageData})

            if(data.status){
                user.avatarImage=imageData
                user.isAvatarImageSet=true
                localStorage.setItem('chat-app-user',JSON.stringify(user))
                navigate('/');
            }else{
                toast.error('failed to set profile', vallidationFormat );
            }
            } catch (error) {
                console.log(error)
            }
            

        }
    }


  return (
    <>
        {isloading?<Container>
            <img src={loader} className='loader'/>
        </Container>:(
            
        
        <Container>
            <div className='heading'>
                <h1>pick your avatar</h1>
            </div>

            <div className='avatars'>
                {
                    avatars.map(
                        (avatar,index)=>{
                            return(
                                <div
                                key={index}
                                className={`avatar ${selectedAvatar === index ? "selected":" "}`}
                                >
                                    <img src={`data:image/svg+xml;base64,${avatar}`} 
                                         onClick={()=>{setSelectedAvatar(index)}}
                                    />
                                </div>
                            )
                        }
                    )
                }
            </div>
            <button onClick={()=>{setProfile()}}>Confirm avatar</button>
        </Container>)}
        <ToastContainer/>
    </>
  )
}

const Container = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:1rem;
    background-color:#131324;
    .loader{
        max-inline-style:100%;
    }
    h1{
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
    .avatars{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        gap:1rem;
        
        .avatar{
            border:0.4rem solid transperant;
            border-radius:5rem;
            padding:1rem;
            img{
                height:6rem;
            }
            
        }
        .selected{
                border:0.4rem solid #4e0eff;
            }
    }
`

export default SetAvatar