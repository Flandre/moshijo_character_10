process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！

var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
  run(lines)
});

function getplist(h){
  var pl = 0;
  var pr = h-1;
  var plist = [];
  while(pl<=pr){
    if(pl==pr){
      plist.push(pl);
    }else{
      plist.push(pl);
      plist.push(pr);
    }
    pl++;
    pr--;
  }
  return plist;
}

function run(la){
  var l0 = la[0];
  var l0a = l0.split(" ");
  var h = parseInt(l0a[0]);
  var w = parseInt(l0a[1]);
  var n = parseInt(l0a[2]);
  var ta = [];
  for(var i=0;i<h;i++){
    ta[i]=[];
    for(var j=0;j<w;j++){
      ta[i][j]=0;
    }
  }
  var house = []
  for(var i=1;i<la.length;i++){
    var ld = la[i];
    var lda = ld.split(" ");
    var hd = parseInt(lda[0])
    var wd = parseInt(lda[1])
    var rd = parseInt(lda[2])
    var cd = parseInt(lda[3])

    var size = hd*wd;
    var hs = {wd:wd,hd:hd,rd:rd,cd:cd,size:size,k:i};
    if(rd==1){
      hs.u=1;
      if(cd<wd/2){
        hs.nn=0;
      }else{
        hs.nn=1;
      }
    }
    if(rd==hd){
      hs.d=1;
      if(cd<wd/2){
        hs.nn=0;
      }else{
        hs.nn=1;
      }
    }
    if(cd==1){
      hs.l=1;
      if(cd<hd/2){
        hs.nn=0;
      }else{
        hs.nn=1;
      }
    }
    if(cd==wd){
      hs.r=1;
      if(cd<hd/2){
        hs.nn=0;
      }else{
        hs.nn=1;
      }
    }

    var ff=hs;
    var fromh;
    var toh;
    var fromw;
    var tow;
    if(ff.u){
      fromh = 0-ff.hd;
      toh = 0;
      if(ff.nn==0){
        fromw = 0;
        tow = ff.wd;
      }else{
        fromw = 0-ff.wd;
        tow = 0;
      }
    }else if(ff.d){
      fromh = 0;
      toh = ff.hd;
      if(ff.nn==0){
        fromw = 0;
        tow = ff.wd;
      }else{
        fromw = 0-ff.wd;
        tow = 0;
      }
    }else if(ff.l){
      fromw = 0-ff.wd;
      tow = 0;
      if(ff.nn==0){
        fromh = 0;
        toh = ff.hd;
      }else{
        fromh = 0-ff.hd;
        toh = 0;
      }
    }else if(ff.r){
      fromw = 0;
      tow = ff.wd;
      if(ff.nn==0){
        fromh = 0;
        toh = ff.hd;
      }else{
        fromh = 0-ff.hd;
        toh = 0;
      }
    }
    ff.fromw=fromw;
    ff.fromh=fromh;
    ff.tow=tow;
    ff.toh=toh;

    house.push(ff);
  }
  house.sort(function(a,b){return b.size-a.size});


  var best = {r:0,d:ta};
  var starttime = new Date().getTime();
  for(var i=0;i<1;i++){
    var doorlist = [];
    var nt = getnhouseAndnta(ta,house);
    var nta = nt[0];
    var nhouse = nt[1];
    var ret=runhouse(nta,nhouse,w,h,doorlist,i);
    if(ret.r>best.r){
      best.r = ret.r;
      best.d = ret.d;
    }
    var now = new Date().getTime();
    var sub = now-starttime;
    if(i>7){
      if(now-starttime>16000-sub*1.2){
        break;
      }
    }
  }
  print(best.d);
}

function getnhouseAndnta(ta,house){
  var nta = [];
  var nhouse = [];
  for(var i=0;i<ta.length;i++){
    nta[i]=[];
    for(var j=0;j<ta[i].length;j++){
      nta[i][j]=ta[i][j];
    }
  }
  for(var i=0;i<house.length;i++){
    var hs = house[i];
    var nhs = {};
    for(var p in hs){
      nhs[p]=hs[p];
    }
    nhouse[i]=nhs;
  }
  return [nta,nhouse];
}

