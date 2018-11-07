import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import UploadControl from './components/UploadControl';
import Main from './components/main';
import {BrowserRouter as Router, Route , Link} from 'react-router-dom';
import Explore from './components/explore';
<<<<<<< HEAD
import SignUp  from './components/Registration';
import Login from './components/Login';
=======
import Loadable from 'react-loading-overlay';

>>>>>>> 8838df556e071a033a499a13411404c286022879



class Index extends Component{
  
constructor(props){
  super(props);
  this.state = {IsActive : false};
}



  render(){
    return  (
        <div>
        
        <Router>
          
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Verified Certificate</a>
       
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
       
          <ul className="navbar-nav mr-auto">
        
            <li className="nav-item active">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to ="/explore">Explore</Link>
            </li>
           <li className="nav-item">
           <Link to ="/SignUp">SignUp </Link>
           </li>
           <li className="nav-item">
           <Link to ="/Login">Login </Link>
           </li>
          </ul>
     
        </div>
      </nav>
<Route exact path="/" component = {Main}/>
<Route path = "/explore" component = {Explore}/>
<Route path ="/SignUp" component={SignUp}/>
<Route path="/Login" component={Login}/>
            </div>
        </Router>
      

        </div>


    )
  }
}
ReactDOM.render(<Index/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

