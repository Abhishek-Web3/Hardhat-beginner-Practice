const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Token Contract", function(){

    it("Once Deployed, owner should have 1000 tokens", async function(){
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hhtoken =await Token.deploy();
        const ownerBalance = await hhtoken.balanceOf(owner.address);
        expect(await hhtoken.totalTokenSupply()).to.equal(ownerBalance);
    });

    it("should transfer token between accounts", async function(){
        const [owner, address_1, address_2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hhtoken = await Token.deploy();


        await hhtoken.transfer(address_1.address, 100);
        const bal1 = await hhtoken.balanceOf(owner.address);
        const bal2 = await hhtoken.balanceOf(address_1.address);
        expect(bal1).to.equals(900);
        expect(bal2).to.equal(100);

        // connect() -- if i want to be owner with specifc address -- by default transfer function first address will be owner

        await hhtoken.connect(address_1).transfer(address_2.address, 30);
        const bal3 = await hhtoken.balanceOf(address_1.address);
        const bal4 = await hhtoken.balanceOf(address_2.address);
        expect(bal3).to.equals(70);
        expect(bal4).to.equal(30);
    })
});