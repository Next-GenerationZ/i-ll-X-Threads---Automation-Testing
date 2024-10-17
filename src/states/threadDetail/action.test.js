import { describe, it, beforeEach, expect, vi } from 'vitest';
import {
  ActionType,
  receiveThreadDetailActionCreator,
  addCommentActionCreator,
} from './action';

describe('Action Creators', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create RECEIVE_THREAD_DETAIL action', () => {
    const threadDetail = { id: 'thread123', title: 'Sample Thread' };
    const expectedAction = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail },
    };

    expect(receiveThreadDetailActionCreator(threadDetail)).toEqual(
      expectedAction
    );
  });

  it('should create ADD_COMMENT action', () => {
    const comment = { id: 'comment123', content: 'This is a comment.' };
    const expectedAction = {
      type: ActionType.ADD_COMMENT,
      payload: { comment },
    };

    expect(addCommentActionCreator(comment)).toEqual(expectedAction);
  });
});
