const crypto=require('crypto');

var utils={};

utils.hash=(str)=>{
    if(typeof(str) === 'string' && str.length > 0){
        var hash=crypto.createHmac('sha256',process.env.HASHING_SECRET).update(str).digest('hex');
        return hash;
    } else {
         return false;
     }
}

module.exports=utils;