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
  var trapObj = SearchArr(playArr, /[A-Za-z]/);
  console.log(JSON.stringify(trapObj))

});
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
// 数组搜索
function SearchArr(arr, reg) {
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
// 绘制路线
function drawArr(arr, sx, sy, ex, ey){
  var count = 0;


}
