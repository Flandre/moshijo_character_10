process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
  var line = chunk.toString();
  var sp = line.split('\n');
  var height = sp.split(' ')[0];
  var maze = sp.slice(1, 1 + height);
  var mazearr = maze.forEach()
});
