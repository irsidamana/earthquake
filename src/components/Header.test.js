import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { within } from "@testing-library/dom";

import Header from './Header';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
});

test("it works", () => {
  const root = document.createElement("div");
  ReactDOM.render(<Header />, root);

  const { getByText } = within(root);

  getByText("SHAKE-ALERT!");

});
