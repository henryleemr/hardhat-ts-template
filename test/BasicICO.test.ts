import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { BasicICO, BasicICO__factory, RAMToken, RAMToken__factory } from "../typechain";

describe("BasicICO", async () => {
  
  let owner: SignerWithAddress;
  let alice: SignerWithAddress;

  let ico: BasicICO;
  let ramToken: RAMToken;

  beforeEach(async () => {
    [owner, alice] = await ethers.getSigners();

    const ICO = await ethers.getContractFactory("BasicICO") as BasicICO__factory;
    ico = await ICO.deploy();

    const RAM = await ethers.getContractFactory("RAMToken") as RAMToken__factory;
    ramToken = await RAM.deploy(ico.address, parseEther("1000"));
    await ico.setRamToken(ramToken.address);
  })

  it("Should buy the correct amount", async () => {

    await ico.connect(alice).buy({ value: parseEther("1.000001") });

    // await alice.sendTransaction({
    //   value: parseEther("1.000000001"),
    //   to: ico.address 
    // });
    
    expect(await ramToken.balanceOf(alice.address)).to.eq(parseEther("25"));
  })
})
