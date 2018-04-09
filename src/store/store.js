import { types } from "../constants/types"

export const authArg = {
  save_action: types.LOGIN_SUCCESS,
  remove_action: types.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth"
}
