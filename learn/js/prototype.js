/**
 * @Func 构造函数
 * @Func.prototype 原型
 * @func1 func2 实例对象
 */
function Func(param) {}
const func1 = new Func('func1');
const func2 = new Func('func2');

function demo(params) {
  /**
   * Object.getPrototypeOf(实例对象)
   * @可以通过Object.getPrototypeOf(实例对象)来获取构造函数的原型
   */
  console.log(Object.getPrototypeOf(func1) === Func.prototype); //true
  /**
   * 原型返回两个对象，分别如下
   * @__proto__
   * @constructor
   */
  console.log(Func.prototype);
  /**
   * constructor
   * @构造函数Func的原型Func.prototype属性constructor值指向构造函数Func
   * @但是并没有指向实例func1
   */
  console.log(Func.prototype.constructor === Func); //true
  console.log(Func.prototype.constructor === func1); //false
  /**
   * prototype
   * @说明实例对象和构造函数都指向对象
   */
  console.log(func1.__proto__ === Func.prototype); //true
  console.log(func2.__proto__ === Func.prototype); //true
  console.log(func1.__proto__ === func2.__proto__); //true
}

/**__proto__
 * @Func 构造函数
 * @Func.prototype 原型
 * @func1 func2 实例对象
 */
function Func(name) {
  this.name = name;
  this.age = 20;
}
const func1 = new Func('func1');
func1.name = 'func1-name';
/**
 * 实例和原型
 * @当获取实例属性或者方法时，若实例中属性和方法不存在，则会查找原型中的属性和方法
 * @所有对象的最顶层构造对象都是Object
 * @Object.prototype原型为null，也就是说Object.prototype是没有原型的
 */
console.log(func1.name); //func1-name
console.log(func1.age); //20
console.log(Func.prototype.__proto__ === Object.prototype); //true
console.log(Object.prototype.constructor === Object); //true
console.log(Object.prototype.__proto__); //null
