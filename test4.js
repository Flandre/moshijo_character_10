var outvalue = [];
var body = "";
process.stdin.on('data', function (chunk) {
  body+=chunk.toString();
});
process.stdin.on('end', function () {
  var bodya = body.split("\n");
  var n = parseInt(bodya[0]);
  var costa = bodya[1].split(" ");
  var costpast = parseInt(costa[0]);
  var costfuture = parseInt(costa[1]);
  var queue = [];
  var ststr = bodya[2];
  var st = [];
  for(var i=0;i<n;i++){
    if(st.charAt(i)+""=="s"){
      st[i]=1;
    }else{
      st[i]=0;
    }
  }
  queue.push([[n],{},0,st]);
  while(queue.length>0){
    var now = queue[0];
    var his = now[0];
    var map = now[1];
    var oldcost = now[2]
    var nowst = now[3];
    for(var i=0;i<n;i++){
      if(nowst[i]==1){
        var lastpoint = his[his.length-1];
        if(lastpoint != i){
          map[i]=1;
          his.push(i);
          var newst = []
          for(var j=0;j<i;j++){
            newst.push(nowst[i]);
          }
          for(var j=i;i<n;j++){
            newst.push(1-nowst[i]);
          }
          var newcost = oldcost;
          if(lastpoint < i){
            newcost = newcost + costfuture;
          }else{
            newcost = newcost = costpast;
          }
          var newpoint = [his,map,newcost,newst];
          console.log(newpoint);
        }
      }
    }
  }
});





















