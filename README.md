# Memory Pairs

### Introduction
Memory pairs is a memory game for kids to improve their memory and general knowledge. The game is played by selecting the level, then flipping pairs cards to match question and answer pairs.
- Each random card picked (clicked) has either a question or an answer.
- If two consecutive card picks (one turn) yield the correct question and its answer pair, then those cards are discarded.
- Each card click is recorded as one move. A timer starts upon clicking the START GAME button.
- The objective is to remember the previously flipped cards and discard all cards in minimum number of moves.

### Demo
[https://l-a.me/lg-a/](https://www.nagekar.com/LG-A)

##### Screenshot: 6 tile layout (Game not started)
![6 tile](https://github.com/abhn/LG-A/raw/master/static/sixtile.png)
##### Screenshot: 12 tile layout (Game in progress)
![12 tile](https://github.com/abhn/LG-A/raw/master/static/twelvetile.png)

### Prerequisites
- Node (v6+)
- npm
- Webpack (required if running globally although not required)

### Installation
Clone this repository
```
$ git clone https://github.com/abhn/LG-A
```
Intall npm dependencies
```
$ cd LG-A
$ npm install
```
Run dev server
```
$ npm run dev
```
Then navigate to [http://localhost:8080](http://localhost:8080) to view the application.

Alternatively, if you prefer this way, open the `./src/index.html` file in browser and keep `$ webpack --watch` running in the background. This would require a global installation of webpack (`$ sudo npm install -g webpack`)

### Components
- `./src/js/script.js`
**Renders** - `<Layout/>`

- `./src/js/components/Layout.js`
**Renders** - `<Header/>` and `<GameCanvas/>`
**Notes** - Takes care of passing data between Header and GameCanvas being a common parent.

- `./src/js/components/Header.js`
**Renders** - Navbar, game controls, stats board, leaderboard etc

- `./src/js/components/GameCanvas.js`
**Renders** - Game tiles (cards)

- `./src/js/components/Data.js`
Stores an object of questions as keys and answers as values.

### TODO
List of *enhancements* that can be done for a better user experience.
- Static data in `./src/js/components/Data.js` can be fetched dynamically for updated questions in every session.
- `setTimeout` is not a very reliable way of measuring time. For real world use, `Date()` api should be used.  

### React sins
A few React style guidelines that were broken in this project, as I lacked their knowledge when I began but would now require rewriting of components to fix, so making a note here.
- Editing `this.state` directly and not using `this.setState({})` [https://stackoverflow.com/questions/35867038/what-the-difference-of-this-state-and-this-setstate-in-reactjs](https://stackoverflow.com/questions/35867038/what-the-difference-of-this-state-and-this-setstate-in-reactjs)

- Manipulating the DOM directly. [https://facebook.github.io/react-native/docs/direct-manipulation.html](https://facebook.github.io/react-native/docs/direct-manipulation.html)
