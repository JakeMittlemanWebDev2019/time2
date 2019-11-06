import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import store from './store';

import TimesheetsNew from './timesheets/new';
import Login from './login';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <TimesheetPage />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function TimesheetPage(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Col md="8">
          <Nav>

            {/* Each of these is a nav bar option */}
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                Home
            </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/timesheets/new" exact activeClassName="active" className="nav-link">
                Timesheets
            </NavLink>
            </Nav.Item>

          </Nav>
        </Col>
        <Col md="4">
          <Session />
        </Col>
      </Navbar>

      <Switch>

        {/* All home code goes here */}
        <Route exact path="/">
          <h1>Home</h1>
        </Route>

        {/* All Users code goes here */}
        <Route exact path="/timesheets/new">
          <TimesheetsNew />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

      </Switch>
    </Router>
  );
}

let Session = connect(({ session }) => ({ session }))(({ session, dispatch }) => {
  function logout(ev) {
    ev.preventDefault();
    dispatch({
      type: 'LOG_OUT',
    });
  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <p className="text-light py-2">User: {session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
      </Nav>
    );
  }
  else {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to="/login" exact activeClassName="active" className="nav-link">
            Login
          </NavLink>
        </Nav.Item>
      </Nav>
    );
  }
});