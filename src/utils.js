export const toCamelCase = (str) => {
  return str.toLowerCase().replace(/((_|-|\/)\w)/ig, (s, p1) => {
    return p1[1].toUpperCase();
  });
}

export const isArray = (obj) => {
  return Array.isArray(obj);
}

export const isString = (str) => {
  return typeof str === 'string';
}

export const isObject = (obj) => {
  return typeof obj === 'object';
}

export const isFunction = (fn) => {
  return typeof fn === 'function';
}