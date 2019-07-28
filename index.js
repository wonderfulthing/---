// 手动实现new
// function NewOperation(){
//     let newObj = Object.create(null);
//     let construct = Array.from(arguments).shift();
//     newObj._proto_ = construct.prototype;
//     let result = construct.apply(newObj,Array.from(arguments).splice(1));
//     console.log(result)
//     if(typeof result === 'object'){
//         return result
//     }else{
//         return newObj;
//     }
// }
// function Person(name,age){
//     this.name = name;
//     this.age = age;
//     return this.name+this.age+'return'
// }
// let obj = NewOperation(Person,'www',21);
// console.log(obj)


// async function test(resolve){
//     setTimeout(() => {
//         resolve('100')
//     }, 1000);
// }
// async function start(){
//     console.time('start')
//     let value = await test();
//     console.timeEnd('start')
//     console.log(value)
// }
// start();
// 变量提升的原因：
// 在创建阶段，函数声明存储在环境中，而变量会被设置为 undefined（在 var 的情况下）
// 或保持未初始化（在 let 和 const 的情况下）。
// 所以这就是为什么可以在声明之前访问 var 定义的变量（尽管是 undefined ），
// 但如果在声明之前访问 let 和 const 定义的变量就会提示引用错误的原因。这就是所谓的变量提升。
// var a = '1'
// let b = '2'
// function test(){
//     var c = '3'
//     d = '4'
// }
// test();
// console.log(a,b,d);
// fn 是需要执行的函数
// wait 是时间间隔
// const throttle = (fn, wait = 50) => {
//     // 上一次执行 fn 的时间
//     let previous = 0
//     // 将 throttle 处理结果当作函数返回
//     return function(...args) {
//       // 获取当前时间，转换成时间戳，单位毫秒
//       let now = +new Date()
//       // 将当前时间和上一次执行函数的时间进行对比
//       // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
//       if (now - previous > wait) {
//         previous = now
//         fn.apply(this, args)
//       }
//     }
//   }
  
//   // DEMO
//   // 执行 throttle 函数返回新函数
//   const betterFn = throttle(() => console.log('fn 函数执行了'), 1000)
//   // 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
//   setInterval(betterFn, 10)


  // 手动实现建议版promise
  // function promise () {
  //   this.status = 'pending' // 2.1
  //   this.msg = '' // 存储value与reason
  //   let process = arguments[0],
  //        that = this
  //   process (function () {
  //     that.status = 'resolve'
  //     that.msg = argument[0]
  //   }, function () {
  //     that.status = 'reject'
  //     that.msg = argument[0]
  //   })
  //   return this
  // }
  
  // promise.prototype.then = function () {
  //   if (this.status === 'resolve') {
  //     arguments[0](this.msg)
  //   } else if (this.status === 'reject' && arguments[1]) {
  //     arguments[1](this.msg)
  //   }
  // }



  // 手动实现bind函数
  // if (!Function.prototype.bind) {
  //   Function.prototype.bind = function(oThis) {
  //     if (typeof this !== 'function') {
  //       // closest thing possible to the ECMAScript 5
  //       // internal IsCallable function
  //       throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  //     }
  
  //     var aArgs   = Array.prototype.slice.call(arguments, 1),
  //         fToBind = this,
  //         fNOP    = function() {},
  //         fBound  = function() {
  //           // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
  //           return fToBind.apply(this instanceof fBound
  //                  ? this
  //                  : oThis,
  //                  // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
  //                  aArgs.concat(Array.prototype.slice.call(arguments)));
  //         };
  
  //     // 维护原型关系
  //     if (this.prototype) {
  //       // Function.prototype doesn't have a prototype property
  //       fNOP.prototype = this.prototype; 
  //     }
  //     // 下行的代码使fBound.prototype是fNOP的实例,因此
  //     // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
  //     fBound.prototype = new fNOP();
  
  //     return fBound;
  //   };
  // }




// 自己简易实现

  Function.prototype.bind2 = function(othis){
    let bindthis = this;
    return function(){
      bindthis.apply(othis,Array.prototype.slice.call(arguments,1))
    }
  }
function test(){
  console.log(this.name)
  function a(){
    console.log(process,global)
    debugger;
  }
  a();

};
let obj1 = {
  name:'obj1'
},
obj2={
  name:'obj2'
}
test.call(obj1);
let testF = test.bind2(obj2);
testF();

