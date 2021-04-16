import axios from 'axios';
import React,{useState} from 'react';
import ReactDom from 'react-dom';
import { setLocalStorage } from '../../../helpers/auth';

function Modal({isOpen,onClose}) {
    const [id,setId]=useState('');
    if(!isOpen){
        return null;
    }

    const handleChange=(e)=>{
        setId(e.target.value);
    }

    const handleSubmit=async ()=>{
        try{
            let user=JSON.parse(localStorage.getItem('user'));
            //let url=`https://www.googleapis.com/youtube/v3/activities?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=${id}&maxResults=1&part=snippet%2CcontentDetails`;
            let response= await axios.post(`${process.env.REACT_APP_API_URL}/getVideoData`,{id,email:user.email});
            //let response=await axios.post(url);
            let video=response.data.items[0]
            let videoId=video.contentDetails.upload.videoId;
            let title=video.snippet.title;
            let thumbnail=video.snippet.thumbnails.default;
            let publishedTime=video.snippet.publishedAt;
            let channelName=video.snippet.channelTitle;
            publishedTime=publishedTime.substring(0,publishedTime.indexOf('T'));

            let videoInfo={
                videoId,title,thumbnail,publishedTime,channelName
            };

            const allVideos=JSON.parse(localStorage.getItem('videos'));
            allVideos.push(videoInfo);
            setLocalStorage('videos',allVideos);

            onClose(id,videoInfo);

        } catch(err) {
            console.log(err);
        }

    }
    return ReactDom.createPortal(

        <>
            <div className='modal__overlay'/>
            <div className='modal__container'>
                <button className='modal__close' onClick={onClose}>
                    X
                </button>
                <h5>Enter the Channel Id below</h5>
                <input type='text' 
                    placeholder='Channel Id' 
                    className='modal__input'
                    onChange={handleChange}
                    value={id}/>
                <button className='channels__add-btn mt-5' onClick={()=>handleSubmit()}>
                Add Id
                </button>
            </div>
            
        </>,document.getElementById('portal')
    )
}

export default Modal
