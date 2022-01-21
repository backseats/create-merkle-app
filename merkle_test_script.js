// run `node merkle_test_script.js` in your console to run this

const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')

const whitelist = [
  '0xeC1a069387E41765d20ED4218737c914dFa5403e',
  '0x3a6372B2013f9876a84761187d933DEe0653E377',
  '0x42FC6bF3B3F247d528483279153cd32a8De9Bc53',
]

// const notIn = '0xf3bFE9629DC27282ea2BD663bC521F3b89c4617d';

const leaves = whitelist.map(addr => keccak256(addr))
console.log(leaves)
const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
const rootHash = merkleTree.getRoot()

console.log('merkle tree is', merkleTree)
console.log('The root hash is', rootHash.toString('hex'))
console.log('')
console.log('Whitelist Merkle Treen\n', merkleTree.toString())

const address = whitelist[0]
// const address = notIn

const hexProof = merkleTree.getHexProof(keccak256(address))
console.log('proof:', hexProof)

const leaf = keccak256(address)
const check = merkleTree.verify(hexProof, leaf, rootHash)
console.log('Address in whitelist:', check)
