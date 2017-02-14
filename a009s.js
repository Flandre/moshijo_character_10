var body = "";
process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
  body += chunk;
});
process.stdin.on('end', function (chunk) {
  var linea = body.split("\n");
  var fl = linea[0];
  var fla = fl.split(" ");
  var width = parseInt(fla[1]);
  var height = parseInt(fla[0]);
  var maze = [];
  var value = [];
  for(var i=-1;i<height+1;i++){
    maze[i]=[];
    value[i] = [];
  }
  var start = [];
  var goal = [];
  for(var i=0;i<height;i++){
    for(var j=0;j<width;j++){
      maze[i][j]=linea[i+1].charAt(j)+"";
    }
  }
  cal();
  function cal(){
    var count=0;
    var x=-1;
    var y=0;
    var direction = "right";
    while(true){
      if(count>0&&(x<0||x>width-1||y<0||y>height-1)){
        break;
      }
      var nx;
      var ny;
      var nd;

      if(direction=="right"){
        nx = x + 1;
        ny = y;
        var road = maze[ny][nx];
        if(road == "_"){
          nd = direction;
        }else if(road == "\\"){
          nd = "down";
        }else if(road == "/"){
          nd = "up";
        }
      }else if(direction=="up"){
        nx = x;
        ny = y-1;
        var road = maze[ny][nx];
        if(road == "_"){
          nd = direction;
        }else if(road == "\\"){
          nd = "left";
        }else if(road == "/"){
          nd = "right";
        }
      }else if(direction=="left"){
        nx = x - 1;
        ny = y;
        var road = maze[ny][nx];
        if(road == "_"){
          nd = direction;
        }else if(road == "\\"){
          nd = "up";
        }else if(road == "/"){
          nd = "down";
        }
      }else if(direction=="down"){
        nx = x;
        ny = y+1;
        var road = maze[ny][nx];
        if(road == "_"){
          nd = direction;
        }else if(road == "\\"){
          nd = "right";
        }else if(road == "/"){
          nd = "left";
        }
      }

      count = count + 1;
      x = nx;
      y = ny;
      direction = nd;


    }
    console.log(count-1);
  }



});

























