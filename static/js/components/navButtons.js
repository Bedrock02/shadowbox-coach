import React from 'react';

class NavButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'handleClearMove': this.props.handleClearMove,
      'handleNextMove': this.props.handleNextMove,
      'handlePrevMove': this.props.handlePrevMove
    };
  }
  render() {
    return (
      <div id="builderNavButtons" className='buttons flex flex-row'>
        <div id="prev" onClick={this.state.handlePrevMove}>
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </div>
        <div id="clear" onClick={this.state.handleClearMove}>
          <i className="fa fa-times"></i>
        </div>
        <div id="next" onClick={this.state.handleNextMove}>
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}
export default NavButtons;
