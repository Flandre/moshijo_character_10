var outvalue = [];

process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {

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
  var chars = 'abcdefghijklmnopqrstuvwxyz';
  var maze = [];
  for (var i = 0; i < width; i++) {
    maze[i] = [];
  }
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var c = chunka[i + 1].charAt(j);
      if (c >= "a" && c <= "z") {
        keymap[c] = getKeyByXY(j,i);
      }
      if (c >= "A" && c <= "Z") {
        keymap[c] = getKeyByXY(j,i);
      }
      maze[j][i] = c + "";
    }
  }

  var value = {};
  var valueR = {};
  var task = [];
  var taskmap = {};
  var maxdmg = 999999;
  var save = [];
  var keylist = "";
  var routemap = {};

  outvalue = value;
  function init() {
    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        if(maze[i][j]!="#"){
          value[getKeyByXY(i,j)] = [[], "", maxdmg,[getKeyByXY(goalx,goaly)]];
        }
      }
    }
    task = [];
    taskmap = {};
    routemap = {};
    value[getKeyByXY(startx,starty)] = [[getKeyByXY(startx,starty)], "", 0,[getKeyByXY(goalx,goaly)]];
  }

  function initR() {
    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        if(maze[i][j]!="#"){
          valueR[getKeyByXY(i,j)] = [[], "", maxdmg,[getKeyByXY(startx,starty)]];
        }
      }
    }
    task = [];
    taskmap = {};
    routemap = {};
    valueR[getKeyByXY(goalx,goaly)] = [[getKeyByXY(goalx,goaly)], "", 0,[getKeyByXY(startx,starty)]];

  }


  run();

  function run(){
    for(var k=0;k<4;k++){
      dotask(1);
      var item = value[getKeyByXY(goalx,goaly)][1];
      for (var i = 0; i < item.length; i++) {
        if (item[i] >= "A" && item[i] <= "Z" && keylist.indexOf(item[i].toLowerCase())==-1) {
          keylist = keylist + item[i].toLowerCase();
          var kv = value[keymap[item[i].toLowerCase()]][1];
          for(var j=0;j<kv.length;j++){
            var ch = kv.charAt(j)+"";
            if (ch >= "A" && ch <= "Z" && keylist.indexOf(ch.toLowerCase())==-1) {
              keylist = keylist + ch.toLowerCase();
            }
          }
        }
      }
    }
    dotask(1);
  }

  function bestroute(){
    var mindmg = 999999;
    var point;
    for(var p in value){
      var v1 = value[p];
      var v2 = valueR[p];
      var i1 = v1[1];
      var i2 = v2[1];
      var item = i1 + i2.split('').reverse().join('');
      var dmg1 = v1[2];
      var dmg2 = v2[2];
      console.log(p);
      console.log(v1);
      console.log(v2);
      console.log(item,dmg1,dmg2);
      console.log('');
    }
  }

  printout();
  function dotask(type){
    if(type==1){
      init();
    }else{
      initR();
    }
    if(type==1){
      search(startx,starty,type);
    }else{
      search(goalx,goaly,type);
    }
    while(task.length>0){
      var xykey;
      xykey = task[0];
      task=task.slice(1);

      delete(taskmap[xykey]);
      var xy = getXYByKey(xykey);
      search(xy[0],xy[1],type);
    }
  }


  function search(x,y,type){
    var rv;
    if(type==1){
      rv=value;
    }else{
      rv=valueR;
    }
    var xykey = getKeyByXY(x,y);
    var xyvalue = rv[xykey];
    var oroute = xyvalue[0];
    var odmg = xyvalue[2];
    var oitem = xyvalue[1];
    var orevroute = xyvalue[3];
    var nexts = getnext(x,y);
    for(var i=0;i<nexts.length;i++){
      var nx = nexts[i][0];
      var ny = nexts[i][1];
      var nxykey = getKeyByXY(nx,ny);
      var nvalue = rv[nxykey];
      var mv = maze[nx][ny];
      var ndmg = nvalue[2];
      var cost;
      if(mv>='a'&&mv<='z'){
        if(keylist.indexOf(mv)>=0){
          if(oitem.indexOf(mv)>=0){
            cost=1;
          }else{
            cost=-99;
          }
        }else{
          if(oitem.indexOf(mv)>=0){
            cost=1;
          }else{
            cost=1;
          }
        }
      }else if(mv>='A'&&mv<='Z'){
        if(oitem.indexOf(mv.toLowerCase())>=0){
          cost=1;
        }else{
          cost=101;
        }
      }else{
        cost=1;
      }

      if(odmg+cost<ndmg){
        var newroute = oroute.concat([nxykey]);
        var newdmg = odmg+cost;
        var newitem;
        if(mv!='.'){
          newitem = oitem+mv;
        }else{
          newitem = oitem;
        }
        rv[nxykey]=[newroute,newitem,newdmg,orevroute];
        if(!taskmap[nxykey]){
          taskmap[nxykey]=1;
          inserttask(nxykey,type);
        }
      }
    }
  }


  function inserttask(nxykey,type){
    if(type==1){
      rv=value;
    }else{
      rv=valueR;
    }
    var newdmg = rv[nxykey][2];
    var insert = false;
    for(var i=0;i<task.length;i++){
      if(rv[task[i]][2]>newdmg){
        task.splice(i,0,nxykey);
        insert = true;
        break;
      }
    }
    if(insert==false){
      task.push(nxykey);
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
    var vn = value[getKeyByXY(goalx,goaly)];
    var route = vn[0];
    var ret = "";
    for (var i = 0; i < route.length - 1; i++) {
      var fromint = getXYByKey(route[i]);

      var from = [fromint[0],fromint[1]];
      var toint = getXYByKey(route[i+1]);
      var to = [toint[0],toint[1]];
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




  function getKeyByXY(x,y){
    return (x+1)+1000*(y+1);
  }

  function getXYByKey(xykey){
    return [xykey%1000-1,Math.floor(xykey/1000)-1];
  }







});