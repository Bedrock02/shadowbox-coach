import React from 'react';
let moment = require('moment');
let timerId;

class PlayAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'combos': this.props.combos,
      'minutes': this.props.minutes,
      'seconds': this.props.seconds,
      'repeat': this.props.repeat,
      'current_set': 0,
      'stage': 'rest',
      'rest_timer': moment(2, 'seconds'),
      'play_timer': null
    }
  }
  newPlayTimer() {
    let time, new_play_timer;
    time = this.state.minutes + ":" + this.state.seconds;
    new_play_timer = moment(time, 'm:ss');
    return new_play_timer;
  }
  componentDidMount() {
    this.startTimer();
  }
  countDownRest() {
    let timeNow, newTime;
    timeNow = this.state.rest_timer;
    newTime = timeNow.subtract({"seconds": "1"});
    this.setState({'rest_timer': newTime});
    if (newTime.seconds() === 0 && newTime.minutes() === 0) {
      this.stopTimer();
      this.setState({
        'stage': 'play',
        'play_timer': this.newPlayTimer()
      });
      this.startTimer();
    }
  }
  countDownPlay() {
    let timeNow, newTime;
    timeNow = this.state.play_timer;
    newTime = timeNow.subtract({"seconds": "1"});
    this.setState({'play_timer': newTime});
    // Timer has reached the end
    if (newTime.seconds() === 0 && newTime.minutes() === 0) {
      this.stopTimer();
      // End of Workout
      if(this.state.current_set == this.state.combos.length - 1) {
        this.finishWorkout();
      } else {
        this.setState({
          'stage': 'rest',
          'current_set': this.state.current_set + 1,
          'rest_timer': moment(2, 'seconds')
        });
        this.startTimer();
      }
    }
  }
  finishWorkout() {
    if(this.state.repeat) {
      this.setState({
        'repeat': false,
        'current_set': 0,
        'stage': 'rest',
        'rest_timer': moment(2, 'seconds'),
      });
      this.startTimer();
    }
  }
  stopTimer() {
    clearInterval(timerId);
    timerId = null;
  }
  startTimer() {
    if(this.state.stage == "play") {
      timerId = setInterval(() => {
        this.countDownPlay();
      }, 1000);
    } else {
      timerId = setInterval(() => {
        this.countDownRest();
      }, 1000);
    }
  }
  render() {
    let currentCombo, comboMoves;
    currentCombo = this.state.combos[this.state.current_set];
    comboMoves = currentCombo.map((move, index) =>
      <li key={index}>{move}</li>
    );
    if(this.state.stage == 'rest') {
      return(
        <div id="restTimer" className="flex flex-col">
          <div id="restCount">
            <h1>REST</h1>
            <h2>{this.state.rest_timer.format("s")}</h2>
          </div>
          <div id="nextCombo">
            <h4>Next Combo:</h4>
            <ol className="flex flex-col">{comboMoves}</ol>
          </div>
        </div>
      );
    } else {
      return(
        <div id="playTimer" className="flex flex-col">
        <div>
          <h1>Set {this.state.current_set + 1}</h1>
          <h1>{this.state.play_timer.format("m:ss")}</h1>
        </div>
          <div>
            <ol className="flex flex-col">{comboMoves}</ol>
          </div>
        </div>
      )
    }
  }
}
export default PlayAction;
