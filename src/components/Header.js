import React from 'react';
import '../styles/Styles.css';

/**
 * A class for the title of the wesite.
 */
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <h1 className = "Header">
          SHAKE-ALERT!
        </h1>
        <h4 className = "Header1">
          Seismic activity in past 24 hours:
        </h4>
        <h1 className = "Number">
          {this.props.number}
        </h1>
      </div>
    );
  }
}
