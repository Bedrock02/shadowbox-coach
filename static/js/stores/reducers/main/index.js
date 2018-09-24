import * as types from 'stores/types/main';

export function stage(state = 'build', action) {
  switch (action.type) {
    case types.DONE_BUILDING:
      return 'options';
    case types.SHADOWBOX:
      return 'play';
    default: {
      return state;
    }
  }
}

export function repeat(state = false, action) {
  switch (action.type) {
    case types.TOGGLE_REPEAT: {
      return !action.data.repeat;
    }
    default: {
      return state;
    }
  }
}

export function minutes(state = '1', action) {
  switch (action.type) {
    case types.MINUTE_CHANGE: {
      return action.data.minutes;
    }
    default: {
      return state;
    }
  }
}

export function seconds(state = '1', action) {
  switch (action.type) {
    case types.SECONDS_CHANGE: {
      return action.data.seconds;
    }
    default: {
      return state;
    }
  }
}
