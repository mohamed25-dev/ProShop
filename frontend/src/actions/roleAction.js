import axios from 'axios';

import {
  ROLE_LIST_FAIL,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_REQUEST,
} from '../constants/roleConstants';

export const listRoles = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROLE_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/roles`, config);

    dispatch({
      type: ROLE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
