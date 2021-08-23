import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <div class="container">
            <h4 className='text-center'>Welcome to MeetAgain Community</h4>
            <br />
            <Link className='text-center my-3' to='/feeds'>
                <button className='btn btn-success text-center'>Join the community</button>
            </Link>
            
        </div>
    )
}
export default Home