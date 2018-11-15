import React , {Component} from 'react'
import Web3 from 'web3';
import ethTx from 'ethereumjs-tx';
import Loadable from 'react-loading-overlay';
import background from './blockchain-gif.gif';

class Explore extends Component {
    web3 =  null;
    backGroundStyle = {
        width:"500px",
        height:"400px",
        marginLeft: "-150px",
        marginRight : "auto",
        float:"left"
        
    
    }
    constructor(props){
        super(props);
        this.web3 =  new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/afbac1a223484d84a7784a133d1f2010"));
        this.state = {hash : "",url : "" , show : false,
        _age: "", _sex: "", _gpa :"",_major : "",_universityName :"",_nationalID:"",_dateOfBirth:"",_placeOfBirth:"",
        showInfo:false,txHash:"",

        ar :{ Search :"البحث" , txInformation :"معلومات الحركة", VerfiedCertificate:"الشهادة الموثقة",textSearch:"البحث" },

        en : {Search :"Search" ,txInformation :"Transaction Information",VerfiedCertificate:"Verfied certificate",textSearch:"search topic or keywords"},

        isArabic : false


        
    
    
    
    
    
    };
   
    
    }

    setHash = (y) =>{
        this.setState({hash:y.target.value});
        
        
    }
    searchForHash= (_hash)=>{
        
       
       
        
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
            },
            {
                "constant": true,
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
                "name": "signinUploader",
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
        const smartInstance = contract.at("0xd107ad248e9d268b7f65870d988b616fb2bacc8a");

//let data = smartInstance.getTransactions.getData(_hash);
let txHash = smartInstance.getTransactions.call(this.state.hash);
let _dateOfBirth=smartInstance.getDateOfBirth.call(this.state.hash);
let _placeOfBirth=smartInstance.getPlaceOfBirth.call(this.state.hash);
let _nationalID=smartInstance.getNationalID.call(this.state.hash);
let _universityName=smartInstance.getFirstName.call(this.state.hash);
let _major=smartInstance.getMajor.call(this.state.hash);
let _gpa =smartInstance.getGPA.call(this.state.hash);
let _age = smartInstance.getAge.call(this.state.hash);
let _sex=smartInstance.getSex.call(this.state.hash);
let _firstName=smartInstance.getFirstName.call(this.state.hash);
let _lastName=smartInstance.getLastName.call(this.state.hash);
let _name=_firstName +" "+_lastName;





if(txHash){
    this.setState({
        txHash : txHash,
    _dateOfBirth:_dateOfBirth,
    _placeOfBirth:_placeOfBirth,
    _nationalID:_nationalID,
    _universityName:_universityName,
    _major:_major,
    _gpa:_gpa,
    _age:_age,
    _sex:_sex,
    _name:_name,
    showInfo :true 
    
    
    
    })
    
   this.setState({hash:txHash, show:true});
 
   
    
}

    }

    render(){
        return (<div>
            <p className="title">
            {this.state.isArabic ?    (this.state.ar.VerfiedCertificate) : (this.state.en.VerfiedCertificate)}
            </p>
            <Loadable
             active ={this.state.IsActive}
             spinner
       text='Loading your content...'
       >
            <div className="container">
    <br/>
	<div className="row justify-content-center search-box">
                        <div className="col-12 col-md-10 col-lg-8">
                                <div className="card-body row no-gutters align-items-center">
                                 
                                    <div className="col">
                                        <input onChange={this.setHash} className="form-control form-control-lg form-control-borderless" type="search" placeholder={this.state.isArabic ?    (this.state.ar.textSearch) : (this.state.en.textSearch)}
                                 />
                                    </div>
                                    <div className="col-auto">
                                        <button onClick={this.searchForHash} className="btn btn-lg btn-success" type="submit">{this.state.Search ?    (this.state.ar.Search) : (this.state.en.Search)}</button>
                                    </div>
                                </div>
                                <div class='tx'>
                                <a hidden={!this.state.show} style={{color:"black"}} href={`https://rinkeby.etherscan.io/tx/${this.state.txHash}`}>{ this.state.isArabic ?    (this.state.ar.txInformation) : (this.state.en.txInformation) }</a>
                                </div>
                        
                                <div className="info"  hidden={!this.state.showInfo}>
                                <table className="table table-dark custom-table">
                                <thead>
                                   <th></th>
                                </thead>
                                    <tr>
                      <td><p> Name </p></td>
                      <td><p>{this.state._name}</p></td>
                      </tr>
                      
                      <tr>
                      <td> <p>Age </p></td>
                      <td> <p>{this.state._age}</p></td>
                      </tr>
                      <tr>
                      <td><p>Sex </p></td>
                      <td><p>{this.state._sex}</p> </td>
                      </tr>
                      <tr>
                      <td><p>GPA </p></td>
                      <td><p>{this.state._gpa}</p></td>
                      </tr>
                      <tr>
                      <td><p>Major</p></td>
                      <td><p>{this.state._major}</p></td>
                      </tr>
                      <tr>
                      <td><p>University Name</p></td>
                      <td><p>{this.state._universityName}</p></td>
</tr>
<tr>
    
                      <td><p>National ID</p></td>
                      <td><p>{this.state._nationalID}</p></td>
    </tr>
    <tr>

    
                      <td><p>Date Of Birth</p></td>
                      <td><p>{this.state._dateOfBirth}</p></td>
                      </tr>
                      <tr>
                      <td><p>Place Of Birth</p></td>
                      <td><p>{this.state._placeOfBirth}</p></td>
</tr>
                      
                      </table>
                      
                      </div>
                        
                    </div>
                        </div>
                      
</div>
</Loadable>
        </div>)
    }
}

export default Explore;