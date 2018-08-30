import React from 'react';
import { connect } from 'react-redux';
import {
  clearMove,
  saveListOfCombinations,
  previousCombinationInList,
  nextCombinationInList,
  changeCurrentCombination,
} from 'stores/actions/builder';
import { finalizedCombo } from 'stores/actions/main';
import store from 'stores/';
import PropTypes from 'prop-types';

/**
* NavButtons Component
*/
class NavButtons extends React.Component {
  /**
  * Render
  */
  render() {
    const {
      handlePrevMove,
      handleClearMove,
      handleNextMove,
    } = this.props;
    return (
      <div id="builderNavButtons" className="buttons flex flex-row">
        <div id="prev" onClick={handlePrevMove}>
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </div>
        <div id="clear" onClick={handleClearMove}>
          <i className="fa fa-times" />
        </div>
        <div id="next" onClick={handleNextMove}>
          <i className="fa fa-chevron-right" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

NavButtons.propTypes = {
  handlePrevMove: PropTypes.func.isRequired,
  handleClearMove: PropTypes.func.isRequired,
  handleNextMove: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ( {
  handleClearMove() {
    const state = store.getState();
    if ( state.builder.currentCombo.length <= 0 ) {
      return;
    }
    dispatch( clearMove() );
  },
  handlePrevMove() {
    let state = store.getState();
    dispatch( saveListOfCombinations( {
      currentCombo: state.builder.currentCombo,
      currentSetNmber: state.builder.currentSetNumber,
    } ) );
    dispatch( previousCombinationInList() );
    state = store.getState();
    dispatch( changeCurrentCombination( {
      combos: state.builder.combos,
      currentSetNumber: state.builder.currentSetNumber,
    } ) );
  },
  handleNextMove( ) {
    let state = store.getState();

    const emptyComboList = state.builder.combos === undefined
      || state.builder.combos.length === 0;
    const emptyCurrentCombo = state.builder.currentCombo === undefined
      || state.builder.currentCombo.length === 0;
    const endOfComboList = state.builder.combos === undefined
      || state.builder.combos.length === 0;

    // Do nothing if everything is empty
    // Do nothing if end of combo list and no current combo
    if ( ( emptyComboList && emptyCurrentCombo ) || ( endOfComboList && emptyCurrentCombo ) ) {
      return;
    }
    dispatch( saveListOfCombinations( {
      currentCombo: state.builder.currentCombo,
      currentSetNumber: state.builder.currentSetNumber,
    } ) );
    dispatch( nextCombinationInList() );
    state = store.getState();
    dispatch( changeCurrentCombination( {
      combos: state.builder.combos,
      currentSetNumber: state.builder.currentSetNumber,
    } ) );
    // Reached The End
    if ( state.builder.combos.length >= state.builder.setNumberLimit + 1 ) {
      dispatch( finalizedCombo() );
    }
  },
} );

export default connect(
  null,
  mapDispatchToProps,
)( NavButtons );
