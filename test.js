process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
  var line = chunk.toString();

  var mazeArr = line.split('\n');
  mazeArr.pop();
  var mazeInfo = mazeArr.shift().split(' ');
  var width = parseInt(mazeInfo[1]);
  var height = parseInt(mazeInfo[0]);
  var trapCount = parseInt(mazeInfo[2]);
  var endPoint = mazeArr.pop().split(' ');
  var endX = parseInt(endPoint[1]) - 1;
  var endY = parseInt(endPoint[0]) - 1;
  var startPoint = mazeArr.pop().split(' ');
  var startX = parseInt(startPoint[1]) - 1;
  var startY = parseInt(startPoint[0]) - 1;

  var pY = startY, pX = startX;

  var pos = 'U';
  var routeArr = [];


  mazeArr.forEach(function (ele, idx) {
    mazeArr[idx] = ele.split('');
  });

  while (pY != endY || pX != endX) {
    pos = route(pos);
    routeArr.push(pos);
  }
  console.log(routeArr.join('\n'));

  function route(p) {
    switch (p) {
      case 'U':
        if (pY + 1 < width) {
          if (/[.@a-zA-Z]/.test(mazeArr[pX][pY + 1])) {
            if(mazeArr[pX][pY] == '@'){
              mazeArr[pX][pY] = '#'
            }else{
              mazeArr[pX][pY] = '@'
            }
            pY = pY + 1;
            return 'R';
            break;
          }
        }
      case 'L':
        if (pX > 0) {
          if (/[.@a-zA-Z]/.test(mazeArr[pX - 1][pY])) {
            if(mazeArr[pX][pY] == '@'){
              mazeArr[pX][pY] = '#'
            }else{
              mazeArr[pX][pY] = '@'
            }
            pX = pX - 1;
            return 'U';
            break;
          }
        }
      case 'D':
        if (pY > 0) {
          if (/[.@a-zA-Z]/.test(mazeArr[pX][pY - 1])) {
            if(mazeArr[pX][pY] == '@'){
              mazeArr[pX][pY] = '#'
            }else{
              mazeArr[pX][pY] = '@'
            }
            pY = pY - 1;
            return 'L';
            break;
          }
        }
      case 'R':
        if (pX + 1 < height) {
          if (/[.@a-zA-Z]/.test(mazeArr[pX + 1][pY])) {
            if(mazeArr[pX][pY] == '@'){
              mazeArr[pX][pY] = '#'
            }else{
              mazeArr[pX][pY] = '@'
            }
            pX = pX + 1;
            return 'D';
            break;
          }
        }
      case 'U':
        if (pY + 1 < width) {
          if (/[.@a-zA-Z]/.test(mazeArr[pX][pY + 1])) {
            if(mazeArr[pX][pY] == '@'){
              mazeArr[pX][pY] = '#'
            }else{
              mazeArr[pX][pY] = '@'
            }
            pY = pY + 1;
            return 'R';
            break;
          }
        }
      case 'L':
        if (pX > 0) {
          if (/[.@a-zA-Z]/.test(mazeArr[pX - 1][pY])) {
            if(mazeArr[pX][pY] == '@'){
              mazeArr[pX][pY] = '#'
            }else{
              mazeArr[pX][pY] = '@'
            }
            pX = pX - 1;
            return 'U';
            break;
          }
        }
      case 'D':
        if (pY > 0) {
          if (/[.@a-zA-Z]/.test(mazeArr[pX][pY - 1])) {
            if(mazeArr[pX][pY] == '@'){
              mazeArr[pX][pY] = '#'
            }else{
              mazeArr[pX][pY] = '@'
            }
            pY = pY - 1;
            return 'L';
            break;
          }
        }

    }
  }

});

