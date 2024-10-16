import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          { id: 'thread-1', title: 'Thread 1', likes: [], dislikes: [] },
          { id: 'thread-2', title: 'Thread 2', likes: [], dislikes: [] },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should add a new thread when given by ADD_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', likes: [], dislikes: [] },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        threads: { id: 'thread-2', title: 'Thread 2', likes: [], dislikes: [] },
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([action.payload.threads, ...initialState]);
  });

  it('should toggle like on the thread when given by TOGGLE_LIKE_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', likes: [], dislikes: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_LIKE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: ['user-1'], // like added
      },
    ]);

    // Test unliking
    const actionUnlike = {
      type: ActionType.TOGGLE_LIKE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextStateUnlike = threadsReducer(nextState, actionUnlike);
    expect(nextStateUnlike).toEqual([
      {
        ...initialState[0],
        likes: [], // like removed
      },
    ]);
  });

  it('should toggle neutral (remove like) on the thread when given by TOGGLE_NEUTRAL_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', likes: ['user-1'], dislikes: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: [], // like removed
      },
    ]);
  });

  it('should toggle dislike on the thread when given by TOGGLE_DISLIKE_THREAD action', () => {
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', likes: [], dislikes: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_DISLIKE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-2' },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([
      {
        ...initialState[0],
        dislikes: ['user-2'], // dislike added
      },
    ]);

    // Test undisliking
    const actionUndislike = {
      type: ActionType.TOGGLE_DISLIKE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-2' },
    };

    const nextStateUndislike = threadsReducer(nextState, actionUndislike);
    expect(nextStateUndislike).toEqual([
      {
        ...initialState[0],
        dislikes: [], // dislike removed
      },
    ]);
  });
});
