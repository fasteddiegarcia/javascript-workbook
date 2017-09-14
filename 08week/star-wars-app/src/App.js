import React, { Component } from 'react';
import './App.css';
import head from 'lodash/head'
import RaisedButton from 'material-ui/RaisedButton';
import Heroes from './Heroes'


class App extends Component {
  // Use swapi.co to access list of Star Wars characters
  // swapi.co/api/people/ + (num from 1 - 87)  -  Starts with Luke
  urlForStarWarsChrctrs = (swapiCharURL) => {
    return `https://swapi.co/api/people/${swapiCharURL}/`
  }
  constructor(props) {
    super(props);
    this.state = {
      swapiCharURL: 1,
      name: 'default',
      lightArray: [],
      darkArray: [],
      fetchResults: [],
      isFetching: false,
      requestFailed: false,
      error: '',
    };
  }

  fetchStarWarsCharacters = () => {
    this.setState({
      isFetching: true,
    })
    return fetch(this.urlForStarWarsChrctrs(this.state.swapiCharURL))
      // Check API response is ok
      .then((response) => {
        if (!response.ok) {
          throw Error("Network request failed"); // Throw error
        }
        return response
      })
      .then(response => response.json())
      .then((res) => {
        return this.setState({
          ...this.state,
          isFetching: false,
          fetchResults: [
            ...this.state.fetchResults,
            res
          ],
        })
      })
      .catch((err) => {
        this.setState({
          isFetching: false,
          requestFailed: true, //Catch errors
          error: err,
        })
      });
  }

  componentDidMount() {
    this.fetchStarWarsCharacters();
    this.setState({
      swapiCharURL: this.state.swapiCharURL + 1,
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    const firstResult = head(this.state.fetchResults);          // Luke
    const newFetchResults = this.state.fetchResults.slice(1);   // Empty array
    if (e.target.innerHTML === 'Seek only the Light') {
      this.setState({
        lightArray: [
          ...this.state.lightArray,
          firstResult,
        ],
        fetchResults: newFetchResults,
        swapiCharURL: this.state.swapiCharURL + 1,
      });
      this.fetchStarWarsCharacters();
    }
    else {
      this.setState({
        darkArray: [
          ...this.state.darkArray,
          firstResult,
        ],
        fetchResults: newFetchResults,
        swapiCharURL: this.state.swapiCharURL + 1,
      });
      this.fetchStarWarsCharacters();
    }
  };

  render() {
    const {
      fetchResults,
    } = this.state
    return (
      <div className="App">

        <div className="App-header">
          <h1>Does the character belong to the Light or Dark?</h1>
          <h2>Click the button to assign them to a side</h2>
        </div>

        <div>
          <h1>{fetchResults && fetchResults.length > 0 ? fetchResults[0].name : ''}</h1>
          <RaisedButton
            label="Seek only the Light"
            onClick={this.handleClick}
          />
          <RaisedButton
            backgroundColor='grey'
            labelColor='#fff'
            label="Come to the Dark"
            onClick={this.handleClick}
          />
        </div>

        <div className="d-flex justify-content-around">
          <div>
            <Heroes
              heroes={this.state.lightArray}
              type="light"
            />
          </div>

          <div>
            <Heroes
              heroes={this.state.darkArray}
              type="dark"
            />
          </div>
        </div>

      </div>
    );
  }
}

export default App;


// Create an iterator. Each time the Light or Dark buttons are hit
// Set state of swapiCharURL to current+1 > render > new API call
// Populates the center column with new SW character
// FROM TIMELINE APP
// New push method format
// Inside [], use spread operator to include all of state
// Push the card object, with the name, onto the front of the timeLine array
// Set the state with the new array
// this.setState({lightArray: [...this.state.starWarsChars, characterCard]})
// };
// Ensure API request was successful
// if (this.state.requestFailed) { return <h3>Request Failed</h3> }
// Ensure there is SW data to be rendered
// if (this.state.isFetching) { return <h3>Loading...</h3> }
// Check to see if the API call is working
// console.log(this.state.starWarsChar);

// Display each character on the list, one by one,
// in the center of the screen, starting at the beginning,
// with the most easily identifiable as Light or Dark Side

// User clicks on one of two buttons below the name (or image) >
// This pops the center displayed name >
// Adds the characterCard name to the Light or Dark array
