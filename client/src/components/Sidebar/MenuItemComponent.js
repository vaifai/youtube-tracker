import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import {isAuth} from './../../helpers/auth';

function MenuItemComponent(props) {
    const Icon=props.icon;
    const Heading=props.heading
    const link=`/${props.id}`
    return (
        
            <Link to={link} className='row menuItemList' id={props.id}>
                {!isAuth() ? <Redirect to='/register'/> : null}
                <div className='menuItemList__icon'>
                    <Icon/>
                </div>
                
                <div className='menuItemList__heading'>
                    {Heading}
                </div> 
            </Link>
            
      
    )
}

export default MenuItemComponent
