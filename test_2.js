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
  var endX = parseInt(endPoint[0]) - 1;
  var endY = parseInt(endPoint[1]) - 1;
  var startPoint = mazeArr.pop().split(' ');
  var startX = parseInt(startPoint[0]) - 1;
  var startY = parseInt(startPoint[1]) - 1;
  mazeArr.forEach(function (ele, index) {
    mazeArr[index] = ele.split('');
  });

  var saveArr = CopyArr(mazeArr);
  var playArr = CopyArr(mazeArr);
  var trapObj = SearchArrReg(playArr, /^[A-Za-z]$/);
  var newArr = drawArr(playArr, startX, startY);
  console.log(route(newArr, endX, endY).reverse().join('\n'));


  // 判断是否数组
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]"
  }

  // 数组深拷贝
  function CopyArr(arr) {
    var newArr = [];
    arr.forEach(function (ele, idx) {
      if (isArray(arr[idx]))
        newArr[idx] = CopyArr(ele);
      else
        newArr[idx] = ele;
    });
    return newArr;
  }

  // 数组搜索(正则)
  function SearchArrReg(arr, reg) {
    var findObj = {};
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (reg.test(arr[i][j])) {
          findObj[arr[i][j]] = {};
          findObj[arr[i][j]].x = j;
          findObj[arr[i][j]].y = i;
        }
      }
    }
    return findObj;
  }

  // 数组搜索
  function SearchArr(arr, str) {
    var findObj = [], count = 0;
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == str) {
          findObj[count] = {};
          findObj[count].x = j;
          findObj[count].y = i;
          count++;
        }
      }
    }
    return findObj;
  }

  // 绘制路线
  function drawArr(arr, sx, sy) {
    var count = 0, wait = 0, x = sx, y = sy;
    var newArr = CopyArr(arr);
    newArr[y][x] = count;
    while (wait != 100) {
      var find = SearchArr(newArr, count);
      if (find.length > 0) {
        find.forEach(function (ele) {
          mark(newArr, ele.x, ele.y, count);
        });
        wait = 0;
      } else {
        wait++;
      }
      count++;
    }
    return (newArr)
  }

  // 标记相邻点
  function mark(arr, x, y, count) {
    // left
    if (x != 0)
      if (/^[.a-z]$/.test(arr[y][x - 1]))
        arr[y][x - 1] = count + 1;
      else if (/^[A-Z]$/.test(arr[y][x - 1]))
        arr[y][x - 1] = count + 100;
    // right
    if (x != width - 1)
      if (/^[.a-z]$/.test(arr[y][x + 1]))
        arr[y][x + 1] = count + 1;
      else if (/^[A-Z]$/.test(arr[y][x + 1]))
        arr[y][x + 1] = count + 100;
    // top
    if (y != 0)
      if (/^[.a-z]$/.test(arr[y - 1][x]))
        arr[y - 1][x] = count + 1;
      else if (/^[A-Z]$/.test(arr[y - 1][x]))
        arr[y - 1][x] = count + 100;
    // bottom
    if (y != height - 1)
      if (/^[.a-z]$/.test(arr[y + 1][x]))
        arr[y + 1][x] = count + 1;
      else if (/^[A-Z]$/.test(arr[y + 1][x]))
        arr[y + 1][x] = count + 100;
  }

  // 生成路线
  function route(arr, ex, ey) {
    var count = arr[ey][ex], routeArr = [], x = ex, y = ey, min = 9999, rc = '';
    while (count != 0) {
      // left
      if (x != 0 && /^\d+$/.test(arr[y][x - 1] + '') && arr[y][x - 1] < min) {
        min = arr[y][x - 1];
        rc = 'R'
      }
      // right
      if (x != width - 1 && /^\d+$/.test(arr[y][x + 1] + '') && arr[y][x + 1] < min) {
        min = arr[y][x + 1];
        rc = 'L'
      }
      if (y != 0 && /^\d+$/.test(arr[y - 1][x] + '') && arr[y - 1][x] < min) {
        min = arr[y - 1][x];
        rc = 'D'
      }
      if (y != height - 1 && /^\d+$/.test(arr[y + 1][x] + '') && arr[y + 1][x] < min) {
        min = arr[y + 1][x];
        rc = 'U'
      }

      switch (rc){
        case 'R':
          x--;
          break;
        case 'L':
          x++;
          break;
        case 'D':
          y--;
          break;
        case 'U':
          y++;
          break;
      }
      count = min;
      routeArr.push(rc);
    }
    return routeArr;
  }
});
