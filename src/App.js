import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import QuestionsPage from "./pages/QuestionsPage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path="/login">
            <AuthPage />
          </Route>
        )}

        <Route path="/register">
          <RegistrationPage />
        </Route>

        <Route path="/questions">
          {authCtx.isLoggedIn && <QuestionsPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/question/:id">
          {authCtx.isLoggedIn && <QuestionPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;