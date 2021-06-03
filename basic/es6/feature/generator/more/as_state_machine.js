// Generator是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。

var ticking = true;
var clock = function() {
  if (ticking)
    console.log('Tick!');
  else
    console.log('Tock!');
  ticking = !ticking;
}
// 上面代码的clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。
// 这个函数如果用Generator实现，就是下面这样。

var clock = function*() {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};
// 上面的Generator实现与ES5实现对比，可以看到少了用来保存状态的外部变量ticking，
// 这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。
// Generator之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。