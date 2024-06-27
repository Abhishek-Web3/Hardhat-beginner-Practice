const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("ERC20 smart contract testing", function() {
    let token;
    let accounts;
    const amount = ethers.utils.parseEther("1");
    // this line will take input in  str formate and convert to ether/wei formate
    
    before(async() => { 
        // deplye -- once we click the deply button in remox , deployed - measn once we getting something the terminal
        const contract = await ethers.getContractFactory("ICO");  //fetch the abi 
        token = await contract.deploy();  //contractc deployement process
        accounts = await ethers.getSigners();
        await token.deployed();
    })

    it("assigns initial balance", async function(){
        const totalSupply = await token.totalSupply();
        // accounts[0].address   -- address of owner
        expect(await token.balanceOf(accounts[0].address)).to.equal(totalSupply);
    })

    it("Do not have permission to mint tokens", async function(){
        const wallet = await token.connect(accounts[2]);
        // we make a faulty / invalid trasaction and revert the transaction
        await expect(wallet.mint(accounts[2].address, amount)).to.be.reverted;
    })

    it("Do not have permission to burn tokens", async function(){
        const wallet = await token.connect(accounts[2]);
        // we make a faulty / invalid trasaction and revert the transaction
        await expect(wallet.burn(accounts[2].address, amount)).to.be.reverted;
    })

    it("Buy token with Eher", async function(){
        const wallet = token.connect(accounts[2]);
        const option = {value:amount}; //msg.value in remix
        const calculate = (option.value).mul(1000); // 1000 is declared in smart contract
        // msg.value*1000
        await wallet.buy(option);
        expect (await wallet.balanceOf(accounts[2].address)).to.equal(calculate);
        /**
         * account - 2 -- in the beggining will be empty
         * once you buy a certaian amount of erc token  
         */
    });

    it("You don't have permission  to withdra ether from contract", async function(){
        const wallet = token.connect(accounts[2]);
        // withdraw the amount from smart contract --
        await expect(wallet.withdraw(amount)).to.be.reverted;
    });

    it("transfer amount to certain destination account",async function(){
        await token.transfer(accounts[1].address, amount);
        expect(await token.balanceOf(accounts[1].address)).to.equal(amount);
    });

    it('can not transfer above the amount', async function(){
        const wallet = token.connect(accounts[3]);
        // transfer 3 accounts to 1 accont
        await expect(wallet.transfer(accounts[1].address, 2)).to.be.reverted;
    });

    it('can not transfer from an empty account', async function(){
        const wallet = token.connect(accounts[3]);
        // transfer 3 accounts to 1 accont
        await expect(wallet.transfer(accounts[1].address, 2)).to.be.reverted;
    });

    it("test minting token", async function(){
        // accounts[0]  -  means owner address and noly owner can make it
        const before_mint = await token.balanceOf(accounts[0].address);
        await token.mint(accounts[0].address,amount);
        const after_mint = await token.balanceOf(accounts[0].address);
        expect (after_mint).to.equal((before_mint.add(amount)));
    });

    it("test to burn token", async function(){
        const before_burn = await token.balanceOf(accounts[0].address);
        await token.burn(accounts[0].address,amount);
        const after_burn = await token.balanceOf(accounts[0].address);
        expect (after_burn).to.equal((before_burn.sub(amount)));
    });


    it("withdraw ether from smart cintracts", async function() {
        const before_withdraw = await accounts[0].getBalance();
        await token.withdraw(amount);
        const after_withdraw = await accounts[0].getBalance();
        // expect (after_withdraw).to.equal(before_withdraw.add(amount));
        expect (before_withdraw.lt(after_withdraw)).to.equal(true);
    });

    it("do not ahve enough ether to buy token ", async function(){
        const wallet = token.connect(accounts[3]);
        const big_amount = ethers.utils.parseEther("9999");
        const option = {value:big_amount};
        let error; 

        try {
            await wallet.buy(option);
        } catch(err) {
            error = "sender  does not have enough balance";
        }

        expect(error).to.equal("sender  does not have enough balance");
    })
})