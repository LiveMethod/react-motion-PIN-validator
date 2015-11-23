import React from 'react';
import ReactDOM from 'react-dom';
import {Motion, TransitionMotion, spring} from 'react-motion';

const Wrap = React.createClass ({
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
        {this.state.isComplete && <Success state={this.state}/>}
        {this.state.isLockedOut && <Locked state={this.state}/>}
        <CardGraphic state={this.state}/>
        <CardNumbers state={this.state}/>
        <StatusText state={this.state}/>
        <KeyboardContainer state={this.state} handleClick={this.handleClick} handleDelete={this.handleDelete}/>
      </div>
    )
  }
});

const KeyboardContainer = React.createClass({
  getStyle(){
    if(this.props.state.isComplete || this.props.state.isLockedOut){
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
              backgroundColor: '#ffffff',
              left: 0,
              bottom: motion.y,
              opacity: motion.o
            }}>
              <Key handleClick={this.props.handleClick} value="1"/>
              <Key handleClick={this.props.handleClick} value="2"/>
              <Key handleClick={this.props.handleClick} value="3"/>
              <Key handleClick={this.props.handleClick} value="4"/>
              <Key handleClick={this.props.handleClick} value="5"/>
              <Key handleClick={this.props.handleClick} value="6"/>
              <Key handleClick={this.props.handleClick} value="7"/>
              <Key handleClick={this.props.handleClick} value="8"/>
              <Key handleClick={this.props.handleClick} value="9"/>
              <Key value="&nbsp;"/>
              <Key handleClick={this.props.handleClick} value="0"/>
              <Key handleClick={this.props.handleDelete} value={<img src='./img/delete.svg' height='20px' alt='delete'/>}/>
            </div>)}
        </Motion>
    )
  }
});

const Key = React.createClass({

  getInitialState: function() {
     return{
        mouseDown: false
     }
  },

  onMouseDown: function(){
    this.setState({mouseDown: true});
  },

  onMouseUp: function(){
    this.setState({mouseDown: false});
  },

  render: function(){

    const keyStyle = {
      display: 'block',
      fontSize: '28px',
      fontWeight: '200',
      paddingTop: '12px',
      paddingBottom: '12px',
      boxSizing:'border-box',
      border:'1px solid #E9F1F6',
      width: '33.333%', 
      float:'left', 
      background: 'rgba(255,255,255,'+ (this.state.mouseDown ? '0.8' : '1') + ')',
      textAlign: 'center',
      color: '#3C7288',
      textShadow: 'none',
    }

    return(
      <a style={keyStyle}
        onClick={this.props.handleClick && this.props.handleClick.bind(null,this.props.value)} 
        onMouseDown={this.props.handleClick && this.onMouseDown.bind(null,this)} 
        onMouseUp={this.props.handleClick && this.onMouseUp.bind(null,this)}
      >
        {this.props.value}
      </a>
    )
  }
});

const CardGraphic = React.createClass ({

  // init position
  getDefaultStyle() {
    return {
      y: 120,
      o: -0.3,
      w: 100
    };
  },

  // possible states
  getStyle(key) {

    if (this.props.state.isComplete || this.props.state.isLockedOut){
      return {
        // send it up when it fades out
        y: spring(-40, [100, 11]),
        o: spring(0, [50, 14]),
        w: spring(60, [40, 11]),
      }
    } else if (this.props.state.isSubmitting){
      return {
        // thinking
        y: spring(5.5, [90, 11]),
        o: spring(0.8, [90, 14]),
        w: spring(84, [90, 20]),
      }
    } else {
      return {
        // usually near the top
        y: spring(5, [90, 11]),
        o: spring(1, [50, 14]),
        w: spring(88, [50, 14]),
      }
    }
  },

  render: function(){

    this.props.isSubmitting && console.log('i noticed');
    return (
        <Motion
          defaultStyle={this.getDefaultStyle()}
          style={this.getStyle()}
          >
          {motion => (
            <img style={{
              width: motion.w + '%',
              position: 'absolute',
              left: (100 - motion.w)/2 +'%',
              backgroundColor: 'none',
              top: motion.y + '%',
              opacity: motion.o
            }}
            src="./img/card.png"
            alt="Where to find the last four digits"
            />)}
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
    if(this.props.state.isComplete || this.props.state.isLockedOut){
      return {
        b: spring(53.5, [50, 14]), 
        o: spring(0, [90, 14]), 
      }
    // pending
    } else if (this.props.state.isSubmitting){
      return {
        b: spring(53.5, [50, 14]), 
        o: spring(0.3, [50, 14]), 
      }
    // normal
    } else{
      return {
        b: spring(53.5, [90, 11]), 
        o: spring(1, [50, 14]), 
      }
    }
  },
  render: function(){

    const digitStyle={
      position: 'relative',
      width: '21%',
      height: '60px',
      float: 'left',
      margin: '0 1.5%',
      fontSize: '50px',
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: '300',
    }

    const borderStyle = {
      display: 'block',
      position: 'absolute',
      left: '0px',
      bottom: '-4px',
      width: '100%',
      height: '4px',
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 8px 0px rgba(0,91,166,0.50), 0px 8px 8px 0px rgba(51,31,102,0.08), 0px 16px 16px 0px rgba(18,39,62,0.15)',
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
            <div style={digitStyle}>
              {typeof this.props.state.cardDigits[0] !== 'undefined' ? this.props.state.cardDigits[0] : ''}
              <div style={borderStyle}></div>
            </div>
            <div style={digitStyle}>
              {typeof this.props.state.cardDigits[1] !== 'undefined' ? this.props.state.cardDigits[1] : ''}
              <div style={borderStyle}></div>
            </div>
            <div style={digitStyle}>
              {typeof this.props.state.cardDigits[2] !== 'undefined' ? this.props.state.cardDigits[2] : ''}
              <div style={borderStyle}></div>
            </div>
            <div style={digitStyle}>
              {typeof this.props.state.cardDigits[3] !== 'undefined' ? this.props.state.cardDigits[3] : ''}
              <div style={borderStyle}></div>
            </div>
          </div>)}
      </Motion>
    )
  }
});

