import React,{useState} from 'react';
import authSvg from '../assets/login.svg';
import {toast, ToastContainer} from 'react-toastify';
import {authenticate,isAuth} from '../helpers/auth';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login'

const Login=({history})=>{
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    });

    const {email,password}=formData;

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(email && password){
            
               try {
                   const response=await axios.post(`${process.env.REACT_APP_API_URL}/login`,{email,password});
                   console.log(response);
                //    response.data.user.channelIds.push('sampleid');
                   console.log(response.data);

                   authenticate(response,()=>{
                    setFormData({
                        ...formData,
                        email:'',
                        password:''
                    })
                    console.log(response);
                    
                   })

                   //isAuth && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
                   toast.success('Login Successful'); 
            
               } catch(err){
                   console.log(err);
                   toast.error('Cannot find the user with the specified email');
               }
            
        } else {
            toast.error(`Please fill all the fields`);
        }
    }
    const handleChange=(e)=>{
       
       setFormData({
           ...formData,
           [e.target.name]:e.target.value
       });

       console.log(formData);
    }

    //Send google Token
    const sendGoogleToken=async (tokenId)=>{
        try {
            let res= await axios.post(`${process.env.REACT_APP_API_URL}/googlelogin`,{
                idToken:tokenId
            });
            informParent(res);
        } catch (err) {
            toast.error('Google Login Error');
        }
        
    }

    const informParent=(response)=>{
        authenticate(response,()=>{
            // isAuth && isAuth.role === 'admin' ? history.push('/admin') : history.push('/private')
            history.push('/dashboard');
        })
    }

    //Get response from google
    const responseGoogle=(res)=>{
        console.log(res);
        sendGoogleToken(res.tokenId);
    }

    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            {isAuth() ? <Redirect to='/dashboard'/> : null}
            <ToastContainer/>
            <div className='max-w-screen-xl ml-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign In for ProfanityChecker
                        </h1>

                        <form className='w-full flex-1 mt-8 text-indigo-500' onSubmit={handleSubmit}>
                            <div className='mx-auto max-w-xs relative'>
                                
                                <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='email'
                                placeholder='Email'
                                name='email'
                                onChange={handleChange}
                                value={formData.email}
                                />
                                <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='password'
                                placeholder='Password'
                                name='password'
                                onChange={handleChange}
                                value={formData.password}
                                />
                                
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                    >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                                    <span className='ml-3'>Login</span>
                                    </button>
                                    <Link
                                        to='/users/password/forget'
                                        className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'>
                                    Forget password?</Link>
                            </div>

                            <div className='my-12 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                Or Sign Up
                                </div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <a
                                className='mb-3 w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                        bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                href='/register'
                                target='_self'
                                >
                                <i className='fa fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                <span className='ml-4'>Sign Up</span>
                                </a>

                                <GoogleLogin
                                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                        >
                                        <div className=' p-2 rounded-full '>
                                            <i className='fab fa-google ' />
                                        </div>
                                        <span className='ml-4'>Sign In with Google</span>
                                        </button>
                                    )}>

                                </GoogleLogin>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                    <div
                        className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                        style={{ backgroundImage: `url(${authSvg})` }}>

                    </div>
                </div>
            </div>
            ;
        </div>
    );
};

export default Login;