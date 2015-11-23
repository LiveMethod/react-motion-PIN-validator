// =========================================
// NumpadContainer
// ----
// Wraps individual numpad keys
// =========================================

import React from 'react';
import {Motion, spring} from 'react-motion';

import NumpadKey from './NumpadKey.jsx'

const NumpadContainer = React.createClass({
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
              <NumpadKey handleClick={this.props.handleClick} value="1"/>
              <NumpadKey handleClick={this.props.handleClick} value="2"/>
              <NumpadKey handleClick={this.props.handleClick} value="3"/>
              <NumpadKey handleClick={this.props.handleClick} value="4"/>
              <NumpadKey handleClick={this.props.handleClick} value="5"/>
              <NumpadKey handleClick={this.props.handleClick} value="6"/>
              <NumpadKey handleClick={this.props.handleClick} value="7"/>
              <NumpadKey handleClick={this.props.handleClick} value="8"/>
              <NumpadKey handleClick={this.props.handleClick} value="9"/>
              <NumpadKey value="&nbsp;"/>
              <NumpadKey handleClick={this.props.handleClick} value="0"/>
              <NumpadKey handleClick={this.props.handleDelete} value={<img src='./img/delete.svg' height='20px' alt='delete'/>}/>
            </div>)}
        </Motion>
    )
  }
});

export default NumpadContainer;