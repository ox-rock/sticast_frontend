import { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
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
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>StiCast!</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <div>
              <li>
                <i className="bi bi-person-fill" style={{ color: "white" }}></i>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <i
                  className="bi bi-person-plus-fill"
                  style={{ color: "white" }}
                ></i>
                <Link to="/register"> Register</Link>
              </li>
            </div>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/questions">Questions</Link>
            </li>
          )}
          {isLoggedIn && (
            <div className={classes.dropdown}>
              <button className={classes.dropbtn}>
                <i className="bi bi-person-circle"></i> {username}{" "}
                <i className="bi bi-caret-down-fill"></i>
              </button>
              <div className={classes.dropdowncontent}>
                <Link to="/profile">Profile</Link>
                <Link to="/logout" onClick={logoutHandler}>
                  Logout
                </Link>
                <hr className={classes.solid}></hr>
                <Link to="/#">Budget: {userBudget}$</Link>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
