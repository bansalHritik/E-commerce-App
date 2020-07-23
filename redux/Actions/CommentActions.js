import { ADD_COMMENTS, ADD_COMMENT, COMMENTS_LOADING_FAILED, COMMENTS_LOADING } from "../ActionTypes/CommentActionTypes";

export const addComments = (comments) => ({
    type: ADD_COMMENTS,
    payload: comments,
});
export const addComment = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});
export const commentsLoadingFailed = (errMess) => ({
    type: COMMENTS_LOADING_FAILED,
    payload: errMess,
});
export const commentsLoading = () => ({
    type: COMMENTS_LOADING,
});