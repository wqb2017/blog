/**
 * each循环
 *
 * @param {any} params
 * @param {any} callback
 */
function each(params, callback) {
  //类型
  var _classType = Object.prototype.toString.apply(params);
  //如果是数组，循环用for，否则如果是对象用forin，否则其他值报错
  if (_classType === '[object Array]') {
    for (var i = 0; i < params.length; i++) {
      //回调函数是否为false，是?终止循环, 返回值指向当前项【this】。
      if (callback.call(params[i], i, params[i]) === false) {
        break;
      }
    }
  } else if (_classType === '[object Object]') {
    for (var variable in params) {
      if (params.hasOwnProperty(variable)) {
        if (callback.call(params[variable], variable, params[variable]) === false) {
          break;
        }
      }
    }
  } else {
    throw '第一个参数必须是数组或者是对象！';
  }
}
var arr = [1, 2, 3, 45, 5];
var obj = { a: 'a', b: 'b', c: 'c' };
each(arr, function(index, item) {
  if (index === 1) {
    return false;
  }
  console.log(index + '=' + item);
});
