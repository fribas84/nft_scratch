import { useState  } from "react";
import { Container, H1 } from "./assets/styled";
import NFT_Card from "./components/NFT_Card.jsx";
import {ethers} from 'ethers';
const axios = require('axios');

function App() {
  const [nfts, setNfts] = useState(initialNfts);

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
  return (
    <Container>
      <H1>Super Avocado NFT Collection!</H1>
      <div className="w-full flex flex-row flex-wrap justify-center">
      {nfts.map((nft, i) => 
          <NFT_Card nft={nft} key={i}
          />
        )
      }
      </div>
      
    </Container>
  )
}

export default App
