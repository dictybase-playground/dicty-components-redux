import { types } from "../constants/types"
import manageStateStorage from "../middleware/storage"

const authArg = {
  save_action: types.LOGIN_SUCCESS,
  remove_action: types.LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth"
}

export const authStorage = manageStateStorage(authArg)
