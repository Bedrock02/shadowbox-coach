import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const moment = require( 'moment' );

let timerId;

/**
* Stop Timer
*/
function stopTimer() {
  clearInterval( timerId );
  timerId = null;
}

/**
* PlayAction Component
*/
class PlayAction extends React.Component {
  /**
  * Constructor
  */
  constructor( props ) {
    super( props );
    const {
      combos,
      minutes,
      seconds,
      repeat,
    } = this.props;
    this.state = {
      currentSet: 0,
      playTimer: null,
      restTimer: moment( 10, 'seconds' ),
      stage: 'rest',
      combos,
      minutes,
      seconds,
      repeat,
    };
  }

  /**
  *  Start Timer Once Mount
  */
  componentDidMount() {
    this.startTimer();
  }

  /**
  * Creates a new timer
  * @returns {Moment obj}
  */
  newPlayTimer() {
    const { minutes, seconds } = this.state;
    return moment( `${minutes}:${seconds}`, 'm:ss' );
  }

  /**
  * Handles Rest Counter
  */
  countDownRest() {
    const { restTimer } = this.state;
    const newTime = restTimer.subtract( { seconds: '1' } );
    this.setState( { restTimer: newTime } );
    if ( newTime.seconds() === 0 && newTime.minutes() === 0 ) {
      stopTimer();
      this.setState( {
        stage: 'play',
        playTimer: this.newPlayTimer(),
      } );
      this.startTimer();
    }
  }

  /**
  * Handles Play Counter
  */
  countDownPlay() {
    const { playTimer, currentSet, combos } = this.state;
    const newTime = playTimer.subtract( { seconds: '1' } );
    this.setState( { playTimer: newTime } );
    // Timer has reached the end
    if ( newTime.seconds() === 0 && newTime.minutes() === 0 ) {
      stopTimer();
      // End of Workout
      if ( currentSet === combos.length - 1 ) {
        this.finishWorkout();
      } else {
        this.setState( {
          stage: 'rest',
          currentSet: currentSet + 1,
          restTimer: moment( 10, 'seconds' ),
        } );
        this.startTimer();
      }
    }
  }

  /**
  * Handles When Finished
  */
  finishWorkout() {
    const { repeat } = this.state;
    if ( repeat ) {
      this.setState( {
        repeat: false,
        currentSet: 0,
        stage: 'rest',
        restTimer: moment( 10, 'seconds' ),
      } );
      this.startTimer();
    }
  }

  /**
  * Handles Starting Timer
  */
  startTimer() {
    const { stage } = this.state;
    if ( stage === 'play' ) {
      timerId = setInterval( () => {
        this.countDownPlay();
      }, 1000 );
    } else {
      timerId = setInterval( () => {
        this.countDownRest();
      }, 1000 );
    }
  }

  /**
  * Render
  */
  render() {
    const {
      combos,
      currentSet,
      playTimer,
      restTimer,
      stage,
    } = this.state;

    const currentCombo = combos[currentSet];
    const comboMoves = currentCombo.map( ( move, index ) => <li key={index}>{move}</li> );
    if ( stage === 'rest' ) {
      return (
        <div id="restTimer" className="flex flex-col">
          <div id="restCount">
            <h1>REST</h1>
            <h2>{restTimer.format( 's' )}</h2>
          </div>
          <div id="nextCombo">
            <h4>Next Combo:</h4>
            <ol className="flex flex-col">{comboMoves}</ol>
          </div>
        </div>
      );
    }
    return (
      <div id="playTimer" className="flex flex-col">
        <div>
          <h1>
            {'Set '}
            {currentSet + 1}
          </h1>
          <h1>{playTimer.format( 'm:ss' )}</h1>
        </div>
        <div>
          <ol className="flex flex-col">{comboMoves}</ol>
        </div>
      </div>
    );
  }
}

PlayAction.propTypes = {
  combos: PropTypes.array.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  repeat: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ( {
  combos: state.builder.combos,
  minutes: state.minutes,
  seconds: state.seconds,
  repeat: state.repeat,
} );

export default connect(
  mapStateToProps,
  null,
)( PlayAction );
