const User=require('../models/userModel');
const expressJwt=require('express-jwt');
const _=require('lodash');
const {OAuth2Client}=require('google-auth-library');
const fetch=require('node-fetch');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const {errorHandler}=require('../helpers/dbErrorHandling');
const {hash}=require('../helpers/utils');
const nodemailer=require('nodemailer');
const {google}=require('googleapis');


exports.registerController= async (req,res)=>{
    const {name,email,password,phone}=req.body;
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0];
        return res.status(422).json({
            error:firstError
        });
    } else {
        await User.findOne({
            email
        }).exec((err,user)=>{
            if(user){
                return res.status(400).json({
                    error:'Email is already registered'
                });
            }
        })

        //Generate Token

        const token=jwt.sign({
            name,email,password,phone
        },
        process.env.JWT_ACCOUNT_ACTIVATION,
        {
            expiresIn: '30m'
        });
        
        const OAuth2Client=new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET,process.env.REDIRECT_URI)
        OAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});
        //console.log(OAuth2Client);

        const sendMail=async()=>{
            try {
                const accessToken=await OAuth2Client.getAccessToken();
                const transport=nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user:'gamer.lazy.coder@gmail.com',
                        clientId:process.env.GOOGLE_CLIENT_ID,
                        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                        refreshToken:process.env.REFRESH_TOKEN,
                        accessToken:accessToken

                    }
                })

                const mailOptions={
                    from: 'gamer.lazy.coder@gmail.com',
                    to:email,
                    subject: 'Hello from gmail using api',
                    text:'Random text',
                    html: `
                    <h1>Please use the following to activate your account</h1>
                    <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                    <hr />
                    <p>This email may containe sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>`
                
                }

                const result=await transport.sendMail(mailOptions);
                console.log(result);

            } catch(err) {
                console.log(err);
            }
        }
        await sendMail().then(result=>res.status(200).send(`Email has been sent to ${email}`)).catch(error=>res.status(200).send('An error occured. Cannot send email'));
  
    }
}

exports.activationController=(req,res)=>{
    const {token}=req.body;

    if(token){
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    error: 'Expired token. Signup again'
                })
            } else {
                const {
                    name,email,password,phone
                } = jwt.decode(token);

                const hashedPassword=hash(password);

                const user=new User({name,email,hashedPassword,phone,channels:[],videoInformation:[]});
                user.save((err,user)=>{
                    if(err){
                        console.log(err);
                        return res.status(401).json({
                            error:errorHandler(err)
                        })
                    } else {
                        return res.json({
                            success:true,
                            message: 'Signup success',
                            user
                        })
                    }
                })
            }
        })
    } else {
        res.json({
            error:'Error. Please try again later'
        })
    }
}

exports.loginController=async (req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0];
        return res.status(422).json({
            error:firstError
        });
    } else {
         await User.findOne({
            email
        }).exec((err,user)=>{
            if(err || !user){
                return res.status(400).json({
                    error:'User with that email does not exist. Please sign up'
                })
            }

            if(hash(password) === user.hashedPassword){
                const token=jwt.sign({
                    _id: user._id
                },process.env.JWT_SECRET,{
                    expiresIn: '7d'
                })

                const {_id,name,email,phone,channelIds,videoInformation}=user;
                return res.status(200).json({
                    token,
                    user:{
                        _id,name,email,phone,channelIds,videoInformation
                    }
                })

            } else {
                return res.status(400).json({
                    error: 'Email and password dont match'
                });
            }

            //Authenticate

        })
    }
}

