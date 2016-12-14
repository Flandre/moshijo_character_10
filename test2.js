/**
 * Created by lishuo on 16-12-14.
 */
var teststr = "15 20 10\n";
teststr = teststr + "###.####.####.######\n";
teststr = teststr + "#gI.#.jE.#.e#.#..h.#\n";
teststr = teststr + "###.####.##H#.####B#\n";
teststr = teststr + "....................\n";
teststr = teststr + ".J#.####.###.#######\n";
teststr = teststr + "..#.#..#.#aD.#d....#\n";
teststr = teststr + ".####..#.###.###G###\n";
teststr = teststr + "....#f.#............\n";
teststr = teststr + "#C###A######.#.#####\n";
teststr = teststr + "#.#......#.###.....#\n";
teststr = teststr + "#.#.####.....#.....#\n";
teststr = teststr + "#i#.#..#.#.#.#.....#\n";
teststr = teststr + "#...#.bF.#.#...c...#\n";
teststr = teststr + "#.#.#..#.#.#.#.....#\n";
teststr = teststr + "###.####.###.#######\n";
teststr = teststr + "16 2\n";
teststr = teststr + "2 14";


var test2 = "3 3 1\n";
test2 = test2 + "..a\n";
test2 = test2 + "#CA\n";
test2 = test2 + "..#\n";
test2 = test2 + "1 1\n";
test2 = test2 + "1 3";


var test3 = "12 15 2\n";
test3 = test3 + ".#..#.#.##.#...\n";
test3 = test3 + "...##.A....##.#\n";
test3 = test3 + ".###..###.###.#\n";
test3 = test3 + "....###....#...\n";
test3 = test3 + "#.#......#...#.\n";
test3 = test3 + "..#.##.#..#.##.\n";
test3 = test3 + "..##...#.#..##.\n";
test3 = test3 + "..###.#...#....\n";
test3 = test3 + "B####...######.\n";
test3 = test3 + ".###b.##..#..#.\n";
test3 = test3 + ".###.#.##.#..#.\n";
test3 = test3 + "..#.a........#.\n";
test3 = test3 + "15 12\n";
test3 = test3 + "1 12\n";


var chunka = test3.split("\n");
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


var maze = [];
for (var i = 0; i < width; i++) {
  maze[i] = [];
}
for (var i = 0; i < height; i++) {
  for (var j = 0; j < width; j++) {
    maze[j][i] = chunka[i + 1].charAt(j) + "";
  }
}

var value = [];
for (var i = 0; i < width; i++) {
  value[i] = [];
}
for (var i = 0; i < width; i++) {
  for (var j = 0; j < height; j++) {
    value[i][j] = [[], [], 999999];
  }
}
value[startx][starty] = [[[startx, starty]], [], 0];


var task = [];
var taskmap = {};

dotask();
printout();

function dotask(){
  search(startx, starty);
  while(task.length!=0){
    var nowtask = task[0];
    task=task.slice(1);
    delete(taskmap[[nowtask[0],nowtask[1]]]);
    search(nowtask[0],nowtask[1]);
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
      cost = 1;
    } else if (mv >= "A" && mv <= "Z") {
      var lmv = mv.toLowerCase();
      if (item.indexOf(lmv.charAt(0)) >= 0) {
        cost = 1;
      } else {
        cost = 101;
      }
    }
    if(taskmap[[nx,ny]]==undefined){
      if (nowcost + cost < ovalue[2]) {
        var newvalue = [];
        newvalue[0] = nvalue[0].concat([[nx, ny]]);
        newvalue[1] = nvalue[1].concat(mv);
        newvalue[2] = nowcost + cost;
        value[nx][ny] = newvalue;
        task.push([nx,ny]);
        taskmap[[nx,ny]]=newvalue;
      }
    }
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


