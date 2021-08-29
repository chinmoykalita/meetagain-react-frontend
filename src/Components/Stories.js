import React, {useState, useEffect} from 'react';
import './Css/Stories.css';
import { Avatar } from '@material-ui/core';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { CommentOutlined } from '@material-ui/icons';
import { ShareOutlined } from '@material-ui/icons';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';

const Stories = (props) => {
    const [isLiked, setIsLiked] = useState()

    useEffect(() => {
        setIsLiked(props.is_liked);
        
    }, [])

    const handleLike = (e) =>{
        console.log('clicked');
        if(e.target.id === 'liked'){setIsLiked(false)}
        if(e.target.id === 'notliked'){setIsLiked(true)}
    }

    return (
        <>

        <div className='boxpost'>

            <div className="head">
                <Link className='link' to={props.username&&`/profile/${props.username}`}><Avatar src={props.image} /></Link>
                <div className="user_who_posted">
                    <Link className='link' to={`/profile/${props.username}`}><p><b>{props.name}</b></p></Link>
                    <p>{props.date}</p>
                </div>
            <hr />
            </div>

            <div className="post_content">
                <p>{props.text}
                </p>
                {props.pimg &&
                <img src={props.pimg} alt="" srcset="" />}
            </div>

            <div className="action_buttons">
                {isLiked?

                <p onClick={handleLike} id='liked'>
                <FavoriteIcon />                    
                {props.likes}</p>
                :
                <p onClick={handleLike} id='notliked'>
                    <FavoriteBorderOutlinedIcon />
                {props.likes}</p>
                }
                

                <p><CommentOutlined />21</p>
                <p><ShareOutlined />0</p>
            </div>
        </div>






      </>
    )
}

export default Stories
