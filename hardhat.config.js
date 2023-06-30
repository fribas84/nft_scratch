require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + "/.env" });


const { MUMBAI_ALCHEMY, MUMBAI_PRIVATE, POLYGONAPISCAN } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings:{
      optimizer:{
        enabled:true,
        runs:1000
      }
    }
  },
  gasReporter:{
    enabled:true,
  },
  networks: {
    mumbai: {
      url: MUMBAI_ALCHEMY,
      accounts: [MUMBAI_PRIVATE],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONAPISCAN,
    },
  }
};
