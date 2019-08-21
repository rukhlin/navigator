import React, {Component} from 'react';

const mapData = {
    center: [55.751574, 37.573856],
    zoom: 9,
};

class Map extends Component {
    constructor(props) {
		super(props);
		this.state = {
			ready: false
		};
		this.createMarks = this.createMarks.bind(this);
		
		this.initMap();
	};

	componentDidMount() {

	}
	
	initMap() {
		const { ymaps } = window;

        ymaps.ready(() => {
			this.yMap = new ymaps.Map("map", mapData);
			this.setState({
				ready: true
			});
		});
	}

	createMarks() {
		const { ymaps } = window;
		let coords = this.props.coords;
		if (!coords) return;
		
		this.yMap.geoObjects.removeAll();

		coords.forEach((item, index) => {
			let place = this.props.places[index];
			let placeMark = new ymaps.Placemark(item, {
				balloonContent: place.description + ', ' + place.name 
			},
			{ draggable: true });
			this.yMap.geoObjects.add(placeMark);

			placeMark.events.add('dragend', () => {
				let newCoords = placeMark.geometry.getCoordinates();
				this.props.updateCoords(newCoords, index);
			})
		});	
		
	}

	render() {
		const style={
			width: window.innerWidth * 0.7,
			height: window.innerHeight
		}
		if (this.state.ready) this.createMarks();

		return (
			<div id="map" style={style}></div>
		);
	}
}

export default Map;
