import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.threads, ...threads];

    case ActionType.TOGGLE_LIKE_THREAD:
      return threads.map((thread) => {
        if (threads.id === action.payload.threadId) {
          return {
            ...thread,
          };
        }
        return threads;
      });
    case ActionType.TOGGLE_NEUTRAL_THREAD:
      return threads.map((thread) => {
        if (threads.id === action.payload.threadId) {
          return {
            ...thread,
          };
        }
        return threads;
      });
    case ActionType.TOGGLE_DISLIKE_THREAD:
      return threads.map((thread) => {
        if (threads.id === action.payload.threadId) {
          return {
            ...thread,
          };
        }
        return threads;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
