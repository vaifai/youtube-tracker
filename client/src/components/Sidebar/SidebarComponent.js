import React from 'react'
import LogoComponent from './LogoComponent';
import MenuItemComponent from './MenuItemComponent';
import IconOverview from './../../assets/IconOverview';
import IconTickets from './../../assets/IconTickets';
import IconIdeas from './../../assets/IconIdeas';
import IconContacts from './../../assets/IconContacts';
import IconAgents from './../../assets/IconAgents';
import IconArticles from './../../assets/IconArticles';
import IconSettings from './../../assets/IconSettings';
import './sidebar.scss';

function SidebarComponent() {
    return (
        <div className='sidebar__container col-md-3 col-lg-2'>
            <LogoComponent/>
            <div className='menuItemList__container'>
                <MenuItemComponent heading='Overview' icon={IconOverview} id='overview'/>
                <MenuItemComponent heading='Your Channels' icon={IconTickets} id='channels'/>
                <MenuItemComponent heading='Ideas' icon={IconIdeas} id='ideas'/>
                <MenuItemComponent heading='Contacts' icon={IconContacts} id='contacts'/>
                <MenuItemComponent heading='Agents' icon={IconAgents} id='agents'/>
                <MenuItemComponent heading='Articles' icon={IconArticles} id='articles'/>
                <div className='separator'></div>
                <MenuItemComponent heading='Settings' icon={IconSettings} id='settings'/>
                <MenuItemComponent heading='Logout' icon={IconSettings} id='logout'/>
            </div>            
        </div>
    )
}

export default SidebarComponent
