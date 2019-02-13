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

  inserthouse(ta,house,0);

  print(ta);
}

function inserthouse(ta,house,k){
  var ff = house[k];
  var fromh;
  var toh;
  var fromw;
  var tow;
  var h = ta.length;
  var w = ta[0].length;
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

  for(var i=fromh;i<toh;i++){
    for(var j=fromw;j<tow;j++){
      ta[i][j]=ff.k;
    }
  }
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

