const obj1 = {
  name: 'lisi',
  age: 24
};
const obj2 = {
  name: 'lisi',
  age: 24
};

console.log(JSON.stringify(obj1) === JSON.stringify(obj2)); //true
