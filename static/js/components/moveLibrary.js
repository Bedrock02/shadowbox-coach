import React from 'react';

class MoveLibrary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {'handleClick': this.props.handleClick};
    }
    render() {
      return (
        <div id="moveLibrary" className="flex flex-row">
          <div onClick={this.state.handleClick}><p>Jab</p></div>
          <div onClick={this.state.handleClick}><p>Cross</p></div>
          <div onClick={this.state.handleClick}><p>Left Hook</p></div>
          <div onClick={this.state.handleClick}><p>Right Hook</p></div>
          <div onClick={this.state.handleClick}><p>Left Uppercut</p></div>
          <div onClick={this.state.handleClick}><p>Right Uppercut</p></div>
          <div onClick={this.state.handleClick}><p>Front Kick</p></div>
          <div onClick={this.state.handleClick}><p>Side Kick</p></div>
          <div onClick={this.state.handleClick}><p>Round House Kick</p></div>
          <div onClick={this.state.handleClick}><p>Heel Kick</p></div>
        </div>
      )
    }
}
export default MoveLibrary
