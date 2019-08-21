import React from 'react';

function Place(props) {
    return (
        <div className='place'>
            <div className='place-info'>
                <button
                    onClick={props.select}>
                    {props.place.name}
                </button>
                <p>{props.place.description}</p>
            </div>
            <div className='place-del'>
                <button
                    onClick={() => props.delete(props.index)}>
                    del
                </button>
            </div>
        </div>
    )        
}

export default Place;