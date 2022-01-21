import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const addressList = require('../allow_list_addresses.json')

export default function Home() {

  const [merkleTree, setMerkleTree] = useState(null);
  const [error, setError] = useState(null);
  const [txStatus, setTxStatus] = useState(null);

  useEffect(() => {
    const leaves = addressList.map(addr => keccak256(addr))
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })

    // Readable for you, prefix with 0x before uploading via the job in hardhat.config.js. Remove or comment out before deploying
    console.log(merkleTree.getRoot().toString('hex'))

    setMerkleTree(merkleTree)
  }, [])

  const presaleMint = async (quantity) => {
    // This assumes a connected wallet and you setting `address` somewhere
    // turns the user's address into data verifyable by the merkle tree
    const hexProof = merkleTree.getHexProof(keccak256(address))

    let txResponse;
    try {
      txResponse = await contract.allowListMint(hexProof, quantity, {
        value: ethers.utils.parseEther(q) // q here is a string value of quantity x your mint price. Be careful with floating point math in JS. It's unreliable. For example, 0.1 x 3 doesn't gave me something like 0.30000000000004
      })

    } catch (error) {
      const _error = error.error.message

      if (_error.includes('execution reverted: ')) {
          const e = _error.split('execution reverted: ')[1]
          setError(e)
      }

      return;
    }

    try {
      await txResponse.wait();

      // setTxStatus('success');
      // maybe update your total supply here on the site by calling the contract's totalSupply() function and set somewhere

    } catch (error) {
      console.log('error', error)
      // setTxStatus('failed');
      // console.log('Presale mint transaction failed.', error);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Merkle App</title>
        <meta name="description" content="Made by @backseats_eth" />
      </Head>

      <main>
        {/* Add some UI for your mint function(s) */}
      </main>
    </div>
  )
}
