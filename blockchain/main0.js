// https://analysis.null.place/how-do-the-bitcoin-mining-algorithms-work/#form7
// https://developer.bitcoin.org/reference/block_chain.html#target-nbits
// https://learnmeabitcoin.com/beginners/difficulty#finding-the-target-using-the-difficulty

function diffToTarget(diff) {

	var buf = Buffer.alloc(32).fill(0);

	function numberTo64BitBigInt(x) {
	  const lo = x | 0;
	  const rawHi = (x / 4294967296.0) | 0; // 2^32
	  const hi = (x < 0 && lo != 0) ? (rawHi - 1) | 0 : rawHi;
	  return (BigInt(hi) << 32n) | BigInt(lo >>> 0);
	}

	if(!isFinite(diff) || diff <= 0) {
		buf.fill(0xff);
		return buf.toString('hex');
	}

	var k = 6;
	for (; k > 0 && diff > 1.0; k--) {
		diff /= 4294967296.0;
	}
	var m = BigInt(numberTo64BitBigInt((4.294901760e+9 / diff)))
	buf.writeUInt32LE(Number(0xffffffffn & m) >>> 0, k << 2);
	buf.writeUInt32LE(Number(m >> 32n) >>> 0, 4 + (k << 2));
	return buf.toString('hex');
}


function getDiff(time_seconds, hash_rate_seconds){
  // hashes -> nonce
  return  ((time_seconds*hash_rate_seconds)/Math.pow(2, 32))
}


let diff_a = getDiff((10*60), (65000/10)); // 62k - 65k por 10 s
let diff_b0 =  getDiff((10*60), 8e9);
let diff_b = getDiff((10*60), 8e10);

// (Actual Time of Last 2015 Blocks / 20160 minutes)
let new_diff = diff_b0 * ( diff_b0 / diff_b );

console.log(diffToTarget(-1));
console.log(diffToTarget(0));
console.log(diffToTarget(1));
console.log(diffToTarget(0.0018));
console.log(diffToTarget(0.001));
console.log(diffToTarget(14484.16236123));
console.log(diffToTarget(diff_a));
console.log(diffToTarget(diff_b));

console.log('new diff ->');
console.log(new_diff);
console.log(diffToTarget(new_diff));








//end
