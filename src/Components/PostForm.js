import React, {useState} from 'react';
import axios from 'axios';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { getToken } from './Auth';
import { CurrentUser } from '../App';
import { useHistory } from 'react-router';
import './Css/Postform.css';


const PostForm = (props) => {
    const [post, setPost] = useState('');
    const [photo, setPhoto] = useState(null);
    const[selphoto, setSelphoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const user = React.useContext(CurrentUser)

    const history = useHistory();
    
    
    const SubmitHandle = (e)=> {
        e.preventDefault();
        setIsLoading(true);
        if(!user.id){history.push('/signin');}
        
        // creating a new formdata instance for post request..image and content will be appended here 
        const formData = new FormData();
        if(photo){
            var contenttype =  'application/json';
            // appending the Image
            formData.append('photo', photo);
        }else{contenttype = 'multipart/form-data'}
        
        // appending the text
        formData.append('content', post);

        axios.post(`${props.URL}/feeds/createpost/`, formData, {
            headers: {
                'content-type': contenttype,
                'Authorization': `Token ${getToken()}`
            }
            }).then(()=>{
                setPost('');
                setIsLoading(false);
                setSelphoto(null);
                setPhoto(null);
                props.callback();

            })


      
    }
    const fileUpload = (e)=>{
        if(e.target.files){
        const photo1 = e.target.files;
        setPhoto(photo1[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(photo1[0]);

        fileReader.addEventListener("load", function () {
            setSelphoto(this.result);
          }); 
        }
    }

    return (
        <div className='box mb-3'>
            <form onSubmit={SubmitHandle}>
                <label htmlFor='exampleFormControlTextarea1' className='form-label'>Post your thoughts</label>
                <textarea onChange={(e)=>{setPost(e.target.value)}} name="post" id="exampleFormControlTextarea1" value={post} className="form-control" cols="40" rows="3"></textarea>
                
                <div className='actions'>
                    <label htmlFor='postphoto'>
                        <InsertPhotoIcon />
                    </label>
                    <input onChange={fileUpload} type="file" name="photo" id="postphoto" accept="image/*" />
                    {selphoto?
                    <img src={selphoto} alt="none" />
                    :<></>}
                    
                    {post || photo? <button className="btn btn-success" type="submit">Post</button>
                    : <button className="btn btn-success" type="submit" disabled>Post</button>}
                </div>

            </form>    
            {isLoading? <div className='text-center'><div class="spinner-border text-success" role="status">
                        </div></div>:<></>}
        </div>
        
    )
}

export default PostForm
