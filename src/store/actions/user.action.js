import { userService } from "../../services/user.service.js";
import { authService } from "../../services/auth.service.js";
import { store } from '../store'
import { UPDATE_USER, SET_USERS, SET_CREDENTIALS,GET_USER ,REMOVE_USER, SET_LOGGEDINUSER } from "../reducers/user.reducer.js";

export async function loadUsers(filterBy={}) {
    try {
        const users = await userService.getUsers(filterBy)
        store.dispatch({ type: SET_USERS, users })
    }
    catch (err) {
        console.log('user action -> Cannot load users')
        throw err
    }
}

export async function putUser(credentials) {
    try {
        const user = await userService.updateUser(credentials)
        store.dispatch({ type: UPDATE_USER, user })
    }
    catch (err) {
        console.log('user action -> Cannot update user')
        throw err
    }
}

export async function removeUser(userId) {
    try {
        const users = await userService.deleteUser(userId)
        store.dispatch({ type: REMOVE_USER, users })
    }
    catch (err) {
        console.log('user action -> Cannot remove user')
        throw err
    }
}

export async function getUser(userId) {
    try{
        const user = userService.getUserById(userId)
        store.dispatch({ type: GET_USER, user })
    }
    catch (err) {
        console.log('user action -> Cannot get user')
        throw err
    }
}
export async function setLoggedInUser(){
    const loggedinUser = userService.getLoggedinUser()
    store.dispatch({ type:SET_LOGGEDINUSER , loggedinUser})
}