import React from 'react';

function Place(props) {
    return (
        <div className='place'>
            <div className='place-info' onClick={props.select}>
                <p>{props.place.name}</p>
                <p>{props.place.description}</p>
            </div>
            <div className='place-del' onClick={() => props.delete(props.index)}>
                <p>&#10006;</p>
            </div>
        </div>
    )        
}

export default Place;