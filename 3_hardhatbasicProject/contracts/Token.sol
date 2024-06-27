//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Token {
    string public name ="My Hardhat Token";
    string public symbol = "MHT";
    uint256 public totalSupply = 10000;

    address public owner;

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);


    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address _to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough Toekn for this Trabsaction");

        balances[msg.sender] -= amount;
        balances[_to] += amount;

        emit Transfer(msg.sender, _to, amount);
    }

    function balanceof(address _account) external view returns (uint256) {
        return(balances[_account]);
    }

}
