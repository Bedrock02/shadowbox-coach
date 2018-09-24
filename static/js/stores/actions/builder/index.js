import * as types from 'stores/types/builder';

export function saveListOfCombinations(data) {
  return { type: types.SAVE_COMBO_LIST, data };
}

export function nextCombinationInList(data) {
  return { type: types.NEXT_COMBO, data };
}

export function previousCombinationInList(data) {
  return { type: types.PREV_COMBO, data };
}

export function changeCurrentCombination(data) {
  return { type: types.CHANGE_CURRENT_COMBO, data };
}

export function addMove(data) {
  return { type: types.ADD_MOVE, data };
}

export function clearMove(data) {
  return { type: types.CLEAR_MOVE, data };
}
