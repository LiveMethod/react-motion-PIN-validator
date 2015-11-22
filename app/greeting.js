import React from "react";

export default React.createClass({
  render: function() {
    return (
      <div className="greeting">
        <h1>Hedd, {this.props.name}!</h1>
      </div>
    );
  },
});