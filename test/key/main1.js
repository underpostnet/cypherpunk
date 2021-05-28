// Node.js program to demonstrate the
// crypto.generateKeyPairSync() method

// Including generateKeyPairSync from crypto module
const { generateKeyPairSync } = require('crypto');

// Including publicKey and  privateKey from
// generateKeyPairSync() method with its
// parameters
const { publicKey, privateKey } = generateKeyPairSync('ec', {
  namedCurve: 'secp256k1',    // Options
  publicKeyEncoding: {
    type: 'spki',
    format: 'der'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'der'
  }
});

// Prints asymmetric key pair
console.log("The public key is: ", publicKey);
console.log();
console.log("The private key is: ", privateKey);
