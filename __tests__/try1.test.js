// import React from 'react';
import GameCanvas from '../src/js/GameCanvas';
// import renderer from 'react-test-renderer';

// describe('Welcome (Snapshot)', () => {
//   it('Welcome renders hello world', () => {
//     const component = renderer.create(<GameCanvas/>);
//     const json = component.toJSON();
//     expect(json).toMatchSnapshot();
//   });
// });

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});
