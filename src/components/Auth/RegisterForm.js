import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./LoginForm.css";
import { CSSTransition } from "react-transition-group";
import signupimg from "./signup.png";

const RegisterForm = (props) => {
  const [prova, setProva] = useState(false);
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const [enteredUsername, setenteredUsername] = useState("");
  const [enteredUsernameTouched, setenteredUsernameTouched] = useState(false);
  const authCtx = useContext(AuthContext);
  const [enteredPassword, setenteredPassword] = useState("");
  const [enteredPasswordTouched, setenteredPasswordTouched] = useState(false);

  const [enteredMatchedPassword, setenteredMatchedPassword] = useState("");
  const [enteredPasswordMatchedTouched, setenteredPasswordMatchedTouched] =
    useState(false);

  const [enteredEmail, setenteredEmail] = useState("");
  const [enteredEmailTouched, setenteredEmailTouched] = useState(false);

  const enteredUsernameIsValid = enteredUsername.trim() !== "";
  const usenameInputIsInvalid =
    !enteredUsernameIsValid && enteredUsernameTouched;

  const enteredPasswordIsValid = enteredPassword.trim() !== "";
  const enteredPasswordIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const enteredMatchedPasswordIsValid =
    enteredPassword.trim() === enteredMatchedPassword.trim() &&
    enteredPassword.trim() !== "";
  const enteredMatchedPasswordIsInvalid =
    !enteredMatchedPasswordIsValid && enteredPasswordMatchedTouched;

  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (
    enteredUsernameIsValid &&
    enteredPasswordIsValid &&
    enteredMatchedPasswordIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const usernameChangeHandler = (event) => {
    setenteredUsername(event.target.value);
  };

  const usernameBlurHandler = (event) => {
    setProva(false);
    setenteredUsernameTouched(true);
  };

  const passwordChangeHandler = (event) => {
    setenteredPassword(event.target.value);
  };

  const passwordBlurHandler = (event) => {
    setProva(false);
    setenteredPasswordTouched(true);
  };

  const emailChangeHandler = (event) => {
    setenteredEmail(event.target.value);
  };

  const emailBlurHandler = (event) => {
    setProva(false);
    setenteredEmailTouched(true);
  };

  const passwordMatchedChangeHandler = (event) => {
    setenteredMatchedPassword(event.target.value);
  };

  const passwordMatchedBlurHandler = (event) => {
    setProva(false);
    setenteredPasswordMatchedTouched(true);
  };

  // SUBMISSION HANDLER
  const formSubmissionHandler2 = (event) => {
    event.preventDefault();

    setProva(false);
    setenteredUsernameTouched(true);
    setenteredPasswordTouched(true);
    setenteredPasswordMatchedTouched(true);
    setenteredEmailTouched(true);

    if (!formIsValid) {
       return;
    }

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
        matchingPassword: enteredMatchedPassword,
        email: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setProva(true);
          setenteredUsername("");
          setenteredPassword("");
          setenteredMatchedPassword("");
          setenteredEmail("");
          setenteredUsernameTouched(false);
          setenteredPasswordTouched(false);
          setenteredEmailTouched(false);
          setenteredPasswordMatchedTouched(false);
          setShowMessage(true);
          return Promise.reject("Username or Password already exist!");
        } else {
          return response.json();
        }
      })
      .then((data) => {

        const expirationTime = new Date(
          new Date().getTime() + +data.expirationTime * 1000
        );
        authCtx.login(data, expirationTime.toISOString());
        history.replace("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const usernameInputClasses = usenameInputIsInvalid ? "input_error" : "";
  const passwordInputClasses = enteredPasswordIsInvalid ? "input_error" : "";
  const matchedPasswordInputClasses = enteredMatchedPasswordIsInvalid
    ? "input_error"
    : "";
  const emailInputClasses = enteredEmailIsInvalid ? "input_error" : "";

  return (
    <div className="main">
      <section className="signup">
        <div className="container_2">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title is-size-3"><b>R</b>egistration</h2>

              <CSSTransition
                in={showMessage}
                timeout={300}
                classNames="alert"
                unmountOnExit
              >
                <div variant="primary" className="alert_active">
                  <p>Username or Password already exists!</p>
                </div>
              </CSSTransition>
              <form
                onSubmit={formSubmissionHandler2}
                className="register-form"
                id="register-form"
              >
                <div className="form-group">
                  <label>
                    <i className="bi bi-person-fill"></i>
                  </label>
                  <input
                    className={usernameInputClasses}
                    type="text"
                    placeholder="Your Username"
                    onChange={usernameChangeHandler}
                    onBlur={usernameBlurHandler}
                    value={enteredUsername}
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
                    <i className="bi bi-envelope-fill"></i>
                  </label>
                  <input
                    className={emailInputClasses}
                    type="email"
                    placeholder="Your Email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                  />
                </div>
                <CSSTransition
                  in={enteredEmailIsInvalid && !prova}
                  timeout={300}
                  classNames="alert"
                  unmountOnExit
                >
                  <div variant="primary">
                    <p className="error-text">Invalid email!</p>
                  </div>
                </CSSTransition>

                <div className="form-group">
                  <label>
                    <i className="bi bi-lock-fill"></i>
                  </label>
                  <input
                    className={passwordInputClasses}
                    type="password"
                    placeholder="Password"
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    value={enteredPassword}
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

                <div className="form-group">
                  <label>
                    <i className="bi bi-lock"></i>
                  </label>
                  <input
                    className={matchedPasswordInputClasses}
                    type="password"
                    placeholder="Repeat your password"
                    onChange={passwordMatchedChangeHandler}
                    onBlur={passwordMatchedBlurHandler}
                    value={enteredMatchedPassword}
                  />
                </div>
                <CSSTransition
                  in={enteredMatchedPasswordIsInvalid && !prova}
                  timeout={300}
                  classNames="alert"
                  unmountOnExit
                >
                  <div variant="primary">
                    <p className="error-text">Passwords has to match!</p>
                  </div>
                </CSSTransition>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure id="auth__imgs">
                <img src={signupimg} className="image" alt="sing up"></img>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
