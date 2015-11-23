// =========================================
// StatusText
// ----
// Displays system status - checking, invalid, etc
// =========================================

import React from 'react';
import {Motion, spring} from 'react-motion';

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

export default StatusText;