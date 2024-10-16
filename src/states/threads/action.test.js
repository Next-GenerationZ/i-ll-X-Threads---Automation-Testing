/**
 * Scenario testing
 *
 * - async actions
 *   - should dispatch receiveThreadDetail and hideLoading on asyncReceiveThreadDetail success
 *   - should dispatch addComment and hideLoading on asyncCommentThreadDetail success
 *   - should dispatch toggleLikeCommentThread on asyncToogleLikeCommentThread success
 *   - should dispatch toggleNeutralThread on asyncToogleNeutralCommentThread success
 *   - should dispatch toggleDisLikeCommentThread on asyncToogleDisLikeCommentThread success
 */

import { 
    asyncReceiveThreadDetail, 
    asyncCommentThreadDetail, 
    asyncToogleLikeCommentThread,
    asyncToogleNeutralCommentThread,
    asyncToogleDisLikeCommentThread 
  } from './action';
  import { showLoading, hideLoading } from 'react-redux-loading-bar';
  import api from '../../utils/api';
  
  jest.mock('../../utils/api');
  jest.mock('react-redux-loading-bar', () => ({
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
  }));
  
  describe('async actions', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should dispatch receiveThreadDetail and hideLoading on asyncReceiveThreadDetail success', async () => {
      // arrange
      const dispatch = jest.fn();
      const mockThreadDetail = { id: 'thread-1', title: 'Thread 1', comments: [] };
      api.getThreadDetail.mockResolvedValue(mockThreadDetail);
  
      // action
      await asyncReceiveThreadDetail('thread-1')(dispatch);
  
      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
      expect(dispatch).toHaveBeenCalledWith({
        type: 'RECEIVE_THREAD_DETAIL',
        payload: {
          threadDetail: mockThreadDetail,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  
    it('should dispatch addComment and hideLoading on asyncCommentThreadDetail success', async () => {
      // arrange
      const dispatch = jest.fn();
      const mockComment = { id: 'comment-1', content: 'This is a new comment' };
      api.createCommentThread.mockResolvedValue(mockComment);
  
      // action
      await asyncCommentThreadDetail('thread-1', 'This is a new comment')(dispatch);
  
      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.createCommentThread).toHaveBeenCalledWith({ threadId: 'thread-1', content: 'This is a new comment' });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'ADD_COMMENT',
        payload: {
          comment: mockComment,
        },
      });
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  
    it('should dispatch toggleLikeCommentThread on asyncToogleLikeCommentThread success', async () => {
      // arrange
      const dispatch = jest.fn();
      api.toggleLikeCommentThread.mockResolvedValue(true);
  
      // action
      await asyncToogleLikeCommentThread('thread-1', 'comment-1')(dispatch);
  
      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_COMMENT_LIKE_THREAD',
        payload: { threadId: 'thread-1' },
      });
      expect(api.toggleLikeCommentThread).toHaveBeenCalledWith('thread-1', 'comment-1');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  
    it('should dispatch toggleNeutralThread on asyncToogleNeutralCommentThread success', async () => {
      // arrange
      const dispatch = jest.fn();
      api.toggleNeutralCommentThread.mockResolvedValue(true);
  
      // action
      await asyncToogleNeutralCommentThread('thread-1', 'comment-1')(dispatch);
  
      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_COMMENT_NEUTRAL_THREAD',
        payload: { threadId: 'thread-1', commentId: 'comment-1' },
      });
      expect(api.toggleNeutralCommentThread).toHaveBeenCalledWith('thread-1', 'comment-1');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  
    it('should dispatch toggleDisLikeCommentThread on asyncToogleDisLikeCommentThread success', async () => {
      // arrange
      const dispatch = jest.fn();
      api.toggleDisLikeCommentThread.mockResolvedValue(true);
  
      // action
      await asyncToogleDisLikeCommentThread('thread-1', 'comment-1')(dispatch);
  
      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TOGGLE_COMMENT_DISLIKE_THREAD',
        payload: { threadId: 'thread-1', commentId: 'comment-1' },
      });
      expect(api.toggleDisLikeCommentThread).toHaveBeenCalledWith('thread-1', 'comment-1');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
  