/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import {
  asyncToggleDisLikeThread,
  asyncToggleLikeThread,
  asyncToggleNeutralThread,
} from '../states/threads/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

function HomePage() {
  const navigate = useNavigate();
  const {
    threads = [],
    threadsDetail = [],
    authUser = null,
  } = useSelector((states) => states);

  const [selectCategory, setSelectCategory] = useState('');

  const [showThread, setShowThread] = useState(threadsDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    if (selectCategory === '') {
      setShowThread(threadsDetail);
    } else {
      const filteredThreads = threadsDetail.filter(
        (thread) => thread?.category === selectCategory,
      );
      setShowThread(filteredThreads);
    }
  }, [threadsDetail, selectCategory]);

  const handleCategory = (category) => {
    if (selectCategory === category) {
      setSelectCategory('');
    } else {
      setSelectCategory(category);
    }
  };

  const onLike = (id, isLiked) => {
    if (!isLiked) {
      dispatch(asyncToggleLikeThread(id));
      dispatch(asyncPopulateUsersAndThreads());
    } else {
      dispatch(asyncToggleNeutralThread(id));
      dispatch(asyncPopulateUsersAndThreads());
    }
  };
  const onDisLike = (id, isDisLiked) => {
    if (!isDisLiked) {
      dispatch(asyncToggleDisLikeThread(id));
      dispatch(asyncPopulateUsersAndThreads());
    } else {
      dispatch(asyncToggleNeutralThread(id));
      dispatch(asyncPopulateUsersAndThreads());
    }
  };

  return (
    <section className="home-page">
      <header className="home-page__header">
        <p className="home-page__title">Kategori Populer</p>
        <div className="categories-list">
          {threads.map((thread) => (
            <button
              type="button"
              className="category-item"
              key={`${thread?.category}${thread?.category}`}
              onClick={() => handleCategory(thread?.category)}
            >
              <p>
                #
                {thread?.category}
              </p>
            </button>
          ))}
        </div>
      </header>

      <div className="home-page__content">
        <h2 className="home-page__content-title">Diskusi Tersedia</h2>
        <div className="threads-list">
          {showThread?.length > 0
            ? showThread.map((thread) => {
              const isLiked = thread?.upVotesBy?.includes(authUser?.id);
              const isDisLiked = thread?.downVotesBy?.includes(authUser?.id);

              const time = dayjs(thread?.createdAt);
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
                displayTime = `${diffInMinutes} minute${
                  diffInMinutes > 1 ? 's' : ''
                } ago`;
              } else if (diffInHours < 24) {
                displayTime = `${diffInHours} hour${
                  diffInHours > 1 ? 's' : ''
                } ago`;
              } else if (diffInDays < 30) {
                displayTime = `${diffInDays} day${
                  diffInDays > 1 ? 's' : ''
                } ago`;
              } else if (diffInMonths < 12) {
                displayTime = `${diffInMonths} month${
                  diffInMonths > 1 ? 's' : ''
                } ago`;
              } else {
                displayTime = `${diffInYears} year${
                  diffInYears > 1 ? 's' : ''
                } ago`;
              }

              return (
                <div className="thread-item" key={thread?.id}>
                  <header className="thread-item__header">
                    <span className="thread-item__category">
                      #
                      {thread?.category}
                    </span>
                  </header>
                  <h4 className="thread-item__title">
                    <a href={`/threads/${thread?.id}`}>{thread?.title}</a>
                  </h4>
                  <div className="thread-item__body">
                    {parse(thread?.body)}
                  </div>
                  <footer className="thread-item__footer">
                    <button
                      type="button"
                      className="thread-upvote__button"
                      onClick={() => onLike(thread?.id, isLiked)}
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
                        {thread?.upVotesBy?.length}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="thread-downvote__button"
                      onClick={() => onDisLike(thread?.id, isDisLiked)}
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
                        {thread?.downVotesBy?.length}
                      </span>
                    </button>
                    <p className="thread-item__total-comments">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                      </svg>
                      {thread?.comments?.length}
                    </p>
                    <p>{displayTime}</p>
                    <p className="thread-item__owner">
                      Dibuat oleh
                      {' '}
                      <strong>{thread?.owner?.name}</strong>
                    </p>
                  </footer>
                </div>
              );
            })
            : null}
        </div>
      </div>
      <button
        type="button"
        className="new-thread-button"
        onClick={() => navigate('/new')}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm80 224h-64v64a16 16 0 01-32 0v-64h-64a16 16 0 010-32h64v-64a16 16 0 0132 0v64h64a16 16 0 010 32z" />
        </svg>
      </button>
    </section>
  );
}

export default HomePage;
