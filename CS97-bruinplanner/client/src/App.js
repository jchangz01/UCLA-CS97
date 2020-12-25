import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact'
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import Aero from './requirements/Aero_Reqs.js';
import BioEng from './requirements/BioE_Reqs.js';
import ChemEng from './requirements/ChemE_Reqs.js';
import CivilEng from './requirements/CivilE_Reqs.js';
import ComSci from './requirements/Cs_Reqs.js';
import CSEng from './requirements/CSE_Reqs.js';
import ECEng from './requirements/ECE_Reqs.js';
import MatSci from './requirements/Mat_Reqs.js';
import MechE from './requirements/MechEng.js';
import Planner from './components/Planner'

function PathNotFound() {
  return (
    <h3>Error 404 - Page Not Found!</h3>
  )
}

function Error() {
  return (
    <h3>An error has occured</h3>
  )
}

//Front-end routing to corresponding pages
export default function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} exact/>
        <Route path="/contact" component={Contact}/>
        <Route path="/log-in" component={Login} exact/>
        <Route path="/sign-up" component={Signup} exact/>
        <Route path="/account/:username" component={Account} exact/>
        <Route path="/account/:username/planner/:index" component={Planner} exact/>
        <Route path="/requirements/Aerospace Engineering" component={Aero} exact/>
        <Route path="/requirements/Bioengineering" component={BioEng} exact/>
        <Route path="/requirements/Chemical Engineering" component={ChemEng} exact/>
        <Route path="/requirements/Civil Engineering" component={CivilEng} exact/>
        <Route path="/requirements/Computer Science" component={ComSci} exact/>
        <Route path="/requirements/Computer Science and Engineering" component={CSEng} exact/>
        <Route path="/requirements/Computer Engineering" component={CSEng} exact/>
        <Route path="/requirements/Electrical Engineering" component={ECEng} exact/>
        <Route path="/requirements/Materials Science and Engineering" component={MatSci} exact/>
        <Route path="/requirements/Mechanical Engineering" component={MechE} exact/>
        <Route path="/error" component={Error} exact/>
        <Route component={PathNotFound} />
      </Switch>
    </main>
  );
}

