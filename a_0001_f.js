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
  let sp = lines[0].split(' '), MapHeight = ~~sp[0], MapWidth = ~~sp[1]
  let out = new Array(MapHeight).fill(0).map(() => new Array(MapWidth).fill(0))
  let infos = lines.map((x, i) => {
    let spx = x.split(' ')
    return {
      h: ~~spx[0],
      w: ~~spx[1],
      d: ~~spx[2] == 1 ? 't' : ~~spx[2] == ~~spx[0] ? 'b' : ~~spx[3] == 1 ? 'l' : ~~spx[3] == ~~spx[1] ? 'r' : 'e',
      c: i,
      s: ~~spx[0] * ~~spx[1]
    }
  }).slice(1).sort((a, b) => b.size - a.size)

  let startLeft = 0, startTop = 0, renderCount = 0, drawArr = []

  const search = (startLeft, startTop, width, height, dw) => {
    for(let i = 0; i < infos.length; i ++){
      if(dw.has(infos[i].d)){
        if(infos[i].w <= width && infos[i].h <= height){
          render(startLeft, startTop, infos[i])
          switch(infos[i].d){
            case 't':
              if(height - (startTop + infos[i].h + 2) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 2,
                  h: height - (startTop + infos[i].h + 2),
                  w: width,
                  d: new Set(['t'])
                })
              }
              if(width - (startLeft + infos[i].w + 1) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w + 1,
                  t: startTop + 1,
                  h: infos[i].h,
                  w: width - (infos[i].w + 1),
                  d: new Set(['t', 'l', 'b'])
                })
              }
              break
            case 'l':
              if(height - (startTop + infos[i].h + 1) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 1,
                  h: height - (startTop + infos[i].h + 1),
                  w: width,
                  d: new Set(['t', 'l'])
                })
              }
              if(width - (startLeft + infos[i].w + 1) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w + 1,
                  t: startTop + 1,
                  h: infos[i].h,
                  w: width - (infos[i].w + 1),
                  d: new Set(['l', 'b'])
                })
              }
              break
            case 'b':
              if(height - (startTop + infos[i].h + 1) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 1,
                  h: height - (startTop + infos[i].h + 1),
                  w: width,
                  d: new Set(['t'])
                })
              }
              if(width - (startLeft + infos[i].w + 1) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w + 1,
                  t: startTop + 1,
                  h: infos[i].h,
                  w: width - (infos[i].w + 1),
                  d: new Set(['l', 'b'])
                })
              }
              break
            case 'r':
              if(height - (startTop + infos[i].h + 1) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 1,
                  h: height - (startTop + infos[i].h + 1),
                  w: width,
                  d: new Set(['t'])
                })
              }
              if(width - (startLeft + infos[i].w + 1) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w + 1,
                  t: startTop + 1,
                  h: infos[i].h,
                  w: width - (infos[i].w + 1),
                  d: new Set(['l', 'b'])
                })
              }
              break
          }
          infos.splice(i, 1)
          break
        }
      } else {
        let tmpLeft = startLeft, tmpTop = startTop, tmpWidth = infos[i].w, tmpHeight = infos[i].h
        switch(infos[i].d){
          case 't':
            tmpTop ++
            tmpHeight ++
            break
          case 'l':
            tmpLeft ++
            tmpWidth ++
            break
          case 'b':
            tmpHeight ++
            break
          case 'r':
            tmpWidth ++
            break
        }
        if(tmpWidth <= width && tmpHeight <= height) {
          render(tmpLeft, tmpTop, infos[i])
          switch(infos[i].d){
            case 't':
              if(height - (startTop + infos[i].h + 2) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 2,
                  h: height - (startTop + infos[i].h + 2),
                  w: width,
                  d: new Set(['t'])
                })
              }
              if(width - (startLeft + infos[i].w + 1) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w + 1,
                  t: startTop,
                  h: infos[i].h + 1,
                  w: width - (infos[i].w + 1),
                  d: new Set(['l', 'b'])
                })
              }
              break
            case 'l':
              if(height - (startTop + infos[i].h + 1) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 1,
                  h: height - (startTop + infos[i].h + 1),
                  w: width,
                  d: new Set(['t'])
                })
              }
              if(width - (startLeft + infos[i].w + 1) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w + 1,
                  t: startTop,
                  h: infos[i].h,
                  w: width - (infos[i].w + 1),
                  d: new Set(['b'])
                })
              }
              break
            case 'b':
              if(height - (startTop + infos[i].h + 1) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 1,
                  h: height - (startTop + infos[i].h + 1),
                  w: width,
                  d: new Set(['t'])
                })
              }
              if(width - (startLeft + infos[i].w) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w,
                  t: startTop,
                  h: infos[i].h,
                  w: width - infos[i].w,
                  d: new Set(['b'])
                })
              }
              break
            case 'r':
              if(height - (startTop + infos[i].h + 1) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 1,
                  h: height - (startTop + infos[i].h + 1),
                  w: width,
                  d: new Set(['t'])
                })
              }
              if(width - (startLeft + infos[i].w + 1) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w + 1,
                  t: startTop,
                  h: infos[i].h,
                  w: width - (infos[i].w + 1),
                  d: new Set(['l', 'b'])
                })
              }
              break
          }
          infos.splice(i, 1)
          break
        }
      }
    }
  }

  const render = (startLeft, startTop, info) => {
    out.map((x, i) => (i >= startTop && i < startTop + info.h) ? x.fill(info.c, startLeft, startLeft + info.w) : x)
  }

  search(startLeft, startTop, MapWidth, MapHeight, new Set())

  while (drawArr.length){
    let pr = drawArr.shift()
    search(pr.l, pr.t, pr.w, pr.h, pr.d)
  }

  console.log(out.map(x => x.join(' ')).join('\n'))

});