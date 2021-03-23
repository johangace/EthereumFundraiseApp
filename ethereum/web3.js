import Web3 from 'web3'

//1

let web3
//check if we running code on server or browser
if (
  typeof window !== 'undefined' &&
  window.web3 !== 'undefined' &&
  window.ethereum.isMetaMask
) {
  //we in browser with metamask
  web3 = new Web3(window.ethereum)
  console.log('Metamask? ' + window.ethereum.isMetaMask)
  //   window.ethereum.enable()
} else {
  //we on server or user not running metamask
  //we access rinkeby network from infura
  const provider = new Web3.providers.HttpProvider(
    // 'old during rhythm debate rule sibling romance renew dune fox flight gain',
    // process.env.INFURARINKEBY,
    'https://rinkeby.infura.io/v3/c7eafb639f494905b254800f3721cd1f',
  )
  web3 = new Web3(provider)
}

export default web3
// window.addEventListener('load', async () => {
//   // Modern dapp browsers...
//   if (window.ethereum) {
//     window.web3 = new Web3(ethereum)
//     try {
//       // Request account access if needed
//       await ethereum.enable()
//       // Acccounts now exposed
//       web3.eth.sendTransaction({
//         /* ... */
//       })
//     } catch (error) {
//       // User denied account access...
//     }
//   }
//   // Legacy dapp browsers...
//   else if (window.web3) {
//     window.web3 = new Web3(web3.currentProvider)
//     // Acccounts always exposed
//     web3.eth.sendTransaction({
//       /* ... */
//     })
//   }
//   // Non-dapp browsers...
//   else {
//     console.log(
//       'Non-Ethereum browser detected. You should consider trying MetaMask!',
//     )
//   }
// })
