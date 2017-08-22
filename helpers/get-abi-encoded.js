let Web3 = require("web3");
let fs = require("fs");

function getABIencoded(types, vals, cb) {
	configureWeb3(function(err, web3) {
		if (err) return console.log(err);

		if (vals) {
			for (let i = 0; i < vals.length; i++) {
				let val = vals[i];
				if( Object.prototype.toString.call( vals ) === '[object Array]' ) {
					for (let j = 0; j < val.length; j++) {
				    	if (val[j]) {
				    		vals[i][j] = toFixed(val[j]);
				    	}
				    }
				}
			}
		}

		let encoded = web3.eth.abi.encodeParameters(types, vals);
		cb(encoded);
	});
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
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