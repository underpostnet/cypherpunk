



const btcDiff = require('./index')

// Convert difficulty to full target
// btcDiff.diffToTarget(diff);

// Convert difficulty to 64-bit MSB of the target
// btcDiff.diffToTarget64(diff);

// Convert hash/target to difficulty
// btcDiff.hashToDiff(hash);

// Convert nBits to 64-bit MSB of the resulting target
// btcDiff.bitsToDiff(bits);

// Convert difficulty to nBits
// btcDiff.diffToBits(diff);


// difficulty=((Time for a block to be found in seconds)*(hashes per second))/2^32

// New Difficulty = Old Difficulty * (Actual Time of Last 2015 Blocks / 20160 minutes)


// 0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
// That is, a hash must start[*] with 8 hexadecimal zeros. That's 4 zero bytes, or 32 zero bits.


// exponentes
// console.log(Math.pow(7, 2)) // 7^2


function getDiff(time_seconds, hash_rate_seconds){
  // hashes -> nonce
  return  ((time_seconds*hash_rate_seconds)/Math.pow(2, 32))
}

console.log(getDiff(3600*10, 1000));

console.log(getDiff(3600*5, 1000));

console.log(getDiff(3600*1, 1000));
// console.log(btcDiff.diffToTarget(getDiff(3600*10, 99999999999999)));
// console.log(btcDiff.diffToTarget(getDiff(3600*20, 99999999999999)));
// console.log(btcDiff.diffToTarget(getDiff(3600*10, 1000000000000000000)));

// getDiff(60*10, 100000000)
// console.log(btcDiff.diffToTarget(0.0006));
console.log(btcDiff.diffToTarget(0.00005));
console.log(btcDiff.diffToTarget(1000));
console.log(btcDiff.diffToTarget(10000));
console.log(btcDiff.diffToTarget(10000000000));

//console.log(btcDiff.diffToTarget(14484));
// .16236123

let test__ =  26959535291011309493156476344723991336010898738574164086137773096960;
console.log(btcDiff.diffToTarget(test__));

// agregar un testeo de esta maquina minando dificuktad inicial



// decimal -> hexadecimal

// expected / actual
// 20160 / actual
// If miners were able to solve each block more quickly than expected;
// say 9 minutes per block for example, you’d get a number like this

// 20160 / 18144 = 1.11
// Each node then uses this number to adjust the difficulty for the next 2016 blocks:

// difficulty x 1.11 = new difficulty







// end
