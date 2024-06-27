// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
// TDD - Test Driven Development
contract Token {
    string public name = "The Abhi Token";
    string public symbol = "TAT";

    uint public totalTokenSupply = 1000;
    address public owner;

    mapping(address => uint) balances;

    constructor()
    {
        owner = msg.sender;
        balances[owner] = totalTokenSupply;
    }

    function transfer(address to, uint amount) external {
        balances[owner] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint)
    {
        return balances[account];
    }

}
