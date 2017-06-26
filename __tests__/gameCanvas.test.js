import React from 'react';
import ReactDOM from 'react-dom';
import GameCanvas from '../src/js/components/GameCanvas';
import { shallow } from 'enzyme';

describe('GameCanvas', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GameCanvas/>, div);
  });

  describe('GameCanvas.shuffleArray', () => {
    it('should shuffle array and return the same', () => {
      const gameCanvas = shallow(<GameCanvas/>);

      const arr = ["test", "data", 1, 2, 3];
      const shuffledArr = gameCanvas.instance().shuffleArray(arr);
      expect(arr.length).toBe(shuffledArr.length);
    });
  });
});
