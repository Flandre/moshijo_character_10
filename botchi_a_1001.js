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
  var ud = 0;
  var uw = 0;
  var ta = [];
  for(var i=0;i<h;i++){
    ta[i]=[];
    for(var j=0;j<w;j++){
      ta[i][j]=0;
    }
  }
  var sh=0;
  var sw=0;
  var gg = {};
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
    house.push(hs);
  }
  house.sort(function(a,b){return b.size-a.size});


  var best = {r:0,d:ta};

  for(var i=0;i<6;i++){
    var doorlist = [];
    var nt = getnhouseAndnta(ta,house);
    var nta = nt[0];
    var nhouse = nt[1];
    var ret=runhouse(nta,nhouse,w,h,doorlist,i);
    if(ret.r>best.r){
      best.r = ret.r;
      best.d = ret.d;
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
    runhs(ta,house,w,h,doorlist,-1)
    runhs(ta,house,w,h,doorlist,-2)
    runhs(ta,house,w,h,doorlist,1)
    runhs(ta,house,w,h,doorlist,2)
    runhs(ta,house,w,h,doorlist,4)
    runhs(ta,house,w,h,doorlist,3)
  }else if(order==1){
    runhs(ta,house,w,h,doorlist,-2)
    runhs(ta,house,w,h,doorlist,-1)
    runhs(ta,house,w,h,doorlist,2)
    runhs(ta,house,w,h,doorlist,1)
    runhs(ta,house,w,h,doorlist,3)
    runhs(ta,house,w,h,doorlist,4)
  }else if(order==2){
    runhs(ta,house,w,h,doorlist,-2)
    runhs(ta,house,w,h,doorlist,-1)
    runhs(ta,house,w,h,doorlist,1)
    runhs(ta,house,w,h,doorlist,2)
    runhs(ta,house,w,h,doorlist,3)
    runhs(ta,house,w,h,doorlist,4)
  }else if(order==3){
    runhs(ta,house,w,h,doorlist,-1)
    runhs(ta,house,w,h,doorlist,-2)
    runhs(ta,house,w,h,doorlist,2)
    runhs(ta,house,w,h,doorlist,1)
    runhs(ta,house,w,h,doorlist,4)
    runhs(ta,house,w,h,doorlist,3)
  }else if(order==4){
    runhs(ta,house,w,h,doorlist,-1)
    runhs(ta,house,w,h,doorlist,-2)
    runhs(ta,house,w,h,doorlist,3)
    runhs(ta,house,w,h,doorlist,1)
    runhs(ta,house,w,h,doorlist,2)
    runhs(ta,house,w,h,doorlist,4)
  }else if(order==5){
    runhs(ta,house,w,h,doorlist,-2)
    runhs(ta,house,w,h,doorlist,-1)
    runhs(ta,house,w,h,doorlist,4)
    runhs(ta,house,w,h,doorlist,2)
    runhs(ta,house,w,h,doorlist,3)
    runhs(ta,house,w,h,doorlist,1)
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

function runhs(ta,house,w,h,doorlist,type){
  if(type==-1){
    for(var p=0;p<h;p++){
      var q=0;
      for(var i=0;i<house.length;i++) {
        var hasin = 0;
        if(hasin==0){
          hasin = inserthouse(ta,house,i,q,p,w-q,h-p,doorlist);
        }
        if(hasin==0){
          hasin = inserthouse(ta,house,i,0,0,w-q,h-p,doorlist);
        }
        if(hasin==1){
          house[i].used=1;
        }
      }
    }
  }else if(type==-2){
    for(var q=0;q<w;q++){
      var p=0;
      for(var i=0;i<house.length;i++) {
        var hasin = 0;
        if(hasin==0){
          hasin = inserthouse(ta,house,i,q,p,w-q,h-p,doorlist);
        }
        if(hasin==0){
          hasin = inserthouse(ta,house,i,0,0,w-q,h-p,doorlist);
        }
        if(hasin==1){
          house[i].used=1;
        }
      }
    }
  }else if(type==1){
    for(var i=0;i<house.length;i++){
      var hasin = 0;
      for(var p=0;p<h;p++){
        var q=0;
        if(hasin==0){
          hasin = inserthouse(ta,house,i,q,p,w-q,h-p,doorlist);
        }
        if(hasin==0){
          hasin = inserthouse(ta,house,i,0,0,w-q,h-p,doorlist);
        }
        if(hasin==1){
          house[i].used=1;
        }
      }
    }
  }else if(type==2){
    for(var i=0;i<house.length;i++){
      var hasin = 0;
      for(var q=0;q<w;q++){
        var p=0;
        if(hasin==0){
          hasin = inserthouse(ta,house,i,q,p,w-q,h-p,doorlist);
        }
        if(hasin==1){
          house[i].used=1;
        }
      }
    }
  }else if(type==3){
    for(var i=0;i<house.length;i++){
      var hasin = 0;
      for(var p=0;p<h;p++){
        for(var q=0;q<w;q++) {
          if (hasin == 0) {
            hasin = inserthouse(ta, house, i, q, p, w - q, h - p, doorlist);
          }
          if (hasin == 0) {
            hasin = inserthouse(ta, house, i, 0, 0, w - q, h - p, doorlist);
          }
          if (hasin == 1) {
            house[i].used = 1;
          }
        }
      }
    }
  }else if(type==4){
    for(var i=0;i<house.length;i++){
      var hasin = 0;
      for(var x=0;x<h+w-1;x++){
        for(var q=0;q<=x;q++) {
          var p = x-q;
          if (hasin == 0) {
            hasin = inserthouse(ta, house, i, q, p, w - q, h - p, doorlist);
          }
          if (hasin == 0) {
            hasin = inserthouse(ta, house, i, 0, 0, w - q, h - p, doorlist);
          }
          if (hasin == 1) {
            house[i].used = 1;
          }
        }
      }
    }
  }

}


function inserthouse(ta,house,k,mleft,mup,mw,mh,doorlist){
  var ff = house[k];
  if(ff.used==1){
    return 0;
  }
  //console.log(ff);
  if(ff==undefined){
    return 0;
  }
  var fromh;
  var toh;
  var fromw;
  var tow;
  var h = mh;
  var w = mw;
  if(ff.hd>h||ff.wd>w){
    return 0;
  }

  if(ff.u){
    fromh = h-ff.hd;
    toh = h;
    if(ff.nn==0){
      fromw = 0;
      tow = ff.wd;
    }else{
      fromw = w-ff.wd;
      tow = w;
    }
  }else if(ff.d){
    fromh = 0;
    toh = ff.hd;
    if(ff.nn==0){
      fromw = 0;
      tow = ff.wd;
    }else{
      fromw = w-ff.wd;
      tow = w;
    }
  }else if(ff.l){
    fromw = w-ff.wd;
    tow = w;
    if(ff.nn==0){
      fromh = 0;
      toh = ff.hd;
    }else{
      fromh = h-ff.hd;
      toh = h;
    }
  }else if(ff.r){
    fromw = 0;
    tow = ff.wd;
    if(ff.nn==0){
      fromh = 0;
      toh = ff.hd;
    }else{
      fromh = h-ff.hd;
      toh = h;
    }
  }
  // var backupta = [];
  // for(var i=0;i<ta.length;i++){
  //   backupta[i]=[];
  //   for(var j=0;j<ta[i].length;j++){
  //     backupta[i][j]=ta[i][j];
  //   }
  // }

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
        var pp = ta[ny][nx];
        if(pp==0){
          q.push([nx,ny]);
        }
        delete(doormap[(nx<<10)+ny])
      }
    })
  }
  var left = Object.keys(doormap);
  //console.log("length:"+left.length)
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

