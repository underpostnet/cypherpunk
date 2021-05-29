var crypto = require("crypto");
var path = require("path");
var fs = require("fs");
const passphrase = "mySecret";

var encryptStringWithRsaPrivateKey = function(toEncrypt, relativeOrAbsolutePathToPrivateKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathToPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toEncrypt);
    var encrypted = crypto.privateEncrypt({
        key: privateKey.toString(),
        passphrase: passphrase,
    }, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPublicKey = function(toDecrypt, relativeOrAbsolutePathtoPublicKey) {
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(toDecrypt, "base64");
    const decrypted = crypto.publicDecrypt(publicKey, buffer);
    return decrypted.toString("utf8");
};

const { writeFileSync } = require('fs');
const { generateKeyPairSync } = require('crypto');

function generateKeys() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa',
    {
            modulusLength: 4096,
            namedCurve: 'secp256k1',
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: passphrase
            }
    });

    writeFileSync('private.pem', privateKey);
    writeFileSync('public.pem', publicKey);
}

generateKeys();

let a = encryptStringWithRsaPrivateKey("hello", "private.pem");
console.log(a);
let b = decryptStringWithRsaPublicKey(a, "public.pem");
console.log(b);
