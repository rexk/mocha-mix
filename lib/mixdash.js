/**
 * isString returns true if the given value is a string
 * @param   {any}       value     value to be evaluated
 * @return  {boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

function isUndefined(value) {
  return typeof value === 'undefined';
}

function isEmpty(value) {
  if (isUndefined(value)) {
    return true;
  }

  return (!typeof value === 'object' || typeof value === 'function') ?
    !value.size :
    !Object.keys(value).length;
}

function invariant(condition, message) {
  if (condition) {
    console.warn(message);
  }
}

function warnDeprecatedKey(obj, key, message) {
  invariant(typeof obj === 'object' && obj.hasOwnProperty(key), message);
}

module.exports = {
  invariant: invariant,
  isEmpty: isEmpty,
  isString: isString,
  isUndefined: isUndefined,
  warnDeprecatedKey: warnDeprecatedKey
};
