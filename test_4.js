process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
  var line = chunk.toString();
  var sp = line.split('\n');
  var length = sp[0];
  var dir = sp[1].split(' ')[0] < sp[1].split(' ')[1];
  var era = sp[2].split('');

});
