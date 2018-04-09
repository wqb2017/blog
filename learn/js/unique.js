/**
 * 【1】2个for循环去重
 *
 * @param {any} arr
 * @returns [1, 2, 13, 3, "1", "2"]
 */
function unique1(arr) {
  //返回数组
  var arr2 = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      //返回数组和操作数组的值相等，结束循环，此时的j值刚好和返回数组的长度相等
      if (arr2[j] === arr[i]) {
        break;
      }
    }
    //返回数组和j值相等，则插入该值
    if (arr2.length === j) {
      arr2.push(arr[i]);
    }
  }
  return arr2;
}
/**
 * 【2】indexOf数组去重
 *
 * @param {any} arr
 * @returns [1, 2, 13, 3, "1", "2"]
 */
function unique2(arr) {
  //返回的数组
  var arr2 = [];
  for (var i = 0; i < arr.length; i++) {
    //判断arr2中是否存在arr[i]值，存在不作任何操作，不存在插入该值
    if (arr2.indexOf(arr[i], 0) === -1) {
      arr2.push(arr[i]);
    }
  }
  return arr2;
}
/**
 * 【3】filter去重【filter返回一个新数组】
 *
 * @param {any} arr
 * @returns [1, 2, 13, 3, "1", "2"]
 */
function unique3(arr) {
  return arr.filter(function(item, index, arr) {
    //如果当前元素在原数组中的第一个索引等于当前索引值，则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
/**
 * 【4】先排序后去重
 *
 * @param {any} arr
 * @returns ["1", 1, 13, "2", 2, 3]
 */
function unique4(arr) {
  //数组排序
  var arr = arr.sort();
  //结果数组
  var arr2 = [];
  for (var i = 0; i < arr.length; i++) {
    //第一个数组或者先一个数组值不等于当前数组值，插入该元素
    if (i < 1 || arr[i - 1] !== arr[i]) {
      arr2.push(arr[i]);
    }
  }
  return arr2;
}
/**
 * 【5】sort+filter优化【4】方法
 *
 * @param {any} arr
 * @returns ["1", 1, 13, "2", 2, 3]
 */
function unique5(arr) {
  return arr.sort().filter(function(item, index, arr) {
    return item < 1 || arr[index - 1] !== arr[index];
  });
}
/**
 * 【6】hasOwnProperty【利用：hasWonProperty判断对象中是否存在对应属性，存在返回true否则返回false】
 *
 * @param {any} arr
 * @returns [1, 2, 13, 3]
 */
function unique6(arr) {
  //创建对象
  var obj = {};
  return arr.filter(function(item, index, arr) {
    //判断对象是否存在元素，存在给对象赋值，否则返回false
    return obj.hasOwnProperty(item) ? false : (obj[item] = item);
  });
}
/**
 * 【7】利用es6的new set()方法.【new Set(数组)说明：它时一个类数组方法，但是其成员值都是唯一的；Array.from()可以蒋其他对象转化为数组】
 *
 * @param {any} arr
 * @returns [1, 2, 13, 3, "1", "2"]
 */
function unique7(arr) {
  return Array.from(new Set(arr));
}
/**
 * 【8】蒋【7】采用...操作符重写
 *
 * @param {any} arr
 * @returns [1, 2, 13, 3, "1", "2"]
 */
function unique(arr) {
  return [...new Set(arr)];
}

window.onload = function() {
  var arr = [1, 2, 13, 1, 2, 3, '1', '2'];
  console.log(unique(arr));
};
