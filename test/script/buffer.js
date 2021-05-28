
var crypto = require('crypto');

const buf = Buffer.from("hello world", "utf8");
const base64Encode = buf.toString("base64");
console.log(base64Encode);
// Prints: aGVsbG8gd29ybGQ=

const base64Decode = Buffer.from(base64Encode, "base64");
console.log(base64Decode);
// Prints: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
//                 h  e  l  l  o     w  o  r  l  d


console.log('bytes test ->');
console.log(crypto.randomBytes(16));
console.log(crypto.randomBytes(16).toString());
console.log(crypto.randomBytes(16).toString("Base64"));
