import React from 'react';
import ReactDOM from 'react-dom';
import getData from './Data';
import $ from 'jquery';
import FlipCard from 'react-flipcard';

export default class GameCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: getData(),
      currArr: [],
      numClicks: 0,
      clickDataArr: [],
      clickElemArr: [],
      turnSound: new Audio('/assets/turn.mp3'),
      bingoSound: new Audio('/assets/bingo.wav'),
      masterClickCount: 0,
      masterRightAnsCount: 0,
      canvasData: null
    };

    this.makeCanvas = this.makeCanvas.bind(this);
    this.calcWidth = this.calcWidth.bind(this);
    this.processData = this.processData.bind(this);
    this.cardClick = this.cardClick.bind(this);
    this.isCorrect = this.isCorrect.bind(this);

    this.makeCanvas();
  }

  calcWidth() {
		return 24 / this.props.tiles;
	}

  processData() {
    let tempArr = [];
    Object.keys(this.state.gameData).forEach((key, index) => {
			if(index < this.props.tiles/2) {
        // this.state.currArr.push(key);
				// this.state.currArr.push(this.state.gameData[key]);
        tempArr.push(key);
        tempArr.push(this.state.gameData[key]);
      }
    });
    // tempArr = this.state.currArr;
    console.log(tempArr);
    tempArr = this.shuffleArray(tempArr);
    // console.log(tempArr);
    this.state.currArr = tempArr;
  }

  shuffleArray(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
		return a;
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
    let masterClickCount = this.state.masterClickCount;

    masterClickCount++;
    this.setState({
      masterClickCount: masterClickCount
    });
    this.props.moves(masterClickCount);

    // increment click counter
    clicks++;

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
      // match state info
      clickDataArr.push(clickData);
      clickElemArr.push(e.target);
      if(this.isCorrect(clickDataArr[0], clickDataArr[1])) {
        // if correct answer

        this.state.bingoSound.play();

        let elem1 = this.state.clickElemArr[0];
        let elem2 = this.state.clickElemArr[1];

        elem1.style["background-color"] = "orange";
        elem2.style["background-color"] = "orange";
        elem1.firstElementChild.innerHTML = "Correct";
        elem2.firstElementChild.innerHTML = "Correct";

        // clean off everything
        this.setState({
          numClicks: 0,
          clickDataArr: [],
          clickElemArr: []
        })

        // set the master rightanswer count
        let rightAnsCount = this.state.masterRightAnsCount;
        rightAnsCount += 2;
        this.setState({
          masterRightAnsCount: rightAnsCount
        });


        if(rightAnsCount === parseInt(this.props.tiles)) {
          this.props.gameOver();
        }

      } else {
        // incorrect answer.

        // play basic turn sound
        this.state.turnSound.play();

        // reset state
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
    // dynamically set card width
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
    this.state.canvasData = cardArr;
  }



  render() {
    let canvasProps = {
      textAlign: 'center',
      margin: '0 auto'
    }
    return (
      <div class={`row`} style={canvasProps}>
        {this.state.canvasData}
      </div>
    )
  }
}
