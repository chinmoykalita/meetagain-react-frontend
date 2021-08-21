import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return(
        <div>
            <br />
            <br />
            <br />

            <h4 className='text-center my-3'>Welcome to Cwitter: For coders and Darrangians</h4>
            <br />
            <Link className='text-center my-3' to='/feeds'>
                <button className='btn btn-success'>Join the community</button>
            </Link>
        </div>
    )
}
export default Home