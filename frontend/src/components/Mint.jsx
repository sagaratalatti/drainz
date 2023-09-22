import './css/Mint.css'
import { useAccount, useContractWrite } from 'wagmi';
import nftAbi from '../abis/nft.json';

const Mint = () => {
    const account = useAccount({
        onConnect({address, connector, isReconnected}) {
            console.log('Connected', {address, connector, isReconnected})
        },
    });

    const { data, isLoading, isSuccess, write } = useContractWrite ({
        address: "0x07a06AD39f940a505B306b294b29390e792C3869",
        abi: nftAbi,
        functionName: 'safeMint'
    })

    return (
        <div>
            <div>
                <button className="mint-button" disabled={!write} onClick={ () => {
                    write({
                        args: [account.address],
                        from: account.address,
                     })
                }}>Mint NFT</button>
            </div>

            <div>
            {isLoading && <div style={{ fontSize: "medium" }}> Accept transaction from Wallet </div> }
            
            {isSuccess && <div style={{ fontSize: "medium" }}> 
            <a
                href={`https://sepolia.etherscan.io/tx/${data.hash}`}
                target="_blank"  // Opens in a new tab
                rel="noopener noreferrer"  // Security best practice for opening in a new tab
                style={{ color: "yellow"}}
                > Check on Sepolia Etherscan
            </a> 
            </div> }
            </div>
            
        </div>
    )
}

export default Mint;