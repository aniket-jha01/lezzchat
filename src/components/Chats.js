import React,{useRef,useEffect,useState} from 'react';
import  { useHistory } from 'react-router-dom';
import { Avatar, ChatEngine } from 'react-chat-engine';
import {auth} from '../firebase';
import { useAuth } from '../contexts/Authcontext';
import axios from 'axios';



const Chats=()=>{

    const history =useHistory();
    const {user} = useAuth();
    const [loading,setLoading]=useState(true);

    console.log(user);
    const handleLogout=async()=>{
        await auth.signOut();
        history.push('/');
    }

    const getfile = async(url)=>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data],"userphoto.jpg",{type:'image/jpeg'})
    }

    useEffect(()=>{
      if(!user)
      {
          history.push('/');
      }
      axios.get('https://api.chatengine.io/users/me',{
          headers:{
              "projectID":"3c457e94-c53d-4121-a096-4ccf67d75979",
              "user-name":user.email,
              "user-secret":user.uid,

          }
      })
      .then(()=>{
        setLoading(false);
   
      })
      .catch(()=>{
          let formdata = new FormData();
          formdata.append('email', user.email);
          formdata.append('username', user.email);
          formdata.append('secret', user.uid);
        
          getfile(user.photoURL)
          .then((avatar)=>{
              formdata.append('avatar',avatar,avatar.name)

              axios.post('https://api.chatengine.io/users/',
              formdata,
              {headers:{"private-key":"1edcfeda-6148-4174-9279-0affc5ec9576"}} 
              )
              .then(()=>setLoading(false))
              .catch((error)=> console.log(error))
          })
        
      })
    },[user,history])

  

    return(
    <div className='chats-page'>
        <div className="nav-bar">
            <div className="logo-tab">
                Lezzchat
            </div>
            <div onClick={handleLogout} className="logout-tab">
                Logout
            </div>
        </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID="3c457e94-c53d-4121-a096-4ccf67d75979"
        userName={user.email}
        userSecret={user.uid}

      
      />


    </div>
    )
}
export default Chats;