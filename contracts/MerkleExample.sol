//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// TODO: remove me before prod deploy
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleExample is ERC721, Ownable {

  using Counters for Counters.Counter;
  Counters.Counter private _tokenSupply;

  // Defaults to false
  bool public presaleEnabled;

  // Defaults to 0x0.
  bytes32 public merkleRoot;

  constructor() ERC721("MerkleExample", "ME") {}

  // Etherscan likes totalSupply, so we include it
  function totalSupply() public view returns (uint) {
    return _tokenSupply.current();
  }

  function allowListMint(bytes32[] calldata _merkleProof, uint _amount) external payable {
      // Do your requires here

      bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
      require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), 'Not on the list');

      for(uint i = 0; i < _amount; i++) {
          _tokenSupply.increment();
          _safeMint(msg.sender, totalSupply());
      }
    }

    // Useful if you want to update the merkle root during the presale period.

    // Caveats:
    // * Make sure your web deploy finishes first so the latest merkle root is live on the web
    // * Then hit this (see hardhat.config.js for an easy job you can run from your terminal)
    // * Anyone who is trying to mint who has *just been added* to the allowlist will need to refresh their browser to get the latest merkle root in their browser
    // * When updating, prefix the value you get on your backend with 0x before setting or it won't be a valid bytes32
    function setMerkleRoot(bytes32 _root) external onlyOwner {
        merkleRoot = _root;
    }

}
