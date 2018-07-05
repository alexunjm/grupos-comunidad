/**
  @author
  Alexander Jaramillo
  alexunjm@gmail.com
 */

export let GLOBAL = {
  url: {
    dataResource: 'assets/data/',
    /* api: 'http://localhost:3800/api/test' */
    /* api: 'http://192.168.1.60:8100/api/test' */
  }
};

export const _arr = initArr => ({
  min: () => Math.min(...initArr),
  max: () => Math.max(...initArr),
  reverse: () => [...initArr].reverse(),
  push: newElm => {
    const newArr = [...initArr];
    newArr.push(newElm);
    return newArr;
  },
  each: fn => {
    for (let index = 0; index < initArr.length; index++) {
      fn(initArr[index], index, initArr);
    }
  },
  eachFrom: (index, fn) => {
    for (; index < initArr.length; index++) {
      fn(initArr[index], index, initArr);
    }
  },
  eachTo: (toIndex, fn) => {
    for (let index = 0; index < toIndex; index++) {
      fn(initArr[index], index, initArr);
    }
  },
  map: fn => {
    const newArr = [];
    _arr(initArr).each((elm, index, initArr) =>
      newArr.push(fn(elm, index, initArr))
    );
    return newArr;
  },
  map2: fn =>
    _arr(initArr).reduce(
      (acc, elm, index, initArr) => _arr(acc).push(fn(elm, index, initArr)),
      []
    ),
  joinMap: fn => {
    const newArr = [];
    _arr(initArr).eachFrom(1, (elm, index, initArr) => {
      newArr.push(fn(initArr[index - 1], elm, index, initArr));
    });
    return newArr;
  },
  joinMap2: fn =>
    _arr(initArr).reduce(
      (acc, elm, index, initArr) =>
        index > 0 ? _arr(acc).push(fn(initArr[index - 1], elm, index, initArr)) : acc,
      []
    ),
  reduce: (fn, initialValue) => {
    let acc = initialValue || 0;
    _arr(initArr).each((elm, index, initArr) => {
      acc = fn(acc, elm, index, initArr);
    });
    return acc;
  },
  flatMap: fn =>
    _arr(initArr).reduce(
      (acc, x, index, arr) => acc.concat(fn(x, index, arr)),
      []
    ),
  sum: () => _arr(initArr).reduce((prev, curr) => prev + curr, 0),
  avg: () => _arr(initArr).sum() / initArr.length,
  contains: (elms, fn) =>
    elms.every(testElm =>
      initArr.some(srcElm => (fn ? fn(srcElm, testElm) : srcElm === testElm))
    )
});
