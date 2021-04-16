const {google}=require('googleapis');
const fetch=require('node-fetch');
const axios=require('axios');
const User=require('../models/userModel');

exports.getVideoData=async(req,res)=>{
    let email=req.body.email;
    let user=await User.findOne({email});
    user.channelIds.push(req.body.id);
    //await resp.save();
    let url=`https://www.googleapis.com/youtube/v3/activities?key=${process.env.YOUTUBE_API_KEY}&channelId=${req.body.id}&maxResults=1&part=snippet%2CcontentDetails`;
    fetch(url).then(resp=>resp.json()).then(response=>{
        //console.log(response);
        let video=response.items[0]
        let videoId=video.contentDetails.upload.videoId;
        let title=video.snippet.title;
        let thumbnail=video.snippet.thumbnails.default;
        let publishedTime=video.snippet.publishedAt;
        let channelName=video.snippet.channelTitle;
        publishedTime=publishedTime.substring(0,publishedTime.indexOf('T'));
        user.videoInformation.push({
            videoId,title,thumbnail,publishedTime,channelName
        });
        user.save();
        res.status(200).send(response)
    });
}

exports.removeVideoData=async(req,res)=>{
    try {
    let email=req.body.email;
    let id=req.body.id;
    let user=await User.findOne({email});
    let channels=user.channelIds;
    let videos=user.videoInformation;

    const index = channels.indexOf(id);
    if(index > -1) {
        channels.splice(index,1);
        videos.splice(index,1);
    }
    user.channelIds=channels;
    user.videoInformation=videos;
    console.log(user);
    await user.save();

    return res.status(200).send({});
    } catch(err){
        return res.status(400).json({
            error:'An error occured'
        });
    }
}