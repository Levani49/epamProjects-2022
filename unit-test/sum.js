function matchesProperty(path, value) {
  return (obj) => property(path)(obj) === value;
}

function matches(match) {
  return (obj) => {
    const keys = Object.keys(match);
    for (let i = 0; i < keys.length; i++) {
      const property = keys[i];
      if (obj[property] !== match[property]) {
        return false;
      }
    }
    return true;
  };
}

function property(toGetKey) {
  return (obj) => {
    const prps = isArray(toGetKey) ? toGetKey : [join(split(toGetKey))];
    let value = obj;
    for (let i = 0; i < prps.length; i++) {
      value = value[prps[i]];
    }
    return value;
  };
}

function isArray(a) {
  return a instanceof Array;
}

function join(arr) {
  let joinedString = "";
  for (let i = 0; i < arr.length; i++) {
    joinedString += arr[i];
  }
  return joinedString;
}

function split(str) {
  let splittedString = [];
  const dot = ".";
  const index = str.indexOf(dot) === -1 ? 0 : str.indexOf(dot) + 1;
  for (let i = index; i < str.length; i++) {
    splittedString = [...splittedString, str[i]];
  }
  return splittedString;
}

function compact(array) {
  let resIndex = 0;
  const result = [];

  if (array == null) {
    return result;
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

function filter(array, predicate) {
  let index = -1;
  let resIndex = 0;
  const length = array == null ? 0 : array.length;
  const result = [];

  while (++index < length) {
    const value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

function chunk(arr, expanse = 1) {
  const arrayElements = arr instanceof Array ? [...arr] : [];
  const size = expanse && !isNaN(Number(expanse)) ? expanse : 1;
  let result = [];
  for (let i = 0; i < arrayElements.length; i++) {
    const findIndex = Math.floor(i / size);
    if (!result[findIndex]) {
      result[findIndex] = [];
    }
    result[findIndex] = [...result[findIndex], arrayElements[i]];
  }
  return result;
}

function drop(arr, amount = 1) {
  let newArr = [];
  const array = [...Object.values(arr)];
  for (let i = 0; i < array.length; i++) {
    if (i > amount - 1) {
      newArr = [...newArr, array[i]];
    }
  }
  return newArr;
}

function take(arr, n = 1) {
  // if (!(array != null && array.length)) {
  //     return []
  // }
  // return slice(array, 0, n < 0 ? 0 : n)
  const array = [...Object.values(arr)];
  const index = n;
  let res = [];
  for (let i = 0; i < array.length; i++) {
    if (i < index) {
      res = [...res, array[i]];
    }
  }
  return res;
}

function find(array, findBy) {
  let matchType;
  if (typeof findBy === "function") {
    matchType = findBy;
  } else if (findBy instanceof Array) {
    const [key, value] = findBy;
    matchType = matchesProperty(key, value);
  } else if (typeof findBy === "string") {
    matchType = property(findBy);
  } else if (typeof findBy === "object") {
    matchType = matches(findBy);
  } else {
    return matchType;
  }
  for (let i = 0; i < array.length; i++) {
    if (matchType(array[i])) {
      return array[i];
    }
  }
}

// var merge = function(first, second) {
//     var obj = {},
//         i = 0,
//         il = arguments.length,
//         key;
//     for (; i < il; i++) {
//         for (key in arguments[i]) {
//             if (arguments[i].hasOwnProperty(key)) {
//                 obj[key] = arguments[i][key];
//             }
//         }
//     }
//     return obj;
// };

// var object = {
//   'a': [{ 'b': 2 }, { 'd': 4 }]
// };

// var other = {
//   'a': [{ 'c': 3 }, { 'e': 5 }]
// };

// console.log(merge(object, other))

function omit(obj, props) {
  const result = obj;
  for (let i = 0; i < props.length; i++) {
    delete result[props[i]];
  }
  return result;
}

function pick(obj, props) {
  const result = {};
  for (let i = 0; i < props.length; i++) {
    result[props[i]] = obj[props[i]];
  }
  return result;
}

function pickBy(obj, pre) {
  const result = {};
  for (let i in obj) {
    if (pre(obj[i])) {
      result[i] = obj[i];
    }
  }
  return result;
}

function toPairs(obj) {
  return Object.entries(obj);
}

module.exports = {
  chunk,
  compact,
  drop,
  take,
  filter,
  find,
  omit,
  pick,
  pickBy,
  toPairs,
  // export
};
