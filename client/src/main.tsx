import ReactDOM from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import "./i18n";
import App from './App.tsx'
import './index.css'
import store from './store'
import { BrowserRouter as Router} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
)
