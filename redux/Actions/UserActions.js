import { USER_SIGNUP, USER_SIGNUP_FAILED, USER_LOGIN_FAILED, USER_LOGOUT, USER_LOGIN, USER_LOADING, USER_RESET } from '../ActionTypes/UserActionTypes'

export const Loading = () => {
    return ({ type: USER_LOADING })
}
export const Login = (user) => ({
    type: USER_LOGIN,
    payload: user
})
export const Signup = (user) => ({
    type: USER_SIGNUP,
    payload: user
})
export const Logout = () => ({
    type: USER_LOGOUT
})
export const LoginFailed = (error) => ({
    type: USER_LOGIN_FAILED,
    payload: error
})
export const SignUpFailed = (error) => ({
    type: USER_SIGNUP_FAILED,
    payload: error
})
export const ResetUser = () => ({
    type: USER_RESET
})