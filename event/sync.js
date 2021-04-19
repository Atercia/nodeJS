const events = require('events');
const emitter = new events.EventEmitter();

emitter.on('test',function(){
    console.log(111)
});
emitter.emit('test');
console.log(222)

// 输出
// 111
// 222


/**
 * @AIM “EventEmitter 非异步
 * 会按照监听器注册的顺序同步地调用所有监听器。 
 * 所以必须确保事件的排序正确，且避免竞态条件。”
 */