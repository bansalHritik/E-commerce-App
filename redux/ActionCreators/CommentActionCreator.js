import * as CommentAction from "../Actions/CommentActions";
export const fetchComments = () => (dispatch) => {
    dispatch(CommentAction.commentsLoading());
    return firebase.firestore().collection('COMMENTS')
        .get()
        .then((comments) => {
            comments.forEach((comment) => {
                dispatch(CommentAction.addComment(comment.data()));
            })
        })
        .catch((error) => dispatch(CommentAction.commentsLoadingFailed(error)))
};
export const uploadNewComment = (comment) => (dispatch) => {

}

export const removeComment = (comment) => (dispatch) => {

}

export const editComment = (commentID) => (dispatch) => {
    
}