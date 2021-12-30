pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MaxNFT is ERC721 {
    constructor() ERC721("MaxNFT", "MAX") {}

    function mint(uint256 _tokenId) public {
        _safeMint(msg.sender, _tokenId);
    }

    function setBaseURI(string memory _baseURI) public {
        _setBaseURI(_baseURI);
    }

    // function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    //   string memory tokenURI = ERC721.tokenURI(tokenId);

    //   return string(abi.encodePacked(tokenURI, ".png"));
    // }
}
