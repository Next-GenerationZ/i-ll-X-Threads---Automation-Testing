import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLeaderboards } from '../states/leaderboards/action';

function LeaderBoard() {
  const dispatch = useDispatch();
  const { leaderboards = null, authUser = null } = useSelector(
    (states) => states,
  );
  const sortedLeaderboards = leaderboards?.sort((a, b) => b.score - a.score);
  useEffect(() => {
    dispatch(asyncLeaderboards());
  }, [dispatch]);
  return (
    <div className="board-page">
      <h2>Klasmen Pengguna Aktif</h2>
      <div className="leaderboards-list">
        <header>
          <p className="leaderboards-list__user-label">Pengguna</p>
          <p className="leaderboards-list__score-label">Skor</p>
        </header>
        {sortedLeaderboards
          && sortedLeaderboards.map((leaderboard) => {
            const isCurrentUser = leaderboard?.user?.id === authUser?.id;
            return (
              <div className="leaderboard-item" key={leaderboard.user.id}>
                <div className="leaderboard-item__user-info">
                  <img
                    src={`https://ui-avatars.com/api/?name=${leaderboard.user.name}&background=random`}
                    alt={leaderboard.user.name}
                  />
                  <p>
                    {leaderboard.user.name}
                    {' '}
                    {isCurrentUser ? <i>(Anda)</i> : ''}
                    {' '}
                  </p>
                </div>
                <p className="leaderboard-item__score">{leaderboard.score}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default LeaderBoard;
