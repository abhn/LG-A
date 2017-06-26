import React from 'react';
import ReactDOM from 'react-dom';
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
      clickElemArr: [],
      turnSound: new Audio('./assets/turn.mp3'),
      bingoSound: new Audio('./assets/bingo.wav'),
      masterClickCount: 0,
      masterRightAnsCount: 0,
      canvasData: null,
      gameStarted: false,
      card: {
      	height: '125px',
      	background: '#333',
        color: '#fff',
        border: '2px white solid'
      },
      textProps: {
        // to make the text unselectable
        pointerEvents:'none',
        display: 'none',
        fontSize: 'bold',
        position: 'relative',
        top: '40%',
        transform: 'translateY(-50%)'
      },
      textCoverProps: {
        pointerEvents:'none',
        position: 'relative',
        top: '40%',
        transform: 'translateY(-25%)'
      },
      canvasProps: {
        textAlign: 'center',
        margin: '0 auto'
      }
    };

    this.makeCanvas = this.makeCanvas.bind(this);
    this.processData = this.processData.bind(this);
    this.cardClick = this.cardClick.bind(this);
    this.isCorrect = this.isCorrect.bind(this);

    this.makeCanvas();
  }

  /*
   * populates this.state.currArr with data (questions and answers)
   */
  processData() {
    let tempArr = [];
    Object.keys(this.state.gameData).forEach((key, index) => {
			if(index < this.props.tiles/2) {
        tempArr.push(key);
        tempArr.push(this.state.gameData[key]);
      }
    });

    tempArr = this.shuffleArray(tempArr);
    this.state.currArr = tempArr;
  }

  /*
   * Used by processData() to shuffle card data array
   * Input: array
   * Output: Shuffled array
   */
  shuffleArray(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
		return a;
	}

  /*
   * Evaluate if the two consecutive clicked cards are on question/answer pair
   */
  isCorrect(clickOne, clickTwo) {
    let gameData = this.state.gameData;

    // because the order of selection is irrelevant
    if(gameData[clickOne] === clickTwo || gameData[clickTwo] === clickOne) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * Receives the 'Card' click event. Stores state
   * Depending on result, either discards Cards or rehides them
   */
  cardClick(e) {
    // otherwise e would be nulled out.
    e.persist();

    // check if game has started.
    if(!this.state.gameStarted) {
      alert('Please select Tiles and click Play');
      return;
    }

    let clicks = this.state.numClicks;
    if(!e.target.lastElementChild) {
      // null tile
      return;
    }

    // first get all data required to evaluate click
    let clickData = e.target.lastElementChild.innerText;
    let clickDataArr = this.state.clickDataArr;
    let clickElemArr = this.state.clickElemArr;
    let masterClickCount = this.state.masterClickCount;

    // increment master click count
    masterClickCount++;
    this.setState({
      masterClickCount: masterClickCount
    });
    this.props.moves(masterClickCount);

    // increment turn click counter
    clicks++;

    if(clicks === 1) {
      // store state
      clickDataArr.push(clickData);
      clickElemArr.push(e.target);

      // keep the clicked card visible
      $(clickElemArr[0].firstElementChild).hide();
      $(clickElemArr[0].lastElementChild).fadeIn("slow");

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

      // make the second card visible
      $(clickElemArr[1].firstElementChild).hide();
      $(clickElemArr[1].lastElementChild).fadeIn("slow");

      if(this.isCorrect(clickDataArr[0].trim(), clickDataArr[1].trim())) {
        // if correct answer

        // right answer. play bingo
        this.state.bingoSound.play();

        setTimeout(() => {
          // make them invisible after a second
          clickElemArr[0].style["background-color"] = "#fff";
          clickElemArr[1].style["background-color"] = "#fff";

          clickElemArr[0].innerHTML = '';
          clickElemArr[1].innerHTML = '';

        }, 1000);

        // clean off everything
        this.setState({
          numClicks: 0,
          clickDataArr: [],
          clickElemArr: []
        })

        // set the master rightanswer count
        // required for highscores and detecting end of game
        let rightAnsCount = this.state.masterRightAnsCount;
        rightAnsCount += 2;
        this.setState({
          masterRightAnsCount: rightAnsCount
        });

        // if all cards are discarded
        if(rightAnsCount === parseInt(this.props.tiles)) {
          this.props.gameOver();
        }

      } else {
        // incorrect answer.

        // play basic turn sound
        this.state.turnSound.play();

        setTimeout(() => {
          // revert to hidden state
          $(clickElemArr[0].lastElementChild).hide("slow");
          $(clickElemArr[0].firstElementChild).fadeIn("slow");
          $(clickElemArr[1].lastElementChild).hide("slow");
          $(clickElemArr[1].firstElementChild).fadeIn("show");
        }, 500);

        // reset state
        this.setState({
          numClicks: 0,
          clickDataArr: [],
          clickElemArr: []
        });
      }
    }
  }

  /*
   *  Create canvas. Called by "Start Game" button
   */
  makeCanvas() {
    // dynamically set card width

    // because two rows
    let width = this.props.tiles/2;

    let cardArr = [];
    this.processData();

    // create the cards array to be rendered
    for(let i=0; i<this.props.tiles; i++) {
      cardArr.push(
        <div key={i} class={`pure-u-1-${width}`} style={this.state.card} onClick={this.cardClick}>
          <h4 style={this.state.textCoverProps}>Click To Reveal</h4>
          <h4 style={this.state.textProps}>{this.state.currArr[i]}</h4>
        </div>
      )
    }
    this.state.canvasData = cardArr;
  }

  /*
   * Render the card array 
   */
  render() {
    return (
      <div class={`pure-g`} style={this.state.canvasProps}>
        {this.state.canvasData}
      </div>
    )
  }
}
