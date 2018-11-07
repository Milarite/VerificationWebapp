import React , {Component} from 'react';
import firebase from 'firebase/app';
import { FirebaseConfig } from "../config/keys";

class SignUp extends Component{
    constructor(props){
        super(props);


    } 
    render(){
        return(
            <div className="container" >
            <form>
               <div className="row">
               <div className="col">
              
               <input type="email" placeholder="Email" className="form-control margin-top"/>
               <input type="text" placeholder="UserName" className= "form-control margin-top"/>
               <input type="password" placeholder="Password" className="form-control margin-top"/>

               </div>
               </div>
               <input type="submit" className="btn margin-top"/> 
            </form>
            </div>
        )
    }
} 


export default SignUp ;