function runhouse(ta,house,w,h,doorlist,order){
  if(order==0){
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,-5)
    runhs(order,ta,house,w,h,doorlist,5)
    runhs(order,ta,house,w,h,doorlist,3)
    runhs(order,ta,house,w,h,doorlist,-3)
    runhs(order,ta,house,w,h,doorlist,-4)
  }else if(order==1){
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,-3)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,3)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,-5)
    runhs(order,ta,house,w,h,doorlist,5)
  }else if(order==2){
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,3)
    runhs(order,ta,house,w,h,doorlist,-3)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,5)
    runhs(order,ta,house,w,h,doorlist,-5)
  }else if(order==3){
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,-3)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,3)
  }else if(order==4){
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,3)
    runhs(order,ta,house,w,h,doorlist,5)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,-5)
    runhs(order,ta,house,w,h,doorlist,-3)
  }else if(order==5){
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,3)
    runhs(order,ta,house,w,h,doorlist,5)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,-5)
    runhs(order,ta,house,w,h,doorlist,-3)
  }else if(order==6){
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,3)
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,-3)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,4)
  }else if(order==7){
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,-3)
    runhs(order,ta,house,w,h,doorlist,3)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,1)
  }else if(order==8){
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,-3)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,3)
  }else if(order==9){
    runhs(order,ta,house,w,h,doorlist,-1)
    runhs(order,ta,house,w,h,doorlist,-2)
    runhs(order,ta,house,w,h,doorlist,-4)
    runhs(order,ta,house,w,h,doorlist,-3)
    runhs(order,ta,house,w,h,doorlist,-5)
    runhs(order,ta,house,w,h,doorlist,4)
    runhs(order,ta,house,w,h,doorlist,5)
    runhs(order,ta,house,w,h,doorlist,1)
    runhs(order,ta,house,w,h,doorlist,2)
    runhs(order,ta,house,w,h,doorlist,3)
  }else if(order>=10){
    house.sort(function(){return Math.random()-0.6-0.4/(order/10)});
    if(order%12>=10){
      var arr = [-1,-2,-3,-4,-5,1,2,3,4,5];
      arr.sort(function(){return Math.random()-0.5});
      for(var i=0;i<arr.length;i++){
        runhs(order,ta,house,w,h,doorlist,arr[i]);
      }
    }else{
      runhouse(ta,house,w,h,doorlist,order%12);
    }

  }
  var sum=0;
  for(var y=0;y<ta.length;y++){
    for(var j=0;j<ta[y].length;j++){
      if(ta[y][j]>0){
        sum++;
      }
    }
  }
  return {r:sum,d:ta};

}


function gohouse(order,ta,house,i,q,p,w,h,doorlist){
  var ff = house[i];
  var list;
  if(ff.fromw==0){
    if(ff.fromh==0){
      list=[[0,0],[q,0],[0,p],[q,p]];
    }else{
      list=[[q,0],[0,0],[q,p],[0,p]];
    }
  }else{
    if(ff.fromh==0){
      list=[[0,p],[0,0],[q,p],[q,0]];
    }else{
      list=[[q,p],[q,0],[0,p],[0,0]];
    }
  }
  var hasin = 0;
  for(var m=0;m<list.length;m++){
    if(hasin==0){
      hasin = inserthouse(order,ta,house,i,list[m][0],list[m][1],w-q,h-p,doorlist,w*h);
    }else{
      break;
    }
  }
  if(hasin==1){
    house[i].used=1;
  }


}

function runhs(order,ta,house,w,h,doorlist,type){
  if(type==-1){
    for(var p=0;p<h;p++){
      var q=0;
      for(var i=0;i<house.length;i++) {
        gohouse(order,ta,house,i,q,p,w,h,doorlist)
      }
    }
  }else if(type==-2){
    for(var q=0;q<w;q++){
      var p=0;
      for(var i=0;i<house.length;i++) {
        gohouse(order,ta,house,i,q,p,w,h,doorlist)
      }
    }
  }else if(type==-3){
    for(var p=0;p<h;p++){
      for(var q=0;q<w;q++) {
        for(var i=0;i<house.length;i++){
          gohouse(order,ta,house,i,q,p,w,h,doorlist)
        }
      }
    }
  }else if(type==-4){
    for(var x=0;x<h+w-1;x++){
      for(var q=0;q<=x;q++) {
        var p = x-q;
        for(var i=0;i<house.length;i++){
          gohouse(order,ta,house,i,q,p,w,h,doorlist)
        }
      }
    }
  }else if(type==-5){
    for(var q=0;q<w;q++) {
      for(var p=0;p<h;p++){
        for(var i=0;i<house.length;i++){
          gohouse(order,ta,house,i,q,p,w,h,doorlist)
        }
      }
    }
  }else if(type==1){
    for(var i=0;i<house.length;i++){
      for(var p=0;p<h;p++){
        var q=0;
        gohouse(order,ta,house,i,q,p,w,h,doorlist)
      }
    }
  }else if(type==2){
    for(var i=0;i<house.length;i++){
      for(var q=0;q<w;q++){
        var p=0;
        gohouse(order,ta,house,i,q,p,w,h,doorlist)
      }
    }
  }else if(type==3){
    for(var i=0;i<house.length;i++){
      for(var p=0;p<h;p++){
        for(var q=0;q<w;q++) {
          gohouse(order,ta,house,i,q,p,w,h,doorlist)
        }
      }
    }
  }else if(type==4){
    for(var i=0;i<house.length;i++){
      for(var x=0;x<h+w-1;x++){
        for(var q=0;q<=x;q++) {
          var p = x-q;
          gohouse(order,ta,house,i,q,p,w,h,doorlist)
        }
      }
    }
  }else if(type==5){
    for(var i=0;i<house.length;i++){
      for(var q=0;q<w;q++) {
        for(var p=0;p<h;p++){
          gohouse(order,ta,house,i,q,p,w,h,doorlist)
        }
      }
    }
  }

}


