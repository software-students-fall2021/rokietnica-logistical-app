import { render, screen } from '@testing-library/react';
import App from './App';
const assert = require('chai').assert;
const Subway = require('./App');


test('renders Subway updates', () => {
  render(<App />);
  const linkElement = screen.getByText(/Subway updates/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App test', function(){
   
  it('check for app loading state.', function (){
      console.log(App);
      console.log(App.state);
      assert.exists(App);

  });
  
});
