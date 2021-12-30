pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    constructor() ERC721("MaxNFT", "MAX") {}

    function mint(uint256, _tokenId) public {
        _safeMint(msg.sender, _tokenId);
    }
}
