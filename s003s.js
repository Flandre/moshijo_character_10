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
  var n1 = parseInt(fla[0]);
  var n2 = parseInt(fla[1]);
  var map = {};
  var finish=false;
  var maparr = [];
  for(var i=0;i<n2;i++){
    var str=linea[i+1];
    var stra = str.split(" ");
    var from = parseInt(stra[0]);
    var to = parseInt(stra[2]);
    var ret = stra[5];
    var eq=1;
    if(ret == "liar."){
      if(from==to){
        finish=true;
        break;
      }
      eq=0;
    }else if(ret == "honest"){
      eq=1;
    }
    if(map[from]==undefined&&map[to]==undefined){
      var mapt = {};
      if(eq==1){
        mapt[from]=1;
        mapt[to]=1;
      }else{
        mapt[from]=1;
        mapt[to]=0;
      }
      map[from]=maparr.length;
      map[to]=maparr.length;
      maparr.push(mapt);
    }else{
      if(map[to]==undefined){
        var c = map[from];
        var cmap = maparr[c];
        if(eq==1){
          cmap[to]=cmap[from];
        }else{
          cmap[to]=1-cmap[from];
        }

        map[to]=c;
      }else if(map[from]==undefined){
        var c = map[to];
        var cmap = maparr[c];
        if(eq==1){
          cmap[from]=cmap[to];
        }else{
          cmap[from]=1-cmap[to];
        }
        map[from]=c;
      }else{
        if(map[from]==map[to]){
          var cmap = maparr[map[from]];
          var c1v = cmap[from];
          var c2v = cmap[to];
          if(eq==1&&c1v==c2v){

          }else if(eq==0&&c1v==1-c2v){

          }else{
            finish = true;
            break;
          }
        }else{
          var c1 = map[from];
          var c2 = map[to];
          var c1map = maparr[c1];
          var c2map = maparr[c2];
          var c1v = c1map[from];
          var c2v = c2map[to];
          if((c1v==c2v&&eq==1)||(c1v==1-c2v&&eq==0)){
            for(var p in c2map){
              map[p]=c1;
              c1map[p]=c2map[p];
            }
          }else{
            for(var p in c2map){
              map[p]=c1;
              c1map[p]=1-c2map[p];
            }
          }

          maparr[c2] = undefined;
        }
      }
    }
  }
  if(finish){
    console.log(-1);
  }else{
    var c=0;
    for(var i=1;i<=n1;i++){
      if(map[i]==undefined){
        c++;
      }
    }
    for(var i=0;i<maparr.length;i++){
      if(maparr[i]){
        c++;
      }
    }
    console.log(c+1);
  }


});

























