var num = 0;
var timeout = null;
//节流
function throttle(fn, wait) {
  clearTimeout(timeout);
  console.log(timeout );
  return function(params) {
    setTimeout(fn, wait);
  };
}
//当前元素加加
function numAdd() {
  console.log(num);
  document.getElementById('throttle').innerHTML = num++;
}
//事件
function eventHandle() {
  document.addEventListener('mousemove', throttle(numAdd, 1000));
}
//预加载
window.onload = function(params) {
  eventHandle();
};
