
import { useEffect, useState } from 'react';
import { userService } from '../services/user.service.js';
import { authService } from '../services/auth.service.js';

import { putUser, getUser, loadUsers, removeUser } from '../store/actions/user.action.js';
import { SET_CREDENTIALS } from '../store/reducers/user.reducer.js';
import { useSelector, useDispatch } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { store } from '../store/store.js';
export function LoginCmp({ onSetLoggdeinUser }) {

    const dispatch = useDispatch()

    const credentials = useSelector(storeState => storeState.userModule.credentials)
    console.log(credentials)

    const [isSignup, setIsSignUp] = useState(false)

    useEffect(() => {
        return () => {
            dispatch({ type: SET_CREDENTIALS, credentials: userService.getEmptyUser() })
        }
    }, [])
    function handleChange({ target }) {
        const { name: field, value } = target
        dispatch({ type: SET_CREDENTIALS, credentials: { ...credentials, [field]: value } })
        // setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))

    }

    function handleSubmit(ev) {
        ev.preventDefault()
        isSignup ? signup(credentials) : login(credentials)
    }
    async function login() {
        try {
            const loggedinUser = await authService.loginAuth(credentials)
            if (loggedinUser) {
                  await onSetLoggdeinUser(loggedinUser)
                showSuccessMsg('Logged in successfully')
            }
        }
        catch (err) {
            showErrorMsg(' incorrect login data  ')
            throw err
        }
    }
    async function signup() {
        try {
            const signUpUser = await authService.signUpAuth(credentials)
            await onSetLoggdeinUser(signUpUser)
            showSuccessMsg('signed in successfully')
        }
        catch (err) {
            showErrorMsg(' Oops try again')
            throw err
        }

    }

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>Login form:</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username:</label><br />
                    <input
                        type="text"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        placeholder='User name'
                        autoComplete="new-username"
                        name='username'
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        name="password"
                        placeholder='password'
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        autoComplete="new-password"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div >

                {isSignup && <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full name"
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}

                    />
                </div>}
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
                    {isSignup ? 'Signup' : 'Login'}
                </button>
            </form>
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div>
    );
}

// export default LoginPage;
// }