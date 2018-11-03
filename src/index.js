import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import UploadControl from './components/UploadControl';
import Main from './components/main';
import {BrowserRouter as Router, Route , Link} from 'react-router-dom';
import Explore from './components/explore';




const Index = () =>{
    return  (
        <div>
            
        <Router>
          
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Verification App</a>
       
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
       
          <ul className="navbar-nav mr-auto">
        
            <li className="nav-item active">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to ="/explore">Explore</Link>
            </li>
           
          
          </ul>
     
        </div>
      </nav>
<Route exact path="/" component = {Main}/>
<Route path = "/explore" component = {Explore}/>
            </div>
        </Router>
        </div>


    )
}
ReactDOM.render(<Index/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

