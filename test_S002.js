process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var input_string = '';

process.stdin.on('data', function(chunk) {
  input_string += chunk;
});

process.stdin.on('end', function() {
  var lines = input_string.split('\n');
  var sp = lines;
  var box = sp[0].split(' ');
  var bW = box[0], bH = box[1];
  var arr = [];
  for(var i = 0; i < bH; i++){
    arr[i] = sp[i + 1].split(' ');
  }
  var queue = [];

  for(var i = 0; i < bH; i++){
    for(var j = 0; j < bW; j++){
      if(arr[i][j] == 's')
        queue.push([i, j, 0]);
    }
  }
  var out;
  while(true){
    var ta = queue.shift();
    var i = ta[0], j = ta[1], count = ta[2];

    if(i > 0 && arr[i - 1][j] == '0'){
      arr[i - 1][j] = '*';
      queue.push([i - 1, j, count + 1])
    }
    if(i < bH - 1 && arr[i + 1][j] == '0'){
      arr[i + 1][j] = '*';
      queue.push([i + 1, j, count + 1])
    }
    if(j > 0 && arr[i][j - 1] == '0'){
      arr[i][j - 1] = '*';
      queue.push([i, j - 1, count + 1])
    }
    if(j < bW - 1 && arr[i][j + 1] == '0'){
      arr[i][j + 1] = '*';
      queue.push([i, j + 1, count + 1])
    }

    if(i > 0 && arr[i - 1][j] == 'g'){
      out = count + 1;
      break;
    }
    if(i < bH - 1 && arr[i + 1][j] == 'g'){
      out = count + 1;
      break;
    }
    if(j > 0 && arr[i][j - 1] == 'g'){
      out = count + 1;
      break;
    }
    if(j < bW - 1 && arr[i][j + 1] == 'g'){
      out = count + 1;
      break;
    }

    if(!queue.length){
      out = 'Fail';
      break
    }
  }
  console.log(out)


});
