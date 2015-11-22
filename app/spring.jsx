import React from 'react';
import {Spring} from 'react-motion';

class Fuck({
  render: function() {
    return (
      <div>
        <h2>Behold:</h2>
        <Spring defaultValue={0} endValue={360}>
          {val => {
            return(<div>{val}</div>)
          }}
        </Spring>
      </div>
    );
  },
});