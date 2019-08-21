import React, {Component} from 'react';
import Places from './Places';
import Map from './Map';
import '../style/index.css';
import cities from '../model/cities';

class App extends Component {
  constructor() {
    super();
    this.state = {
      places: cities
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSearch(place) {
    let newPlace = {
        name: place.name,
        description: place.description,
        pos: place.Point.pos
    }
    let oldList = this.state.places;
    let newList = oldList.concat(newPlace);
    this.setState({
        places: newList
    });
    console.log(this.state.places);
  }

  handleDelete(index) {
    let places = this.state.places;
    places.splice(index, 1) 
    this.setState({places});
  }

  getCoords() {    
    //Привести вид "XXX YYY" к [XXX, YYY]
    let coordinates = this.state.places.map(place => {
      let arr = place.pos.split(' ');
      for (let i = 0; i < arr.length; i++) {
          arr[i] = parseFloat(arr[i]);
      }
      return arr.reverse();
    });
    return coordinates;
  }

  render() {
    return (
      <div className='app'>
          <div className='app-places'>
            <Places 
              handleSearch={this.handleSearch}
              delete={this.handleDelete}
              places={this.state.places}
              />
          </div>
          <div className='app-map'>
            <Map 
              coords={this.getCoords()}/>
          </div>
      </div>
    );
  }
}

export default App;
