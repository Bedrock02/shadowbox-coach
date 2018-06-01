import React from 'react';
import MoveLibrary from './moveLibrary.js';

class ShadowCoach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'stage': 'build', 'combos': []}
  }
  render() {
    return (
      <div>
        <div id="comboBuilder" className="flex flex-col">
          <h1>Combo {this.state['combos'].length} of 6</h1>
          <div id="comboSandBox"></div>
        </div>
        <MoveLibrary />
      </div>
    )
  }
}
export default ShadowCoach
