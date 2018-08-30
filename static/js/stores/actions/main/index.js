import * as types from 'stores/types/main';

export function finalizedCombo( data ) {
  return { type: types.DONE_BUILDING, data };
}
export function shadowbox( data ) {
  return { type: types.SHADOWBOX, data };
}
export function toggleRepeat( data ) {
  return { type: types.TOGGLE_REPEAT, data };
}
export function minuteChange( data ) {
  return { type: types.MINUTE_CHANGE, data };
}
export function secondsChange( data ) {
  return { type: types.SECONDS_CHANGE, data };
}
