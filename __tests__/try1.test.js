import React from 'react';
import ReactDOM from 'react-dom';
import GameCanvas from '../src/js/components/GameCanvas';
import { shallow } from 'enzyme';

describe('GameCanvas', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<GameCanvas />, div);
    });


});
