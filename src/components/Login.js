import React , {Component} from 'react';
import Config from '../config' ;

class Login extends Component {
    constructor(props){
        super(props);
this.state={
    UserName:"",
    password:"",
    showUserNameValidation : true,
    showPasswordValidation : true,
    showUserExistValidation:true
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
   const app = this;
   let stepOver = false;
   if(!this.state.UserName){

    this.setState({showUserNameValidation:false})
}
else{
    this.setState({showUserNameValidation:true})
}

if(!this.state.password){
    this.setState({showPasswordValidation:false});
}
else{
    this.setState({showPasswordValidation:true});

}

if(this.state.UserName && this.state.password){
    stepOver = true;
}

if(stepOver){
        let userAccount=smartContract.checkSignedBefore.call(this.state.UserName);
        console.log(userAccount);
        if(userAccount && this.state.password==userAccount[1]){
            this.setState({showUserExistValidation:true});
            localStorage.setItem("provider",true);
            window.location.reload();


        }
        else{
            this.setState({showUserExistValidation:false});
        }

    }






    }






    render (){
        return(
            <div className="container">
            <form>
                <div className="row reg">
                <div className="col-md-4 reg-input">
                <p className="title">Verfied Certificate</p>
                <input type="text"  placeholder="UserName" className="form-control margin-top" onChange={this.userNameChange}/>
                <span style= {{color:"red"}}  hidden={this.state.showUserNameValidation}>this field is required</span>
                <span style= {{color:"red"}}  hidden={this.state.showUserExistValidation}>wrong in username or password</span>               
                <input type="password" placeholder="Password" className="form-control margin-top" onChange={this.passwordChange}/>
               <span style= {{color:"red"}}  hidden={this.state.showPasswordValidation}>this field is required</span>
               <br/>
    <input type="button" className="btn margin-top" value="login" onClick={this.Login}/>
                </div>
    
                </div>
            </form>
            </div>
    
        )
    }
}
export default Login ; 