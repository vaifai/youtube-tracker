import axios from 'axios';
import React from 'react'
import { setLocalStorage } from '../../../helpers/auth';

function SingleItem({id,history,videoInfo}) {

    const removeChannel=async (id)=>{
        let channels=JSON.parse(localStorage.getItem('channelIds'));
        let videos=JSON.parse(localStorage.getItem('videos'));
        let user=JSON.parse(localStorage.getItem('user'));
        const index = channels.indexOf(id);
        if(index > -1) {
            channels.splice(index,1);
            videos.splice(index,1);
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/deleteVideoData`,{id,email:user.email});
        console.log('removed');

        setLocalStorage('channelIds',channels);
        setLocalStorage('videos',videos);
        //history.push('/channels');
        window.location.reload();
    }

    const videoURL=`https://youtube.com/watch?v=${videoInfo.videoId}`

    return (
        <div className='row channels__single-item mb-3'>
            {/* <button className='channels__remove' onClick={()=>removeChannel(id)}>
                Remove Channel
            </button>
            <p className='channels__channel-name mr-4'>{videoInfo.title}</p>
            <p className='channels__channel-url mr-4'>{videoInfo.thumbnail.url}</p>
            <p className='channels__channel-link mr-4'>Link</p>
            <p className='mr-4'>{id}</p> */}
            <div className='col-md-4 col-sm-12'>
                <a href={videoURL}><img src={videoInfo.thumbnail.url} alt='Img'/></a>
                <p className='channel__time'>Date : <em>{videoInfo.publishedTime}</em></p>
            </div>

            <div className='col-md-5 col-sm-7 text-center text-underline'>
                <h5><u>{videoInfo.channelName}</u></h5>
                <h6>{videoInfo.title}</h6>
            </div>

            <div className='col-md-3 col-sm-5'>
                <button className='channels__remove' onClick={()=>removeChannel(id)}>
                    Remove Channel
                </button>
            </div>
            

        </div>
    )
}

export default SingleItem
