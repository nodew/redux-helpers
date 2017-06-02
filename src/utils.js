export const toCamelCase = (str) => {
  return str.toLowerCase().replace(/((_|-|\/)\w)/ig, (s, p1) => {
    return p1[1].toUpperCase();
  });
}

export const isArray = (value) => {
  return Array.isArray(value);
}

export const isString = (value) => {
  return typeof value === 'string';
}

export const isObject = (value) => {
  return typeof value === 'object';
}

export const isFunction = (value) => {
  return typeof value === 'function';
}