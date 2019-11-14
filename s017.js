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
  var param = lines[0].split(' ').map(d => parseInt(d)), floorArr = [], itemInfos = new Array(param[2] + 1).fill({}).map((a, i) => {
    return {
      item: i,
      count: 0,
      xpos: 0,
      ypos: 0,
    }
  })
  for(let i = 1; i <= param[0]; i ++){
    let line = lines[i].split('')
    floorArr.push(line)
    line.forEach(l => {
      if(l != '.') {
        itemInfos[l].count ++
      }
    })
  }
  for(let i = 1; i <= param[2]; i++){
    // console.log('=========')
    // console.log(i)
    // console.log(checkItem(floorArr, param[0], param[1], i, itemInfos))
    // console.log(itemInfos[i])
    let tmp = Object.assign(itemInfos[i], checkItem(floorArr, param[0], param[1], i, itemInfos))
    // console.log(tmp)
    itemInfos[i] = tmp
  }
  // console.log(JSON.stringify(itemInfos))
  // console.log(itemInfos)
  itemInfos.shift()

  // console.log(JSON.stringify(itemInfos))
  // console.log(itemInfos)

  /* empty */
  let empty = [], normal = []
  for(let i = 0; i < itemInfos.length; i ++) {
    if(itemInfos[i].count == 0) {
      empty.push(itemInfos[i])
    } else {
      normal.push(itemInfos[i])
    }
  }

  // console.log('infos')
  // console.log(normal)
  // console.log('empty')
  // console.log(empty)
  itemInfos = normal

  let out = [], count = 0

  // console.log(itemInfos.length)
  while (itemInfos.length > count){
    // console.log(count)
    for(let i = 0; i < itemInfos.length; i++){
      // console.log(Object.keys(itemInfos[i].obj))
      if(Object.keys(itemInfos[i].obj).length == 1 && !itemInfos[i].destory){
        out.push({
          item: itemInfos[i].item,
          xpos: itemInfos[i].xpos,
          ypos: itemInfos[i].ypos,
        })
        itemInfos.forEach(item => delete(item.obj[itemInfos[i].item]))
        itemInfos[i].destory = true
        // console.log('===========')
        // console.log(itemInfos)
        // itemInfos.splice(i, 1)
        break
      }
    }
    count ++
    // console.log(JSON.stringify(itemInfos))
    // console.log(itemInfos)
  }
  out.reverse()
  out.splice(out.length - 1, 0, ...empty.map(d => Object.assign(d, {xpos: out[out.length-1].xpos, ypos: out[out.length - 1].ypos})))

  // console.log(out)
  console.log(out.map(d => `${d.item} ${d.xpos + 1} ${d.ypos + 1}`).join('\n'))

});

const checkItem = (floorArr, floorSize, itemSize,  item, itemInfos) => {
  if(itemInfos[item].count > 0) {
    for(let i = 0; i <= floorSize - itemSize; i ++){
      for(let j = 0; j <= floorSize - itemSize; j++){
        let obj = checkRect(floorArr, itemSize, j, i)
        if(obj[item] == itemInfos[item].count && !obj['.']){
          // console.log(i, j)
          return {
            xpos: j,
            ypos: i,
            obj: obj
          }
        }
      }
    }
  } else {
    for(let i = 0; i <= floorSize - itemSize; i ++){
      for(let j = 0; j <= floorSize - itemSize; j++){
        let obj = checkRect(floorArr, itemSize, j, i)
        if(!obj['.']){
          // console.log(i, j)
          return {
            xpos: j,
            ypos: i,
            obj: obj
          }
        }
      }
    }
  }

}

const checkRect = (floorArr, itemSize, x, y) => {
  let obj = {}
  for(let i = y; i < y + itemSize; i++){
    for(let j = x; j < x + itemSize; j++){
      let item = floorArr[i][j]
      obj[item] ? obj[item] ++ : obj[item] = 1
    }
  }
  return obj
}
