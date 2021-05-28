var CryptoJS = require("crypto-js");

class NodeCrypto {

	constructor(key) {
		this.key = key;
	}

	encr(content){
		return CryptoJS.AES.encrypt(content, this.key).toString();
	}

	encrIv(content){
		return CryptoJS.AES.encrypt(content, this.key).iv;
	}

	encrSalt(content){
		return CryptoJS.AES.encrypt(content, this.key).salt;
	}

	decr(content){
		let bytes  = CryptoJS.AES.decrypt(content, this.key);
		return  bytes.toString(CryptoJS.enc.Utf8);
	}

}

var k = new NodeCrypto(data.db.key);
