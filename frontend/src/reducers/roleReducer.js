import {
  ROLE_LIST_FAIL,
  ROLE_LIST_REQUEST,
  ROLE_LIST_SUCCESS,
  ROLE_LIST_RESET,
} from '../constants/roleConstants';

export const roleListReducer = (state = { roles: [] }, action) => {
  switch (action.type) {
    case ROLE_LIST_REQUEST:
      return { loading: true };
    case ROLE_LIST_SUCCESS:
      return { loading: false, roles: action.payload };
    case ROLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ROLE_LIST_RESET:
      return { roles: [] };
    default:
      return state;
  }
};
