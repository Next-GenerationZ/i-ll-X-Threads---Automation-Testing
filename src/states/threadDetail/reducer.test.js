/**
 * Scenario Testing for threadDetailReducer
 *
 * This test suite verifies the functionality of the threadDetailReducer, which handles state changes for thread details in a discussion forum.
 * The following scenarios are tested:
 *
 * - Initial state: returns the initial state when an unknown action is dispatched.
 * - Receive thread detail: updates the state with the thread detail when a RECEIVE_THREAD_DETAIL action is dispatched.
 * - Add comment: adds a new comment to the thread's comments array when an ADD_COMMENT action is dispatched.
 * - Toggle like: updates the comment's upVotesBy array when a TOGGLE_COMMENT_LIKE_THREAD action is dispatched.
 * - Toggle neutral: removes the like from a comment's upVotesBy array when a TOGGLE_COMMENT_NEUTRAL_THREAD action is dispatched.
 * - Toggle dislike: adds a user to the comment's downVotesBy array when a TOGGLE_COMMENT_DISLIKE_THREAD action is dispatched.
 */

import threadDetailReducer from "./reducer";
import { ActionType } from "./action";
import { describe, it, expect } from "vitest";

describe("threadDetailReducer function", () => {
  it("should return the initial state when given an unknown action", () => {
    // arrange
    const initialState = {};
    const action = { type: "UNKNOWN" };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the thread detail when given by RECEIVE_THREAD_DETAIL action", () => {
    // arrange
    const initialState = {};
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: "thread-1",
          title: "Thread 1",
          comments: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it("should return the thread with the new comment when given by ADD_COMMENT action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread 1",
      comments: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: { id: "comment-1", content: "New comment" },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });
});