exports.forgotPasswordController=async (req,res)=>{
    console.log('hello');
    const {email}=req.body;
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error:firstError
        });
    } else {
        // Find if user exists
        try {
            let user=await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    error:'User with that email does not exist'
                });
            }

            const token=jwt.sign({_id:user._id},process.env.JWT_RESET_PASSWORD,{
                expiresIn:'30m'
            })

            await user.updateOne({
                resetPasswordLink: token
            },(err,success)=>{
                if(err){
                    return res.status(400).json({
                        error:errorHandler(err)
                    });
                }

                else {

                    const OAuth2Client=new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET,process.env.REDIRECT_URI)
                    OAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});

                    const sendMail=async()=>{
                        try {
                            const accessToken=await OAuth2Client.getAccessToken();
                            const transport=nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    type: 'OAuth2',
                                    user:'gamer.lazy.coder@gmail.com',
                                    clientId:process.env.GOOGLE_CLIENT_ID,
                                    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                                    refreshToken:process.env.REFRESH_TOKEN,
                                    accessToken:accessToken
            
                                }
                            })
            
                            const mailOptions={
                                from: 'gamer.lazy.coder@gmail.com',
                                to:email,
                                subject: 'Hello from gmail using api',
                                text:'Random text',
                                html: `
                                <h1>Please use the following to activate your account</h1>
                                <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                                <hr />
                                <p>This email may containe sensetive information</p>
                                <p>${process.env.CLIENT_URL}</p>`
                            
                            }
            
                            const result=await transport.sendMail(mailOptions);
                            console.log(result);
            
                        } catch(err) {
                            console.log(err);
                        }
                    }
                    sendMail().then(result=>res.status(200).send(`Email has been sent to ${email}`)).catch(error=>res.status(200).send('An error occured. Cannot send email'));
            
                }

                

                
            })

        } catch(err) {
            if(err){
                return res.status(400).json({
                    error:'User with that email does not exist'
                });
            }
        }
        
    }
}

exports.resetController=(req,res)=>{
    const {password,resetPasswordLink}=req.body;
    const errors=validationResult(req);
    //console.log(password,resetPasswordLink);
    console.log(errors);
    if(!errors.isEmpty()){
        const firstError=errors.array().map(error=>error.msg)[0]
        return res.status(422).json({
            error:firstError
        });
    }  else {
        if(resetPasswordLink){
            jwt.verify(resetPasswordLink,process.env.JWT_RESET_PASSWORD,(err,decoded)=>{
                if(err){
                    return res.status(400).json({
                        error:'Expired link. Try again'
                    })
                }

                User.findOne({resetPasswordLink},(err,user)=>{
                    if(err || !user){
                        return res.status(400).json({
                            error:'Something went wrong. Try later'
                        })
                    }
                    console.log(hash(password));
                    const updatedFields={
                        hashedPassword:hash(password),
                        resetPasswordLink
                    }

                    user=_.extend(user,updatedFields);
                    console.log(user);
                    user.save((err,result)=>{
                        if(err){
                            return res.status(400).json({
                                error:'Error resetting user password'
                            })
                        }

                        return res.status(200).json({
                            message:'Password changed successfully'
                        })
                    })
                })
            })
        }
    }

}

const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleController=(req,res)=>{
    const {idToken}=req.body;

    client.verifyIdToken({
        idToken,
        audience:process.env.GOOGLE_CLIENT_ID
    }).then(response=>{
        const {
            email_verified,name,email
        }=response.payload;

        //Check if email is verified
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(user){
                    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
                        expiresIn:'7d'
                    });

                    const {_id,email,name,channelIds,videoInformation}=user;
                    return res.json({
                        token,
                        user:{_id,email,name,channelIds,videoInformation}
                    });
                } else {
                    let password=email+process.env.JWT_SECRET;
                    user=new User({name,email,hashedPassword:hash(password),phone:'1111111111',channelIds:[],videoInformation:[]});
                    user.save((err,data)=>{
                        if (err) {
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                            return res.status(400).json({
                              error: 'User signup failed with google'
                            });
                          }

                          const token = jwt.sign(
                            { _id: data._id },
                            process.env.JWT_SECRET,
                            { expiresIn: '7d' }
                          );

                          const { _id, email, name,phone,channelIds,videoInformation} = data;
                          return res.json({
                            token,
                            user: { _id, email, name, phone,channelIds,videoInformation }
                          });
                    })
                }
            })
        } else {
            return res.status(400).json({
                error:'Google Login failed. Try again'
            });
        }
    }).catch((err)=>{
        console.log(err);
    })
}