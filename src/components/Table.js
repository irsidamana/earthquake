import React from 'react';
import "react-table-6/react-table.css";
import ReactTable from "react-table-6";
import matchSorter from 'match-sorter';
import ErrorBoundary from './ErrorBoundary.js';
import '../styles/Styles.css';


/**
 * A class for the table giving detailed information about
 * the earthquakes happening in the world in the last 24 hours.
 */
export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{
        Header: "ID",
        id: "id",
        accessor: "id",
        show: true,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: ["id"]
          }),
        filterAll: true
      },
      {
        Header: "Type",
        accessor: "type",
        show: true,
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "earthquake") {
            return row[filter.id] === "earthquake";
          }
          return row[filter.id] === "quarry blast";
        },
        Filter: ({
          filter,
          onChange
        }) =>
        <select onChange = {event => onChange(event.target.value)}
                className="Select"
                value = {filter ? filter.value : "all"}
        >
          <option value = "all" > Show All </option>
          <option value = "earthquake" > Earthquakes </option>
          <option value = "quarry blast" > Quarry Blasts </option>
        </select>
      },
      {
        Header: "Magnitude",
        accessor: "mag",
        show: true,
        filterMethod: (filter, row) => {
          return row[filter.id] > filter.value;
        }

      },
      {
        Header: "Significance",
        accessor: "sig",
        show: true,
        filterMethod: (filter, row) => {
          return row[filter.id] > filter.value;
        }
      },
      {
        Header: "Alert Level",
        accessor: "alert",
        show: false
      },
      {
        Header: "Status",
        accessor: "status",
        show: true,
        filterMethod: (filter, row) => {
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "automatic") {
            return row[filter.id] === "automatic";
          }
          if (filter.value === "reviewed") {
            return row[filter.id] === "reviewed";
          }
          return row[filter.id] === "deleted";
        },
        Filter: ({
          filter,
          onChange
        }) =>
        <select onChange = {event => onChange(event.target.value)}
                className="Select"
                value = {filter ? filter.value : "all"}
        >
          <option value = "all" > Show All </option>
          <option value = "automatic" > Automatic </option>
          <option value = "reviewed" > Reviewed </option>
          <option value = "deleted" > Deleted </option>
        </select>
      },
      {
        Header: "Place",
        id: "place",
        accessor: "place",
        show: true,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: ["place"]
          }),
        filterAll: true
      },
      {
        Header: "Time",
        accessor: "time",
        show: true,
        filterMethod: (filter, row) => {
          return row[filter.id] > filter.value;
        }
      },
      {
        Header: "Coordinates",
        accessor: "coordinates",
        show: false
      },
      {
        Header: "IDs",
        accessor: "ids",
        show: false
      }],
      data: {}
    };
  }

  render() {
    return (
      <div className="Table">
        <ErrorBoundary>
          <h1 className="Filter">Filter by preference</h1>
          <ReactTable data = {this.props.data}
                      filterable defaultFilterMethod = {(filter, row) =>row[filter.id] === filter.value}
                      minRows = {0}
                      defaultPageSize = {10}
                      columns = {this.state.columns}
                      className="Color3"
          />
        </ErrorBoundary>
      </div>
    );
  }
}
