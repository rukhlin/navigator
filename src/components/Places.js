import React, {Component} from 'react';
import Place from './Place';
import Search from './Search';

class Places extends Component {
	handleClick(place) {
        console.log(place.name + ' ' + place.description + ': ' + place.pos);
    }

    handleDelete(event) {
        console.log(this);
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
            <div>
                <h1>places</h1>
                <Search addNewPlace={this.props.handleSearch}/>
                {newCities}
            </div>
        )
	}
}

export default Places;
