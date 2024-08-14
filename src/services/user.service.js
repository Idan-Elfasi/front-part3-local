import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL = 'user/'

export const userService = {
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    getEmptyUser,
    saveLocalUser,
    getLoggedinUser,


}

async function getUsers(filterBy) {
    return await httpService.get(BASE_URL, filterBy)
}

async function getUserById(userId) {
    const user = await httpService.get(BASE_URL + userId)
    return user
}

async function deleteUser(userId) {
    await httpService.delete(BASE_URL + userId)
    return userId
}

async function updateUser(user) {
    user = await httpService.put(BASE_URL + user._id, user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}
function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullname: '',
        isAdmin: false

    }
}
function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin , score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}