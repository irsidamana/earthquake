import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { within } from "@testing-library/dom";

import Table from './Table';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Table />, div);
});
