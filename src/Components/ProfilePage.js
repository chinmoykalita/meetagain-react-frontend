import React, {useState, useEffect} from 'react';
import './Css/ProfilePage.css';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Stories from './Stories';
import {useParams} from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

const URL = "http://localhost:8000/api";

const ProfilePage = () => {
    let { id } = useParams();
    const [account, setAccount] = useState();
    const [feeds, setFeeds] = useState()

    const getTheUser = ()=>{
        fetch(`${URL}/users/${id}/`)
            .then(res=>res.json())
                .then(r=>setAccount(r))
    }
    const getTheFeeds = ()=>{
        fetch(`${URL}/users/${id}/posts/`)
            .then(res=>res.json())
                .then(r=>setFeeds(r))
    }

    useEffect(()=>{
        getTheUser();
        getTheFeeds();
        console.log(feeds);
    }, [])


    return (
        <div className="container">

            {account? 
            <div className="topel">                
                <Avatar alt={account.username} src={account.profile[0].photo} className='avatar' />
                <h2>{`${account.first_name} ${account.last_name}`}</h2>
            </div>:<></>}

            <div className="infos">
                <Card className='info' variant="outlined">
                    <h4>Info</h4>
                    {account?
                    <ul>
                        <li><h6>Date of birth:</h6>{account.profile[0].dob}</li>
                        <li><h6>Date Joined:</h6> {account.date_joined}</li>
                    </ul>:<></>}
                </Card>
                <Card className="feeds" variant="outlined">
                    <h3>feeds</h3>

                    {feeds?
                    feeds.map((post)=>{return(
                     <div className="postcont">   
                    <Stories
                    name={`${post.author.first_name} ${post.author.last_name}`}
                    username={post.author.username}
                    likes={post.number_of_likes}
                    image={post.author.profile[0].photo}
                    text={post.content}
                    pimg={post.photo_url}
                    date={post.time} /> </div>)}) : <LinearProgress />}
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage
