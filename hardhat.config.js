require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("setMerkleRoot", "Set the Merkle root", async (taskArgs, hre) => {
  const provider = new ethers.providers.InfuraProvider(
    "homestead",
    infura_key
  )
  const signer = new ethers.Wallet(secrets.private_key, provider);

  const simpleABI = [
    {
      "inputs":[
        {
          "internalType":"bytes32",
          "name":"_root",
          "type":"bytes32"
        }
      ],
      "name":"setMerkleRoot",
      "outputs":[],
      "stateMutability":"nonpayable",
      "type":"function"
    }
  ]

  // your contract address goes here
  const _contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", simpleABI, signer)

  // TODO: update here, make sure to prefix the merkle root you get with 0x so it's a valid bytes32
  const txResponse = await _contract.setMerkleRoot('YOUR_MERKLE_ROOT')
  console.log(txResponse)
  console.log(`https://etherscan.io/tx/${txResponse.hash}`)

  const result = txResponse.wait()
  console.log(result)
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
};
