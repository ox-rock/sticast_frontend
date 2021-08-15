import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./LoginForm.css";
import { CSSTransition } from "react-transition-group";
import signinimg from "./signin.jpg";

const LoginForm = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [prova, setProva] = useState(false);
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  //const [isLoading, setIsLoading] = useState(false);

  const [enteredUsername, setenteredUsername] = useState("");
  const [enteredUsernameTouched, setenteredUsernameTouched] = useState(false);
  const [enteredPassword, setenteredPassword] = useState("");
  const [enteredPasswordTouched, setenteredPasswordTouched] = useState(false);

  const enteredUsernameIsValid = enteredUsername.trim() !== "";

  const usenameInputIsInvalid =
    !enteredUsernameIsValid && enteredUsernameTouched;

  const enteredPasswordIsValid = enteredPassword.trim() !== "";
  const enteredPasswordIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  let formIsValid = false;

  if (enteredUsernameIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const usernameChangeHandler = (event) => {
    setenteredUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setenteredPassword(event.target.value);
  };

  const usernameBlurHandler = (event) => {
    setProva(false);
    setenteredUsernameTouched(true);
  };

  const passwordBlurHandler = (event) => {
    setProva(false);
    setenteredPasswordTouched(true);
  };

  // SUBMISSION HANDLER
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setProva(false);
    setenteredUsernameTouched(true);
    setenteredPasswordTouched(true);

    if (!formIsValid) {
      return;
    }

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status !== 200) {
          setProva(true);
          setenteredUsername("");
          setenteredPassword("");
          setenteredUsernameTouched(false);
          setenteredPasswordTouched(false);
          setErrorMessage(data.errors);
          setShowMessage(true);
        } else {
          console.log(data);
          const expirationTime = new Date(
            new Date().getTime() + +data.expirationTime * 1000
          );
          authCtx.login(data, expirationTime.toISOString());
          history.replace("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const usernameInputClasses = usenameInputIsInvalid ? "input_error" : "";

  const passwordInputClasses = enteredPasswordIsInvalid ? "input_error" : "";

  return (
    <section className="signin">
      <div className="container_2">
        <div className="signin-content">
          <div className="signin-image">
            <figure>
              <img src={signinimg} alt="sing up"></img>
            </figure>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Login</h2>

            <CSSTransition
              in={showMessage}
              timeout={300}
              classNames="alert"
              unmountOnExit
            >
              <div variant="primary" className="alert_active">
                <p>{errorMessage}</p>
              </div>
            </CSSTransition>

            <form
              onSubmit={formSubmissionHandler}
              className="register-form"
              id="login-form"
            >
              <div className="form-group">
                <label>
                  <i className="bi bi-person-fill"></i>
                </label>
                <input
                  className={usernameInputClasses}
                  type="text"
                  value={enteredUsername}
                  onChange={usernameChangeHandler}
                  onBlur={usernameBlurHandler}
                  placeholder="Username"
                />
              </div>
              <CSSTransition
                in={usenameInputIsInvalid && !prova}
                timeout={300}
                classNames="alert"
                unmountOnExit
              >
                <div variant="primary">
                  <p className="error-text">Username must not be empty!</p>
                </div>
              </CSSTransition>

              <div className="form-group">
                <label>
                  <i className="bi bi-lock-fill"></i>
                </label>
                <input
                  className={passwordInputClasses}
                  type="password"
                  value={enteredPassword}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  placeholder="Password"
                />
              </div>
              <CSSTransition
                in={enteredPasswordIsInvalid && !prova}
                timeout={300}
                classNames="alert"
                unmountOnExit
              >
                <div variant="primary">
                  <p className="error-text">Password must not be empty!</p>
                </div>
              </CSSTransition>

              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Log in"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
