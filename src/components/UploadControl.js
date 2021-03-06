import React , {Component} from 'react';
import Web3 from 'web3';
import ethTx from 'ethereumjs-tx';
import JSAlert from "js-alert" ;
import QRCode from "qrcode.react";
import Config from '../config';
import logo from './logo.png';
import background from './blockchain-gif.gif';
import blackBackGround from './black-wallpaper.png';




import ipfsAPI  from 'ipfs-api';
import { write } from 'fs';
import { NPN_ENABLED } from 'constants';
import { config } from '../config';



class UploadControl extends Component{
     web3 =  null;

      backGroundStyle = {
        width:"300px",
        height:"300px",
        marginLeft: "auto",
        marginRight : "auto",
      
        
    
    }
     

    reader = null;
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
this.reader= new FileReader(); 
this.web3 =  new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/afbac1a223484d84a7784a133d1f2010"));
this.state = {btnActive : false , url : true, 
ar:{uploadFile:"إرفع الملف",copyUrl:"إنسخ الرابط",QRCode:"الماسح الضوئي", uploadsucc:"تم التحميل بنجاح"},
en:{uploadFile:"Upload File",copyUrl:"copy URL ",QRCode:"QRCode",uploadsucc:"uploaded succesfully "},
isArabic :isArabic 

}


    }
     
      // this function will convert file to byts then will hanndle the onloadendevent and change state
     UploadToIPFS = (e)=>{
   
        this.reader.readAsArrayBuffer(e);
        this.reader.onloadend = () =>{
        this.setState({btnActive : true});
        }
     
     }
// this function will be called when user click on upload button
     uploadFile = ()=>{


        this.props.onUploadLoadSpiner(true);
        let file = this.reader.result;
        
        
         let fileBuffered = Buffer.from(file);
         let ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
         ipfs.files.add(fileBuffered, (err, result) => { // Upload buffer to IPFS
            if(err) {
              console.error(err)
              return;
            }

           
            // if(this.checkHashIsExist(result[0].hash) == "false")
            // {
            this.SaveToBlockChain (result[0].hash);
          //  }
            // else
            // {
            //     this.setState({IsActive:false});
            //     JSAlert.alert("the document already uploaded");
            // }

          
        });


        
    }


    //////// PREPARE BLOCKCHAIN TRANSACTION

    prepairTransaction  = (privateKey,data,nonce) => {
        let currentWeb3 = this.web3;
        
                  
            var txParams ={ 
                data : data,
                nonce : nonce,
                gasPrice :currentWeb3.toHex(currentWeb3.toWei('20', 'gwei')),
                to : '0xe0540eb9bc31af04fe22df0b23a6076673790a35',
                value : 0,
                gasLimit: 1000000
                
        
            }
            const tx = new ethTx(txParams);
            const privKey = Buffer.from(privateKey, 'hex');
            tx.sign(privKey);
            const serializedTx = tx.serialize();
            const rawTx = '0x' + serializedTx.toString('hex');
           
return rawTx ;
    
    }
    //// END 


    checkHashIsExist = (_hash) => {
        let abi=[
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    },
                    {
                        "name": "_firstName",
                        "type": "string"
                    },
                    {
                        "name": "_lastName",
                        "type": "string"
                    },
                    {
                        "name": "_age",
                        "type": "string"
                    },
                    {
                        "name": "_sex",
                        "type": "string"
                    },
                    {
                        "name": "_gpa",
                        "type": "string"
                    },
                    {
                        "name": "_major",
                        "type": "string"
                    },
                    {
                        "name": "_universityName",
                        "type": "string"
                    },
                    {
                        "name": "_nationalID",
                        "type": "string"
                    },
                    {
                        "name": "_dateOfBirth",
                        "type": "string"
                    },
                    {
                        "name": "_placeOfBirth",
                        "type": "string"
                    },
                    {
                        "name": "_studentId",
                        "type": "string"
                    },
                    {
                        "name": "uploader",
                        "type": "string"
                    }
                ],
                "name": "addHash",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "name": "password",
                        "type": "string"
                    }
                ],
                "name": "addOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    },
                    {
                        "name": "_transaction",
                        "type": "string"
                    }
                ],
                "name": "saveTransaction",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_url",
                        "type": "string"
                    }
                ],
                "name": "setUrl",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_username",
                        "type": "string"
                    },
                    {
                        "name": "_password",
                        "type": "string"
                    }
                ],
                "name": "signupUploader",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "checkSignedBefore",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_username",
                        "type": "string"
                    }
                ],
                "name": "checkSignedupBefore",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getAge",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getDateOfBirth",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getFirstName",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getGPA",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "getHash",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getHashLength",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getLastName",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getMajor",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getNationalID",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getPlaceOfBirth",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getSex",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getStudentId",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getTransactions",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getUniversityName",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getUrl",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_address",
                        "type": "address"
                    }
                ],
                "name": "signinAdmin",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
     const contract =  this.web3.eth.contract(abi);
