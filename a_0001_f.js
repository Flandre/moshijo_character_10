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

  let drawArr = []

  const isRow = (w, h) => h >= w

  const search = (startLeft, startTop, width, height, dw) => {
    for(let i = 0; i < infos.length; i ++){
      if(dw.has(infos[i].d)){
        /* 门口在的方向刚好有路 */
        if(infos[i].w <= width && infos[i].h <= height){
          render(startLeft, startTop, infos[i])
          switch(infos[i].d){
            case 't':
              if(isRow(width - (infos[i].w + 1), height - (infos[i].h + 1))){
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: width,
                    d: new Set(['t'])
                  })
                }
                if(width - (infos[i].w + 1) >=2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['t', 'l', 'b'])
                  })
                }
              } else {
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: height,
                    w: width - (infos[i].w + 1),
                    d: new Set(['t', 'l'])
                  })
                }
                if(height - infos[i].h >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h,
                    h: height - infos[i].h,
                    w: infos[w],
                    d: new Set(['r'])
                  })
                }
              }
              break
            case 'l':
              if(isRow(width - infos[i].w, height - infos[i].h)){
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: width,
                    d: new Set(['l', 't'])
                  })
                }
                if(width - (infos[i].w) >=2){
                  drawArr.push({
                    l: startLeft + infos[i].w,
                    t: startTop,
                    h: infos[i].h,
                    w: width - infos[i].w,
                    d: new Set(['b'])
                  })
                }
              } else {
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: height,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: infos[w],
                    d: new Set(['r', 't', 'l'])
                  })
                }
              }
              break
            case 'b':
              /* 不存在下方 */
              // if(height - (infos[i].h + 1) >= 2){
              //   drawArr.push({
              //     l: startLeft,
              //     t: startTop + infos[i].h + 1,
              //     h: height - (infos[i].h + 1),
              //     w: width,
              //     d: new Set(['t'])
              //   })
              // }
              if(width - (infos[i].w + 1) >=2){
                drawArr.push({
                  l: startLeft + infos[i].w + 1,
                  t: startTop,
                  h: infos[i].h,
                  w: width - (infos[i].w + 1),
                  d: new Set(['b', 'l'])
                })
              }
              break
            case 'r':
              if(height - (infos[i].h + 1) >= 2){
                drawArr.push({
                  l: startLeft,
                  t: startTop + infos[i].h + 1,
                  h: height - (infos[i].h + 1),
                  w: width,
                  d: new Set(['t', 'r'])
                })
              }
              /* 不存在右方 */
              // if(width - (infos[i].w + 1) >=2){
              //   drawArr.push({
              //     l: startLeft + infos[i].w + 1,
              //     t: startTop,
              //     h: infos[i].h,
              //     w: width - (infos[i].w + 1),
              //     d: new Set(['l', 'b'])
              //   })
              // }
              break
          }
          infos.splice(i, 1)
          break
        }
      } else {
        /* 门口在的地方没有通路 */
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
              if(isRow(width - infos[i].w, height - infos[i].h)){
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 2,
                    h: height - (infos[i].h + 2),
                    w: width,
                    d: new Set(['t'])
                  })
                }
                if(width - (infos[i].w + 1) >=2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: infos[i].h + 1,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l', 'b'])
                  })
                }
              } else {
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: height,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l'])
                  })
                }
                if(height - (infos[i].h + 2) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 2,
                    h: height - (infos[i].h + 2),
                    w: infos[w],
                    d: new Set(['r', 't'])
                  })
                }
              }
              break
            case 'l':
              if(isRow(width - (infos[i].w + 1), height - infos[i].h)) {
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: width,
                    d: new Set(['t'])
                  })
                }
                if(width - (infos[i].w) >=2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['b'])
                  })
                }
              } else {
                if(width - (infos[i].w + 2) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 2,
                    t: startTop,
                    h: height,
                    w: width - (infos[i].w + 2),
                    d: new Set(['l'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: infos[w],
                    d: new Set(['r', 't'])
                  })
                }
              }
              break
            case 'b':
              if(isRow(width - infos[i].w, height - (infos[i].h + 1))) {
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (startTop + infos[i].h + 1),
                    w: width,
                    d: new Set(['t'])
                  })
                }
                if(width - (infos[i].w + 1) >=2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['b', 'l'])
                  })
                }
              } else {
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: height,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: infos[w],
                    d: new Set(['r', 't'])
                  })
                }
              }
              break
            case 'r':
              if(isRow(width - infos[i].w, height - infos[i].h)){
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (startTop + infos[i].h + 1),
                    w: width,
                    d: new Set(['t'])
                  })
                }
                if(width - (infos[i].w + 1) >=2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l', 'b'])
                  })
                }
              } else {
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: height,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: infos[w],
                    d: new Set(['r', 't'])
                  })
                }
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

  search(0, 0, MapWidth, MapHeight, new Set())

  while (drawArr.length){
    let pr = drawArr.shift()
    search(pr.l, pr.t, pr.w, pr.h, pr.d)
  }

  console.log(out.map(x => x.join(' ')).join('\n'))

});