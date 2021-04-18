import "./App.css";
import Nav from "app/components/Nav";
import Login from "app/pages/Login";
import Register from "app/pages/Register";
import Confirmation from "app/pages/Confirmation";
import Home from "app/pages/Home";
import bgLarge from "app/images/bgLarge.png";
import bgSmall from "app/images/bgSmall.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="">
        <div className="z-negative absolute">
          <img
            src={bgLarge}
            alt=""
            className="lg:block md:block hidden lg:-mt-18 xl:-m5-26 md:-mt-4"
          />
          <img
            src={bgSmall}
            alt=""
            className="lg:hidden md:hidden block -mt-6 md:-mt-44 sm:-mt-36"
          />
        </div>
        <div className="flex items-center justify-center flex-col">
          <Nav />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/confirm">
              <Confirmation />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
