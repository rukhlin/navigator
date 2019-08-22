import React, {Component} from 'react';
import { mapData, URL } from '../model/const';

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
		let coords = this.props.coords;
		if (prevProps.coords.length < coords.length) {
			this.yMap.setCenter(coords[coords.length - 1]);
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
					   
				//reverse() - широта и долгота приходят в другом порядке
				fetch(URL + (newCoords.reverse().toString())).then(res => 
					res.json()).then(json => {
						let arrResp = json.response.GeoObjectCollection.featureMember;
						if (arrResp.length) {
							let newPlace = arrResp[0].GeoObject;
							this.props.updateCoords(
								newCoords.reverse(), 
								index, 
								newPlace.name, 
								newPlace.description
							);
						} else {
							this.props.updateCoords(newCoords, index);
						}					
				});
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