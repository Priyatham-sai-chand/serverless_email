import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'
import EmailTemplate from './BulkEmail';
function App() {
  return (
    <div className="App">
      <Router>
        <ReactNotification />
        <Switch>
                        <Route exact path="/" component={EmailTemplate} />
                        <Route exact path="/bulkemail" component={EmailTemplate} />
        </Switch>


      </Router>

    </div>
  );
}

export default App;
