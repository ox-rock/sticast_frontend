import { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";
import { Dropdown, DropdownButton} from "react-bootstrap";

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
              <i class="bi bi-person-fill" style={{color: 'white'}}></i>
                <Link to="/login">Login</Link>
              </li>
              <li>
              <i class="bi bi-person-plus-fill" style={{color: 'white'}}></i>
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
           <div>
           <DropdownButton className={classes.myd} title={username} >
           <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
           <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
           <div class="dropdown-divider"></div>
           <Dropdown.Item>Budget: {userBudget}$</Dropdown.Item>
           
         </DropdownButton>
         </div>
          )}
            
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
