import React, {Component} from 'react';
import Place from './Place';
import Search from './Search';

class Places extends Component {
	handleClick(place) {
        console.log(place.name + ' ' + place.description + ': ' + place.pos);
    }

    render() {
        const newCities = this.props.places.map((city, index) => 
            <Place 
                key={index}
                index={index}
                place={city}
                select={this.handleClick.bind(this, city)}
                delete={this.props.delete}>
            </Place>
        )

        return (
            <div className='places'>
                <div className='places-header'>
					<h4>Новая точка маршрута:</h4>
					<Search addNewPlace={this.props.handleSearch}/>
				</div>
                <div className='places-list'>{newCities}</div>
            </div>
        )
	}
}

export default Places;