const privateKey = "EEFD9B722FDB3186875E521C87745DC102ABE04A944BCC485DAB385D2949842F";
const publicKey ="0xaD3843ed864169D4e840651A49bD794F12095162";
        const smartInstance = contract.at("0xe0540eb9bc31af04fe22df0b23a6076673790a35");

        let h = smartInstance.checkHashExsist.call(_hash);
    } 
    SaveToBlockChain = (_hash) =>{
        console.log(_hash);
        let abi=[
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    },
                    {
                        "name": "_firstName",
                        "type": "string"
                    },
                    {
                        "name": "_lastName",
                        "type": "string"
                    },
                    {
                        "name": "_age",
                        "type": "string"
                    },
                    {
                        "name": "_sex",
                        "type": "string"
                    },
                    {
                        "name": "_gpa",
                        "type": "string"
                    },
                    {
                        "name": "_major",
                        "type": "string"
                    },
                    {
                        "name": "_universityName",
                        "type": "string"
                    },
                    {
                        "name": "_nationalID",
                        "type": "string"
                    },
                    {
                        "name": "_dateOfBirth",
                        "type": "string"
                    },
                    {
                        "name": "_placeOfBirth",
                        "type": "string"
                    },
                    {
                        "name": "_studentId",
                        "type": "string"
                    },
                    {
                        "name": "uploader",
                        "type": "string"
                    }
                ],
                "name": "addHash",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "name": "password",
                        "type": "string"
                    }
                ],
                "name": "addOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    },
                    {
                        "name": "_transaction",
                        "type": "string"
                    }
                ],
                "name": "saveTransaction",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_url",
                        "type": "string"
                    }
                ],
                "name": "setUrl",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_username",
                        "type": "string"
                    },
                    {
                        "name": "_password",
                        "type": "string"
                    }
                ],
                "name": "signupUploader",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "checkSignedBefore",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    },
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_username",
                        "type": "string"
                    }
                ],
                "name": "checkSignedupBefore",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getAge",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getDateOfBirth",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getFirstName",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getGPA",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "getHash",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getHashLength",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getLastName",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getMajor",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getNationalID",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getPlaceOfBirth",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getSex",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getStudentId",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getTransactions",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_hash",
                        "type": "string"
                    }
                ],
                "name": "getUniversityName",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getUrl",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "_address",
                        "type": "address"
                    }
                ],
                "name": "signinAdmin",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]
     const contract =  this.web3.eth.contract(abi);
const privateKey = "EEFD9B722FDB3186875E521C87745DC102ABE04A944BCC485DAB385D2949842F";
const publicKey ="0xaD3843ed864169D4e840651A49bD794F12095162";
        const smartInstance = contract.at("0xe0540eb9bc31af04fe22df0b23a6076673790a35");


//////// add raw transaction 
let data =  smartInstance.addHash.getData(String(_hash),
"muath","mohammad","25","male","3.5","cis","UniJor","9931039485","30/06/1993","Amman" , "Muath","_studentId");
let app = this;

app.web3.eth.getTransactionCount(publicKey,function(err,nonce){
let raw=app.prepairTransaction(privateKey,data,nonce);
app.web3.eth.sendRawTransaction(raw, function (err, transactionHash) {


    
    if(!err)
    
    {

        let txData = smartInstance.saveTransaction.getData(String(_hash),transactionHash);
        app.web3.eth.getTransactionCount(publicKey,function(err,nonce2){

            let rawTx=app.prepairTransaction(privateKey,txData,nonce2+1);
            app.web3.eth.sendRawTransaction(rawTx, function (err2, transactionHash2) {
if(err2)
{
    console.log("err2",err2);
    return;
}
                if(!err2)
                {
                    app.props.onUploadLoadSpiner(false);
                    JSAlert.alert(app.state.isArabic ?    (app.state.ar.uploadsucc) : (app.state.en.uploadsucc));
                    app.setState({url:false});
                    app.setState({hash_id:_hash});
                }

            });

        });

      
       
       
    }
///////// wait for transaction for be mined 
  
        
        //add transaction to save in the blockchain
      
      
    





});
});


    




}
///////

    

//     checkHash = async (event) => {   
//         try{
//             event.preventDefault();
//             const isHashTrue= await.web3.checkHash ;
      

//     } 
// }





render = ()=>{

    return (
        <div class="custom-div">
            
            <div class="box">
       <img className="img-background" style={this.backGroundStyle} src={blackBackGround}/>
       </div>
                <div className="container custom-con">
               
            
                    <form method="post" enctype="multipart/form-data">
                        <input type="file" id="files" name="files" multiple="multiple" onChange ={(e) => this.UploadToIPFS(e.target.files[0])} />
                        <p className="customP">
                            <input type="button" disabled={!this.state.btnActive} onClick={this.uploadFile}  value={ this.state.isArabic ?    (this.state.ar.uploadFile) : (this.state.en.uploadFile) }  className="btn btn-lg btn-primary btn-custom"  />
                        </p>
                        {/* <input type="text" value={this.state.hash_id} disabled={true} id="hash_id"/> */}
                        <div hidden = {this.state.url} className="qrcontainer">
                        <p className="upload-result" >{this.state.isArabic ?    (this.state.ar.copyUrl) : (this.state.en.copyUrl)} {this.state.hash_id}</p>
                       
                        <div className="col-md-12" >
                        
                        <div className="upload-result" hidden = {this.state.url}>
                  <h5>{this.state.isArabic ?    (this.state.ar.QRCode) : (this.state.en.QRCode)}</h5>
            <QRCode  className="QR" value={String(this.state.hash_id)} />
            </div>
            </div>
            </div>
                    </form>
            
                
            </div>
            
            </div>
            )
}
}

export default UploadControl;



