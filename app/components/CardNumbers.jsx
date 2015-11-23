// =========================================
// CardNumbers
// ----
// Psuedo-input, displays numbered entered
// =========================================

import React from 'react';
import {Motion, spring} from 'react-motion';

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

export default CardNumbers;