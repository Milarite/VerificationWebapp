import React , {Component} from 'react';
import Config from '../config' ;

class Login extends Component {
    constructor(props){
        super(props);
this.state={
    UserName:"",
    password:""
}
    }

    userNameChange=(user)=>{
        this.setState({UserName:user.target.value});

    }


    passwordChange=(user)=>{
        this.setState({password:user.target.value});

    }


    
    Login=()=>{
//check if user input is correct 
   let smartContract = Config.init(); 
        let userAccount=smartContract.checkSignedBefore.call(this.state.UserName);
        console.log(userAccount);
        if(userAccount && this.state.password==userAccount[1]){
        console.log("done");


        }






    }






    render (){
        return(
            <div className="container">
            <form>
                <div className="row">
                <div className="col-md-4">
               
                <input type="text"  placeholder="UserName" className="form-control margin-top" onChange={this.userNameChange}/>
               
                <input type="password" placeholder="Password" className="form-control margin-top" onChange={this.passwordChange}/>
    <input type="button" className="btn margin-top" value="login" onClick={this.Login}/>
                </div>
    
                </div>
            </form>
            </div>
    
        )
    }
}
export default Login ; 