# 8 种常用数组去重

## 第一种 【两个 for 循环】

思路：

1. 新建一个为空的结果数组
2. 外层 for 遍历原数组，内层循环遍历返回数组
3. 判断内层循环数组当前元素和外层数组元素的值是否相等，是？退出内层循环
4. 经过第二部后，此时内层循环数组的索引值和返回数组的长度正好相等，外层数组元素也是唯一的。

```js
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
```

## 第二种 【indexOf 数组去重】

思路：

1. 新建一个空的结果数组
2. for 循环原数组
3. 判断结果数组是否存在当前元素，存在不作操作，不存在压入结果数组

```js
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
```

## 第三种 【filter 去重】

思路：

1. 使用 filter 返回一个新数组
2. 返回满足：当前元素在原数组中的第一个索引等于当前索引值，则返回当前元素

```js
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
```

## 第四种 【先排序后去重】

思路：

1. 新建一个空的结果数组
2. 对原数组先排序，排序后的数组，相等元素紧邻排序
3. 判断相邻数组元素是否相等或者是否为第一个数组元素，是压入结果数组

```js
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
```

## 第五种 【sort+filter】

思路：思路就是对第三和第四种方法的结合啦，道理一样。

```js
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
```

## 第六种 【hasOwnProperty】

思路：这种方法主要是利用对象 hasOwnProperty 判断是否存在对象属性

```js
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
```

## 第七种 【利用 es6 的 new set()方法】

思路：利用【new Set(数组)说明：它时一个类数组方法，但是其成员值都是唯一的；Array.from()可以蒋其他对象转化为数组】

```js
/**
 * 【7】es6的new set()
 *
 * @param {any} arr
 * @returns [1, 2, 13, 3, "1", "2"]
 */
function unique7(arr) {
  return Array.from(new Set(arr));
}
```

## 第八种 【new Set 和 es6 的...运算符】

```js
/**
 * 【8】蒋【7】采用...操作符重写
 *
 * @param {any} arr
 * @returns [1, 2, 13, 3, "1", "2"]
 */
function unique(arr) {
  return [...new Set(arr)];
}
```

好了，写完后验证一下是否正确：

```js
window.onload = function() {
  var arr = [1, 2, 13, 1, 2, 3, '1', '2'];
  console.log(unique(arr));
};
```

上面的每个方法的返回值就是调用当前方法时，返回值。
