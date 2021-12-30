import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { connect } from "http2";
import { MaxNFT, MaxNFT__factory } from "../typechain";

describe("MaxNFT", async () => {
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;

  let nft: MaxNFT;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    const MAXNFT = (await ethers.getContractFactory(
      "MaxNFT"
    )) as MaxNFT__factory;
    nft = await MAXNFT.deploy();
  });

  it("Should have the correct name", async () => {
    expect(await nft.name()).to.eq("MaxNFT");
  });

  it("Should be able to mint", async () => {
    await nft.connect(alice).mint(5);

    expect(await nft.ownerOf(5)).to.eq(alice.address);

    await expect(nft.connect(bob).mint(5)).to.be.revertedWith(
      "ERC721: token already minted"
    );
  });

  it("Should be able to set the correct baseURI", async () => {
    await nft.setBaseURI("../contracts/images/");
    await nft.mint(1);

    expect(await nft.tokenURI(1)).to.eq("../contracts/images/1.png");
  });
});
