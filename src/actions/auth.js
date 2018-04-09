// @flow
import { types } from "../constants/types"

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } = types

export const requestLogin = provider => {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    provider: provider
  }
}

export const receiveLogin = ({ user, token }) => {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    token: token,
    user: user
  }
}

export const loginError = error => {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    error: error
  }
}

export const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false
  }
}

// Logs the user out
export const logoutUser = () => {
  return (dispatch: Function) => {
    dispatch(receiveLogout())
  }
}
