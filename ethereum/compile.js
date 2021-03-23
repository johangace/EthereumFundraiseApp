//compile one time and write the output in the future instead of compilign everytime
const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

//accces build folder
const buildPath = path.resolve(__dirname, 'build')

//remove build folder
fs.removeSync(buildPath)

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
//read campaing file
const source = fs.readFileSync(campaignPath, 'utf8')

//compile both contracts
const output = solc.compile(source, 1).contracts

//check if build directory exist and create a new folder if it doesn't
fs.ensureDirSync(buildPath)

//create contracts

//object that references the contracts

console.log(output)
for (let contract in output) {
  fs.outputJSONSync(
    //creates 2 contract files
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract],
  )
}
