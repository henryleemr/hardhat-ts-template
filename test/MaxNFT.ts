import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";

import { ethers } from "hardhat";
import { MaxNFT, MaxNFT__factory } from "../typechain";


describe("MaxNFT", async () => {
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;

    let nft: MaxNFT;

    beforeEach(async () => {
        [owner, alice] = await ethers.
            getSigner();

        const MAXNFT = (await ethers.getContractFactory(
            "MaxNFT"
        )) as MaxNFT__factory;
        nft = await MAXNFT.deploy();
    });


    it("Should have the correct name"),
        async () => {
            expect(await nft.name()).to.eq
                ("MaxNFT");
        });



it("Should be able to mint", async () => {
    await nft.
    })


});