import React, {useState, useEffect} from 'react';
import Stories from './Stories';
import './Css/Feeds.css';
import axios from 'axios';
import PostForm from './PostForm';
import { Link } from 'react-router-dom';


const Feeds = (props) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getPostData = async ()=>{
        const res = await axios.get(`${props.API_URL}/feeds/`);
        const res2 = await axios.get(`${props.API_URL}/users/`);
        setData(res.data);
        setUser(res2.data);
        setIsLoading(false)
    }

    useEffect(() => {
        getPostData()
    }, [])

    
    

    return (
        <div className="main">
         <div className="users">

             {isLoading?
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                 :user.map((us)=>{return(
                     <ul>
                     <Link to={`/${us.username}`}><li>{us.first_name+' '+us.last_name}</li></Link>
                     </ul>
                 )
                 })}
            
        </div>   
        <div className='post'>
            <div>
                <div className="postbox">
                    <PostForm callback={getPostData} URL={props.API_URL} isAuth={props.isAuth} />
                </div>
                <h2>Feeds</h2>
                {isLoading?
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                :data.map((post)=>{
                    return(
                        <div className="postcont">
                        <Stories
                        name={`${post.author.first_name} ${post.author.last_name}`}
                        username = {post.author.username}
                        likes={post.number_of_likes}
                        image={post.author.profile[0].photo}
                        text={post.content}
                        pimg={post.photo_url}
                        date={post.time}
                        is_liked={true}
                        />
                        </div>
                    )
                })}
                
            </div>
            
        </div>
        </div>
    )
}
   







export default Feeds
