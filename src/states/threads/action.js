import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_NEUTRAL_THREAD: 'TOGGLE_NEUTRAL_THREAD',
  TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadActionCreator({ vote }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      vote,
    },
  };
}

function toggleNeutralThreadActionCreator({ vote }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_THREAD,
    payload: {
      vote,
    },
  };
}

function toggleDisLikeThreadActionCreator(vote) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      vote,
    },
  };
}

function asyncAddThread({ title, category, body }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, category, body });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
}
function asyncToggleLikeThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleLikeThreadActionCreator({ vote: { threadId } }));
    try {
      await api.toggleLikeThread(threadId);
    } catch (error) {
      dispatch(toggleLikeThreadActionCreator({ vote: { threadId } })); // Revert the like
      console.error('Failed to Like Thread:', error);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleNeutralThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleNeutralThreadActionCreator({ threadId }));

    try {
      await api.toggleNeutralThread(threadId);
    } catch (error) {
      dispatch(toggleNeutralThreadActionCreator({ threadId }));
      console.error('Failed to Neutral Thread:', error);
    }
    dispatch(hideLoading());
  };
}
function asyncToggleDisLikeThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleDisLikeThreadActionCreator({ threadId }));

    try {
      await api.toggleDisLikeThread(threadId);
    } catch (error) {
      dispatch(toggleDisLikeThreadActionCreator({ threadId }));
      console.error('Failed to DisLike Thread:', error);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleLikeThreadActionCreator,
  toggleNeutralThreadActionCreator,
  toggleDisLikeThreadActionCreator,
  asyncAddThread,
  asyncToggleLikeThread,
  asyncToggleNeutralThread,
  asyncToggleDisLikeThread,
};
