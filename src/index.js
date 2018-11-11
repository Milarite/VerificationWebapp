import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import UploadControl from './components/UploadControl';
import Main from './components/main';
import {BrowserRouter as Router, Route , Link} from 'react-router-dom';
import Explore from './components/explore';
import SignUp  from './components/Registration';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';



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
        
         
            <li className="nav-item">
              <Link to ="/">Explore</Link>
            </li>
       
          </ul>
     
        </div>
      </nav>
      <Route exact path = "/" component = {Explore}/>
<Route  path="/upload" component = {Main}/>

<Route path ="/SignUp" component={SignUp}/>
<Route path="/Login" component={Login}/>
<Route path="/adminLogin" component={AdminLogin}/>
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

