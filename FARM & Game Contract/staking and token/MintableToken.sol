// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintableToken is ERC20Burnable, Ownable {
    mapping(address => bool) minters;
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function setMinter(address _address, bool _approved) public onlyOwner {
        minters[_address] = _approved;
    }

    function mint(address _to, uint256 _amount) public {
        require(minters[msg.sender] || msg.sender == owner(), 'Not allowed');
        _mint(_to, _amount);
    }
}