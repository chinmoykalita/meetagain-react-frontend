import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';
import './Css/Feeds.css';

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '60f3d810025f9d41607e155b';



const Feeds = () => {
    const [data, setData] = useState()
    const [user, setUser] = useState()
    const [userid, setUserid] = useState()
    
    const getUserData = async ()=>{
        try{
            const res = await axios.get(`${BASE_URL}/user/60d0fe4f5311236168a109ca/post?limit=5`, { headers: { 'app-id': APP_ID } });
            const users = await axios.get(`${BASE_URL}/user?limit=5`, { headers: { 'app-id': APP_ID } });
            // console.log(res.data);
            setData(res.data);
            setUser(users.data)
        } catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    function userPost(e){
        setUserid(e)
        console.log(userid)
    }

    function getPost(sara1) {
        return(
            <>
            <Post 
                name={`${sara1.owner.firstName} ${sara1.owner.lastName}`} 
                image={sara1.owner.picture} 
                likes={sara1.likes}
                text = {sara1.text}
                pimg ={sara1.image}
                date = {sara1.publishDate}
                
            />
            <br />
            </>
        );
    }

    function getUsers(user){
        return(
            <ul>
                <li onClick={userPost(user.id)}>{`${user.firstName} ${user.lastName}`}</li>
            </ul>
        )
    }

    if(data && user){
        
    return (
        <div className='main'>
        <div className="users">
            {user.data.map(getUsers)}
        </div>

        <div className='post'>
            <div>
            {data.data.map(getPost)}
            </div>
        </div>

        </div>
    )}
    else{return(<h2>loading...</h2>)}
}

export default Feeds
