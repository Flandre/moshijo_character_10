var nk=[0];
function init(){
  for(var i=1;i<51;i++){
    nk.push(parseInt(6*Math.pow(2,i-1))-3);
  }
}
init()

function run(k,s,t) {
  if (k == 1) {
    return "ABC".substring(s-1, t);
  }
  var uk = nk[k];
  var uk1 = nk[k - 1];
  if (s == 1) {
    return "A" + run(k, s + 1, t);
  } else if (t == uk) {
    if(s==t){
      return "C";
    }else{
      return run(k, s, t - 1) + "C";
    }
  } else if (t == uk1 + 2) {
    return run(k, s, t - 1) + "B";
  } else if (s == uk1 + 2) {
    return "B" + run(k, s + 1, t);
  } else if (t < uk1 + 2) {
    return run(k - 1, s - 1, t - 1);
  } else if (s > uk1 + 2) {
    return run(k - 1, s - uk1 - 2, t - uk1 - 2);
  } else if (s<uk1+2&&t>uk1+2){
    return run(k - 1, s - 1, uk1) + "B" + run(k - 1, 1, t - uk1 - 2);
  } else{
    return "";
  }
}

function si(k,s){
  var uk1 = nk[k-1];
  var r = "";
  if(s==1){
    r = "A";
  }else if(s>1&&s<uk1+2){
    r = si(k-1,s-1)
  }else if(s==uk1+2){
    r = "B";
  }else if(s>uk1+2&&s<2*uk1+3){
    r = si(k-1,s-uk1-2);
  }else if(s==uk1*2+3){
    r = "C";
  }
  return r;
}

function run2(k,s,t){
  var r = ""
  for(var i=s;i<=t;i++){
    r=r+si(k,i);
  }
  return r;
}


function test(){
  var t1 = new Date().getTime();
  var p=1234567;
  for(var i=0;i<1000;i++){
    run(30,p,p+100)
  }
  var t2 = new Date().getTime();
  console.log("time cost:"+(t2-t1));
}

function test2(){
  var t1 = new Date().getTime();
  var p=1234567;
  for(var i=0;i<1000;i++){
    run2(30,p,p+100)
  }
  var t2 = new Date().getTime();
  console.log("time cost:"+(t2-t1));
}

