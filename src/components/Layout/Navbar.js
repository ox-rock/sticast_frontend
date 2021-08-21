import { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./navbar.css";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const username = authCtx.username;
  const isLoggedIn = authCtx.isLoggedIn;
  const userBudget = authCtx.userBudget;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/login");
  };

  return (
    <nav
      className="navbar is-light is-size-5"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to={'/'} >
            <div className="navbar-item is-size-4"><b>StiCast!</b></div>
          </Link>
          

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {isLoggedIn && (
              <Link to="/questions" className="navbar-item">
                Questions
              </Link>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {isLoggedIn && (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                    {" "}
                    <i className="bi bi-person-circle"></i>
                    {username}
                  </a>

                  <div className="navbar-dropdown">
                    <Link to="/profile" className="navbar-item">
                      Profile
                    </Link>
                    <Link
                      to="/logout"
                      className="navbar-item"
                      onClick={logoutHandler}
                    >
                      Logout
                    </Link>

                    <hr className="navbar-divider" />
                    <a className="navbar-item">Budget: {userBudget}$</a>
                  </div>
                </div>
              )}

              {!isLoggedIn && (
                <div className="buttons">
                  <Link to="/register" className="button is-primary is-size-5">
                    Register
                  </Link>

                  <Link to="/login" className="button is-light is-size-5">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
