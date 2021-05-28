const { encrypt, decrypt } = require('./crypto');

const hash_a = encrypt('Hello World!');
const hash_b = encrypt('Hello World!');
const hash_c = encrypt('Hello World!');

console.log(hash_a.content);
console.log(hash_b.content);
console.log(hash_c.content);

// {
//     iv: '237f306841bd23a418878792252ff6c8',
//     content: 'e2da5c6073dd978991d8c7cd'
// }

const text_a = decrypt(hash_a);
const text_b = decrypt(hash_b);
const text_c = decrypt(hash_c);

console.log(text_a); // Hello World!
console.log(text_b); // Hello World!
console.log(text_c); // Hello World!

let test = encrypt('adasd adas das dasd as dasd asd asd asd a')
console.log(test);
console.log(decrypt(test));
test = encrypt('Hello World!')
console.log(test);
console.log(decrypt(test));
