import React from 'react';
import MoveLibrary from 'components/moveLibrary';
import ComboBuilder from 'components/comboBuilder';
import NavButtons from 'components/navButtons';
import PlayState from 'components/playState';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 *  Component Handles Two Different App Stages
 * 1. Builder: defines what sets are being made
 * 2. Option/Play: Sets up workout & Runs workout
 */
class ShadowCoach extends React.Component {
  /** Renders State */
  render() {
    const { stage } = this.props;
    if ( stage === 'build' ) {
      return (
        <div>
          <ComboBuilder />
          <MoveLibrary />
          <NavButtons />
        </div>
      );
    }
    return ( <PlayState /> );
  }
}
ShadowCoach.propTypes = {
  stage: PropTypes.string.isRequired,
};

const mapStateToProps = state => ( {
  stage: state.stage,
} );

export default connect(
  mapStateToProps,
  null,
)( ShadowCoach );
