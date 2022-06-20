// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter public _tokenIds;
  address contractAddress;
  
  constructor(address marketplaceAddress) ERC721("NFTEA Tokens", "TEA") {
    contractAddress = marketplaceAddress;
  }

  function createToken(string memory tokenURI) public returns (uint) {
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();

    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    setApprovalForAll(contractAddress, true);
    return newItemId;
  }

  function getTokens() public view returns (uint[] memory) {
    uint[] memory itemIds;
    for (uint i = 1; i <= _tokenIds.current(); i++) {
      itemIds[i] = i;
    }
    return itemIds;
  }

  function createMultipleToken(uint amount, string[] memory TokenURIs) public returns (uint[] memory) {
    uint[] memory itemIds;
    for (uint i = 0; i < amount; i++) {
      _tokenIds.increment();
      uint256 newItemId = _tokenIds.current();
      _mint(msg.sender, newItemId);
      _setTokenURI(newItemId, TokenURIs[i]);
      setApprovalForAll(contractAddress, true);
      itemIds[i] = newItemId;
    }
    return itemIds;
  }
}

