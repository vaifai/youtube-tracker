const mongoose=require('mongoose');

const userModel=new mongoose.Schema({
    email : {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase:true
    },
    name : {
        type: String,
        required: true,
        trim: true,
    },
    resetPasswordLink: {
        type: String,
        default: ""
    },
    hashedPassword : {
        type: String,
        required: true

    },
    phone : {
        type: String,
        unique: true,
        required:true
    },
    channelIds : [],
    videoInformation:[]
},{
    timestamp: true
});

module.exports=mongoose.model('User',userModel);