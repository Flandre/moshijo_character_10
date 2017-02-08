var outvalue = [];
var body = "";
process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
process.stdin.on('data', function (chunk) {
  var bodya = chunk.split("\n");
  var n = parseInt(bodya[0]);
  var costa = bodya[1].split(" ");
  var costfuture = parseInt(costa[0]);
  var costpast= parseInt(costa[1]);
  var queue = [];
  var ststr = bodya[2];
  var st = [];
  for(var i=0;i<n;i++){
    if(ststr.charAt(i)+""=="s"){
      st[i]=1;
    }else{
      st[i]=0;
    }
  }
  queue.push([[n-1],0,st]);
  var mincost = 99999999;
  var route = [];
  var flag = false;
  while(queue.length>0){
    var now = queue[0];
    queue = queue.slice(1);
    for(var i=0;i<n;i++){
      var his = now[0];
      var oldcost = now[1];
      var nowst = now[2];

      if(nowst[i]==1){
        var lastpoint = his[his.length-1];
        if(lastpoint != i){
          var newhis = [];
          for(var j=0;j<his.length;j++){
            newhis.push(his[j]);
          }
          newhis.push(i);

          var newst = []
          for(var j=0;j<=i;j++){
            newst.push(nowst[j]);
          }
          for(var j=i+1;j<n;j++){
            newst.push(1-nowst[j]);
          }
          var newcost = oldcost;
          if(lastpoint < i){
            newcost = newcost + costfuture;
          }else{
            newcost = newcost + costpast;
          }
          var newpoint = [newhis,newcost,newst];
          var finish = true;
          for(var j=0;j<n;j++){
            if(newhis.indexOf(j)==-1){
              finish = false;
              break;
            }
          }
          if(finish){
            flag = true;
            if(newst[n-1]==0){
              if(i!=0){
                if(costpast < costfuture){
                  var totalcost = newcost + costpast + costfuture;
                  if(totalcost<mincost){
                    mincost = totalcost;
                    route = newhis;
                    route.push(0);
                    route.push(n-1);
                  }
                }else{
                  var can = false;
                  for(var j=i+1;j<n;j++){
                    if(newst[j]==1){
                      can = true;
                      totalcost = newcost + costfuture + costfuture;
                      if(totalcost<mincost){
                        mincost = totalcost;
                        route = newhis;
                        route.push(j);
                        route.push(n-1);
                      }
                      break;
                    }
                  }
                  if(can == false){
                    var totalcost = newcost + costpast + costfuture;
                    if(totalcost<mincost){
                      mincost = totalcost;
                      route = newhis;
                      route.push(0);
                      route.push(n-1);
                    }
                  }
                }
              }else{
                var can = false;
                for(var j=0;j<n;j++){
                  if(newst[j]==1){
                    can = true;
                    totalcost = newcost + costfuture + costfuture;
                    if(totalcost<mincost){
                      mincost = totalcost;
                      route = newhis;
                      route.push(j);
                      route.push(n-1);
                    }
                    break;
                  }
                }
                if(can == false){
                  flag = false;
                }
              }
            }else{
              totalcost = newcost + costfuture;
              if(totalcost<mincost){
                mincost = totalcost;
                route = newhis;
                route.push(n-1);
              }
            }
          }else{
            if(flag == false){
              queue.push(newpoint);
            }
          }
        }
      }
    }
    queue.sort(function(a,b){return a[2]-b[2]});
  }
  var output = "";
  for(var i=0;i<route.length;i++){
    if(output==""){
      output = output + (route[i]+1);
    }else{
      output = output + " " + (route[i]+1);
    }
  }
  console.log(output);
});





















