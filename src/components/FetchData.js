import React from 'react';
import Map from './Map.js';
import Table from './Table.js';
import ErrorBoundary from './ErrorBoundary.js';
import CanvasJSReact from '../assets/canvasjs.react';
import '../styles/Styles.css';

import Header from './Header.js';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const HOUR_1 = 60 * 60 * 1000;

const EARTHQUAKES_API = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0';

var intervals = [];

/**
 * A class for fetching the information from the API url
 * and creating a chart that shows the number of earthquakesin the world
 * during each 1-hour interval for the last 24 hours.
 */
export default class FetchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      earthquakes: [],
      totalCount: 0
    };
  }

  async componentDidMount() {
    const url = `${EARTHQUAKES_API}/summary/all_day.geojsonp`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    else {
      const data = await response.text();
      var data_json = JSON.parse(data.substring(16, data.length - 2));
      const values = Object.values(data_json.features);

      this.setState({
        loading: false,
        earthquakes: values.map(earthquake => ({
          id: earthquake.id,
          type: earthquake.properties.type,
          mag: earthquake.properties.mag,
          sig: earthquake.properties.sig,
          alert: earthquake.properties.alert,
          status: earthquake.properties.status,
          place: earthquake.properties.place,
          time: new Date(earthquake.properties.time).toString(),
          coordinates: earthquake.geometry.coordinates,
          ids: earthquake.properties.ids
        })),
        totalCount: 0
      });

      for( let i = 0; i < 24; i++){
        var time_temp = {x: new Date((new Date()) - (i+1)*HOUR_1), y: 0};
        intervals.push(time_temp);
      }

      for(let i = 0; i <values.length; i++) {
        var temp = new Date(values[i].properties.time);
        for(let j=0; j<intervals.length; j++) {
          if(temp> intervals[j].x){
            intervals[j].y++;
            break;
          }
        }
      }

  		this.chart.render();
    }


  }

  render() {
    const options = {
      theme: "light2",
      axisY: {
        title: "Number of Earthquakes"
      },
      data: [{
        type: "line",
        xValueFormatString: "DD MMM YYYY, HH:MM:ss",
        yValueFormatString: "#0 earthquakes",
        dataPoints: intervals
      }],
      backgroundColor: 'rgb(190, 199, 180)'

    };
    if (this.state.loading) {
      return <div> loading... < /div>;
    }
    return (
      <ErrorBoundary>
        <Header number={this.state.earthquakes.length}/>

        <div className="Color1">
          <Map coordinates = {this.state.earthquakes}/>
        </div>
        <div className="Color2 Padding">
          <div className="ChartDiv">
          <h2 className="Chart"> Number of earthquakes worldwide every hour</h2>
            <CanvasJSChart options = {options} onRef={ref => this.chart = ref}/>
          </div>
        </div>
        <div className="Color3 Padding">
          <Table data = {this.state.earthquakes}/>
        </div>
      </ErrorBoundary>
    );
  }
}
