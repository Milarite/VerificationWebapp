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
  let isArabic = false;
let lang = localStorage.getItem("lang");
if(lang){
if(lang == "ar")
{
  isArabic= true;
}
}
   

  this.state = {IsActive : false , provider : false ,
    ar:{VerifiedCertificate:"الشهادة الموثقة ",Explore:"استعراض",login:"تسجيل الدخول",upload:"رفع الملف",logout:"تسجيل الخروج",lang:"إنجليزي"},
    en:{VerifiedCertificate:"Verified Certificate",Explore:"Explore",login:"login",upload:"upload",logout:"logout",lang:"Arabic"},
    isArabic: isArabic
  
  
  
  
  
  
  };

  if(localStorage.getItem("provider"))
  {
    this.state= {IsActive : false  , provider : true ,
    ar:{VerifiedCertificate:"الشهادة الموثقة ",Explore:"استعراض",login:"تسجيل الدخول",upload:"رفع الملف",logout:"تسجيل الخروج",lang:"انجليزي"},
    en:{VerifiedCertificate:"Verified Certificate",Explore:"Explore",login:"Login",upload:"upload",logout:"logout",lang:"Arabic"},
    isArabic:isArabic 
  
    

  }





  
}







}
changeLanguage = () => {

  

let lang = localStorage.getItem("lang");

if(!lang){
localStorage.setItem("ar");
this.setState({isArabic:true});
}else if(lang == "ar") {
localStorage.setItem("lang","en");
this.setState({isArabic:false});
}
else{
  localStorage.setItem("lang","ar");
  this.setState({isArabic:true});
}

window.location.reload();
  





}

logout(){

// remove localStorage and redirect

localStorage.removeItem("provider");
window.location.href="/login";


}



  render(){
    return  (
        <div>
        
        <Router>
          
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">{this.state.isArabic ?    (this.state.ar.VerifiedCertificate) : (this.state.en.VerifiedCertificate)}</a>
       
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
       
          <ul className="navbar-nav mr-auto">
        
         
            <li className="nav-item">
              <Link to ="/">{this.state.isArabic ?    (this.state.ar.Explore) : (this.state.en.Explore)}</Link>
            </li>
            <li className="nav-item">
              <Link hidden={this.state.provider} to ="/Login">{this.state.isArabic ?    (this.state.ar.login) : (this.state.en.login)}</Link>
            </li>

            <li className="nav-item">
            <Link hidden={!this.state.provider} to = "/upload">{this.state.isArabic ?    (this.state.ar.upload) : (this.state.en.upload)}</Link>
            </li>

            <li className ="nav-item">
            <span hidden = {!this.state.provider} onClick={this.logout} style={{color:"white" , cursor:"pointer"}}>{this.state.isArabic ?    (this.state.ar.logout) : (this.state.en.logout)}</span>
            </li>
<li className="nav-item">
<span onClick={this.changeLanguage} style={{color:"white" , cursor:"pointer"}}>{this.state.isArabic ?    (this.state.ar.lang) : (this.state.en.lang)}</span>
</li>
       
          </ul>
     
        </div>
      </nav>
      <Route exact path = "/" component = {Explore}/>
<Route   path="/upload" component = {Main}/>

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

