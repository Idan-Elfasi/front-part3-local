const BASE_URL = 'auth/'
const LOGIN = 'login'
const SIGN_UP = 'signup'
const LOG_OUT = 'logout'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

import { userService } from "./user.service.js"
import { httpService } from "./http.service.js"

export const authService = {
    loginAuth,
    signUpAuth,
    logOut,
}

async function loginAuth({ username, password }) {
   const user = await httpService.post(BASE_URL + LOGIN, { username, password })
   if(user){
    return userService.saveLocalUser(user)
   }
}
async function signUpAuth({ username, password, fullname }) {
    const user = await httpService.post(BASE_URL + SIGN_UP, { username, password, fullname })
    return userService.saveLocalUser(user) 
}
async function logOut() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post(BASE_URL + LOG_OUT)
}
