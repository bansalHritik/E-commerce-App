import * as ActionTypes from "../ActionTypes/UserActionTypes";
export const user = (state = {
    isUserLoading: false,
    errMess: null,
    userDetail: null
}, action) => {
    switch (action.type) {
        case (ActionTypes.USER_LOADING):
            return {
                isUserLoading: true,
                errMess: null,
                userDetail: null
            }
        case (ActionTypes.USER_LOGIN):
            return {
                isUserLoading: false,
                errMess: null,
                userDetail: action.payload
            }
        case (ActionTypes.USER_SIGNUP):
            return {
                isUserLoading: false,
                errMess: null,
                userDetail: action.payload
            }
        case (ActionTypes.USER_LOGIN_FAILED):
            return {
                isUserLoading: false,
                errMess: action.payload,
                userDetail: null
            }
        case (ActionTypes.USER_SIGNUP_FAILED):
            return {
                isUserLoading: false,
                errMess: action.payload,
                userDetail: null
            }
        case (ActionTypes.USER_LOGOUT):
            return {
                isUserLoading: false,
                errMess: null,
                userDetail: null
            }
        case (ActionTypes.USER_RESET):
            return {
                isUserLoading: false,
                errMess: null,
                userDetail: null
            }
        default:
            return state;
    }
}