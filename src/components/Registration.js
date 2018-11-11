import React , {Component} from 'react';



import JSAlert from "js-alert";
import Config from '../config';


class SignUp extends Component{
    constructor(props){
        super(props);
this.state={_userName:"",_password:"", isActive:false,
showUserNameValidation : true , showPasswordValidation : true ,
walletpk : ""} ;




      
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

        if(this.state._userName && this.state._password){
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

////////save wallet to ipfs

app.setState({walletpk:result.privateKey});

///// end of save wallet to ipfs
    });
    JSAlert.alert("signup successfully");

}


                });

            })

        



        }
            


    }

    SaveWalletToIpfs(_wallet) {
        
    }
    updateuserName=(y)=>{

        this.setState({_userName:y.target.value});


        

        
    }
    updatePassword=(y)=>{
        this.setState({_password:y.target.value});
        



    }
    render(){
        return(
            <div className="container" >
            <form>
               <div className="row">
               <div className="col-md-4">
            
               <input type="text" onChange={this.updateuserName} placeholder="UserName" className= "form-control margin-top"/>
               <span style= {{color:"red"}} hidden={this.state.showUserNameValidation}>this field is required</span>
               <input type="password" placeholder="Password" onChange={this.updatePassword} className="form-control margin-top"/>
               <span style= {{color:"red"}} hidden={this.state.showPasswordValidation}>this field is required</span>

               </div>
               </div>
               <input  type="button" onClick={this.SignUp} value="sign up" className="btn margin-top"/> 
            </form>
            <br/>
            <br/>
            <label>Copy Privatekey</label>
            
            <div class="row">
            
            <div class= "col-md-6">
           
            <input type="text" class="form-control" readOnly={true} value={this.state.walletpk} />
            </div>
            </div>
            </div>
        )
    }
} 


export default SignUp ;