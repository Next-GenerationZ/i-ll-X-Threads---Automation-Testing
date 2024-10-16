/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import {
  asyncCommentThreadDetail,
  asyncReceiveThreadDetail,
  asyncToogleDisLikeCommentThread,
  asyncToogleLikeCommentThread,
  asyncToogleNeutralCommentThread,
} from '../states/threadDetail/action';
import Loading from '../components/Loading';
import {
  asyncToogleDisLikeThread,
  asyncToogleLikeThread,
  asyncToogleNeutralThread,
} from '../states/threads/action';

function DetailPage() {
  const { id } = useParams();
  const { threadsDetail = [], authUser = null } = useSelector(
    (states) => states,
  );

  const isLiked = threadsDetail?.upVotesBy?.includes(authUser?.id);
  const isDisLiked = threadsDetail?.downVotesBy?.includes(authUser?.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch, isDisLiked, isLiked]);

  if (!threadsDetail) {
    return <Loading />;
  }

  const onComment = async (e) => {
    e.preventDefault();
    const commentInput = document.querySelector('.comment-input__field');
    const commentText = commentInput.innerText.trim();

    if (commentText) {
      await dispatch(asyncCommentThreadDetail(id, commentText));
      dispatch(asyncReceiveThreadDetail(id));
      commentInput.innerText = '';
    }
  };

  const onLike = async (id, isLiked) => {
    if (!isLiked) {
      await dispatch(asyncToogleLikeThread(id));
      dispatch(asyncReceiveThreadDetail(id));
    } else {
      dispatch(asyncToogleNeutralCommentThread(id));
      dispatch(asyncReceiveThreadDetail(id));
    }
  };
  const onDisLike = async (id, isDisLiked) => {
    if (!isDisLiked) {
      await dispatch(asyncToogleDisLikeThread(id));
      dispatch(asyncReceiveThreadDetail(id));
    } else {
      dispatch(asyncToogleNeutralThread(id));
      dispatch(asyncReceiveThreadDetail(id));
    }
  };

  const onCommentLike = async (commentid, isCommentLiked) => {
    if (!isCommentLiked) {
      await dispatch(asyncToogleLikeCommentThread(id, commentid));
      dispatch(asyncReceiveThreadDetail(id));
    } else {
      await dispatch(asyncToogleNeutralCommentThread(id, commentid));
      dispatch(asyncReceiveThreadDetail(id));
    }
  };
  const onCommentDisLike = async (commentId, isCommentDisLiked) => {
    if (!isCommentDisLiked) {
      await dispatch(asyncToogleDisLikeCommentThread(id, commentId));
      dispatch(asyncReceiveThreadDetail(id));
    } else {
      await dispatch(asyncToogleNeutralCommentThread(id, commentId));
      dispatch(asyncReceiveThreadDetail(id));
    }
  };

  const time = dayjs(threadsDetail?.createdAt);
  const now = dayjs();
  const diffInSeconds = now.diff(time, 'second');
  const diffInMinutes = now.diff(time, 'minute');
  const diffInHours = now.diff(time, 'hour');
  const diffInDays = now.diff(time, 'day');
  const diffInMonths = now.diff(time, 'month');
  const diffInYears = now.diff(time, 'year');
  let displayTime;
  if (diffInSeconds < 60) {
    displayTime = 'Just Now';
  } else if (diffInMinutes < 60) {
    displayTime = `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    displayTime = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 30) {
    displayTime = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInMonths < 12) {
    displayTime = `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else {
    displayTime = `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  }

  const body = threadsDetail.body ? parse(threadsDetail.body) : null;

  return (
    <section className="detail-page">
      <header className="thread-header">
        <p className="thread-header__category">
          #
          {threadsDetail.category}
        </p>
      </header>
      <div className="thread-content">
        <h2>{threadsDetail?.title}</h2>
        <div className="thread-content__body">
          {' '}
          {body}
        </div>
      </div>
      <footer className="thread-footer">
        <button
          type="button"
          className="thread-upvote__button"
          onClick={() => onLike(threadsDetail.id, isLiked)}
        >
          <svg
            stroke={isLiked ? 'blue' : 'currentColor'}
            fill={isLiked ? 'blue' : 'currentColor'}
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z" opacity=".87" />
            <path d="M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z" />
          </svg>
          <span className="thread-upvote__label">
            {threadsDetail?.upVotesBy?.length}
          </span>
        </button>
        <button
          type="button"
          className="thread-downvote__button"
          onClick={() => onDisLike(threadsDetail?.id, isDisLiked)}
        >
          <svg
            stroke={isDisLiked ? 'blue' : 'currentColor'}
            fill={isDisLiked ? 'blue' : 'currentColor'}
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z" opacity=".87" />
            <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L11.77 14H3v-2l3-7h9v10zm4-12h4v12h-4z" />
          </svg>
          <span className="thread-downvote__label">
            {threadsDetail?.downVotesBy?.length}
          </span>
        </button>
        <div className="owner-info">
          <span>Dibuat oleh</span>
          <img
            src={`https://ui-avatars.com/api/?name=${threadsDetail?.owner?.name}&background=random`}
            alt={`avatar ${threadsDetail?.owner?.name}`}
          />
          <span>
            {' '}
            {threadsDetail?.owner?.name}
          </span>
        </div>
        <p>{displayTime}</p>
      </footer>
      <div className="thread-comment">
        <div className="thread-comment__input">
          <h3>Beri komentar</h3>
          <form className="comment-input" onSubmit={onComment}>
            <div className="comment-input__field" contentEditable="true" />
            <button type="submit">Kirim</button>
          </form>
        </div>
        <div className="thread-comment__list">
          <h3>
            Komentar (
            {threadsDetail?.comments?.length}
            )
          </h3>
          <div className="comments-list">
            {threadsDetail?.comments
              && threadsDetail?.comments.map((comment) => {
                console.log('comment', comment);
                const time = dayjs(comment?.createdAt);
                const now = dayjs();

                const diffInSeconds = now.diff(time, 'second');
                const diffInMinutes = now.diff(time, 'minute');
                const diffInHours = now.diff(time, 'hour');
                const diffInDays = now.diff(time, 'day');

                let displayTimeComment;
                if (diffInSeconds < 60) {
                  displayTimeComment = 'Just Now';
                } else if (diffInMinutes < 60) {
                  displayTimeComment = `${diffInMinutes} minute${
                    diffInMinutes > 1 ? 's' : ''
                  } ago`;
                } else if (diffInHours < 24) {
                  displayTimeComment = `${diffInHours} hour${
                    diffInHours > 1 ? 's' : ''
                  } ago`;
                } else {
                  displayTimeComment = `${diffInDays} day${
                    diffInDays > 1 ? 's' : ''
                  } ago`;
                }

                const isCommentLiked = comment?.upVotesBy?.includes(
                  authUser?.id,
                );
                const isCommentDisLiked = comment?.downVotesBy?.includes(
                  authUser?.id,
                );

                const comments = comment?.content
                  ? parse(comment?.content)
                  : null;
                return (
                  <div className="comment-item" key={comment?.id}>
                    <header className="comment-item__header">
                      <div className="comment-item__owner-info">
                        <img
                          src={`https://ui-avatars.com/api/?name=${comment?.owner?.name}&background=random`}
                          alt={`${comment?.owner?.name}'s avatar`}
                        />
                        <p>{comment?.owner?.name}</p>
                      </div>
                      <p className="posted-at">{displayTimeComment}</p>
                    </header>
                    <p>{comments}</p>
                    <footer>
                      <button
                        type="button"
                        className="comment-upvote__button"
                        onClick={() => onCommentLike(comment.id, isCommentLiked)}
                      >
                        <svg
                          stroke={isCommentLiked ? 'blue' : 'currentColor'}
                          fill={isCommentLiked ? 'blue' : 'currentColor'}
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="none"
                            d="M0 0h24v24H0V0z"
                            opacity=".87"
                          />
                          <path d="M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4l-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z" />
                        </svg>
                        <span className="comment-upvote__label">
                          {comment?.upVotesBy?.length}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="comment-downvote__button"
                        onClick={() => onCommentDisLike(comment.id, isCommentDisLiked)}
                      >
                        <svg
                          stroke={isCommentDisLiked ? 'blue' : 'currentColor'}
                          fill={isCommentDisLiked ? 'blue' : 'currentColor'}
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="none"
                            d="M0 0h24v24H0V0z"
                            opacity=".87"
                          />
                          <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L11.77 14H3v-2l3-7h9v10zm4-12h4v12h-4z" />
                        </svg>
                        <span className="comment-downvote__label">
                          {comment?.downVotesBy?.length}
                        </span>
                      </button>
                    </footer>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
