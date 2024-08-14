import { userService } from "../../services/user.service.js"

export const SET_USERS = 'SET_USERS'
export const SET_CREDENTIALS = 'SET_CREDENTIALS'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const GET_USER = 'GET_USER'
export const SET_LOGGEDINUSER='SET_LOGGEDINUSER'



const initialState = {
    users: [],
    user: {},
    filterBy: {},
    credentials: userService.getEmptyUser(),
    loggedinUser: userService.getLoggedinUser()


}
export function userreducer(state = initialState, action = {}) {
    let users
    // let user
    switch (action.type) {
        // Users
        case SET_USERS:
            return { ...state, users: action.users }

        case REMOVE_USER:
            users = state.users.filter(user => user._id !== action.userId)
            return { ...state, users }

        case GET_USER:
            return { ...state, user: action.user }

        case SET_CREDENTIALS:
            return { ...state, credentials: action.credentials }

            case SET_LOGGEDINUSER:
                return { ...state , loggedinUser: action.loggedinUser}


        case UPDATE_USER:
            const { _id, newCredentials } = action.user
            const updatedUsers = users.map(user =>
                user._id === _id ? { ...user, ...newCredentials } : user
            );

            // Return the new state with the updated array
            return {
                ...state,
                users: updatedUsers,
            };


        //   case SET_FILTER_BY:
        //     return { ...state, filterBy: { ...action.filterBy } }

        //   case SET_SORT_BY:
        //     return { ...state, sortBy: { ...action.sortBy } }

        default:
            return state
    }
}