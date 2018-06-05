import React from 'react';
import PlayAction from './playAction.js'

class PlayState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'repeat': false,
      'combos': this.props.combos, // change to props
      'stage': 'options',
      'minutes': "1",
      'seconds': "30"
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSecondsChange = this.handleSecondsChange.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }
  handleCheckboxChange(e) {
    this.setState({'repeat': JSON.parse(e.target.checked)});
  }
  handleMinutesChange(e) {
    this.setState({'minutes': e.target.value});
  }
  handleSecondsChange(e) {
    this.setState({'seconds': e.target.value});
  }
  handleStart(){
    this.setState({'stage': 'play'});
  }
  render() {
    if(this.state.stage == 'options') {
      return (
        <div id="playOptions" className="flex flex-col">
          <div className="flex flex-row">
            <h1>Shadow Boxing Options</h1>
          </div>
          <div className="flex flex-row">
            <span>Repeat Twice</span>
            <input
              type="checkbox"
              name="repeat"
              defaultValue={this.state.repeat}
              onChange={(e) => this.handleCheckboxChange(e)}/>
          </div>
          <div className="flex flex-row">
            <span>Minutes</span>
            <input
              type="number"
              name="minutes"
              defaultValue={this.state.minutes}
              onChange={(e) => this.handleMinutesChange(e)}/>
          </div>
          <div className="flex flex-row">
            <span>Seconds</span>
            <input
              type="number"
              name="seconds"
              defaultValue={this.state.seconds}
              onChange={(e) => this.handleSecondsChange(e)}/>
          </div>
          <div onClick={this.handleStart} className="flex flex-row">
            <i className="fa fa-play" aria-hidden="true"></i>
          </div>
        </div>
      );
    }
    else {
      return(
        <div id="playAction" className="flex flex-col">
          <PlayAction
          combos={this.state.combos}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          repeat={this.state.repeat}/>
        </div>
      );
    }
  }
}
export default PlayState;
