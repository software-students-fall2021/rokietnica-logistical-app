import { render, screen } from '@testing-library/react';
import App from './App';
const assert = require('chai').assert;
const Subway = require('./App');

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App test', function(){
   
  it('check for app loading state.', function (){
      console.log(App);
      console.log(App.state);
      assert.exists(App);

  });
  
});