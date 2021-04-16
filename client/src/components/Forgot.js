import React,{useState} from 'react';
import authSvg from '../assets/forget.svg';
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {isAuth} from '../helpers/auth';


const ForgotPassword=()=>{
    const [formData,setFormData]=useState({
        email:"",
    });

    const {email}=formData;

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log('in submit');
        if(email){
            
               try {
                   await axios.post(`${process.env.REACT_APP_API_URL}/password/forget`,{email});
                   setFormData({
                       ...formData,
                      email:''
                   })
                   toast.success('An email has been sent to the above email. Please check your inbox'); 
               } catch(err){
                   console.log(err);
                   toast.error('An error occured. Cannot send email');
               }
            
        }
    }
    const handleChange=(e)=>{
       
       setFormData({
           ...formData,
           [e.target.name]:e.target.value
       });

       console.log(formData);
    }


    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            {isAuth() ? <Redirect to='/'/> : null}
            <ToastContainer/>
            <div className='max-w-screen-xl ml-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Forgot Password
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
                               
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                    >
                                    <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                                    <span className='ml-3'>Submit</span>
                                    </button>
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

export default ForgotPassword;