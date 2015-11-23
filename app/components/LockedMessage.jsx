// =========================================
// LockedMessage
// ----
// Appears when user is locked out due to
// repeated failed validation attempts
// =========================================

import React from 'react';
import {Motion, spring} from 'react-motion';

const LockedMessage = React.createClass({
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

export default LockedMessage;