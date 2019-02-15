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
  }).slice(1).sort((a, b) => b.s - a.s)

  let saveInfos = [].concat(infos)

  let renderCount = 0

  // let tmpArr = [], flag = true
  //
  // while (infos.length){
  //   if(flag){
  //     tmpArr.unshift(infos.shift())
  //   } else {
  //     tmpArr.unshift(infos.pop())
  //   }
  //   flag = !flag
  // }
  // infos = [].concat(tmpArr)

  let drawArr = []

  const isRow = (w, h) => h >= w

  const search = (startLeft, startTop, width, height, dw) => {
    for(let i = 0; i < infos.length; i ++){
      // console.log(infos[i])
      if(dw.has(infos[i].d)){
        /* 门口在的方向刚好有路 */
        var width = width, height = height
        if((infos[i].d == 't' || infos[i].d == 'b') && infos[i].w == width) {
          width --
        }
        if((infos[i].d == 'l' || infos[i].d == 'r') && infos[i].h == height) {
          height --
        }
        if(infos[i].w <= width && infos[i].h <= height){
          switch(infos[i].d){
            case 't':
              if(isRow(width - infos[i].w, height - infos[i].h)){
                /* 1 */
                if(height - infos[i].h >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h,
                    h: height - infos[i].h,
                    w: width - 1,
                    d: new Set(['r'])
                  })
                }
                if(width - (infos[i].w + 1) >=2){
                  drawArr.push({
                    l: startLeft + infos[i].w,
                    t: startTop,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['t', 'r'])
                  })
                }
              } else {
                /* 2 */
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
                    w: infos[i].w,
                    d: new Set(['r'])
                  })
                }
              }
              render(startLeft, startTop, infos[i])
              break
            case 'l':
              if(isRow(width - infos[i].w, height - infos[i].h)){
                /* 3 */
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: width,
                    d: new Set(['l', 't'])
                  })
                }
                if(width - infos[i].w >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w,
                    t: startTop,
                    h: infos[i].h,
                    w: width - infos[i].w,
                    d: new Set(['b'])
                  })
                }
              } else {
                /* 4 */
                if(width - infos[i].w >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w,
                    t: startTop,
                    h: height - 1,
                    w: width - infos[i].w,
                    d: new Set(['b'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h,
                    h: height - (infos[i].h + 1),
                    w: infos[i].w,
                    d: new Set(['b', 'l'])
                  })
                }
              }
              render(startLeft, startTop, infos[i])
              break
            case 'b':
              var tmpSt = startTop + height - infos[i].h
              if(isRow(width - infos[i].w, height - infos[i].h)){
                /* 5 */
                if(height - infos[i].h >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop,
                    h: height - infos[i].h,
                    w: width - 1,
                    d: new Set(['r'])
                  })
                }
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w,
                    t: tmpSt,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['r', 'b'])
                  })
                }
              } else {
                /* 6 */
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: height,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l', 'b'])
                  })
                }
                if(height - infos[i].h >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop,
                    h: height - infos[i].h,
                    w: infos[i].w,
                    d: new Set(['r'])
                  })
                }
              }
              render(startLeft, tmpSt, infos[i])
              break
            case 'r':
              var tmpSl = startLeft + width - infos[i].w
              if(isRow(width - infos[i].w, height - infos[i].h)){
                /* 7 */
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: width,
                    d: new Set(['t', 'r'])
                  })
                }
                if(width - infos[i].w >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop,
                    h: infos[i].h,
                    w: width - infos[i].w,
                    d: new Set(['b'])
                  })
                }
              } else {
                /* 8 */
                if(width - infos[i].w >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop,
                    h: height - 1,
                    w: width,
                    d: new Set(['b'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: tmpSl,
                    t: startTop + infos[i].h,
                    h: height - (infos[i].h + 1),
                    w: infos[i].w,
                    d: new Set(['b', 'r'])
                  })
                }
              }
              render(tmpSl, startTop, infos[i])
              break
          }
          infos.splice(i, 1)
          break
        } else {

        }
      } else {
        /* 门口在的地方没有通路 */
        // let tmpLeft = startLeft, tmpTop = startTop, tmpWidth = infos[i].w, tmpHeight = infos[i].h
        // switch(infos[i].d){
        //   case 't':
        //     tmpTop ++
        //     tmpHeight ++
        //     break
        //   case 'l':
        //     tmpLeft ++
        //     tmpWidth ++
        //     break
        //   case 'b':
        //     tmpHeight ++
        //     break
        //   case 'r':
        //     tmpWidth ++
        //     break
        // }
        if(infos[i].w < width && infos[i].h < height) {
          switch(infos[i].d){
            case 't':
              var tmpStc = startTop
              if(isRow(width - infos[i].w, height - infos[i].h)){
                /* 1 */
                tmpStc = startTop + height - infos[i].h
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop,
                    h: height - (infos[i].h + 1),
                    w: width,
                    d: new Set(['b'])
                  })
                }
                if(width - (infos[i].w + 1) >=2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: tmpStc,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l', 't'])
                  })
                }
              } else {
                /* 2 */
                tmpStc ++
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: tmpStc,
                    h: height - 1,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l', 't'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: tmpStc + infos[i].h,
                    h: height - (infos[i].h + 1),
                    w: infos[i].w,
                    d: new Set(['r'])
                  })
                }
              }
              render(startLeft, tmpStc, infos[i])
              break
            case 'l':
              var tmpSlc = startLeft
              if(isRow(width - infos[i].w, height - infos[i].h)) {
                /* 3 */
                tmpSlc ++
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: tmpSlc,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: width - 1,
                    d: new Set(['t', 'l'])
                  })
                }
                if(width - (infos[i].w + 1) >=2){
                  drawArr.push({
                    l: tmpSlc + infos[i].w,
                    t: startTop,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['b'])
                  })
                }
              } else {
                /* 4 */
                tmpSlc = startLeft + width - infos[i].w
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop,
                    h: height,
                    w: width - (infos[i].w + 1),
                    d: new Set(['r'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: tmpSlc,
                    t: startTop + infos[i].h + 1,
                    h: height - (infos[i].h + 1),
                    w: infos[i].w,
                    d: new Set(['l', 't'])
                  })
                }
              }
              render(tmpSlc, startTop, infos[i])
              break
            case 'b':
              var tmpStc = startTop
              if(isRow(width - infos[i].w, height - infos[i].h)) {
                /* 5 */
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
                    d: new Set(['b', 'l'])
                  })
                }
              } else {
                /* 6 */
                tmpStc = startTop + height - (infos[i].h + 1)
                if(width - (infos[i].w + 1) >= 2){
                  drawArr.push({
                    l: startLeft + infos[i].w + 1,
                    t: startTop,
                    h: height - 1,
                    w: width - (infos[i].w + 1),
                    d: new Set(['l', 'b'])
                  })
                }
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop,
                    h: height - (infos[i].h + 1),
                    w: infos[i].w,
                    d: new Set(['r'])
                  })
                }
              }
              render(startLeft, tmpStc, infos[i])
              break
            case 'r':
              var tmpSlc = startLeft
              if(isRow(width - infos[i].w, height - infos[i].h)){
                /* 7 */
                tmpSlc = startLeft + width - (infos[i].w + 1)
                if(height - (infos[i].h + 1) >= 2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop + infos[i].h + 1,
                    h: height - (startTop + infos[i].h + 1),
                    w: width - 1,
                    d: new Set(['t', 'r'])
                  })
                }
                if(width - (infos[i].w + 1) >=2){
                  drawArr.push({
                    l: startLeft,
                    t: startTop,
                    h: infos[i].h,
                    w: width - (infos[i].w + 1),
                    d: new Set(['b'])
                  })
                }
              } else {
                /* 8 */
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
                    w: infos[i].w,
                    d: new Set(['r', 't'])
                  })
                }
              }
              render(tmpSlc, startTop, infos[i])
              break
          }
          infos.splice(i, 1)
          break
        }
      }
    }
  }

  const render = (startLeft, startTop, info) => {
    renderCount ++
    out.map((x, i) => (i >= startTop && i < startTop + info.h) ? x.fill(info.c, startLeft, startLeft + info.w) : x)
  }

  search(0, 0, MapWidth, MapHeight, new Set())

  while (drawArr.length){
    let pr = drawArr.shift()
    search(pr.l, pr.t, pr.w, pr.h, pr.d)
  }
  /* 低保 */
  if(renderCount == 0){
    out = new Array(MapHeight).fill(0).map(() => new Array(MapWidth).fill(0))
    render(0, 0, saveInfos[0])
  }
  console.log(out.map(x => x.join(' ')).join('\n'))

});