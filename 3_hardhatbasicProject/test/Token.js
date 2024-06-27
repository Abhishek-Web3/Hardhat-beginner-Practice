const { expect } = require("chai");


/*  ------------- Baisc Way to achieve this -------------------------  */

/*
describe('Token Contract', function() {
    it("Deployement should assign the total supply of token tp the owner", async function(){
        const [owner] = await ethers.getSigners();
        const hardhatToken = await ethers.deployContract("Token");
        const ownerBalance = await hardhatToken.balanceof(owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async function(){
        const [owner, addr1, addr2] = await ethers.getSigners();
        const hardhatToken = await ethers.deployContract("Token");

        await hardhatToken.transfer(addr1.address, 50);
        expect(await hardhatToken.balanceof(addr1.address)).to.equal(50);

        await hardhatToken.connect(addr1).transfer(addr2.address,50);
        expect(await hardhatToken.balanceof(addr2.address)).to.equal(50);
    })
});
*/

/*------------------  Advace way to achieve this same ----------------------   */

const {
    loadFixture,
} = require ("@nomicfoundation/hardhat-toolbox/network-helpers");

describe ('Toekn Contracts', function () {
    async function deployTokenFixture() {
        const[owner, addr1, addr2] = await ethers.getSigners();
        
        const hardhatToken = await ethers.deployContract("Token");

        return {hardhatToken, owner, addr1, addr2};
    }

    it("Should assign the total supply of tokens to the owner", async function (){
        const {hardhatToken, owner} = await loadFixture(deployTokenFixture);

        const ownerBalance = await hardhatToken.balanceof(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });


  it("Should transfer tokens between accounts", async function () {
    const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
      deployTokenFixture
    );
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceof(addr1.address)).to.equal(50);

    await hardhatToken.connect(addr1).transfer(addr2.address,50);
    expect(await hardhatToken.balanceof(addr2.address)).to.equal(50);
  });

})