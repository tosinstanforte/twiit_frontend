import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import Post from "./components/post";
import { useHistory } from 'react-router'



function App() {

  let history = useHistory();

  function removeToken(){

    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token")

      history.push("/sign-in");
      history.go(0)
      
    }

  }
  return (
   
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/post-in"}>Home</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
           
            { sessionStorage.getItem('token') === null ? (
              <ul className="navbar-nav ml-auto">
             <li className="nav-item">
                       <Link className="nav-link" to={"/sign-in"}>Login</Link>
                     </li>
                     <li className="nav-item">
                       <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                     </li>
                </ul>
              ) : (
                  <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                          <button  className="nav-link" onClick={removeToken} >logout</button >
                        </li>
                        
                   </ul>
              )}
              
            
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
       { sessionStorage.getItem('token') === null ? (
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
           
          
          </Switch>
           ) : (

            <Switch>
            
            <Route path="/post-in" component={Post} />
          
          </Switch>


           )}
        </div>
      </div>
    </div>
  );
}

export default App;
