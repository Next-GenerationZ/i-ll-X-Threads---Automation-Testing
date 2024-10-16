import threadsReducer from './reducer';
import { ActionType } from './action';

/**
 * Scenario testing
 *
 * - threadsReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the threads when given by RECEIVE_THREADS action
 *   - should add a new thread when given by ADD_THREAD action
 *   - should toggle like on the thread when given by TOGGLE_LIKE_THREAD action
 *   - should toggle neutral (remove like) on the thread when given by TOGGLE_NEUTRAL_THREAD action
 *   - should toggle dislike on the thread when given by TOGGLE_DISLIKE_THREAD action
 */

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          { id: 'thread-1', title: 'Thread 1' },
          { id: 'thread-2', title: 'Thread 2' },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread 1' },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        threads: { id: 'thread-2', title: 'Thread 2' },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.threads, ...initialState]);
  });

  it('should toggle like on the thread when given by TOGGLE_LIKE_THREAD action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', likes: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_LIKE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert: like added
    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: ['user-1'],
      },
    ]);
  });

  it('should toggle neutral on the thread when given by TOGGLE_NEUTRAL_THREAD action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', likes: ['user-1'] },
    ];
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert: like removed (neutral)
    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: [],
      },
    ]);
  });

  it('should toggle dislike on the thread when given by TOGGLE_DISLIKE_THREAD action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread 1', dislikes: [] },
    ];
    const action = {
      type: ActionType.TOGGLE_DISLIKE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-2' },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert: dislike added
    expect(nextState).toEqual([
      {
        ...initialState[0],
        dislikes: ['user-2'],
      },
    ]);
  });
});
