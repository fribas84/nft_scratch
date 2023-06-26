const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  
  const myTokenURI = "https://gateway.pinata.cloud/ipfs/QmZZHUeLD1bsKHuqhyJFMKtXCJjkv1KpvtoVv5wvzCcJqJ";

  describe("SuperAvocado", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployBasicFixture() {
            
  
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const SuperAvocado = await ethers.getContractFactory("SuperAvocado");
      const superAvocado = await SuperAvocado.deploy("Super Avocado", "SAvo");

  
      return { superAvocado, owner, otherAccount };
    }
  
    describe("Deployment and basic functionality", function () {
      it("Should be deploy and initial Token balance should be 0", async function () {
        const {superAvocado} = await loadFixture(deployBasicFixture);
        const tokenCount  = await superAvocado.tokenCount();
        expect(tokenCount).eql(BigInt(0));
      });
      it("Token 0 should not exists", async function () {
        const {superAvocado} = await loadFixture(deployBasicFixture);
        await expect(superAvocado.tokenURI(0)).revertedWith("TokenID does not exits");
      })

      
    });
  });
  