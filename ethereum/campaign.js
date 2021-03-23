import web3 from './web3'
const Campaign = require('./build/Campaign.json')

//2.
//create an instance of of contract
//3
//go to remix to  deploy initial instance with addres
export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Campaign.interface),
    //individual campaign addresses
    address,
  )
}
