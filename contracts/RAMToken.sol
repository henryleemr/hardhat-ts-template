pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RAMToken is ERC20 {
    constructor(address _ico, uint256 _initialSupply) ERC20("RAMToken", "RAM") {
        _mint(msg.sender, _initialSupply);
    }
}
