// =========================================
// App
// ----
// Receives PIN, attempts to validate
// =========================================

import React from 'react';
import ReactDOM from 'react-dom';
import {Motion, spring} from 'react-motion';


import CardGraphic from './components/CardGraphic.jsx';
import CardNumbers from './components/CardNumbers.jsx';
import StatusText from './components/StatusText.jsx';
import LockedMessage from './components/LockedMessage.jsx';
import SuccessMessage from './components/SuccessMessage.jsx';
import NumpadContainer from './components/NumpadContainer.jsx';


const App = React.createClass ({
  getInitialState() {
    return {
      cardDigits: [],
      validationAttempts: 0,
      maxAttempts: 3,
      isSubmitting: false,
      isComplete: false,
      isLockedOut: false
    };
  },

  handleClick: function(input){
    if(!this.state.isSubmitting){
      if(this.state.cardDigits.length < 4){
        this.state.cardDigits.push(input);
        console.log(this.state.cardDigits);
      } 

      this.setState({cardDigits: this.state.cardDigits});

      if(this.state.cardDigits.length == 4){
        let givenPin = String(this.state.cardDigits[0]) + String(this.state.cardDigits[1]) + String(this.state.cardDigits[2]) + String(this.state.cardDigits[3]);
        this.setState({isSubmitting: true});
        this.verifyDigits(givenPin);
      } else if(this.state.cardDigits.length > 4){
        console.log('I dont know how, but you fucked up and got too many numbers');
      }
    }
  },

  handleDelete: function(){
    if(!this.state.isSubmitting){
      console.log('delete the last of ' + this.state.cardDigits);
      this.state.cardDigits.pop();
      console.log(this.state.cardDigits);
      this.setState({cardDigits: this.state.cardDigits});
    }
  },

  verifyDigits: function(digits){
    let self = this;
    // arbitrarily delay to simulate
    // an API call
    setTimeout(function(){
      // if correct
      if(digits == '9017'){
        console.log('Correct PIN!');
        self.setState({isComplete: true});

      // if incorrect
      } else{
        let attempts = self.state.validationAttempts + 1;
        self.setState({
          isSubmitting: false,
          validationAttempts: attempts,
          // use attempts, not state.validationAttempts here, because
          // state doesn't know attempts is +1 until after this call
          isLockedOut: attempts >= self.state.maxAttempts ? true : false,
          cardDigits: []
        });
        console.log(
          'That PIN was incorrect. ' + 
          (attempts >= self.state.maxAttempts ?
            'You are locked out after too many tries.' :
            'Try Again'
          )
        );
      }
    }, 1000)
  },

  render: function(){
    
    const {cardDigits, validationAttempts} = this.state;

    let style = {
      width: '320px',
      height: '568px',
      margin: '50px auto',
      border: '1px solid #E9F1F6',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Lato", sans-serif',
      background: '#8c2aff',
      background: '-moz-linear-gradient(top,  #8c2aff 0%, #00ebff 100%)',
      background: '-webkit-linear-gradient(top,  #8c2aff 0%,#00ebff 100%)',
      background: 'linear-gradient(to bottom,  #8c2aff 0%,#00ebff 100%)',
      textShadow: '0px 4px 8px rgba(0,91,166,0.50), 0px 8px 8px rgba(51,31,102,0.08), 0px 16px 16px rgba(18,39,62,0.15)',

    }
    return(
      <div style={style}>
        {this.state.isComplete && <SuccessMessage state={this.state}/>}
        {this.state.isLockedOut && <LockedMessage state={this.state}/>}
        <CardGraphic state={this.state}/>
        <CardNumbers state={this.state}/>
        <StatusText state={this.state}/>
        <NumpadContainer state={this.state} handleClick={this.handleClick} handleDelete={this.handleDelete}/>
      </div>
    )
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('appContainer')
);