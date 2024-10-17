import { describe, it, beforeEach, expect, vi } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncAddThread,
  asyncToggleLikeThread,
  ActionType,
} from './action';

describe('Async Actions', () => {
  beforeEach(() => {
    // Reset mock sebelum setiap pengujian
    vi.clearAllMocks();
  });

  it('should create ADD_THREAD action after successfully adding a thread', async () => {
    const newThread = {
      title: 'Test Thread',
      category: 'General',
      body: 'This is a test thread.',
    };

    // Mocking api.createThread
    api.createThread = vi.fn().mockResolvedValue(newThread);

    const dispatch = vi.fn(); // Mock dispatch
    const thunk = asyncAddThread(newThread);

    await thunk(dispatch); // Jalankan thunk

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should handle error in asyncToggleLikeThread', async () => {
    const threadId = 'thread123';

    // Mocking api.toggleLikeThread
    api.toggleLikeThread = vi.fn().mockRejectedValue(new Error('Failed to like the thread'));

    const dispatch = vi.fn(); // Mock dispatch
    const thunk = asyncToggleLikeThread(threadId);

    await thunk(dispatch); // Jalankan thunk

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.TOGGLE_LIKE_THREAD,
      payload: { vote: { threadId } }, // Payload sesuai dengan yang ada di action creator
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
