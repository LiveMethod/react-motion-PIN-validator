// =========================================
// SuccessMessage
// ----
// Appears when number is successfully validated
// =========================================

import React from 'react';
import {Motion, spring} from 'react-motion';

const SuccessMessage = React.createClass({
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

export default SuccessMessage;