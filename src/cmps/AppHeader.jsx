import { NavLink,Link } from 'react-router-dom'
import { LoginCmp } from './LoginCmp.jsx'
import { useSelector } from 'react-redux'
import { store } from '../store/store.js'
import { setLoggedInUser } from '../store/actions/user.action.js'
import { userService } from '../services/user.service.js'
import { authService } from '../services/auth.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
export function AppHeader() {

  const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)

  function onSetLoggdeinUser(loggedinUser) {
    setLoggedInUser(loggedinUser)
  }

  async function onLogOut() {
    try {
      await authService.logOut()
     onSetLoggdeinUser(null)

      showSuccessMsg('the user log out ')
    }
    catch (err) {
      showErrorMsg('OOps try again to log out ')
      throw err
    }
  }
  return (
    <section className="app-header">
      <nav>
        <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink> |
        <NavLink to="/dashboard"> Dashboard</NavLink> |
        <NavLink to="/about"> About</NavLink>
      </nav>
      <div className="logo">Mister Toy</div>
      {loggedinUser ? (
        < section >

          <Link to={`/toy`}>Hello {loggedinUser.fullname}</Link>
          <button onClick={onLogOut}>Logout</button>
        </ section >
      ) : (
        <section>
          <LoginCmp onSetLoggdeinUser={onSetLoggdeinUser} />
        </section>
      )}
    </section>
  )
}
