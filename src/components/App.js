import React, {Component} from 'react';
import Places from './Places';
import Map from './Map';
import '../style/index.css';
import cities from '../model/cities';

class App extends Component {
  constructor() {
    super();
    this.state = {
      places: cities,
      center: [55.75, 37.57]
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.updateCoords = this.updateCoords.bind(this);
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
        places: newList,
        center: place.Point.pos
    });
  }

  handleDelete(index) {
    let places = this.state.places;
    places.splice(index, 1) 
    this.setState({places});
  }

  handleDrag(places) {
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

  updateCoords(newCoords, index, name, desc) {
    let places = this.state.places; 
    if (!name || !desc) {
      places[index].pos = newCoords.reverse().join(' ');
    } else {
      places[index].pos = newCoords.reverse().join(' ');
      places[index].name = name;
      places[index].description = desc;
    }
    this.setState({places});
  }

  render() {
    return (
      <div className='app'>
          <div className='app-places'>
            <Places 
              handleSearch={this.handleSearch}
              delete={this.handleDelete}
              places={this.state.places}
              drag={this.handleDrag}
              />
          </div>
          <div className='app-map'>
            <Map 
              coords={this.getCoords()}
              places={this.state.places}
              updateCoords={this.updateCoords}
              center={this.state.center}
              />
          </div>
      </div>
    );
  }
}

export default App;
