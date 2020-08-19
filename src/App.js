import React from 'react';
import './styles/App.css';
import FetchData from './components/FetchData.js';
import ErrorBoundary from './components/ErrorBoundary.js';

/**
 * A class for calling all the components to be shown in the page.
 */
class App extends React.Component {
  render() {
    return (
      <div className = "App">
        <ErrorBoundary>
          <FetchData />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
