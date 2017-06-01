export const createType = (type, namespace) => {
  if (typeof type === 'string') {
    return namespace ? `${namespace}_${type}` : type;
  }
  throw new Error('type should be a string');
}

const joinMethod = (obj, type, namespace) => {
  const actionType = createType(type, namespace);
  obj[actionType] = actionType;
  return obj;
}

export const createTypes = (types = [], namespace = '', join = joinMethod) => {
  if (Array.isArray(types)) {
    return types.reduce((acc, type) => {
      if (typeof type === 'string') {
        return join(acc, type, namespace);
      }
      throw new Error('types should be [string]');
    }, {})
  }

  throw new Error('types should be [string]');
};

export const createAsyncType = (type, namespace = '') => {
  return createTypes([type, `${type}_SUCCESS`, `${type}_FAIL`], namespace);
}

const asyncJoinMethod = (obj, type, namespace) => {
  return Object.assign({}, obj, {
    ...createAsyncType(type, namespace)
  });
}

export const createAsyncTypes = (types = [], namespace = '') => {
  return createTypes(types, namespace, asyncJoinMethod);
};