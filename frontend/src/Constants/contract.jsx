import { erc721ABI } from "wagmi";

export const nftContractConfig = {
    address: '0x07a06AD39f940a505B306b294b29390e792C3869', 
    abi: erc721ABI
}

export const batchTransferContractConfig = {
    address: '0x04204e4f12b1Ddd46C2c78b6B284b1992c1a653d',
    abi: [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "InvalidArguments",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidCaller",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "NotOwnerOfToken",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "contractAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "BatchTransferToMultiple",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "contractAddress",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "BatchTransferToSingle",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC721",
                    "name": "erc721Contract",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "tos",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "tokenIds",
                    "type": "uint256[]"
                }
            ],
            "name": "batchTransferToMultipleWallets",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC721",
                    "name": "erc721Contract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "tokenIds",
                    "type": "uint256[]"
                }
            ],
            "name": "batchTransferToSingleWallet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC721",
                    "name": "erc721Contract",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "tos",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "tokenIds",
                    "type": "uint256[]"
                }
            ],
            "name": "safeBatchTransferToMultipleWallets",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IERC721",
                    "name": "erc721Contract",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "tokenIds",
                    "type": "uint256[]"
                }
            ],
            "name": "safeBatchTransferToSingleWallet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}