import React, {Component} from 'react';

const mapData = {
    center: [55.751574, 37.573856],
    zoom: 7,
};

const options = {
    draggable: true
}

class Map extends Component {
    constructor(props) {
        super(props);
		this.initMap();
	};
	
	initMap() {
		const { ymaps } = window;
        ymaps.ready(() => {
            this.yMap =  new ymaps.Map("map", mapData);
		});
	}

	render() {
		const style={
			width: '350px',
			height: '200px'
		}
		return (
			<div id="map" style={style}></div>
		);
	}
}

export default Map;
