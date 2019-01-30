const isObject = (val) => {
  return val !== null && typeof val === 'object' && isArray(val) === false
}

const isArray = (val) => {
  return Object.prototype.toString.call(val) === '[object Array]';
}