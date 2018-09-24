import React from 'react';
import { connect } from 'react-redux';
import { addMove } from 'stores/actions/builder';
import PropTypes from 'prop-types';

/**
* Component displays all possible move options
* When a move is selected, this should trigger an event
*/
class MoveLibrary extends React.Component {
  /** Render */
  render() {
    const { handleMoveClick } = this.props;
    const moves = ['Jab', 'Cross', 'Left Hook', 'Right Hook',
      'Left Uppercut', 'Right Uppercut', 'Front Kick', 'Side Kick',
      'Round House Kick', 'Heel Kick',
    ];
    const moveOptions = moves.map(
      ( move, index ) => <div key={move} role="button" tabIndex={index} onKeyPress={handleMoveClick} onClick={handleMoveClick}><p>{move}</p></div>,
    );
    return (
      <div id="moveLibrary" className="flex flex-row">
        {moveOptions}
      </div>
    );
  }
}

MoveLibrary.propTypes = {
  handleMoveClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ( {
  handleMoveClick( e ) {
    const move = e.currentTarget.innerText.trim();
    dispatch( addMove( { move } ) );
  },
} );

export default connect(
  null,
  mapDispatchToProps,
)( MoveLibrary );
