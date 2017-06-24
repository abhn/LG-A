import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import getData from './Data';
import $ from 'jquery';

export default class GameCanvas extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectionCount: 0,
			gameData: getData(),
			initSelection: null,
			cardArray: [],
			currArr: [],
			correctAns: []
		}
		this.onCardClick = this.onCardClick.bind(this);

		let dataObjs = this.state.gameData;
		Object.keys(dataObjs).forEach((key, index) => {
			if(index <= this.props.tiles) {
				this.state.correctAns.push(false);
				this.state.correctAns.push(false);
				this.state.currArr.push(key);
				this.state.currArr.push(dataObjs[key]);
			}
		});

		for(var i=0; i<this.props.tiles; i++) {
			this.state.correctAns[i] = false;
			this.state.cardArray.push(
				<Card key={i} desktop={this.props.tiles / 2} mobile={this.props.tiles / 4} gameData={this.state.currArr[i]} rightAns={this.state.correctAns[i]} revert={this.onCardClick}/>
			)
		}
	}

	onCardClick(card) {
		this.state.selectionCount++;
		if(this.state.selectionCount === 1) {
			this.state.initSelection = card;
		}
		else if(this.state.selectionCount === 2) {
			// this is awful!
			if(this.state.gameData[card.props.gameData] === this.state.initSelection.props.gameData ||
				this.state.gameData[this.state.initSelection.props.gameData] === card.props.gameData) {
					// correct answer

					let tempCardArr = this.state.cardArray;

					for (let i=0; i<tempCardArr.length; i++) {
						if(tempCardArr[i].props.gameData === this.state.initSelection.props.gameData) {
							tempCardArr.splice(i, 1);
						}
						if(tempCardArr[i].props.gameData === card.props.gameData) {
							this.state.correctAns[i] = true;
							tempCardArr.splice(i, 1);
						}
					}

					this.setState({
						cardArray: tempCardArr
					});

			} else {
				// incorrect answer
				
			}
		}
	}

	render() {
		var boardProps = {
			top: '10%',
			height: '90%'
		}

		console.log(this.state);

		// this.shuffle(currArr);

// moved to constructor
		// this.state.cardArray = [];
		// for(var i=0; i<this.props.tiles; i++) {
		// 	this.state.cardArray.push(
		// 		<Card key={i} desktop={this.props.tiles / 2} mobile={this.props.tiles / 4} gameData={this.state.currArr[i]} revert={this.onCardClick}/>
		// 	)
		// }


		return (
				<div class="row" style={boardProps}>{this.state.cardArray}</div>
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
