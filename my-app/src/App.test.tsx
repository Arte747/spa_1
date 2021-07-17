import { render, screen } from '@testing-library/react';
import JsApp from './App';
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(<JsApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
