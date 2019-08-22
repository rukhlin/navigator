import React, { Component } from 'react';
import { URL } from '../model/const';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            placeValue: '',
        }
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    updateInputValue(event) {
        this.setState({
            placeValue: event.target.value
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
                try {
                    let arrResp = json.response.GeoObjectCollection.featureMember;
                    if (arrResp.length) {
                        this.props.addNewPlace(arrResp[0].GeoObject);
                        this.setState({
                            placeValue: ''
                        });
                    } else {
                        alert('Уточните условия поиска');
                    }
                }
                catch(e) {
                    console.log(e);
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