const StatusText = React.createClass({
  getDefaultStyle(){
    return {
      b: 0, // bottom
      o: 0, // opacity
    }
  },

  getStyle(key){
    // complete
    if(this.props.state.isComplete || this.props.state.isLockedOut){
      return {
        b: spring(46.5, [90, 14]), 
        o: spring(0, [50, 14]), 
      }
    // pending
    } else if (this.props.state.isSubmitting){
      return {
        b: spring(46.5, [50, 14]), 
        o: spring(0.4, [50, 14]), 
      }
    // normal
    } else{
      return {
        b: spring(46.5, [90, 11]), 
        o: spring(0.9, [50, 14]), 
      }
    }
  },
  render: function(){

    let statusTextContent = 'Last Four Digits';
    this.props.state.validationAttempts > 0 ? statusTextContent = 'Incorrect, try again.' : '';
    this.props.state.validationAttempts == (this.props.state.maxAttempts -1) ? statusTextContent = 'Incorrect. One attempt remaining.' : '';
    this.props.state.validationAttempts >= this.props.state.maxAttempts ? statusTextContent = 'Validation Failed.' : '';
    this.props.state.isSubmitting ? statusTextContent = 'Checking' : '';
    this.props.state.isComplete ? statusTextContent = 'Success!' : '';

    const spinnerStyle = {
      height: '20px',
      marginRight: '5px',
      marginBottom: '-2px',
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
            opacity: motion.o,
            textAlign: 'center',
            color: '#ffffff',
            fontWeight: '300',
            letterSpacing: '0.01em',

          }}>
            {/* show a spinner if it's checking */}
            {this.props.state.isSubmitting &&
              <img src="./img/rolling.svg" style={spinnerStyle} alt=""/>
            }
            {statusTextContent}
          </div>)}
      </Motion>
    )
  }
});

const Success = React.createClass({
  getDefaultStyle(){
    return {
      b: 42, // bottom
      o: 0, // opacity
      w: 0, // width
    }
  },

  getStyle(key){
    // normal
    if(1==1){
      return {
        b: spring(42, [90, 11]),
        o: spring(1, [50, 14]),
        w: spring(40, [90, 11]),
      }
    }
  },
  render: function(){

    console.log('skjdfhdhf');
    return(
      <Motion
        defaultStyle={this.getDefaultStyle()}
        style={this.getStyle()}
      >
        {motion => (
          <img
            style={{
              position: 'absolute',
              bottom: motion.b + '%',
              left: (100 - motion.w)/2 + '%',
              width: motion.w + '%',
              background: 'none',
              opacity: motion.o,
            }}

            src="./img/check.svg"

            alt="success"
          />
        )}
      </Motion>
    )
  }
});

const Locked = React.createClass({
  getDefaultStyle(){
    return {
      b: 56, // bottom
      o: 0, // opacity
      w: 0, // width
    }
  },

  getStyle(key){
    // normal
    if(1==1){
      return {
        b: spring(56, [120, 14]),
        o: spring(1, [120, 17]),
        w: spring(40, [120, 14]),
      }
    }
  },
  render: function(){

    console.log('skjdfhdhf');
    return(
      <Motion
        defaultStyle={this.getDefaultStyle()}
        style={this.getStyle()}
      >
        {motion => (
          <div>
            <img
              style={{
                position: 'absolute',
                bottom: motion.b + '%',
                left: (100 - motion.w)/2 + '%',
                width: motion.w + '%',
                background: 'none',
                opacity: motion.o
              }}

              src="./img/x.svg"

              alt="locked" />

            <h2 style={{
              color: '#ffffff',
              width: '100%',
              textAlign: 'center',
              opacity: motion.o,
              position: 'absolute',
              bottom: '42%'
            }}>
              Too Many Tries
            </h2>
            <p style={{
              color: '#ffffff',
              width: '100%',
              textAlign: 'center',
              opacity: motion.o,
              position: 'absolute',
              bottom: '35%'
            }}>
              You&apos;ve entered too many incorrect PINs. Please try again in 15 minutes.
            </p>
          </div>
        )}
      </Motion>
    )
  }
});

ReactDOM.render(
  <Wrap/>,
  document.getElementById('container')
);