const { expect } = require("chai")
const { ethers } = require("hardhat")


describe("SimpleToken", () => {

    let token;
    let owner;
    let alice;
    let bob;

    // 'beforeEach' instead of 'before' would reinitiate the state
    beforeEach(async () => {
        // Return account object
        [owner, alice, bob] = await ethers.getSigners();

        console.log(`
        owner: ${owner.address},
        alice: ${alice.address},
        bob: ${bob.address}`
        )

        // The funiton 'deploy' will call the constructor in the contract, and the owner would be the sender's address
        const SimpleToken = await ethers.
            getContractFactory("SimpleToken");
        token = await SimpleToken.deploy("100")
    })



    it("Should deploy successfully", async () => {
        const SimpleToken = await ethers.
            getContractFactory("SimpleToken");
        const token = await SimpleToken.deploy("100");

        console.log("Contract address", token.address)
            ;

        expect(token.address).to.not.equal
            ("0x0000000000000000000000000000000000000000")
    })



    it("Should have the correct owner", async () => {
        expect(await token.owner()).to.equal(owner.address)

    })


    it("Should transfer the correct amount", async () => {
        await token.transfer(alice.address, 10);

        expect(await token.balances(owner.address)).to.eq("90");
        expect(await token.balances(alice.address)).to.eq("10");

    })


    it("Should mint the correct amount", async () => {
        await token.connect(owner).mint(alice.address, 10);
        expect(await token.balances(alice.address)).to.eq("10");

    })


    it("Should have the correct balance", async () => {

        await token.transfer(alice.address, 10);
        await token.connect(alice).transfer(bob.address, 5);

        expect(await token.connect(alice).myBalance()).to.equal("5");
        expect(await token.connect(bob).myBalance()).to.equal("5");

    })





})

