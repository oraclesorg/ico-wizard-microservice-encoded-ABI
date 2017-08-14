let Web3 = require("web3");
let fs = require("fs");

function getABIencoded(types, vals, cb) {
	configureWeb3(function(err, web3) {
		if (err) return console.log(err);

		let encoded = web3.eth.abi.encodeParameters(types, vals);
		cb(encoded);
	});
}

function getConfig() {
	let config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
	return config;
}

function configureWeb3(cb) {
	let config = getConfig();
	let web3;
	if (typeof web3 !== 'undefined') {
	  web3 = new Web3(web3.currentProvider);
	} else {
	  web3 = new Web3(new Web3.providers.HttpProvider(config.Ethereum[config.environment].rpc));
	}

	cb(null, web3);
}

module.exports = getABIencoded;