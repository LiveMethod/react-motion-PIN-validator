import React from 'react';
import ReactDOM from 'react-dom';
// import Spring from "./spring.jsx";
import {Motion, spring} from 'react-motion';

// class Demo extends React.Component {
//   render(){
//     return(

//     )
//   }
// }


const Wrap = React.createClass ({
  getInitialState() {
      return {
          cardDigits: [],
          validationAttempts: 0,
          isSubmitting: false,
          isComplete: false
      };
  },

  handleClick: function(input){
    if(!this.state.isSubmitting){
      // console.log('pressed ' + input);
      if(this.state.cardDigits.length < 4){
        this.state.cardDigits.push(input);
        console.log(this.state.cardDigits);
      } 

      this.setState({cardDigits: this.state.cardDigits});

      if(this.state.cardDigits.length == 4){
        let givenPin = String(this.state.cardDigits[0]) + String(this.state.cardDigits[1]) + String(this.state.cardDigits[2]) + String(this.state.cardDigits[3]);
        isSubmitting: false,
        this.verifyDigits(givenPin);
      } else if(this.state.cardDigits.length > 4){
        console.log('I dont know how, but you fucked up and got too many numbers');
      }
    }
  },

  handleDelete: function(){
    if(!this.state.isSubmitting){
      console.log('delete the last of ' + this.state.cardDigits);
      //this.setState({cardDigits: this.state.cardDigits.pop()});
      this.state.cardDigits.pop();
      console.log(this.state.cardDigits);
      this.setState({cardDigits: this.state.cardDigits});
    }
  },

  verifyDigits: function(digits){
    if(digits == '1492'){
      console.log('ding ding ding!');
      this.setState({isComplete: true});
    } else{
      let attempts = this.state.validationAttempts + 1;
      this.setState({
        isSubmitting: false,
        validationAttempts: attempts, 
        cardDigits: []
      });
      console.log('ya goofed. ya goofball.');
    }
  },

  render: function(){
    
    // console.log(JSON.stringify(this.state));

    const {cardDigits, validationAttempts} = this.state;

    let style = {
      width: '320px',
      height: '568px',
      margin: '50px auto',
      backgroundColor: '#f9f9f9',
      border: '3px solid #666',
      position: 'relative',
      overflow: 'hidden'
    }
    return(
      <div style={style}>
        <CardGraphic isComplete={this.state.isComplete}/>
        <CardNumbers isComplete={this.state.isComplete} cardDigits={this.state.cardDigits}/>
        <KeyboardContainer isComplete={this.state.isComplete} handleClick={this.handleClick} handleDelete={this.handleDelete}/>
      </div>
    )
  }
});

const KeyboardContainer = React.createClass({
  render: function(){
    const fuck = -2;
    return (
        <Motion
          defaultStyle={{
            y: -350,
            o: -0.3
          }}
          style={{
            y: spring(0, [100, 19]),
            o: spring(1, [50, 14])
          }}>
          {motion => (
            <div style={{
              width: '100%',
              position: 'absolute',
              left: 0,
              bottom: motion.y,
              opacity: motion.o
            }}>
              <Keyboard handleClick={this.props.handleClick} handleDelete={this.props.handleDelete}/>
            </div>)}
        </Motion>
    )
  }
});

const Keyboard = React.createClass({
  handleClick: function(input){
    console.log('pressed ' + input);
  },
  render: function(){
    const keyStyle = {
      display: 'block',
      fontSize: '20px',
      paddingTop: '20px',
      border:'1px solid #ddd',
      width: '32.7%', 
      height: '40px', 
      float:'left', 
      background: '#fff',
      textAlign: 'center'
    }
    return(
      <div>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'1')}>1</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'2')}>2</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'3')}>3</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'4')}>4</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'5')}>5</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'6')}>6</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'7')}>7</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'8')}>8</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'9')}>9</a>
        <a style={keyStyle}>&nbsp;</a>
        <a style={keyStyle} onClick={this.props.handleClick.bind(null,'0')}>0</a>
        <a style={keyStyle} onClick={this.props.handleDelete.bind(null,'X')}>X</a>
      </div>
    )
  }
});

class CardGraphic extends React.Component {
  render(){
    const fuck = -2;
    return (
        <Motion
          defaultStyle={{
            y: 120,
            o: -0.3
          }}
          style={{
            y: spring(5, [90, 11]),
            o: spring(1, [50, 14])
          }}>
          {motion => (
            <div style={{
              width: '80%',
              position: 'absolute',
              left: '10%',
              backgroundColor: 'red',
              top: motion.y + '%',
              opacity: motion.o
            }}>
              <p>sdlfsd</p>
              <p>sdlfsd</p>
              <p>sdlfsd</p>
              <p>sdlfsd</p>
              <p>sdlfsd</p>
            </div>)}
        </Motion>
    )
  }
}

const CardNumbers = React.createClass({
  render: function(){
    const wrapStyle={
      position: 'absolute',
      bottom: '50%',
      width: '80%',
      left: '10%',
    }

    const style={
      border: '1px solid red',
      width: '21%',
      height: '60px',
      float: 'left',
      margin: '0 1.5%',
      borderBottom: '4px solid blue',
      fontSize: '50px',
      textAlign: 'center',
      fontFamily: 'Proxima Nova, Helvetica, sans-serif'
    }
    return(
      <div style={wrapStyle}>
        <div id="card_no_1" style={style}>{typeof this.props.cardDigits[0] !== 'undefined' ? this.props.cardDigits[0] : ''}</div>
        <div id="card_no_2" style={style}>{typeof this.props.cardDigits[1] !== 'undefined' ? this.props.cardDigits[1] : ''}</div>
        <div id="card_no_3" style={style}>{typeof this.props.cardDigits[2] !== 'undefined' ? this.props.cardDigits[2] : ''}</div>
        <div id="card_no_4" style={style}>{typeof this.props.cardDigits[3] !== 'undefined' ? this.props.cardDigits[3] : ''}</div>
      </div>
    )
  }
});

ReactDOM.render(
  <Wrap/>,
  document.getElementById('fuck')
);