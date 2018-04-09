/**
 * 浅拷贝
 *
 * @param {any} params
 * @returns
 */
function showllowCopy(params) {
  //传入的值不是数组和对象，直接返回
  if (typeof params !== 'object') return params;
  //是对象返回对象，是数组返回数组
  var newParams = Object.prototype.toString.call(params) === '[object Array]' ? [] : {};
  for (var i = 0; i < params.length; i++) {
    newParams[i] = params[i];
  }
  return newParams;
}
/**
 * 深拷贝
 *
 * @param {any} params
 * @returns
 */
function deepCopy(params) {
  //传入的值不是数组和对象，直接返回
  if (typeof params !== 'object') return params;
  //是对象返回对象，是数组返回数组
  var newParams = Object.prototype.toString.call(params) === '[object Array]' ? [] : {};
  for (var i = 0; i < params.length; i++) {
    newParams[i] = typeof params[i] === 'object' ? deepCopy(params[i]) : params[i];
  }
  return newParams;
}
var arr = [[2, 3], { a: 'a', b: 'b' }, 11, 22, 33];
// var arr = 1111;
// console.log(showllowCopy(arr));
// console.log(deepCopy(arr));
console.log(document.implementation.hasFeature('Core', '0.0'));
console.log(document.implementation.hasFeature('Core', '1.0'));
console.log(document.implementation.hasFeature('Core', '2.0'));
console.log(document.implementation.hasFeature('Core', '3.0'));
console.log(document.implementation.hasFeature('Core', '4.0'));
