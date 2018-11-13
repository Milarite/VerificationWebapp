import React , {Component} from 'react';
import http from 'http';
import fs from 'fs';




import JSAlert from "js-alert";
import Config from '../config';
import config from '../config';


class SignUp extends Component{
    constructor(props){
        super(props);
this.state={_userName:"",_password:"", isActive:false,
showUserNameValidation : true , showPasswordValidation : true,_infoWallet:"",WalletBtnActive : false,
showUserExistValidation : true , isUserExist : false};




      
    } 
    SignUp=(_userName,_password)=>{

        const app = this;
        let stepOver = false;
        if(!this.state._userName){

            this.setState({showUserNameValidation:false})
        }
        else{
            this.setState({showUserNameValidation:true})
        }
        if(!this.state._password){
            this.setState({showPasswordValidation:false});
        }
        else{
            this.setState({showPasswordValidation:true});

        }

        if(this.state._userName && this.state._password && !this.state.isUserExist){
stepOver = true;
        }

        if(stepOver){

            let smartContract = Config.init(); 
        
            let data=smartContract.addOwner.getData(this.state._userName,this.state._password);

            Config.web3().eth.getTransactionCount(Config.publicKey,function(err,nonce){

                const transactionRaw = Config.prepairTransaction(Config.privateKey,data,nonce);
                console.log(transactionRaw);
                Config.web3().eth.sendRawTransaction(transactionRaw,function(err,result){
                    console.log(result);
if(!err){
    Config.createWallet(app.state._userName,app.state._password).then(function(result){

////////save wallet as downoaladable file
app.setState({_infoWallet:result},function(err,result2){

    app.setState({WalletBtnActive:true});

app.setState({walletpk:result.privateKey});
});

///// end save wallet as downoaladable file
    });
    JSAlert.alert("signup successfully");

}


                });

            })

        



        }
            


    }


    saveWalletToFile = () => {
        let _wallet  = JSON.stringify(this.state._infoWallet);
        var element = document.createElement("a");
        var file = new Blob([_wallet], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "wallet.txt";
        element.click();

        
    }
    checkUserName =  (y) =>{
        const smartInstance = config.init();
        const currentUser = smartInstance.checkSignedBefore(y.target.value);
     
        if(currentUser[0] != ""){
            this.setState({isUserExist : true,showUserExistValidation:false});
        }
        
    }
    updateuserName=(y)=>{

     

            this.setState({_userName:y.target.value});
        

        

        


        

        
    }
    updatePassword=(y)=>{
        this.setState({_password:y.target.value});
        



    }
    render(){
        return(
            <div className="container reg">
            <form>
               <div className="row">
              
               <div className="col-md-4 reg-input">
               <p className="title">Verfied Certificate</p>
               <input  type="text" onBlur = {this.checkUserName} onChange={this.updateuserName} placeholder="UserName" className= "form-control margin-top"/>
               <span style= {{color:"red"}}  hidden={this.state.showUserNameValidation}>this field is required</span>
               <span  style= {{color:"red"}}  hidden={this.state.showUserExistValidation}>user already exist</span>
               <input type="password" placeholder="Password" onChange={this.updatePassword} className="form-control margin-top reg-input"/>
               <span style= {{color:"red"}}  hidden={this.state.showPasswordValidation}>this field is required</span>

               </div>
               </div>
               <input  type="button" onClick={this.SignUp} value="sign up" className="btn margin-top"/> 
            </form>
            <br/>
            <br/>
            <div hidden={!(this.state.walletpk != null)}>
            <label>Copy Privatekey</label>
            
            <div class="row">
            
            <div class= "col-md-6">
           
            <input type="text" class="form-control" readOnly={true}  value={this.state.walletpk} />
            </div>
            </div>
            <input type="button" hidden = {!this.state.WalletBtnActive} onClick={this.saveWalletToFile} value="download key store" className="btn margin-top"/>

            </div>
            </div>

        )
    }
} 


export default SignUp ;