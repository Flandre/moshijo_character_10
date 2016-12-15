process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk){

  var line = chunk.toString();

  var chunka = line.split("\n");
  var fl = chunka[0];
  var fla = fl.split(" ");
  var width = parseInt(fla[1]);
  var height = parseInt(fla[0]);
  var num = parseInt(fla[2]);
  var starta = chunka[height + 1].split(" ");
  var startx = starta[0] - 1;
  var starty = starta[1] - 1;
  var goala = chunka[height + 2].split(" ");
  var goalx = goala[0] - 1;
  var goaly = goala[1] - 1;
  var keymap = {};

  var maze = [];
  for (var i = 0; i < width; i++) {
    maze[i] = [];
  }
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var c = chunka[i + 1].charAt(j);
      if (c >= "a" && c <= "z") {
        keymap[c] = [j, i];
      }
      if (c >= "A" && c <= "Z") {
        keymap[c] = [j, i];
      }
      maze[j][i] = c + "";
    }
  }

  var value = [];
  var task = [];
  var taskmap = {};
  var maxdmg = 999999;
  var save = [];
  var keylist = "";
  var routemap = {};
  init();
  value[startx][starty] = [[[startx, starty]], [], 0];

  dotask();
  printout();

  function init() {
    for (var i = 0; i < width; i++) {
      value[i] = [];
    }
    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        value[i][j] = [[], [], maxdmg];
      }
    }
    task = [];
    taskmap = {};
    routemap = {};
  }

  function dotask() {
    search(startx, starty);
    while (task.length != 0) {
      var nowtask = task[0];
      task = task.slice(1);
      var ny = nowtask & 1023;
      var nx = nowtask >> 10;
      delete(taskmap[nowtask]);
      //console.log(nx,ny);
      search(nx, ny);
    }
    var value1 = value[goalx][goaly];
    var item = value1[1];
    var willaddmap = {};
    for (var i = 0; i < item.length; i++) {
      if (item[i] >= "a" && item[i] <= "z") {
        willaddmap[item[i]] = 1;
      }
    }
    for (var i = 0; i < item.length; i++) {
      if (item[i] >= "A" && item[i] <= "Z" && willaddmap[item[i].toLowerCase()] == undefined) {
        keylist = keylist + item[i].toLowerCase();
      }
    }
    init();
    value[startx][starty] = [[[startx, starty]], [], 0];
    search(startx, starty);
    while (task.length != 0) {
      var nowtask = task[0];
      task = task.slice(1);
      var ny = nowtask & 1023;
      var nx = nowtask >> 10;
      delete(taskmap[nowtask]);
      //console.log(nx,ny);
      search(nx, ny);
    }
  }

  function search(x, y) {
    var next = getnext(x, y);
    for (var i = 0; i < next.length; i++) {
      var nx = next[i][0];
      var ny = next[i][1];
      var mv = maze[nx][ny];
      var ovalue = value[nx][ny];
      var nvalue = value[x][y];
      var item = nvalue[1];
      var nowcost = nvalue[2];
      var cost;
      if (mv == ".") {
        cost = 1;
      } else if (mv >= "a" && mv <= "z") {
        if (routemap[mv] == undefined) {
          if (keylist.indexOf(mv) >= 0) {
            cost = -99;
            routemap[mv] = 1;
          } else {
            cost = 1;
          }
        }
      } else if (mv >= "A" && mv <= "Z") {
        var lmv = mv.toLowerCase();
        if (item.indexOf(lmv) >= 0) {
          cost = 1;
        } else {
          cost = 101;
        }
      }
      var tcost = nowcost + cost;

      if (tcost < ovalue[2]) {
        var newtaskno = (nx << 10) + ny;
        var queuedtask = taskmap[newtaskno];
        if (queuedtask == undefined) {
          addtask(0, nvalue, nx, ny, mv, tcost, newtaskno);
        } else {
          var queuedtaskvalue = queuedtask[2];
          if (tcost < queuedtaskvalue) {
            addtask(1, nvalue, nx, ny, mv, tcost, newtaskno);
          }
        }
      }
    }
  }

  function addtask(type, nvalue, nx, ny, mv, tcost, newtaskno) {
    var newvalue = [];
    newvalue[0] = nvalue[0].concat([[nx, ny]]);
    if (mv != ".") {
      newvalue[1] = nvalue[1].concat(mv);
    } else {
      newvalue[1] = nvalue[1];
    }
    newvalue[2] = tcost;
    value[nx][ny] = newvalue;
    taskmap[newtaskno] = newvalue;
    if (type == 0) {
      task.push(newtaskno);
    }
  }

  function getnext(x, y) {
    var rett = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    var ret = [];
    for (var i = 0; i < rett.length; i++) {
      if (maze[rett[i][0]]) {
        var tmp = maze[rett[i][0]][rett[i][1]];
        if (tmp == "#" || tmp == undefined) {

        } else {
          ret.push(rett[i]);
        }
      }
    }
    return ret;
  }


  function printout() {
    var vn = value[goalx][goaly];
    var route = vn[0];
    var ret = "";
    for (var i = 0; i < route.length - 1; i++) {
      var from = route[i];
      var to = route[i + 1];
      if (from[0] != to[0]) {
        if (from[0] - 1 == to[0]) {
          ret = ret + "L\n";
        } else {
          ret = ret + "R\n"
        }
      } else {
        if (from[1] - 1 == to[1]) {
          ret = ret + "U\n";
        } else {
          ret = ret + "D\n"
        }
      }
    }
    console.log(ret);
  }

});