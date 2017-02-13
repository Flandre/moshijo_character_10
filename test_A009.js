process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
  var line = chunk.toString();
  var sp = line.split('\n');
  var box = sp[0].split(' ');
  var bH = box[0], bW = box[1];
  var arr = [];
  for(var i = 0; i < bH; i++){
    arr[i] = sp[i + 1].split('');
  }
  var x = 0, y = 0, dir = 'R', count = 0;
  while (y >= 0 && y < bH && x >= 0 && x < bW){
    switch (arr[y][x]){
      case '_':
        switch (dir){
          case 'R': x++;break;
          case 'L': x--;break;
          case 'U': y--;break;
          case 'D': y++;break;
        }
        break;
      case '\\':
        switch (dir){
          case 'R': dir = 'D';y++;break;
          case 'L': dir = 'U';y--;break;
          case 'U': dir = 'L';x--;break;
          case 'D': dir = 'R';x++;break;
        }
        break;
      case '/':
        switch (dir){
          case 'R': dir = 'U';y--;break;
          case 'L': dir = 'D';y++;break;
          case 'U': dir = 'R';x++;break;
          case 'D': dir = 'L';x--;break;
        }
    }
    count ++;
  }


  console.log(count);

});
