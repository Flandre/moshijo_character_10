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
  var inputArr = lines[0].split(' ')
  let str = ''
  for(let i = parseInt(inputArr[1] - 1); i < parseInt(inputArr[2]); i ++){
    str += searchABC(inputArr[0], i)
  }
  console.log(str)
});

const searchABC = (level, index) => {
  if(level == 1){
    return 'ABC'[index]
  } else {
    let lenPre = levelLength(level - 1)
    if(index == 0) return 'A'
    else if(index > 0 && index < 1 + lenPre) return searchABC(level - 1, index - 1)
    else if(index == 1 + lenPre) return 'B'
    else if(index > 1 + lenPre && index < 2 + 2 * lenPre) return searchABC(level - 1, index - 2 - lenPre)
    else return 'C'
  }
}

const levelLength = level => level == 1 ? 3 : 3 + 2 * levelLength(level - 1)