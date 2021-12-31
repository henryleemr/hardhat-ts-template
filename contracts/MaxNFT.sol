pragma solidity 0.7.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract MaxNFT is ERC721, Ownable {
    uint256 constant price = 1e15; //0.001

    mapping(address => bool) whitelists;
    // Phase 1: freemint whitelist
    // Phase 2: private sale
    // Phase 3: public sale
    // Phase 4: reveal
    uint256 constant LAST_PHASE = 3;
    uint8 currentPhase;

    constructor() ERC721("MaxNFT", "MAX") {}

    function mint(uint256 _tokenId) public payable {
        uint256 _price = price;

        if (currentPhase == 0) {
            _price = 0;
            whitelists[msg.sender] = false; // So that whitelistees can only mint once
        }
        require(whitelists[msg.sender], "User not whitelisted");
        _safeMint(msg.sender, _tokenId);
        // require(msg.value == price, "invalid vlaue");
        // _safeMint(msg.sender, _tokenId);
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function addWhitelist(address _whitelistee) external onlyOwner {
        whitelists[_whitelistee] = true;
    }

    function removeWhitelist(address _whitelistee) external onlyOwner {
        whitelists[_whitelistee] = true;
    }

    function incrementPhase() external onlyOwner {
        require(currentPhase < LAST_PHASE, "Invalid phase");
        currentPhase++;
    }

    function setBaseURI(string memory _baseURI) public {
        _setBaseURI(_baseURI);
    }

    // function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    //   string memory tokenURI = ERC721.tokenURI(tokenId);

    //   return string(abi.encodePacked(tokenURI, ".png"));
    // }
}
