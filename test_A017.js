process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
  var line = chunk.toString();
  var sp = line.split('\n');
  var box = sp[0].split(' ');
  var bH = box[0], bW = box[1], num = box[2];
  var arr = [];
  for(var i = 0; i < bH; i++){
    arr[i] = [];
    for(var j = 0; j < bW; j++){
      arr[i][j] = '.'
    }
  }

  for(var i = 1; i <= num; i++){
    var rec = sp[i].split(' ');
    var h = parseInt(rec[0]), w = parseInt(rec[1]), x = parseInt(rec[2]);
    console.log(foundY(h, w, x));
    drawRect(x, foundY(h, w, x), h, w);
  }

  function drawRect(x, y, h, w){
    for(var i = y; i < y + h; i++){
      for(var j = x; j < x + w; j++){
        arr[i][j] = '#'
      }
    }
  }

  function foundY(h, w, x){
    for(var y = 0; y <= bH - h; y++){
      var flag = false;
      for (var i = y; i < y + h; i++){
        for(var j = x; j < w + x; j++){
          if(arr[i][j] == '#'){
            flag = true;
            break;
          }
        }
        if(flag){
          break;
        }
      }
      if(flag){
        return y - 1;
      }
    }
    return bH - h;
  }


  // out
  var out = '';
  for(var i = 0; i < bH; i++){
    out += arr[i].join('');
    out += '\n';
  }
  console.log(out)

});
