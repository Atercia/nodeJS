// const EventEmitter = require("events").EventEmitter
// const emitter = new EventEmitter()
const events = require('events');
const emitter = new events.EventEmitter();

emitter.on("test", (t) => {
  console.log("TEST_EE", t)
})
emitter.emit("test", "params")
