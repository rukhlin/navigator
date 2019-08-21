import React, {Component} from 'react';

const mapData = {
    center: [55.751574, 37.573856],
	zoom: 7,
	controls: ['zoomControl', 'fullscreenControl']
};
const { ymaps } = window;

class Map extends Component {
    constructor(props) {
		super(props);
		this.state = {
			ready: false,
			center: this.props.center,
			lastCount: 0
		};
		this.createMarks = this.createMarks.bind(this);
		
		this.initMap();
	};

	componentDidUpdate(prevProps){
		//Центрирование новой точки
		if (prevProps.coords.length < this.props.coords.length) {
			this.yMap.setCenter(this.props.coords[this.props.coords.length - 1]);
		}
	}
	
	initMap() {
		ymaps.ready(() => {
			this.yMap = new ymaps.Map('map', mapData);
			this.setState({
				ready: true
			});
		});
	}

	createMarks() {
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

		if (coords.length === 1) return;
		let line = new ymaps.Polyline(coords);	
		this.yMap.geoObjects.add(line);	
	}

	render() {
		const style={
			width: window.innerWidth * 0.7,
			height: window.innerHeight
		}
		if (this.state.ready) this.createMarks();

		return (
			<div id='map' style={style}></div>
		);
	}
}

export default Map;