import React , {Component} from 'react'
import Web3 from 'web3';
import ethTx from 'ethereumjs-tx';

class Explore extends Component {
    web3 =  null;
    constructor(props){
        super(props);
        this.web3 =  new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/afbac1a223484d84a7784a133d1f2010"));
        this.state = {hash : "",url : "" , show : false};
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

//let data = smartInstance.getTransactions.getData(_hash);

let txHash = smartInstance.getTransactions.call(this.state.hash);
if(txHash){
   
   this.setState({txHash:txHash, show:true});
    
}

    }

    render(){
        return (<div>
            <div className="container">
    <br/>
	<div className="row justify-content-center search-box">
                        <div className="col-12 col-md-10 col-lg-8">
                                <div className="card-body row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <i className="fas fa-search h4 text-body"></i>
                                    </div>
                                    <div className="col">
                                        <input onChange={this.setHash} className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords"/>
                                    </div>
                                    <div className="col-auto">
                                        <button onClick={this.searchForHash} className="btn btn-lg btn-success" type="submit">Search</button>
                                    </div>
                                </div>
                                <a hidden={!this.state.show} href={`https://rinkeby.etherscan.io/tx/${this.state.txHash}`}>{this.state.hash}</a>
                        </div>
                      
                        
                    </div>
</div>
        </div>)
    }
}

export default Explore;