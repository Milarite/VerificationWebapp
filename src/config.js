import Web3 from 'web3';
import ethTx from 'ethereumjs-tx';
import Ethereum from "ethers-wallet";
import ipfsAPI from 'ipfs-api';

const contractAddress = "0xb67456c033d5cb91fe005bfa69dfe71211494fe4";

const privateKey = "EEFD9B722FDB3186875E521C87745DC102ABE04A944BCC485DAB385D2949842F";
const publicKey ="0xaD3843ed864169D4e840651A49bD794F12095162";

const abi = [
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
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "getAllInformation",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32"
			},
			{
				"name": "",
				"type": "bytes32[9]"
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
		"constant": false,
		"inputs": [
			{
				"name": "tx",
				"type": "string"
			},
			{
				"name": "_hash",
				"type": "string"
			},
			{
				"name": "_firstName",
				"type": "bytes32"
			},
			{
				"name": "_lastName",
				"type": "bytes32"
			},
			{
				"name": "_age",
				"type": "bytes32"
			},
			{
				"name": "_sex",
				"type": "bytes32"
			},
			{
				"name": "_gpa",
				"type": "bytes32"
			},
			{
				"name": "_major",
				"type": "bytes32"
			},
			{
				"name": "_universityName",
				"type": "bytes32"
			},
			{
				"name": "_nationalID",
				"type": "bytes32"
			},
			{
				"name": "_dateOfBirth",
				"type": "bytes32"
			},
			{
				"name": "_placeOfBirth",
				"type": "bytes32"
			},
			{
				"name": "uploader",
				"type": "bytes32"
			}
		],
		"name": "addHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"name": "addOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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

const getIpfs= () =>{
    let ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});

    return ipfs;

}


const getWeb3 = () => {
    const web3 =new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/afbac1a223484d84a7784a133d1f2010"));
return  web3;
}

const init = ()=>{
const contract =  getWeb3().eth.contract(abi);
const smartContract = contract.at(contractAddress);
return smartContract;
}

const prepairTransaction  = (privateKey,data,nonce) => {
    let currentWeb3 = getWeb3();
    
              
        var txParams ={ 
            data : data,
            nonce : nonce,
            gasPrice :currentWeb3.toHex(currentWeb3.toWei('20', 'gwei')),
            to : '0xd107ad248e9d268b7f65870d988b616fb2bacc8a',
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

const createWallet = (_username,_password) => {
const wallet  = Ethereum.Wallet.fromBrainWallet(_username,_password);

return wallet;





}




const config  ={

    web3 : getWeb3,
    abi:abi,
    privateKey:privateKey,
    publicKey:publicKey,
    contractAddress:contractAddress,
    
    init : init,
    prepairTransaction : prepairTransaction,
    createWallet:createWallet,
    getIpfs:getIpfs
}




export default config;

