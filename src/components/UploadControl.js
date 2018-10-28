import React , {Component} from 'react';
import Web3 from 'web3';
import IPFS from 'ipfs';
import ethTx from 'ethereumjs-tx';


import ipfsAPI  from 'ipfs-api';
import bufferFrom  from 'buffer-from';

class UploadControl extends Component{
     web3 =  null;
     

    reader = null;
    constructor(props){
super(props);
this.reader= new FileReader(); 
this.web3 =  new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/afbac1a223484d84a7784a133d1f2010"));
this.state = {btnActive : false}
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
        let file = this.reader.result;
        
        
         let fileBuffered = Buffer.from(file);
        //console.log("FILE BUFFERED",fileBuffered);
        let ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})
        ipfs.files.add(fileBuffered, (err, result) => { // Upload buffer to IPFS
            if(err) {
              console.error(err)
              return;
            }

            console.log(result);
           this.SaveToBlockChain (result[0].hash);
        });


        
    }


    //////// PREPARE BLOCKCHAIN TRANSACTION

    prepairTransaction  = (privateKey,data,nonce) => {
        let currentWeb3 = this.web3;
        
                  
            var txParams ={ 
                data : data,
                nonce : nonce,
                gasPrice :currentWeb3.toHex(currentWeb3.toWei('20', 'gwei')),
                to : '0xefbd0f9fb54c229fc7644781bb5478384d40f824',
                value : 0,
                gasLimit: 1000000
                
        
            }
            const tx = new ethTx(txParams);
            const privKey = Buffer.from(privateKey, 'hex');
            tx.sign(privKey);
            const serializedTx = tx.serialize();
            const rawTx = '0x' + serializedTx.toString('hex');
            console.log(rawTx);
           
return rawTx ;
    
    }
    //// END 

    SaveToBlockChain = (_hash) =>{
        let abi=[
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_hash",
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
                "constant": true,
                "inputs": [
                    {
                        "name": "_hast",
                        "type": "string"
                    }
                ],
                "name": "checkHashExsist",
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
            }
        ]
     const contract =  this.web3.eth.contract(abi);
const privateKey = "EEFD9B722FDB3186875E521C87745DC102ABE04A944BCC485DAB385D2949842F";
const publicKey ="0xaD3843ed864169D4e840651A49bD794F12095162";
        const smartInstance = contract.at("0xefbd0f9fb54c229fc7644781bb5478384d40f824");
console.log("web3",this.web3);


//////// add raw transaction 
let data =  smartInstance.addHash.getData(String(_hash));
let app = this;
app.web3.eth.getTransactionCount(publicKey,function(err,nonce){
let raw=app.prepairTransaction(privateKey,data,nonce);
console.log('raw',raw);
app.web3.eth.sendRawTransaction(raw, function (err, transactionHash) {
if(err)
console.log("err1",err);
if(!err)

{
    
    
///////// wait for transaction for be mined 
  
        
        //add transaction to save in the blockchain
      let savedData=  smartInstance.saveTransaction.getData(String(_hash),transactionHash);
      
      app.web3.eth.getTransactionCount(publicKey,function(err,nonce2){
        let raw2=app.prepairTransaction(privateKey,savedData,nonce2+1);
        app.web3.eth.sendRawTransaction(raw2, function (err, transactionHash2) {
    if(err)
    console.log("err2",err);
    if(!err)
    
    {
        alert("done!");
    }
      

        
      })
    });
}





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
        <div >
        
                <div className="container">
                <div className="col-md-4"></div>
                <div className="col-md-4 center" >
                    <form method="post" enctype="multipart/form-data">
                        <input type="file" id="files" name="files" multiple="multiple" onChange ={(e) => this.UploadToIPFS(e.target.files[0])} />
                        <p className="customP">
                            <input type="button" disabled={!this.state.btnActive} onClick={this.uploadFile}  value="Upload Files" className="btn btn-lg btn-primary"  />
                        </p>
                    </form>
                </div>
                <div className="col-md-4"></div>    
            </div>
            </div>
            )
}
}

export default UploadControl;


//     const promise= new Promise((resolve,reject)=>{
//         if(true){
//             resolve('resolved');
//         }
//         reject('broke');
//     }
//     )
// promise.then(result=>console.log(result));
