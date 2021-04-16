import React from 'react'
import Header from '../MainBlock/Header/Header'
import './dashboard.scss';
import SidebarComponent from '../Sidebar/SidebarComponent'
import Cards from '../MainBlock/Cards/Cards';
import Monitor from '../MainBlock/Monitoring/Monitor';

function Dashboard() {
    return (
        <div className='dashboard__container'>
            <div className='row'>
                <SidebarComponent/>
                <div className='dashboard__mainContent col-md-9 col-lg-10'>
                    <Header/>
                    <Cards/>
                    <Monitor/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
