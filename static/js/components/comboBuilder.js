import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/**
* ComboBuilder Component
*/
class ComboBuilder extends React.Component {
  /**
  * ComponentDidUpdate Listener
  */
  componentDidUpdate( ) {
    const element = document.getElementById( 'moveList' );
    if ( element.lastChild ) {
      element.lastChild.scrollIntoView( { behavior: 'smooth' } );
    }
  }

  /**
  * Render
  */
  render() {
    const { currentCombo, currentSetNumber } = this.props;
    const comboMoves = currentCombo ? (
      currentCombo.map( ( move, index ) => <li key={index}>{move}</li> )
    ) : ( null );
    return (
      <div id="comboBuilder" className="flex flex-col">
        <h1>
          {'Set '}
          { currentSetNumber }
        </h1>
        <div id="comboSandBox">
          <ol id="moveList" className="flex flex-col">{ comboMoves }</ol>
        </div>
      </div>
    );
  }
}
ComboBuilder.propTypes = {
  currentCombo: PropTypes.array,
  currentSetNumber: PropTypes.number.isRequired,
};

const mapStateToProps = state => ( {
  currentSetNumber: state.builder.currentSetNumber + 1,
  currentCombo: state.builder.currentCombo,
} );

export default connect(
  mapStateToProps,
  null,
)( ComboBuilder );
