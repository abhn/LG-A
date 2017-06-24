import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import getData from './Data';
import $ from 'jquery';

export default class GameCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: getData(),
      currArr: [],
      numClicks: 0,
      clickDataArr: [],
      clickElemArr: []
    };

    this.makeCanvas = this.makeCanvas.bind(this);
    this.calcWidth = this.calcWidth.bind(this);
    this.processData = this.processData.bind(this);
    this.cardClick = this.cardClick.bind(this);
    this.isCorrect = this.isCorrect.bind(this);
  }

  calcWidth() {
		return 24 / this.props.tiles;
	}

  processData() {
    let currArr = [];
    Object.keys(this.state.gameData).forEach((key, index) => {
			if(index <= this.props.tiles) {
        this.state.currArr.push(key);
				this.state.currArr.push(this.state.gameData[key]);
      }
    });
  }

  isCorrect(clickOne, clickTwo) {
    let gameData = this.state.gameData;
    if(gameData[clickOne] === clickTwo || gameData[clickTwo] === clickOne) {
      return true;
    } else {
      return false;
    }

  }

  cardClick(e) {
    // otherwise e would be nulled out.
    e.persist();

    let clicks = this.state.numClicks;
    let clickData = e.target.firstElementChild.innerHTML;
    let clickDataArr = this.state.clickDataArr;
    let clickElemArr = this.state.clickElemArr;

    // increment click counter
    clicks++;

    console.log(clicks)
    if(clicks === 1) {
      // store state
      clickDataArr.push(clickData);
      clickElemArr.push(e.target);
      this.setState({
        numClicks: clicks,
        clickDataArr: clickDataArr,
        clickElemArr: clickElemArr
      });
    }

    else if(clicks === 2) {
      console.log(2);
      // match state info
      clickDataArr.push(clickData);
      clickElemArr.push(e.target);
      if(this.isCorrect(clickDataArr[0], clickDataArr[1])) {
        // if correct answer
        console.log('correct answer');

        let elem1 = this.state.clickElemArr[0];
        let elem2 = this.state.clickElemArr[1];

        elem1.setAttribute("style", "background-color: orange");
        elem2.setAttribute("style", "background-color: orange");
        elem1.innerHTML = "";
        elem2.innerHTML = "";

        // clean off everything
        this.setState({
          numClicks: 0,
          clickDataArr: [],
          clickElemArr: []
        })
      } else {
        // incorrect answer.
        this.setState({
          numClicks: 0,
          clickDataArr: [],
          clickElemArr: []
        });
      }
    }
  }

  makeCanvas() {
    // math hack incoming!
    let width = Math.round(100/(Math.floor(this.props.tiles/2))) - 0.1*(Math.round(100/(Math.floor(this.props.tiles/2))));
    let card = {
    	width: width + '%',
    	height: '100px',
    	background: 'red',
      margin: '5px'
    }

    let cardArr = [];
    this.processData();

    var textProps = {
      // to make the text unselectable
      pointerEvents:'none'
    };

    for(let i=0; i<this.props.tiles; i++) {
      cardArr.push(
        <div key={i} class={`col-md-${this.calcWidth()}`} style={card} onClick={this.cardClick}>
          <h3 style={textProps}>{this.state.currArr[i]}</h3>
        </div>
      )
    }
    return cardArr;
  }



  render() {
    let canvasProps = {
      textAlign: 'center',
      margin: '0 auto'
    }
    return (
      <div class={`row`} style={canvasProps}>
        {this.makeCanvas()}
      </div>
    )
  }
}
