// throw方法被捕获以后，会附带执行下一条yield语句。也就是说，会附带执行一次next方法。

var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b
g.next() // c

// 一旦Generator执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。
// 如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，
// 即JavaScript引擎认为这个Generator已经运行结束了。