const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
 

const myTokenURI =
  "https://gateway.pinata.cloud/ipfs/QmZZHUeLD1bsKHuqhyJFMKtXCJjkv1KpvtoVv5wvzCcJqJ";

describe("SuperAvocado", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBasicFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount1, otherAccount2] = await ethers.getSigners();
    const SuperAvocado = await ethers.getContractFactory("SuperAvocado");
    const superAvocado = await SuperAvocado.deploy("Super Avocado", "SAvo");
    return { superAvocado, owner, otherAccount1, otherAccount2 };
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
    it("Get Approved should failed when requesting for token 0", async function () {
      const { superAvocado } = await loadFixture(deployBasicFixture);
      await expect(superAvocado.getApproved(0)).revertedWith(
        "TokenID does not exits"
      );
    });
  });
  describe("Minting and transfers", function () {
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
      const { superAvocado, owner, otherAccount1, otherAccount2 } =
        await loadFixture(deployBasicFixture);
      const operator = otherAccount1;
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await superAvocado.approve(operator.address, 1);
      expect(await superAvocado.getApproved(1)).eql(operator.address);
    });
    it("Owner can enable an operator for all", async function () {
      const { superAvocado, owner, otherAccount1, otherAccount2 } =
        await loadFixture(deployBasicFixture);
      const operator = otherAccount1;
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await superAvocado.setApprovalForAll(operator.address, true);
      expect(
        await superAvocado.isApprovedForAll(owner.address, operator.address)
      ).eql(true);
    });
    it("Owner can disable an operator for all", async function () {
      const { superAvocado, owner, otherAccount1, otherAccount2 } =
        await loadFixture(deployBasicFixture);
      const operator = otherAccount1;
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await superAvocado.setApprovalForAll(operator.address, true);
      expect(
        await superAvocado.isApprovedForAll(owner.address, operator.address)
      ).eql(true);
      await superAvocado.setApprovalForAll(operator.address, false);
      expect(
        await superAvocado.isApprovedForAll(owner.address, operator.address)
      ).eql(false);
    });
    it("Operator can transfer NFT from Owner", async function () {
      const { superAvocado, owner, otherAccount1, otherAccount2 } =
        await loadFixture(deployBasicFixture);
      const operator = otherAccount1;
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await superAvocado.approve(operator.address, 1);
      expect(await superAvocado.getApproved(1)).eql(operator.address);
      await superAvocado
        .connect(operator)
        .transferFrom(owner.address, otherAccount2.address, 1);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(0));
      expect(await superAvocado.balanceOf(otherAccount2)).eql(BigInt(1));
    });
    it("Operator can transfer NFT from Owner when is approved for all", async function () {
      const { superAvocado, owner, otherAccount1, otherAccount2 } =
        await loadFixture(deployBasicFixture);
      const operator = otherAccount1;
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await superAvocado.setApprovalForAll(operator.address, true);
      expect(
        await superAvocado.isApprovedForAll(owner.address, operator.address)
      ).eql(true);
      await superAvocado
        .connect(operator)
        .transferFrom(owner.address, otherAccount2.address, 1);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(0));
      expect(await superAvocado.balanceOf(otherAccount2)).eql(BigInt(1));
    });
    it("Operator can't transfer NFT from Owner", async function () {
      const { superAvocado, owner, otherAccount1, otherAccount2 } =
        await loadFixture(deployBasicFixture);
      const operator = otherAccount1;
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await expect(
        superAvocado
          .connect(operator)
          .transferFrom(owner.address, otherAccount2.address, 1)
      ).revertedWith("Msg.sender is not the owner or approved for operation.");
    });
    it("Owner can transfer to another account ", async function () {
      const { superAvocado, owner, otherAccount1 } = await loadFixture(
        deployBasicFixture
      );

      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await superAvocado.transferFrom(owner.address, otherAccount1.address, 1);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(0));
      expect(await superAvocado.balanceOf(otherAccount1)).eql(BigInt(1));
    });
  });
  describe("Safe transfers from", function () {
    it("can do a safe transfer with data", async function () {
      const { superAvocado, owner, otherAccount1, otherAccount2 } =
        await loadFixture(deployBasicFixture);
      const operator = otherAccount1;
    

      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await superAvocado.setApprovalForAll(operator.address, true);
      expect(
        await superAvocado.isApprovedForAll(owner.address, operator.address)
      ).eql(true);
      await superAvocado
        .connect(operator)
        .safeTransferFrom(owner.address, otherAccount2.address, 1, ethers.randomBytes(8));
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(0));
      expect(await superAvocado.balanceOf(otherAccount2)).eql(BigInt(1));
    });
    it("can do a safe transfer without data", async function () {
      const { superAvocado, owner, otherAccount1, otherAccount2 } =
        await loadFixture(deployBasicFixture);
      const operator = otherAccount1;
      expect(await superAvocado.tokenCount()).eql(BigInt(0));
      await superAvocado.mint(myTokenURI);
      expect(await superAvocado.tokenCount()).eql(BigInt(1));
      expect(await superAvocado.tokenURI(1)).eql(myTokenURI);
      expect(await superAvocado.balanceOf(owner)).eql(BigInt(1));
      expect(await superAvocado.ownerOf(1)).eql(owner.address);
      await superAvocado.setApprovalForAll(operator.address, true);
      expect(
        await superAvocado.isApprovedForAll(owner.address, operator.address)
      ).eql(true);
      await superAvocado
        .connect(operator)
        .safeTransferFrom(owner.address, otherAccount2.address, 1);
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
