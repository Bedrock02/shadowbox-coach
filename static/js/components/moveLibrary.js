import React from 'react';

class MoveLibrary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      return (
        <div id="moveLibrary" className="flex flex-row">
          <div><p>Jab</p></div>
          <div><p>Cross</p></div>
          <div><p>Left Hook</p></div>
          <div><p>Right Hook</p></div>
          <div><p>Left Uppercut</p></div>
          <div><p>Right Uppercut</p></div>
          <div><p>Front Kick</p></div>
          <div><p>Side Kick</p></div>
          <div><p>Round House Kick</p></div>
          <div><p>Heel Kick</p></div>
        </div>
      )
    }
}
export default MoveLibrary
