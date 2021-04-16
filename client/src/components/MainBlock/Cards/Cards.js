import React from 'react'
import './cards.scss';

function Cards() {
    return (
        <div className='cards__container'>
            <div className='row'>
                <div className='cards__individual'>
                    <p className='cards__card-heading text-center'>Overdue</p>
                    <p className='cards__count text-center'>60</p>
                </div>

                <div className='cards__individual'>
                    <p className='cards__card-heading text-center'>Overdue</p>
                    <p className='cards__count text-center'>60</p>
                </div>

                <div className='cards__individual'>
                    <p className='cards__card-heading text-center'>Overdue</p>
                    <p className='cards__count text-center'>60</p>
                </div>

                <div className='cards__individual'>
                    <p className='cards__card-heading text-center'>Overdue</p>
                    <p className='cards__count text-center'>60</p>
                </div>
            </div>
        </div>
    )
}

export default Cards
