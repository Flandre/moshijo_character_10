var body = "";
process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
  body += chunk;
});
process.stdin.on('end', function () {
  var linea = body.split("\n");
  var fl = linea[0];
  var fla = fl.split(" ");
  var width = parseInt(fla[0]);
  var height = parseInt(fla[1]);
  var maze = [];
  var value = [];
  for(var i=0;i<height;i++){
    maze[i]=[];
    value[i] = [];
  }
  var start = [];
  var goal = [];
  for(var i=0;i<height;i++){
    var mazel = linea[i+1];
    maze[i]=mazel.split(" ");
    for(var j=0;j<width;j++){
      if(maze[i][j]=="s"){
        start = [i,j];
      }
      if(maze[i][j]=="g"){
        goal = [i,j];
      }
      value[i][j]=993999;
    }
  }
  var taskmap = {};
  var task = [];
  function getnext(x, y) {
    var rett = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    var ret = [];
    for (var i = 0; i < rett.length; i++) {
      if (maze[rett[i][0]]) {
        var tmp = maze[rett[i][0]][rett[i][1]];
        if (tmp == "1" || tmp == undefined) {

        } else {
          ret.push(rett[i]);
        }
      }
    }
    return ret;
  }

  function search(x, y) {
    var next = getnext(x, y);
    for (var i = 0; i < next.length; i++) {
      var nx = next[i][0];
      var ny = next[i][1];
      var mv = maze[nx][ny];
      var ovalue = value[nx][ny];
      var nvalue = value[x][y];
      var nowcost = nvalue;
      var cost = 1;
      var tcost = nowcost + cost;
      if (tcost < ovalue) {
        value[nx][ny]=tcost;
        var newtaskno = (nx << 15) + ny;
        var queuedtask = taskmap[newtaskno];
        if (queuedtask == undefined) {
          task.push(newtaskno);
        }
      }
    }
  }

  function dotask(){
    var newtaskno = (start[0] << 15) + start[1];
    value[start[0]][start[1]]=0;
    task.push(newtaskno);
    while (task.length != 0) {
      var nowtask = task[0];
      task = task.slice(1);
      var ny = nowtask & 32767;
      var nx = nowtask >> 15;
      delete(taskmap[nowtask]);
      search(nx, ny);
    }
    if(value[goal[0]][goal[1]]==993999){
      console.log("Fail");
    }else{
      console.log(value[goal[0]][goal[1]])
    }

  }

  dotask();

});

























