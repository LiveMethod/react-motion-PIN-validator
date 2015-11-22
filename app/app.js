import React from 'react';
import ReactDOM from 'react-dom';
// import Spring from "./spring.jsx";
import {Motion, TransitionMotion, spring} from 'react-motion';

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
      //this.setState({cardDigits: this.state.cardDigits.pop()});
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
      if(digits == '1492'){
      console.log('ding ding ding!');
      self.setState({isComplete: true});
    } else{
      let attempts = self.state.validationAttempts + 1;
      self.setState({
        isSubmitting: false,
        validationAttempts: attempts, 
        cardDigits: []
      });
      console.log('ya goofed. ya goofball.');
    }
    }, 1000)
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
        <CardGraphic state={this.state}/>
        <CardNumbers state={this.state}/>
        <KeyboardContainer state={this.state} handleClick={this.handleClick} handleDelete={this.handleDelete}/>
      </div>
    )
  }
});

const KeyboardContainer = React.createClass({
  getStyle(){
    if(this.props.state.isComplete){
      return{
        y: spring(-350, [100, 19]),
        o: spring(0, [50, 14])
      }
    } else {
      return {
        y: spring(0, [100, 19]),
        o: spring(1, [50, 14])
      }
    }
  },
  render: function(){
    return (
        <Motion
          defaultStyle={{
            y: -350,
            o: -0.3
          }}
          style={this.getStyle()}>
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

// defaultStyle={{
//   y: 120,
//   o: -0.3
// }}
// style={{
//   y: spring(5, [90, 11]),
//   o: spring(1, [50, 14])
// }}

const CardGraphic = React.createClass ({

  // init position
  getDefaultStyle() {
    return {
      y: 120,
      o: -0.3,
      w: 100
    };
  },

  // where it gets sent
  getStyle(key) {

    if (this.props.state.isComplete){
      return {
        // send it up when it fades out
        y: spring(-40, [100, 11]),
        o: spring(0, [50, 14]),
        w: spring(60, [40, 11]),
      }
    } else if (this.props.state.isSubmitting){
      return {
        // get weird
        y: spring(4, [90, 11]),
        o: spring(0.6, [50, 14]),
        w: spring(70, [50, 14]),
      }
    } else {
      return {
        // usually near the top
        y: spring(5, [90, 11]),
        o: spring(1, [50, 14]),
        w: spring(80, [50, 14]),
      }
    }
  },

  componentWillUnmount() {
      console.log('so this happened');
  },

  render: function(){

    this.props.isSubmitting && console.log('i noticed');
    return (
        <Motion
          defaultStyle={this.getDefaultStyle()}
          style={this.getStyle()}
          >
          {motion => (
            <div style={{
              width: motion.w + '%',
              position: 'absolute',
              left: (100 - motion.w)/2 +'%',
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
});

const CardNumbers = React.createClass({
  getDefaultStyle(){
    return {
      b: 0, // bottom
      o: 0, // opacity
    }
  },

  getStyle(key){
    // complete
    if(this.props.state.isComplete){
      return {
        b: spring(50, [50, 14]), 
        o: spring(0, [50, 14]), 
      }
    // pending
    } else if (this.props.state.isSubmitting){
      return {
        b: spring(50, [50, 14]), 
        o: spring(0.5, [50, 14]), 
      }
    // normal
    } else{
      return {
        b: spring(50, [90, 11]), 
        o: spring(1, [50, 14]), 
      }
    }
  },
  render: function(){

    const digitStyle={
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
      <Motion
        defaultStyle={this.getDefaultStyle()}
        style={this.getStyle()}
      >
        {motion => (
          <div style={{
            position: 'absolute',
            bottom: motion.b + '%',
            width: '80%',
            left: '10%',
            opacity: motion.o
          }}>
            <div style={digitStyle}>{typeof this.props.state.cardDigits[0] !== 'undefined' ? this.props.state.cardDigits[0] : ''}</div>
            <div style={digitStyle}>{typeof this.props.state.cardDigits[1] !== 'undefined' ? this.props.state.cardDigits[1] : ''}</div>
            <div style={digitStyle}>{typeof this.props.state.cardDigits[2] !== 'undefined' ? this.props.state.cardDigits[2] : ''}</div>
            <div style={digitStyle}>{typeof this.props.state.cardDigits[3] !== 'undefined' ? this.props.state.cardDigits[3] : ''}</div>
          </div>)}
      </Motion>
    )
  }
});

ReactDOM.render(
  <Wrap/>,
  document.getElementById('fuck')
);