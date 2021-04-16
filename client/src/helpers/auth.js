import cookie from 'js-cookie';

//Set in cookie
export const setCookie=(key,value)=>{
    if(window !== 'undefined'){
        cookie.set(key,value,{
            expires: 1
        })
    }
}

//Remove cookie
export const removeCookie=(key)=>{
    if(window !== 'undefined'){
        cookie.remove(key,{
            expires: 1
        });
    }
}

//Get cookie
export const getCookie=(key)=>{
    if(window !== 'undefined'){
        return cookie.get(key);
    }
}

//set in localstorage
export const setLocalStorage=(key,value)=>{
    if(window !== 'undefined'){
        localStorage.setItem(key,JSON.stringify(value));
    }
}

//Remove from localstorage
export const removeLocalStorage=(key,value)=>{
    if(window !== 'undefined'){
        localStorage.removeItem(key);
    }
}

//Auth user after login
export const authenticate=(response,next)=>{
    console.log(response.data);
    console.log(response.data.channelIds);
    setCookie('token',response.data.token);
    setLocalStorage('user',response.data.user);
    setLocalStorage('channelIds',response.data.user.channelIds);
    setLocalStorage('videos',response.data.user.videoInformation);
    next();
}

//Signout
export const signout=next=>{
    removeCookie('token');
    removeLocalStorage('user');
    removeLocalStorage('channelIds');
    removeLocalStorage('videos');
}

//Get user from localstorage
export const isAuth=()=>{
    if(window !== 'undefined'){
        const cookieChecked=getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
    }
}

//update user data in localstorage
export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
};