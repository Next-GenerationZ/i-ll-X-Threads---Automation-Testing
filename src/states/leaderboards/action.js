import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboards(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.getLeadeboards();
      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      console.log(error);
    }
  };
}

export { ActionType, receiveLeaderboards, asyncLeaderboards };
