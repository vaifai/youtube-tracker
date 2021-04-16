import React,{useState,useEffect} from 'react'
import Header from '../../MainBlock/Header/Header'
import SidebarComponent from '../../Sidebar/SidebarComponent';
import './channel.scss';
import SingleItem from './SingleItem';
import Modal from './Modal';
import { setLocalStorage } from '../../../helpers/auth';
import { Redirect } from 'react-router-dom';

function Channel({history}) {

    
    const [isModalOpen,setModalStatus]=useState(false);
    const allChannels=JSON.parse(localStorage.getItem('channelIds'));
    const allVideos=JSON.parse(localStorage.getItem('videos'));

    const redirectChannels=(id)=>{
        let channels=JSON.parse(localStorage.getItem('channelIds'));
        channels.push(id);
        setLocalStorage('channelIds',channels);
        //history.push('/channels');
        window.location.reload();
    }
    
    
    return (
        <div className='dashboard__container'>
            <div className='row'>
                <SidebarComponent/>
                <div className='dashboard__mainContent col-md-9 col-lg-10'>
                    <Header title='Channels'/>
                    <div className='channels__container'>
                        <div className='row justify-content-between mb-5'>
                            <p className='channels__tracker-para'>
                                Your Trackers
                            </p>

                            <button className='channels__refresh'>
                            <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
                                Refresh
                            </button>

                        </div>

                        <div className='channels__list'>
                            {allVideos.length > 0 && allChannels.map((channel,index)=><SingleItem id={channel} history={history} videoInfo={allVideos[index]}/>)}
                        </div>

                        <button className='channels__add-btn' onClick={()=>{setModalStatus(true)}}>
                        <i class="fa fa-plus mr-2" aria-hidden="true"></i>
                            Add Channel
                        </button>
                        
                       
                        <Modal isOpen={isModalOpen} onClose={(id,videoInfo)=>{setModalStatus(false);redirectChannels(id)}}/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Channel
