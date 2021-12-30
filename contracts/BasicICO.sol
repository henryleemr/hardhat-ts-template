pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract BasicICO is Ownable {

  address ramToken;
  uint constant MIN_ETH = 1e18;

  function withdraw(uint amount) external onlyOwner {
    require(payable(owner()).send(amount), "Insufficient balance");
  }

  function setRamToken(address _ramToken) external onlyOwner {
    ramToken = _ramToken;
  }

  receive() payable external {
    address(this).call{ value: msg.value }(abi.encodeWithSignature("buy()"));
    this.buy();
  }

  function buy() payable public {

    require(msg.value > MIN_ETH, "too low");

    uint tokenAmount = msg.value * 25;
    require(IERC20(ramToken).balanceOf(address(this)) >= tokenAmount, "Insufficient balance");

    IERC20(ramToken).transfer(tx.origin, tokenAmount);
  }
}
