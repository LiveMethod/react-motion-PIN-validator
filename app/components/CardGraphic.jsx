// =========================================
// CardGraphic
// ----
// Animation wrapper for card reference graphic
// =========================================

import React from 'react';
import {Motion, spring} from 'react-motion';

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

export default CardGraphic;