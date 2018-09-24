import React from 'react';
import PlayAction from 'components/playAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  shadowbox,
  toggleRepeat,
  minuteChange,
  secondsChange,
} from 'stores/actions/main';

/**
* Component For PlayState
*/
class PlayState extends React.Component {
  /**
  * Render
  */
  render() {
    const {
      stage,
      repeat,
      minutes,
      seconds,
      handleCheckboxChange,
      handleMinutesChange,
      handleSecondsChange,
      handleStart,
    } = this.props;

    if ( stage === 'options' ) {
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
              defaultValue={repeat}
              onChange={e => handleCheckboxChange( e )}
            />
          </div>
          <div className="flex flex-row">
            <span>Minutes</span>
            <input
              type="number"
              name="minutes"
              defaultValue={minutes}
              onChange={e => handleMinutesChange( e )}
            />
          </div>
          <div className="flex flex-row">
            <span>Seconds</span>
            <input
              type="number"
              name="seconds"
              defaultValue={seconds}
              onChange={e => handleSecondsChange( e )}
            />
          </div>
          <div onClick={handleStart} className="flex flex-row">
            <i className="fa fa-play" aria-hidden="true" />
          </div>
        </div>
      );
    }

    return (
      <div id="playAction" className="flex flex-col">
        <PlayAction />
      </div>
    );
  }
}

PlayState.propTypes = {
  stage: PropTypes.string.isRequired,
  repeat: PropTypes.bool.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleMinutesChange: PropTypes.func.isRequired,
  handleSecondsChange: PropTypes.func.isRequired,
  handleStart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ( {
  repeat: state.repeat,
  combos: state.builder.combos,
  stage: state.stage,
  minutes: state.minutes,
  seconds: state.seconds,
} );
const mapDispatchToProps = dispatch => ( {
  handleCheckboxChange( e ) {
    dispatch( toggleRepeat( { repeat: JSON.parse( e.target.checked ) } ) );
  },
  handleMinutesChange( e ) {
    dispatch( minuteChange( { minutes: e.target.value } ) );
  },
  handleSecondsChange( e ) {
    dispatch( secondsChange( { seconds: e.target.value } ) );
  },
  handleStart() {
    dispatch( shadowbox() );
  },
} );
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)( PlayState );
