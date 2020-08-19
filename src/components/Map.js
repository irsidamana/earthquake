import React from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import ErrorBoundary from './ErrorBoundary.js';
import '../styles/Styles.css';
import map_legend from '../img/map_legend.svg'

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
  {name: "North America", coordinates: [-101, 53]},
  {name: "Europe", coordinates: [18, 48]},
  {name: "South America", coordinates: [-57, -15]},
  {name: "Africa", coordinates: [20, 10]},
  {name: "Asia", coordinates: [88, 45]},
  {name: "Australia", coordinates: [135, -25]},
  {name: "Antarctica", coordinates: [75, -78]}
];

/**
 * A class for the map showing all the earthquake locations in the world.
 */
export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  render() {
    return (
        <ErrorBoundary>
          <div className="Map">
            <div>
              <ComposableMap projectionConfig = {{ scale: 160 }} className="ComposableMap">
                <ZoomableGroup>
                  <Geographies geography = {geoUrl}>
                  {
                    ({geographies}) => geographies.map(geo => (
                      <Geography key = {geo.rsmKey}
                                 geography = {geo}
                                 fill = "#EAEAEC"
                                 stroke = "#E6D6DA"
                                 className="Geography"
                      />
                    ))
                  }
                  </Geographies>

                  {
                    this.props.coordinates.map((coo, i) => {
                        if (coo.type === "earthquake") {
                          if (coo.status === "reviewed") {
                            return (
                              < Marker key = {i} coordinates = {coo.coordinates} >
                                <circle r = {(coo.mag + 2) * 1.2}
                                fill = "#000"/>
                                <circle r = {(coo.mag + 2)} fill = "#F00"/>
                              </Marker>);
                          }
                          else {
                            return (
                              < Marker key = {i} coordinates = {coo.coordinates} >
                                <circle r = {(coo.mag + 2) * 1.2} fill = "#F00"/>
                              </Marker>);
                          }
                        }
                        else if (coo.type === "quarry blast") {
                          if (coo.status === "reviewed") {
                            return (
                              < Marker key = {i} coordinates = {coo.coordinates} >
                                <circle r = {(coo.mag + 2) * 1.2} fill = "#000"/>
                                <circle r = {(coo.mag + 2)} fill = "#32CD32"/>
                              </Marker>);
                          }
                          else {
                            return (
                              < Marker key = {i} coordinates = {coo.coordinates} >
                                <circle r = {(coo.mag + 2) * 1.2} fill = "#32CD32"/>
                              </Marker>);
                          }
                        }
                    })
                  }

                  {markers.map(({ name, coordinates}) => (
                    <Marker key={name} coordinates={coordinates}>
                      <text
                        textAnchor="middle"
                        fill = "#000"
                        className="Continents"
                      >
                        {name}
                      </text>
                    </Marker>
                  ))}

                </ZoomableGroup>
              </ComposableMap>
            </div>
            <div className="MapLegend">
              <img src={map_legend} alt="Map Legend" width="25%" />
            </div>
          </div>
        </ErrorBoundary>
    );
  }
}
