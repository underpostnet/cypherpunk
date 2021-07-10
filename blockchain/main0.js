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

	// console.log('target diff -> ');
	// console.log(buf.toString('hex'));


	return buf.toString('hex');

}

function getZerosHash(hash){
	let charList = [];
	for(let char of hash){
		charList.push(char);
	}
	charList = charList.reverse();
	let target = "";
	for(let char of charList){
		if(char=="0"){
			target+=char;
		}else{
			break;
		}
	}
	return target;
}

function getDiff(time_seconds, hash_rate_seconds){
  // hashes -> nonce
  return  ((time_seconds*hash_rate_seconds)/Math.pow(2, 32))
}

function fixDiff(old_diff, new_diff){
	return old_diff * ( old_diff / new_diff )
}

// en 10 segundos genera 65000 hashes de forma local
console.log('diff_local ->');
console.log( diffToTarget( getDiff(10, (65000/10) ) ) );

let diff_a =  getDiff((60*10), 8e10);
console.log('diff_a ->');
console.log(diff_a);
console.log('hash a ->');
console.log(diffToTarget(diff_a));
console.log('get zeros a ->');
console.log(getZerosHash(diffToTarget(diff_a)));


let diff_b = getDiff((60*10), 8e6);
console.log('diff_b ->');
console.log(diff_b);
console.log('hash b ->');
console.log(diffToTarget(diff_b));
console.log('get zeros b ->');
console.log(getZerosHash(diffToTarget(diff_b)));


let new_diff = fixDiff(diff_a, diff_b);
console.log('new_diff ->');
console.log(new_diff);
console.log('hash new_diff ->');
console.log(diffToTarget(new_diff));
console.log('get zeros new_diff ->');
console.log(getZerosHash(diffToTarget(new_diff)));


console.log('test ->');
console.log(diffToTarget(-1));
console.log(diffToTarget(0));
console.log(diffToTarget(1));
console.log(diffToTarget(0.0018));
console.log(diffToTarget(0.001));
console.log(diffToTarget(14484.16236123));








//end
