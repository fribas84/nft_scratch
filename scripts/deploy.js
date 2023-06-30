// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {


  const superAvocado = await hre.ethers.deployContract("SuperAvocado", ["Super Avocado", "SAVO"]);
  const myTokenURI =
  "https://gateway.pinata.cloud/ipfs/QmZZHUeLD1bsKHuqhyJFMKtXCJjkv1KpvtoVv5wvzCcJqJ";

  await superAvocado.waitForDeployment();

  console.log("Contract deplot to:", superAvocado.target)};
  await superAvocado.mint(myTokenURI);

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
