# NFT Scratch

This is a custom implementation of [EIP-721] (https://eips.ethereum.org/EIPS/eip-721)

The basic idea of this project is just educational puporses and is not suitable for production.

Coverage test is 100% but it has somo limitations:
- Safe transfer is hardcoded it doesn't check the implementation
- supportsInterface function is removed from ERC721 and is only in the SuperAvocado contract. 

## How to install and run the project
Install dependencies: `npm install`
Run tests: `npx hardhat test`



