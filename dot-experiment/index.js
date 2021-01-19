const abiDecoder = require('abi-decoder');
const web3 = require('web3')

const addLinkEvent = [
      {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "ethereumAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "target",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "AddLink",
    "type": "event"
  }
]


abiDecoder.addABI(addLinkEvent)

let run = async () => {
	let receipt = await web3.eth.getTransactionReceipt("0x103577d20b4ae152ebd33d20fd32cf63aad5c5192d33efac8c9a6f071caff6ac")


	const decodedLogs = abiDecoder.decodeLogs(receipt.data);

	console.log(decodedLogs)
}
