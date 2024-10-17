import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_COMMENT_LIKE_THREAD: 'TOGGLE_COMMENT_LIKE_THREAD',
  TOGGLE_COMMENT_NEUTRAL_THREAD: 'TOGGLE_COMMENT_NEUTRAL_THREAD',
  TOGGLE_COMMENT_DISLIKE_THREAD: 'TOGGLE_COMMENT_DISLIKE_THREAD',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleLikeCommentThreadActionCreator({ vote }) {
  return {
    type: ActionType.TOGGLE_COMMENT_LIKE_THREAD,
    payload: {
      vote,
    },
  };
}

function toggleNeutralThreadActionCreator({ vote }) {
  return {
    type: ActionType.TOGGLE_COMMENT_NEUTRAL_THREAD,
    payload: {
      vote,
    },
  };
}

function toggleDisLikeCommentThreadActionCreator({ vote }) {
  return {
    type: ActionType.TOGGLE_COMMENT_DISLIKE_THREAD,
    payload: {
      vote,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      console.log(error);
    }
    dispatch(hideLoading());
  };
}

function asyncCommentThreadDetail(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createCommentThread({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) { console.log(error); }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeCommentThread(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleLikeCommentThreadActionCreator({ vote: { threadId, commentId } }));


    try {
      await api.toggleLikeCommentThread(threadId, commentId);
    } catch (error) {
      dispatch(toggleLikeCommentThreadActionCreator({ vote: { threadId, commentId } }));
      console.error('Failed to Like Comment:', error);


    }
    dispatch(hideLoading());
  };
}
function asyncToggleNeutralCommentThread(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleNeutralThreadActionCreator({ threadId, commentId }));

    try {
      await api.toggleNeutralCommentThread(threadId, commentId);
    } catch (error) {
      dispatch(toggleNeutralThreadActionCreator({ threadId, commentId }));
      console.error('Failed to Neutral Comment:', error);

    }
    dispatch(hideLoading());
  };
}
function asyncToggleDisLikeCommentThread(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleDisLikeCommentThreadActionCreator(threadId, commentId));

    try {
      await api.toggleDisLikeCommentThread(threadId, commentId);
    } catch (error) {
      dispatch(
        toggleDisLikeCommentThreadActionCreator({ threadId, commentId }),

      );
      console.error('Failed to DisLike Comment:', error);
    }
    dispatch(hideLoading());
  };
}
export {
  ActionType,
  receiveThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  addCommentActionCreator,
  asyncCommentThreadDetail,
  asyncToggleNeutralCommentThread,
  asyncToggleDisLikeCommentThread,
  asyncToggleLikeCommentThread,
};
