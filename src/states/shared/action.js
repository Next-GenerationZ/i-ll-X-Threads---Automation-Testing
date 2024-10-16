import api from '../../utils/api';
import { receiveThreadDetailActionCreator } from '../threadDetail/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      const detail = [];
      threads.map((thread) => detail.push(thread.id));
      const fetchDetails = async () => {
        const details = await Promise.all(
          detail.map(async (id) => {
            const dataDetail = await api.getThreadDetail(id);
            return dataDetail;
          }),
        );
        dispatch(receiveThreadDetailActionCreator(details));

        return details;
      };
      fetchDetails();
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      console.log(error);
    }
  };
}

export { asyncPopulateUsersAndThreads };
