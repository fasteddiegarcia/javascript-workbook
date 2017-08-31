/**
create a text area box that user can type in a status
when the user submits the status,
 the status should appear in chronological order in Time line box to the side
a user is able to delete a status
a use is able to edit a status
use react-bootstrap

change style when:
a user focuses on the new status box
the latest status in the timeline should have it’s own style
**/


import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Timeline from './TimeLine';
import 'bootstrap/less/bootstrap.less'
import './App.css';

// Create Two Components
// One parent that takes a user's status
// One child that displays all the statuses
class App extends Component {

  constructor(props){
    super(props);
    // Set the initial state with
    // inputValue as empty string, timeline as empty array
    this.state = {
      inputValue: '',
      timeLine: [],
    }
  }

  // Grab the value of the input, set it to the state
  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  };

  // Add the input text to the timeline
  handleClick = () => {
    // Create a card object to hold the information about a post
    const card = {
      createdAt: new Date(),
      text:  this.state.inputValue,
      color: 'blue',
      id: this.state.timeLine.length + 1,
      isEditable: false,
    };
    // New push method format
    // Inside [], use spread operator to include all of state
    // Push the card object, with the inputValue, onto the front of the timeLine array
    // Set the state with the new array
    // Reset the inputValue to empty string
    this.setState({timeLine: [...this.state.timeLine, card], inputValue: ''})
  };

  // Delete a card from the timeLine array
  deleteCardStatus = (id) => {
    // Use filter on the current array to return a new array without
    // the card with the id the clicked 'X' references
    const deleteCardList = this.state.timeLine.filter((card, index) => {
      return card.id !== id;
    });
    // Set the state's timeLine property to the new, filtered timeLine array
    this.setState({timeLine: deleteCardList});
  };

  handleCardChange = (id, input) => {

    const currentCard = {
      ...this.state.timeLine.find((card) => card.id === id),
      // setting the value of "text" to 'input'
      text: input,
    }
    const updatedTimeLine = this.state.timeLine.map((card, index) => {
      if (index === currentCard.id - 1) {
        return currentCard
      }
      return card
    })
    return this.setState({
      ...this.state,
      timeLine: updatedTimeLine,
    })

  }

  toggleEditField = (id) => {

    const currentCard = {
      ...this.state.timeLine.find((card) => card.id === id),
    }
    const updatedCard = {
      ...currentCard,
      isEditable: !currentCard.isEditable,
    }
    const updatedTimeLine = this.state.timeLine.map((card, index) => {
      if (index === currentCard.id - 1) {
        return updatedCard
      }
      return card
    })
    return this.setState({
      ...this.state,
      timeLine: updatedTimeLine,
    })

  }

  render () {
    return (
      <div className="App">

        <h1>ENTER YOUR POST BELOW</h1>

        <h3>Click on the post to edit</h3>

        <h3>Hit the X to delete</h3>

        <input
          onChange={(e) => this.handleChange(e)}
          value={this.state.inputValue}
          type="text" />

        <Button bsStyle="success" onClick={this.handleClick}>Submit</Button>

        <Timeline
          handleClick={this.toggleEditField}
          handleChange={this.handleCardChange}
          deleteStatus={this.deleteCardStatus}
          list={this.state.timeLine} />

      </div>
    );
  }
}

export default App;
