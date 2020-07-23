import * as ActionType from "../ActionTypes/CommentActionTypes";
export const comments = (
  state = {
    isLoading: false,
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionType.ADD_COMMENT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: state.comments.concat(action.payload),
      };
    case ActionType.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload,
      };
    case ActionType.COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        comments: [],
      };
    case ActionType.COMMENTS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: [],
      };
    default:
      return state;
  }
};
