// 传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，
// 只有当调用的子函数完全执行完毕，才会结束执行父函数。

// 协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，
// 但是只有一个线程（或函数）处于正在运行的状态，
// 其他线程（或函数）都处于暂停态（suspended），
// 线程（或函数）之间可以交换执行权。

// 也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），
// 等到稍后收回执行权的时候，再恢复执行。
// 这种可以并行执行、交换执行权的线程（或函数），就称为协程。

// USAGE

// 由于ECMAScript是单线程语言，只能保持一个调用栈。
// 引入协程以后，每个任务可以保持自己的调用栈。
// 这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。
// 不至于像异步操作的回调函数那样，一旦出错，原始的调用栈早就结束。
