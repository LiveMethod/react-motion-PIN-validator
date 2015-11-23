// =========================================
// NumpadKey
// ----
// Takes optional value and callback
// =========================================

import React from 'react';
import {Motion, spring} from 'react-motion';

const NumpadKey = React.createClass({

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

export default NumpadKey;