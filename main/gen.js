const {
  generateKeyPair,
} = require('crypto');
const fs = require('fs');

generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret'
  }
}, (err, publicKey, privateKey) => {
  // Handle errors and use the generated key pair.
  console.log('public key -> ');
  console.log(publicKey);

  console.log('private key -> ');
  console.log(privateKey);

  fs.writeFileSync(('./key/public.key.pem'), publicKey, 'utf-8');
  fs.writeFileSync(('./key/private.key.pem'), privateKey, 'utf-8');

});
