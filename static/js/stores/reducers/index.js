import { currentCombo, currentSetNumber, combos } from 'stores/reducers/builder';
import {
  stage, repeat, minutes, seconds,
} from 'stores/reducers/main';

const initialState = {
  builder: {
    currentCombo: [],
    setNumberLimit: 0,
    currentSetNumber: 0,
    combos: [],
  },
  stage: 'build',
  repeat: false,
  minutes: '1',
  seconds: '30',
};

/**
 * Reducer For ShadowCoach Application
 */
function mainApp( state = initialState, action ) {
  return {
    builder: {
      currentCombo: currentCombo( state.builder.currentCombo, action ),
      currentSetNumber: currentSetNumber( state.builder.currentSetNumber, action ),
      combos: combos( state.builder.combos, action ),
      setNumberLimit: 5,
    },
    stage: stage( state.stage, action ),
    repeat: repeat( state.repeat, action ),
    minutes: minutes( state.minutes, action ),
    seconds: seconds( state.seconds, action ),
  };
}

export default mainApp;
