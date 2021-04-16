import React from 'react'
import './header.scss';
import IconBell from '../../../assets/IconBell';
import IconSearch from '../../../assets/IconSearch';

function Header(props) {
    return (
        <div className='header__container'>
            <div className='row'>
                <p className='header__title'>{props.title ? props.title : 'Overview'}</p>
                <div className='header__icon-search'>
                    <IconSearch/>
                </div>
                <div className='header__icon-bell'>
                    <IconBell/>
                </div>
                
                <div className='header__vertical-separator'>    
                </div>
                <p className='header__name'>James Faulkner</p>
            </div>
        </div>
    )
}

export default Header
