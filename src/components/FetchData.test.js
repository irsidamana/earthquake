import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { within } from "@testing-library/dom";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FetchData from './FetchData';

configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FetchData />, div);
});

describe('FetchData Component', () => {
  it('fetches data from url API when it returns a successful response', done => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<FetchData />); 

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp");
  });
});
