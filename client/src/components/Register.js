import React,{useState} from 'react';
import authSvg from '../assets/auth.svg';
import {toast, ToastContainer} from 'react-toastify';
import {isAuth} from '../helpers/auth';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const Register=()=>{
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        verifyPassword:"",
    });

    const {name,email,password,phone,verifyPassword}=formData;

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log('in submit');
        if(name && email && password && verifyPassword && phone){
            if(password === verifyPassword){
               try {
                   const response=await axios.post(`${process.env.REACT_APP_API_URL}/register`,{name,email,password,phone});
                   setFormData({
                       ...formData,
                       name:'',
                       email:'',
                       password:'',
                       verifyPassword:'',
                       phone:''
                   })
                   toast.success(response.data); 
               } catch(err){
                   console.log(err);
                   toast.error('An error occured. Cannot send email');
               }
            }
            else {
                toast.error(`The passwords don't match`);
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

    console.log('Register',isAuth());
    console.log(JSON.parse(localStorage.getItem('user')));

    return (
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
            {isAuth() ? <Redirect to='/dashboard'/> : null}
            <ToastContainer/>
            <div className='max-w-screen-xl ml-0 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
                <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
                    <div className='mt-12 flex flex-col items-center'>
                        <h1 className='text-2xl xl:text-3xl font-extrabold'>
                            Sign Up for Uptime Monitor
                        </h1>

                        <form className='w-full flex-1 mt-8 text-indigo-500' onSubmit={handleSubmit}>
                            <div className='mx-auto max-w-xs relative'>
                                <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                                type='text'
                                placeholder='Name'
                                name='name'
                                onChange={handleChange}
                                value={formData.name}
                                />
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
                                <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='password'
                                placeholder='Confirm Password'
                                name="verifyPassword"
                                onChange={handleChange}
                                value={formData.verifyPassword}
                                />
                                <input
                                className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                                type='text'
                                placeholder='Phone'
                                name="phone"
                                onChange={handleChange}
                                value={formData.phone}
                                />
                                <button
                                    type='submit'
                                    className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                                    >
                                    <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                                    <span className='ml-3'>Register</span>
                                    </button>
                            </div>

                            <div className='my-12 border-b text-center'>
                                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                                Or sign with email or social login
                                </div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <a
                                className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                        bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                href='/login'
                                target='_self'
                                >
                                <i className='fa fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                                <span className='ml-4'>Sign In</span>
                                </a>
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

export default Register;