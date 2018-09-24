import * as types from 'stores/types/builder';
import store from 'stores';

export function combos( state = [], action ) {
  switch ( action.type ) {
    case types.SAVE_COMBO_LIST:
      const emptyCurrentCombo = action.data.currentCombo == undefined || action.data.currentCombo.length == 0;


      const endOfComboList = action.data.currentSetNumber == state.length;

      const newState = [...state];
      ( endOfComboList && !emptyCurrentCombo ) ? newState.push( action.data.currentCombo )
        : newState[action.data.currentSetNumber] = action.data.currentCombo;
      return newState;

    default:
      return state;
  }
}

export function currentSetNumber( state = 0, action ) {
  switch ( action.type ) {
    case types.PREV_COMBO:
      let newSetNumber;
      newSetNumber = state - 1;
      return ( newSetNumber <= 0 ) ? 0 : newSetNumber;

    case types.NEXT_COMBO:
      return state + 1;

    default:
      return state;
  }
}

export function currentCombo( state = [], action ) {
  let new_state;
  switch ( action.type ) {
    case types.CHANGE_CURRENT_COMBO: {
      if ( action.data.combos.length === 0 || action.data.currentSetNumber >= action.data.combos.length ) {
        return [];
      }
      return [...action.data.combos[action.data.currentSetNumber]];
    }
    case types.ADD_MOVE: {
      new_state = [...state];
      new_state.push( action.data.move );
      return new_state;
    }

    case types.CLEAR_MOVE: {
      const new_state = [...state];
      new_state.pop();
      return new_state;
    }

    default: {
      return [...state];
    }
  }
}
