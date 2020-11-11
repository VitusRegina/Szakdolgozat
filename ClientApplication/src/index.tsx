import React from "react";
import ReactDOM from "react-dom";
import './Styles/style.css'
import Home from './Home';
import Things from './Things/Things';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
import Logout from './User/LogOut';
import { AuthContext } from "./Services/AuthService.js";
import Login from "./User/Login";
import Signup from './User/Register';
import Profile from './User/Profile';
import ModifyThing from './Things/ModifyThing' ;
import DeleteThing from "./Things/DeleteThing";
import ModifyAuction from './Auctions/ModifyAuction' ;
import DeleteAuction from "./Auctions/DeleteAuction";
import PrivateAuction from './Auctions/AuctionsPrivate';
import ExpandTime from './Auctions/ExpandTime';
import AuctionList from './Auctions/AuctionList';



function Navigation() {
  const token=localStorage.getItem("user");
  const [authTokens, setAuthTokens] = useState(token);
 
  
  const setTokens = (data : any) => {
    localStorage.setItem("user", JSON.stringify(data));
    setAuthTokens(data);
  }


  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens}}>
    <Router>
      <Navbar collapseOnSelect className="bg-dark" expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
         <Nav className="mr-auto">
                <Nav.Link href="#home">
                    <Link to="/">Home</Link>
                </Nav.Link>

                <Nav.Link href="#home">
                    <Link to="/proba">Auctions</Link>
                </Nav.Link>
               
                <Nav.Link href="#link">    
                </Nav.Link>
          </Nav>  

          {(
                    authTokens ? (
                      <NavDropdown title="Account" id="collasible-nav-dropdown">
                          <NavDropdown.Item> <Link to="/profile">Profile</Link> </NavDropdown.Item>
                          <NavDropdown.Item> <Link to="/things">My items</Link> </NavDropdown.Item>
                          <NavDropdown.Item> <Link to="/privateauctions">My auctions</Link> </NavDropdown.Item>
                          <NavDropdown.Item> <Link to="/admin">Log out</Link> </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <Nav>
                      <Nav.Link href="#link" className="mr-sm-2">
                                <Link to="/admin">Sign in</Link>  
                            </Nav.Link>
                      </Nav>
                    )
                  )}
      
          </Navbar.Collapse>
      </Navbar>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/auctions">
            <AuctionList active={true} />
          </Route>
          <Route path="/homeauctions">
            <AuctionList active={false} />
          </Route>
          <Route path="/proba">
            <AuctionList active={true} />
          </Route>
         
          <Route path="/things" component={Things}/>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin" component={Logout}/>
          <Route path="/privateauctions" component={PrivateAuction}/>
          <Route path="/deletething" component={DeleteThing} />
          <Route path="/modifything" component={ModifyThing} />
          <Route path="/deleteauction" component={DeleteAuction} />
          <Route path="/modifyauction" component={ModifyAuction} />
          <Route path="/expandtime" component={ExpandTime} />

          
        </Switch>
    </Router>
    </AuthContext.Provider>
  );
}

ReactDOM.render(
    <Navigation />,
    document.getElementById('root')
    );
    


