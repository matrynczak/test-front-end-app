import "./Header.css";

const Header = ({ isLoggedIn, handleLogin, handleLogout }) => {
  return (
    <header>
      <div className="header-content">
        {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
            <button className="login-button" onClick={handleLogin}>
            Auto-login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;