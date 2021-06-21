


function getDiff(time_seconds, hash_rate_seconds){
  // hashes -> nonce
  return  /*parseFloat(*/((time_seconds*hash_rate_seconds)/Math.pow(2, 32))/*.toFixed(5))*/
}



const btcDiff = require('./index')



const SHA256 = require('crypto-js/sha256');



let diff_a = getDiff((10*60), ((65000/10)*2)); // 62k - 65k por 10 s
let diff_b = getDiff((10*60), 8e10); // se aproxima a 5 decimales

console.log(diff_a);
console.log(diff_b);
console.log(btcDiff.diffToTarget(10000));
console.log(btcDiff.diffToTarget(0.00005));
let test__ =  26959535291011309493156476344723991336010898738574164086137773096960;
console.log(test__);
console.log(btcDiff.diffToTarget(test__));

console.log('test ->');
console.log(btcDiff.diffToTarget(diff_a));
console.log(btcDiff.diffToTarget(diff_b));

function numberTo64BitBigInt_(x) {
  const lo = x | 0;
  const rawHi = (x / 4294967296.0) | 0; // 2^32
  const hi = (x < 0 && lo != 0) ? (rawHi - 1) | 0 : rawHi;
  return (BigInt(hi) << 32n) | BigInt(lo >>> 0);
}


console.log(numberTo64BitBigInt_(diff_a));
console.log(numberTo64BitBigInt_(diff_b));


// console.log(getDiff((60*10), 4e5));
