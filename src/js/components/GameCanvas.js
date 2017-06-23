import React from 'react';
import Card from './Card';
import getData from './Data';

export default class GameCanvas extends React.Component {

	constructor() {

		super();
		this.state = {
			selectionCount: 0,
			gameData: getData()
		}
	}

	render() {
		var boardProps = {
			top: '10%',
			height: '90%'
		}

		var currArr = [];
		for(var i=0; i<this.props.tiles; i++) {
			currArr.push(this.state.gameData[i].city);
			currArr.push(this.state.gameData[i].country);
		}

		this.shuffle(currArr)

		var cardArray = [];
		for(var i=0; i<this.props.tiles; i++) {
			cardArray.push(
				<Card key={i} desktop={this.props.tiles / 2} mobile={this.props.tiles / 4} gameData={currArr[i]} />
			)
		}


		return (
				<div class="row" style={boardProps}>{cardArray}</div>
		);
	}

	shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
		return a;
	}
}
