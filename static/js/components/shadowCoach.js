import React from 'react';
import BuildState from './buildState.js'
import PlayState from './playState.js'

class ShadowCoach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'stage': 'build',
      'combos': [],
    }
    this.handleBuildStateDone = this.handleBuildStateDone.bind(this);
  }
  handleBuildStateDone(combos) {
    this.setState({'stage': 'play', 'combos': combos});
  }
  render() {
    let stage;
    if(this.state.stage == 'build') {
      return (<BuildState handleBuildStateDone={this.handleBuildStateDone}/>);
    }
    else {
      return(<PlayState combos={this.state.combos}/>);
    }
  }
}
export default ShadowCoach;