function inserthouse(order,ta,house,k,mleft,mup,mw,mh,doorlist,size){
  var ff = house[k];
  if(ff.used==1){
    return 0;
  }
  //console.log(ff);
  if(ff==undefined){
    return 0;
  }

  var h = mh;
  var w = mw;
  if(ff.hd>h||ff.wd>w){
    return 0;
  }

  var fromw=ff.fromw;
  var tow=ff.tow;
  var fromh=ff.fromh;
  var toh = ff.toh;
  if(order>24){
    if((order%12)<6){
      if(ff.u||ff.d){
        var tmp = fromw;
        fromw = -tow;
        tow = -tmp;
      }else if(ff.l||ff.r){
        var tmp = fromh;
        fromh = -toh;
        toh = -tmp;
      }
    }
  }
  if(fromw<0){
    fromw=fromw+w;
    tow = tow+w;
  }
  if(fromh<0){
    fromh=fromh+h;
    toh=toh+h;
  }



  var willinsert = true;
  for(var i=fromh+mup;i<toh+mup;i++){
    if(willinsert){
      for(var j=fromw+mleft;j<tow+mleft;j++){
        if(ta[i][j]!=0){
          willinsert=false;
          break;
        }
      }
    }else{
      break;
    }
  }
  if(willinsert){
    // if(size>1000&&doorlist.length>1){
    //   var checkc=false;
    //   for(var i=0;i<doorlist.length;i++){
    //     var ex = doorlist[i][0];
    //     var ey = doorlist[i][1];
    //     if(
    //       (ex==fromw+mleft-1&&ey>fromh+mup&&ey<toh+mup-1)||
    //       (ex==tow+mleft+1&&ey>fromh+mup&&ey<toh+mup-1)||
    //       (ey==fromh+mup-1&&ex>fromw+mleft&&ex<tow+mleft-1)||
    //       (ey==tow+mup+1&&ex>fromw+mleft&&ex<tow+mleft-1)
    //     ){
    //       checkc=true;
    //       break;
    //     }
    //   }
    //   if(checkc==true){
    //     return 0;
    //   }
    // }
    for(var i=fromh+mup;i<toh+mup;i++){
      for(var j=fromw+mleft;j<tow+mleft;j++){
        ta[i][j]=ff.k;
      }
    }
    var door = [fromw+mleft+ff.cd-1,fromh+mup+ff.rd-1];
    var check = checkdoor(ta,door,doorlist);
    if(check==0){
      doorlist.push(door);
      return 1;
    }else{
      for(var i=fromh+mup;i<toh+mup;i++){
        for(var j=fromw+mleft;j<tow+mleft;j++){
          ta[i][j]=0;
        }
      }
      return 0;
    }
  }else{
    return 0;
  }
}

function checkdoor(ta,door,doorlist){
  var h = ta.length;
  var w = ta[0].length;
  var doormap = {};
  doorlist.map(function(e){doormap[(e[0]<<10)+e[1]]=1});
  delete(doormap[(door[0]<<10)+door[1]]);
  var q=[];
  q.push(door);
  var goed = {};
  while(q.length>0){
    var point = q.pop();

    var x=point[0];
    var y=point[1];
    goed[(x<<10)+y]=1
    var near=[[x-1,y],[x+1,y],[x,y-1],[x,y+1]];
    near.map(function(e){
      var nx = e[0];
      var ny = e[1];
      if(nx<0||nx>=w||ny<0||ny>=h||goed[(nx<<10)+ny]==1){

      }else{
        if(ta[ny][nx]==0){
          q.push([nx,ny]);
        }
        delete(doormap[(nx<<10)+ny])
      }
    })
  }
  var left = Object.keys(doormap);
  return left.length;
}


function print(ta){
  var r = "";
  for(var i=0;i<ta.length;i++){
    var rd = "";
    var td = ta[i];
    for(var j=0;j<td.length;j++){
      rd = rd + " " + td[j];
    }
    rd = rd.trim();
    r = r + rd + "\n";
  }
  r = r.trim();
  console.log(r);
}

