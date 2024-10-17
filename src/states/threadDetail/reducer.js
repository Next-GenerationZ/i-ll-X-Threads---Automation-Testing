import { ActionType } from './action';

function threadDetailReducer(threadDetail = {}, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };

  case ActionType.TOGGLE_COMMENT_LIKE_THREAD:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.vote) {
          return {
            ...comment,
            upVotesBy: [...comment.upVotesBy, action.payload.userId],
            downVotesBy: comment.downVotesBy.filter(
              (userId) => userId !== action.payload.userId,
            ),
          };
        }
        return comment;
      }),
    };

  case ActionType.TOGGLE_COMMENT_NEUTRAL_THREAD:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.vote) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (userId) => userId !== action.payload.userId,
            ),
            downVotesBy: comment.downVotesBy.filter(
              (userId) => userId !== action.payload.userId,
            ),
          };
        }
        return comment;
      }),
    };

  case ActionType.TOGGLE_COMMENT_DISLIKE_THREAD:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.vote) {
          return {
            ...comment,
            downVotesBy: [...comment.downVotesBy, action.payload.userId],
            upVotesBy: comment.upVotesBy.filter(
              (userId) => userId !== action.payload.userId,
            ),
          };
        }
        return comment;
      }),
    };

  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
