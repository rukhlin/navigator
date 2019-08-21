import React, {Component} from 'react';

const mapData = {
    center: [55.751574, 37.573856],
    zoom: 8,
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
		
		coords.forEach((item) => {
			this.yMap.geoObjects.add(new ymaps.Placemark(item, {
				balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
			}));
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
