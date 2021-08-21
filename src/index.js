import App from './App';
import ReactDOM from 'react-dom';
import { AuthContextProvider } from './store/auth-context';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.sass';
import "@creativebulma/bulma-divider/src/docs/static/css/bulma-divider.css"
import "./index.css"

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);
