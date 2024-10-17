import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;

  case ActionType.ADD_THREAD:
    return [action.payload.threads, ...threads];

  case ActionType.TOGGLE_LIKE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const hasLiked = thread.likes.includes(action.payload.userId);
        return {
          ...thread,
          likes: hasLiked
            ? thread.likes.filter((userId) => userId !== action.payload.userId)
            : [...thread.likes, action.payload.userId],
        };
      }
      return thread;
    });

  case ActionType.TOGGLE_NEUTRAL_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        return {
          ...thread,
          likes: thread.likes.filter((userId) => userId !== action.payload.userId),
        };
      }
      return thread;
    });

  case ActionType.TOGGLE_DISLIKE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const hasDisliked = thread.dislikes.includes(action.payload.userId);
        return {
          ...thread,
          dislikes: hasDisliked
            ? thread.dislikes.filter((userId) => userId !== action.payload.userId)
            : [...thread.dislikes, action.payload.userId],
        };
      }
      return thread;
    });

  default:
    return threads;
  }
}

export default threadsReducer;
