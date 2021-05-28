

const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const encrypt = (text, pkPath) => {
  return new Promise((resolve, reject) => {
    const absPkPath = path.resolve(pkPath)
    fs.readFile(absPkPath, 'utf8', (err, pk) => {
      if (err) {
        return reject(err)
      }

      const buffer = Buffer.from(text, 'utf8')
      const encrypted = crypto.publicEncrypt(pk, buffer)
      resolve(encrypted.toString('base64'))
    })
  })
}

encrypt("Hola Mundo", "./key/public.key.pem")
  .then(str => {

    console.log(str);
      fs.writeFileSync(('./data/encrData'), str, 'utf-8');

  })
  .catch(err => {

    console.log('error ->');
    console.log(err);

  });
