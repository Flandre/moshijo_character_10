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
  run(lines);
});


function run(la){
  var l0 = la[0].trim();
  var l0a = l0.split(" ");
  var n = parseInt(l0a[0]);
  var m = parseInt(l0a[1]);
  var s = parseInt(l0a[2]);
  var a = [];
  for(var i=0;i<n;i++){
    a[i]=[];
  }
  for(var i=1;i<=n;i++){
    var ld = la[i];
    for(var j=0;j<n;j++){


      a[i-1][j] = (ld.charAt(j)==".")?-1:parseInt(ld.charAt(j));
    }
  }
  // pp(a);
  // console.log(n,m,s);
  var mm=[];
  for(var i=1;i<=s;i++){
    mm[i]={g:0,l:100,r:0,u:100,d:0};
  }
  for(var i=0;i<n;i++){
    for(var j=0;j<n;j++){
      var d = a[i][j];
      if(d>0){
        if(mm[d].l>j){
          mm[d].l=j;
        }
        if(mm[d].r<j){
          mm[d].r=j;
        }
        if(mm[d].u>i){
          mm[d].u=i;
        }if(mm[d].d<i){
          mm[d].d=i
        }
      }

    }
  }
  for(var i=1;i<=s;i++){
    mm[i].x1=Math.max(Math.min(mm[i].l,mm[i].r-m+1),0);
    mm[i].x2=Math.min(Math.max(mm[i].l,mm[i].r-m+1),n-m);
    mm[i].y1=Math.max(Math.min(mm[i].u,mm[i].d-m+1),0);
    mm[i].y2=Math.min(Math.max(mm[i].u,mm[i].d-m+1),n-m)
  }
  // return;
  var rr = [];
  for(var z=1;z<=s;z++) {
    for (var q = 1; q <= s; q++) {
      if(mm[q].g==1){
        continue;
      }
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          var d = a[i][j];
          if (d == q || d == 0) {
            if (i>=mm[q].y1&&i<=mm[q].y2) {
              if (j>=mm[q].x1&&j<=mm[q].x2) {
                if (mm[q].g == 0) {
                  var can = true;

                  if (i <= n - m && j <= n - m) {
                    for (var w = 0; w < m; w++) {
                      for (var e = 0; e < m; e++) {
                        var ed = a[w + i][e + j]
                        if (ed == q || ed == 0) {

                        } else {
                          can = false;

                          break;
                        }
                      }
                      if (can == false) {
                        break;
                      }
                    }
                  } else {
                    can = false;
                  }
                  if (can) {
                    mm[q].g = 1;
                    for (var w = 0; w < m; w++) {
                      for (var e = 0; e < m; e++) {
                        a[w + i][e + j] = 0;
                      }
                    }
                    rr.push(q + " " + (j + 1) + " " + (i + 1));
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  for(var i=1;i<=s;i++){
    if(mm[i].g==0){
      var wr = i+rr[0].substring(1);
      rr.push(wr);
      mm[i].g=1;
    }
  }

  var rrr = "";
  rr.reverse();

  for(var i=0;i<rr.length;i++){
    rrr=rrr+rr[i]+"\n";
  }
  console.log(rrr.trim());



}

function pp(a){
  var r=""
  for(var i=0;i<a.length;i++){
    for(var j=0;j<a[i].length;j++){
      r=r+""+a[i][j];
    }
    r=r+"\n";
  }
  console.log(r);
}