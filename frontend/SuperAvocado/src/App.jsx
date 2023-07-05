import { useState, useEffect  } from "react";
import { Container, H1 } from "./assets/styled";
import NFT_Card from "./components/NFT_Card.jsx";
import {ethers} from 'ethers';
import axios from 'axios';
import { Alchemy, Network } from "alchemy-sdk";


const config = {
  apiKey: import.meta.env.VITE_ALCHEMY_APIKEY,
  network: Network.MATIC_MUMBAI,
};
const initialNfts = [
  {
  "name": "Avo Run",
  "description": "Introducing Avo Run, the mighty superhero avocado with lightning-fast speed and incredible strength.",
  "image": "https://ipfs.io/ipfs/QmYnBsdFTPbWq7f4VdxzmYz7vLSLCM4o8Edm6Cw8z8hquj",
  "attributes": [
    {
      "trait_type": "Base",
      "value": "Avocado"
    },
    {
      "trait_type": "Superpower",
      "value": "Super Speed"
    },
    {
      "trait_type": "Strength",
      "value": "95"
    },
    {
      "trait_type": "Agility",
      "value": "92"
    },
    {
      "trait_type": "Endurance",
      "value": "88"
    },
    {
      "trait_type": "Intelligence",
      "value": "85"
    },
    {
      "trait_type": "Cuteness",
      "value": "95"
    },
    {
      "display_type": "boost_number",
      "trait_type": "Taste Power",
      "value": 90
    },
    {
      "display_type": "boost_percentage",
      "trait_type": "Hipster Power",
      "value": 90
    },
    {
      "display_type": "number",
      "trait_type": "Generation",
      "value": 1
    }
  ]
}
  ,
{
  "name": "Avo Run 2",
  "description": "Introducing Avo Run, the mighty superhero avocado with lightning-fast speed and incredible strength.",
  "image": "https://ipfs.io/ipfs/QmYnBsdFTPbWq7f4VdxzmYz7vLSLCM4o8Edm6Cw8z8hquj",
  "attributes": [
    {
      "trait_type": "Base",
      "value": "Avocado"
    },
    {
      "trait_type": "Superpower",
      "value": "Super Speed"
    },
    {
      "trait_type": "Strength",
      "value": "95"
    },
    {
      "trait_type": "Agility",
      "value": "92"
    },
    {
      "trait_type": "Endurance",
      "value": "88"
    },
    {
      "trait_type": "Intelligence",
      "value": "85"
    },
    {
      "trait_type": "Cuteness",
      "value": "95"
    },
    {
      "display_type": "boost_number",
      "trait_type": "Taste Power",
      "value": 90
    },
    {
      "display_type": "boost_percentage",
      "trait_type": "Hipster Power",
      "value": 90
    },
    {
      "display_type": "number",
      "trait_type": "Generation",
      "value": 1
    }
  ]
},
{
  "name": "Avo Run 3",
  "description": "Introducing Avo Run, the mighty superhero avocado with lightning-fast speed and incredible strength.",
  "image": "https://ipfs.io/ipfs/QmYnBsdFTPbWq7f4VdxzmYz7vLSLCM4o8Edm6Cw8z8hquj",
  "attributes": [
    {
      "trait_type": "Base",
      "value": "Avocado"
    },
    {
      "trait_type": "Superpower",
      "value": "Super Speed"
    },
    {
      "trait_type": "Strength",
      "value": "95"
    },
    {
      "trait_type": "Agility",
      "value": "92"
    },
    {
      "trait_type": "Endurance",
      "value": "88"
    },
    {
      "trait_type": "Intelligence",
      "value": "85"
    },
    {
      "trait_type": "Cuteness",
      "value": "95"
    },
    {
      "display_type": "boost_number",
      "trait_type": "Taste Power",
      "value": 90
    },
    {
      "display_type": "boost_percentage",
      "trait_type": "Hipster Power",
      "value": 90
    },
    {
      "display_type": "number",
      "trait_type": "Generation",
      "value": 1
    }
  ]
}];

function App() {
  const [nftsState, setNftsState] = useState(initialNfts);
  const [address,setAddress] = useState("0xf8e9d61f2e7acf9ba77eea5b353e6b6bb2ff0826");
  const [nftsA, setNftsA] = useState(initialNfts);
  
  useEffect(() => {
    const getData = async ()=>{
      const omitMetadata = false;
      const alchemy = new Alchemy(config);
      const {nfts} = await alchemy.nft.getNftsForContract(address, {
        omitMetadata: omitMetadata,
      });
      console.log(nfts);
      setNftsA(nfts);
    }
    getData()
  }, [])
  

  return (
    <Container>
      <H1>Super Avocado NFT Collection!</H1>
      <div className="w-full flex flex-row flex-wrap justify-center">
      {nftsA.map((nft, i) => 
          <NFT_Card nft={nft.rawMetadata} key={i}
          />
        )
      }
      </div>
      
    </Container>
  )
}

export default App
