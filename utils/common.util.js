export default {
  debounce: function (callback, duration, immediate) {
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
}