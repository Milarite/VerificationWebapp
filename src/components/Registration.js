import React , {Component} from 'react';
import http from 'http';
import fs from 'fs';




import JSAlert from "js-alert";
import Config from '../config';
import config from '../config';
import { isatty } from 'tty';


class SignUp extends Component{
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

this.state={_userName:"",_password:"", isActive:false,
showUserNameValidation : true , showPasswordValidation : true,_infoWallet:"",WalletBtnActive : false,
showUserExistValidation : true , isUserExist : false,
isArabic:isArabic,
ar:{UserName:"إسم المستخدم",password:"الرقم السري",signup:"تسجيل ",VerfiedCertificate:"الشهادة الموثقة",signupsucc:"تم التسجيل بنجاح"},
en:{UserName:"Username",password:"Password",signup:"Signup",VerfiedCertificate:"Verfied Certificate",signupsucc:"signup successfully "}






};







      
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
    JSAlert.alert( app.state.isArabic ?    (app.state.ar.signupsucc) : (app.state.en.signupsucc) );
    



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
        else{
            this.setState({isUserExist : false,showUserExistValidation:true});
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
               <p className="title">{ this.state.isArabic ?    (this.state.ar.VerfiedCertificate) : (this.state.en.VerfiedCertificate) }</p>
               <input  type="text" onBlur = {this.checkUserName} onChange={this.updateuserName} placeholder={ this.state.isArabic ?    (this.state.ar.UserName) : (this.state.en.UserName) } className= "form-control margin-top"/>
               <span style= {{color:"red"}}  hidden={this.state.showUserNameValidation}>this field is required</span>
               <span  style= {{color:"red"}}  hidden={this.state.showUserExistValidation}>user already exist</span>
               <input type="password" placeholder={ this.state.isArabic ?    (this.state.ar.password) : (this.state.en.password) } onChange={this.updatePassword} className="form-control margin-top reg-input"/>
               <span style= {{color:"red"}}  hidden={this.state.showPasswordValidation}>this field is required</span>

               </div>
               </div>
               <input  type="button" onClick={this.SignUp} value={ this.state.isArabic ?    (this.state.ar.signup) : (this.state.en.signup) } className="btn btn-lg btn-primary btn-custom margin-top"/> 
            </form>
            <br/>
            <br/>
            <div hidden={!(this.state.walletpk != null)}>
            <label>{ this.state.isArabic ?    (this.state.ar.copyPriavteKey) : (this.state.en.copyPriavteKey) }</label>
            
            <div class="row">
            
            <div class= "col-md-6 col-custom">
           
            <input type="text" class="form-control" readOnly={true}  value={this.state.walletpk} />
            </div>
            </div>
            <input type="button" hidden = {!this.state.WalletBtnActive} onClick={this.saveWalletToFile} value="download key store" className="btn btn-lg btn-primary btn-custom margin-top"/>

            </div>
            </div>

        )
    }
} 


export default SignUp ;