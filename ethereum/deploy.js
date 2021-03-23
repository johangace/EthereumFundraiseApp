//WHich account will we use and
const HDWalletProdiver = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/CampaignFactory.json')
// const compiledCampaign = require('./build/Campaign.json')
const provider = new HDWalletProdiver(
  'old during rhythm debate rule sibling romance renew dune fox flight gain',
  // process.env.INFURARINKEBY,
  'https://rinkeby.infura.io/v3/c7eafb639f494905b254800f3721cd1f',
)

const web3 = new Web3(provider)

// const result = await new web3.eth.Contract(JSON.parse(interface))
//      .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
//      .send({from: accounts[0]}); // remove 'gas'
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('Attempting deploy', accounts[0])

  //   const result = await new web3.eth.Contract(
  //     JSON.parse(compiledFactory.interface),
  //   )
  //     .deploy({ data: compiledFactory.bytecode })
  //     .send({ gas: '1000000', from: accounts[0] })
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface),
  )
    .deploy({ data: '0x' + compiledFactory.bytecode }) // add bytecode
    .send({ from: accounts[0], gas: '1000000' }) // remove gas

  console.log('contract deployed', result.options.address)
}

deploy()
//0xc33b01E75ba01F5169df5BFC8Fe5FC33e922bD6e
