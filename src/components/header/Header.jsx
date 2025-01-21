import './Header.css';

const Header = ({loggedIn, handleLogin, handleLogout}) => {

    return (
            <header>
                {!loggedIn ? 
                <button className="login-button" onClick={handleLogin}>
                    {/*<span className='login-btn-content'>Login</span>*/}
                    Login
                </button>
                :
                <button className="logout-button" onClick={handleLogout}>
                    {/*<span className='logout-btn-content'>Logout</span>*/}
                    Logout
                </button>
                }
            </header>
    )
  }

  export default Header;