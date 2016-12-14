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
  var endIndex = (endPoint[0] - 1) + width * (endPoint[1] - 1);
  var startPoint = mazeArr.pop().split(' ');
  var startIndex = (startPoint[0] - 1) + width * (startPoint[1] - 1);
  mazeArr = mazeArr.join('').split('');


  var playArr = copyArr(mazeArr);
  var count = 0;
  playArr[startIndex] = 0;
  while (playArr[endIndex] == '.') {
    drawArr(playArr, count, width);
    count++;
  }

  // crete route
  var routeArr = [], point = endIndex, str;
  while (count != 0) {
    str = route(playArr, point, width);
    routeArr.push(str.split('_')[0]);
    point = parseInt(str.split('_')[1]);
    count--;
  }
  console.log(routeArr.reverse().join('\n'));
});

function copyArr(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    newArr[i] = arr[i]
  }
  return (newArr);
}

function drawArr(arr, count, width) {
  arr.forEach(function (ele, idx) {
    if (ele == count) {
      // top
      if (idx >= width && /[.a-zA-Z]/.test(arr[idx - width]))
        arr[idx - width] = (count + 1);
      // left
      if (idx % width != 0 && /[.a-zA-Z]/.test(arr[idx - 1]))
        arr[idx - 1] = (count + 1);
      // right
      if ((idx + 1) % width != 0 && /[.a-zA-Z]/.test(arr[idx + 1]))
        arr[idx + 1] = (count + 1);
      // bottom
      if ((idx + width) < arr.length && /[.a-zA-Z]/.test(arr[idx + width]))
        arr[idx + width] = (count + 1);

    }
  });
}

function route(arr, point, width) {
  var check = arr[point] - 1;
  // top
  if (point >= width && arr[point - width] == check)
    return 'D_' + (point - width);
  // left
  if (point % width != 0 && arr[point - 1] == check)
    return 'R_' + (point - 1);
  // right
  if ((point + 1) % width != 0 && arr[point + 1] == check)
    return 'L_' + (point + 1);
  // bottom
  if ((point + width) < arr.length && arr[point + width] == check)
    return 'U_' + (point + width)
}