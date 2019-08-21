import React, { Component } from 'react';

const key = 'caf2c7ec-a386-4a0d-892a-cb30c2841534';
const URL = 'https://geocode-maps.yandex.ru/1.x/?apikey=' + key + '&format=json&geocode=';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            'placeValue': ''
        }
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(event) {
        this.setState({
            'placeValue': event.target.value
        });
    }

    handleEnterPress(event) {
        let code = event.keyCode || event.charCode;
        if (code === 13) {
            this.getLatLon(this.state.placeValue);
        }
    }

    getLatLon(value) {        
        fetch(URL + encodeURIComponent(value)).then(res => 
            res.json()).then(json => {
                console.log(json)
                let arrResp = json.response.GeoObjectCollection.featureMember;
                if (arrResp.length) {
                    this.props.addNewPlace(arrResp[0].GeoObject);
                    console.log(this.state.placeValue)
                } else {
                    alert('Уточните условия поиска');
                }
        });
    }

    render() {
        return (
            <input 
                value={this.state.placeValue}
                onChange={(event) => this.updateInputValue(event)}
                onKeyPress={(event) => this.handleEnterPress(event)}
                placeholder='Введите адрес'>
            </input>
        )
    }
}

export default Search;