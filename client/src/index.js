import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'bootstrap/dist/css/bootstrap.css';
import Register from './components/Register';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';
import Activate from './components/Activation';
import Forgot from './components/Forgot';
import Reset from './components/Reset';
import Dashboard from './components/Dashboard/Dashboard';
import Channel from './components/Pages/Channels/Channel';
import { signout } from './helpers/auth';

const logout=()=>{
    signout();
    window.location.href='/';
}

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact render={props=> <App {...props}/>}/>
            <Route path='/register' exact render={props=> <Register {...props}/>}/>
            <Route path='/users/activate/:token' exact render={props=> <Activate {...props}/>}/>
            <Route path='/login' exact render={props=> <Login {...props}/>}/>
            <Route exact path='/users/password/forget' render={props=> <Forgot {...props}/>}/>
            <Route path='/users/password/reset/:token' exact render={props=> <Reset {...props}/>}/>
            <Route path='/dashboard' exact render={props=><Dashboard {...props}/ >}/>
            <Route path='/channels' exact render={props=><Channel {...props}/>}/>
            <Route path='/logout' exact render={logout}/>
        
        </Switch>
    </BrowserRouter>
    ,document.getElementById('root'));
