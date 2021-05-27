const crypto = require('crypto');
const EC = require('elliptic').ec;
const RIPEMD160 = require('ripemd160');
const bs58 = require('bs58');
const buffer = require('buffer');
const ec = new EC('secp256k1');

function hasha256(data) {
    return crypto.createHash('sha256').update(data).digest();
} // A small function I created as there is a lot of sha256 hashing.

const addrVer = Buffer.alloc(1, 0x00); // 0x00 P2PKH Mainnet, 0x6f P2PKH Testnet
const wifByte = Buffer.alloc(1, 0x80); // 0x80 Mainnet, 0xEF Testnet

var key = ec.genKeyPair();
var privKey = key.getPrivate().toString('hex');
var pubPoint = key.getPublic();
var x = pubPoint.getX(); // elliptic x
var y = pubPoint.getY(); // elliptic y

// Private Key Hashing
var bufPrivKey = Buffer.from(privKey, 'hex');
var wifBufPriv = Buffer.concat([wifByte, bufPrivKey], wifByte.length + bufPrivKey.length);
var wifHashFirst = hasha256(wifBufPriv);
var wifHashSecond = hasha256(wifHashFirst);
var wifHashSig = wifHashSecond.slice(0, 4);
var wifBuf = Buffer.concat([wifBufPriv, wifHashSig], wifBufPriv.length + wifHashSig.length);
var wifFinal = bs58.encode(wifBuf);

// Public Key Hashing
var publicKey = pubPoint.encode('hex');
var publicKeyInitialHash = hasha256(Buffer.from(publicKey, 'hex'));
var publicKeyRIPEHash = new RIPEMD160().update(Buffer.from(publicKeyInitialHash, 'hex')).digest('hex');
var hashBuffer = Buffer.from(publicKeyRIPEHash, 'hex');
var concatHash = Buffer.concat([addrVer, hashBuffer], addrVer.length + hashBuffer.length);
var hashExtRipe = hasha256(concatHash);
var hashExtRipe2 = hasha256(hashExtRipe);
var hashSig = hashExtRipe2.slice(0, 4);
var bitcoinBinaryStr = Buffer.concat([concatHash, hashSig], concatHash.length + hashSig.length);

var bitcoinWifAddress = wifFinal.toString('hex');
var bitcoinAddress = bs58.encode(Buffer.from(bitcoinBinaryStr));

// Log our new Bitcoin Address and WIF
console.log("WIF Private Key : %s", bitcoinWifAddress.toString('hex'));
console.log("Bitcoin Address : %s", bitcoinAddress.toString('hex'));
