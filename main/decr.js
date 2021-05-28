const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

//const decrypt = (text, privateKeyPath, passphrase) => {
const decrypt = (text, privateKeyPath, passphrase) => {
  return new Promise((resolve, reject) => {
    const p = path.resolve(privateKeyPath)
    fs.readFile(p, 'utf8', (err, pk) => {
      if (err) {
        return reject(err);
      }

      const buffer = Buffer.from(text, 'base64');
      const decrypted = crypto.privateDecrypt({
    key: pk.toString(),
    passphrase: passphrase,
  }, buffer);
      /*

      {
        key: pk.toString(),
        passphrase
      }

      */

      resolve(decrypted.toString('utf8'));
    })
  })
}

fs.readFile('./data/encrData', 'utf8', function (err, data) {

  console.log('encrData ->');
  console.log(data);

  decrypt(data, "./key/private.key.pem", "pass")
    .then(str => {

      console.log('decr ->');
      console.log(str);

    })
    .catch(err => {

      console.log('error ->');
      console.log(err);

    });


 });
