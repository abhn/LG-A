import React from 'react';
import { Button } from 'react-bootstrap'
import $ from 'jquery';
import FlipCard from 'react-flipcard';
import getData from './Data';

export default class Card extends React.Component {
	constructor() {
		super();

		this.state = {
		};

		localStorage.clear();
		localStorage.setItem("flipCount", 0);

		this.showBack = this.showBack.bind(this);
		this.showFront = this.showFront.bind(this);
		this.handleOnFlip = this.handleOnFlip.bind(this);
	}

	showBack() {
		this.setState({
			isFlipped: true
		});
	}

	showFront() {
		this.setState({
			isFlipped: false
		});
	}

	handleOnFlip(flipped) {
    if (flipped) {
			localStorage.setItem("flipCount", parseInt(localStorage.getItem("flipCount")) + 1)

			if(parseInt(localStorage.getItem("flipCount")) === 1) {
				console.log(this.props);
				localStorage.setItem("itemOne", this.props.gameData);
			}

			if(parseInt(localStorage.getItem("flipCount")) === 2) {

			}
    }
  }

	calcWidth() {
		// because Bootstrap is 12 column!
		return 12 / this.props.desktop;
	}

	render() {
		var cardProps = {
			// backgroundColor: 'grey'
		};
		var flipcardProps = {
			padding: '10px',
		}
		return (
			<div class={`class col-md-${this.calcWidth()} col-xs-${this.calcWidth() / 2}`} style={cardProps}>
				<FlipCard
						disabled={true}
	          flipped={this.state.isFlipped}
	          onFlip={this.handleOnFlip}>
					<div onClick={this.showBack}><button>Click</button></div>
					<div onClick={this.showFront}>{this.props.gameData}</div>
				</FlipCard>
			</div>
		);
	}
}
