const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const myTokenURI =
  "https://gateway.pinata.cloud/ipfs/QmZZHUeLD1bsKHuqhyJFMKtXCJjkv1KpvtoVv5wvzCcJqJ";

describe("SuperAvocado", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBasicFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount1,otherAccount2] = await ethers.getSigners();
    const SuperAvocado = await ethers.getContractFactory("SuperAvocado");
    const superAvocado = await SuperAvocado.deploy("Super Avocado", "SAvo");
    return { superAvocado, owner, otherAccount1,otherAccount2 };
  }

  describe("Deployment and basic functionality", function () {
    it("Should be deploy and initial Token balance should be 0", async function () {
      const { superAvocado } = await loadFixture(deployBasicFixture);
      const tokenCount = await superAvocado.tokenCount();
      expect(tokenCount).eql(BigInt(0));
    });
    it("Token 0 should not exists", async function () {
      const { superAvocado } = await loadFixture(deployBasicFixture);
      await expect(superAvocado.tokenURI(0)).revertedWith(
        "TokenID does not exits"
      );
    });
    it("Get Approved should failed when requesting for token 0",async function () {
        const { superAvocado } = await loadFixture(deployBasicFixture);
        await expect(superAvocado.getApproved(0)).revertedWith(
          "TokenID does not exits"
        );
    })
  });
  describe("Minting from owner", function () {
    it("Owner should be able to mint", async function () {
      const { superAvocado } = await loadFixture(deployBasicFixture);
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
    });
    it("Token 1 token uri must match with original", async function () {
      const { superAvocado } = await loadFixture(deployBasicFixture);
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
    });
    it("Balance of Owner Address should be 1", async function () {
      const { superAvocado, owner } = await loadFixture(deployBasicFixture);
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
    });
    it("The holder of token 1 should be the Owner Address", async function () {
      const { superAvocado, owner } = await loadFixture(deployBasicFixture);
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
    });
    it("Owner can enable an operator", async function () {
        const { superAvocado, owner,otherAccount1,otherAccount2 } = await loadFixture(deployBasicFixture);
        const operator = otherAccount1;
        expect(await superAvocado.tokenCount()).eql(BigInt(0));
        await superAvocado.mint(myTokenURI);
        expect(await superAvocado.tokenCount()).eql(BigInt(1));
        expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
        expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
        expect(await superAvocado.ownerOf(1)).eql(owner.address);
        await superAvocado.approve(operator.address,1);
        expect(await superAvocado.getApproved(1)).eql(operator.address);
    });
    it("Operator can transfer NFT from Owner", async function () {
        const { superAvocado, owner,otherAccount1,otherAccount2 } = await loadFixture(deployBasicFixture);
        const operator = otherAccount1;
        expect(await superAvocado.tokenCount()).eql(BigInt(0));
        await superAvocado.mint(myTokenURI);
        expect(await superAvocado.tokenCount()).eql(BigInt(1));
        expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
        expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
        expect(await superAvocado.ownerOf(1)).eql(owner.address);
        await superAvocado.approve(operator.address,1);
        expect(await superAvocado.getApproved(1)).eql(operator.address);
        await superAvocado.connect(operator).transferFrom(owner.address,otherAccount2.address,1);
        expect(await superAvocado.balanceOf(owner)).eql(BigInt(0));
        expect(await superAvocado.balanceOf(otherAccount2)).eql(BigInt(1));
    });
  });
  describe("Interface checks", function () {
    it("Supports 0x80ac58cd", async function () {
      const { superAvocado } = await loadFixture(deployBasicFixture);
      expect(await superAvocado.supportsInterface("0x80ac58cd")).to.eql(true);
    });
    it("Supports 0x5b5e139f", async function () {
      const { superAvocado } = await loadFixture(deployBasicFixture);
      expect(await superAvocado.supportsInterface("0x5b5e139f")).to.eql(true);
    });
    it("Cheks random interface should return false -> 0x5b5e139e", async function () {
      const { superAvocado } = await loadFixture(deployBasicFixture);
      expect(await superAvocado.supportsInterface("0x5b5e139e")).to.eql(false);
    });
  });
});
