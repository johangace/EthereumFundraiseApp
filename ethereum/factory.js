import web3 from './web3'
const CampaignFactory = require('./build/CampaignFactory.json')
const Campaign = require('./build/Campaign.json')

//2.
//create an instance of of contract
//3
//go to remix to  deploy initial instance with address
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  // process.env.ADDRESS,

  '0xEFEE14986Ed2C7A627d29A3F9bb0d374B9ED5c38',
)

console.log(instance)

export default instance
