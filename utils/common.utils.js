const debounce = (callback, duration, immediate) => {
  let timer = null
  debounced = function (...args) {
    let result
    let ctx = this
    timer && clearTimeout(timer)
    if (immediate) {
      let hasCalled = !!timer
      timer = setTimeout(() => {
        timer = null
      }, duration)
      if (!hasCalled) {
        result = callback.apply(ctx, args)
      }
    } else {
      timer = setTimeout(() => {
        callback.apply(ctx, args)
      }, duration)
    }
    return result
  }
  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

const deepClone = (obj) => {
  // obj为空或者obj不为对象,直接返回
  if (!obj || typeof obj !== 'object') {
    return obj
  }
  // 如果有splice方法说明该对象是数组
  let result = typeof obj.splice === 'function' ? [] : {}
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      result[key] = deepClone(obj[key])
    } else {
      result[key] = obj[key]
    }
  }
  return result
}

export {
  debounce,
  deepClone
}