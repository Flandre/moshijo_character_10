process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！

var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
  var inputArr = lines[1].split('').map(d => parseInt(d))
  let sum = inputArr.reduce((p, e) => p + e), step = 0, out = 10, s1 = 0, s2 = 0, count = 0,
    c1 = {
      id: 1,
      count: 0
    }, c2 = {
      id: 2,
      count: 0
    },
    c3 = {
      id: 3,
      count: 0
    }
  for(let i = 0; i < inputArr.length; i ++) {
    count += inputArr[i]
    if(count >= sum / 3) {
      if(!s1){
        c1.count = count
        count = 0
        s1 = i + 1
      } else {
        c2.count = count
        count = 0
        s2 = i + 1
      }
    }
  }
  c3.count = count
  out = calc(c1.count, c2.count, c3.count)
  let lim = 0
  while (out > 0 && step < lines[1].length && lim < 10000000000){
    lim ++
    switch(maxObj(c1, c2, c3).id){
      case 1:
        let t = inputArr.shift()
        inputArr.push(t)
        s1--
        s2--
        c1.count -= t
        c3.count += t
        step ++
        break
      case 2:
        c1.count += inputArr[s1]
        c2.count -= inputArr[s1]
        s1 ++
        break
      case 3:
        c2.count += inputArr[s2]
        c3.count -= inputArr[s2]
        s2 ++
        break
    }
    let outTmp = calc(c1.count, c2.count, c3.count)
    out = outTmp < out ? outTmp: out
  }
  step = 0
  while (out > 0 && step < lines[1].length * 2){
    lim ++
    switch(maxObj(c1, c2, c3).id){
      case 1:
        c1.count -= inputArr[s1 - 1]
        c2.count += inputArr[s1 - 1]
        s1 --
        break
      case 2:
        c2.count -= inputArr[s2 - 1]
        c3.count += inputArr[s2 - 1]
        s2 --
        break
      case 3:
        let t = inputArr.pop()
        inputArr.unshift(t)
        s1++
        s2++
        step ++
        c1.count += t
        c3.count -= t
        break
    }
    let outTmp = calc(c1.count, c2.count, c3.count)
    out = outTmp < out ? outTmp: out
  }
  console.log(out)
});

const calc = (a, b, c) => Math.max(a, b, c) - Math.min(a, b, c)
const maxObj = (a, b, c) => a.count > b.count ? (a.count > c.count ? a : c) : (b.count > c.count ? b : c)