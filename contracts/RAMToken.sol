pragma solidity 0.7.6;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RAMToken is ERC20 {
  constructor(address _ico, uint _initialSupply) ERC20("RAMToken", "RAM") {
    _mint(_ico, _initialSupply);
  }
}
