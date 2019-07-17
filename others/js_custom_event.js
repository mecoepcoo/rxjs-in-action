class EventManager {}

EventManager.prototype.$emit = function(name, val) {
  const em = this;
  if (em[name]) {
    em[name].map(fn => fn(val));
  }
};

EventManager.prototype.$on = function(name, fn) {
  const em = this;
  if (!em[name]) {
    em[name] = [];
  }
  em[name].push(fn);
};

EventManager.prototype.$off = function(name, fn) {
  const em = this;
  if (em[name]) {
    if (fn) {
      let i = em[name].indexOf(fn);
      i > -1 ? em[name].splice(i, 1) : em[name].splice(i, 1, fn);
    } else {
      em[name].length = 0;
    }
  }
};

EventManager.prototype.$once = function(name, fn) {
  const em = this;
  function on () {
    em.$off(name);
    fn.apply(em, arguments);
  }
  em.$on(name, on);
};

function testOn() {
  let em = new EventManager();
  em.$on('tick', (data) => {
    console.log('data: ', data);
  });
  em.$emit('tick', '1'); // data: 1
  em.$emit('tick', '2'); // data: 2
  em.$off('tick');
  em.$emit('tick', '3'); // no output
}
console.log('testOn: ');
testOn();

function testOffFn() {
  let em = new EventManager();
  em.$on('tick2', (data) => {
    console.log('data: ', data);
  });
  em.$emit('tick2', '1'); // data: 1
  em.$emit('tick2', '2'); // data: 2
  em.$off('tick2', (data) => {
    console.log('replaced data: ', data)
  });
  em.$emit('tick2', '3'); // replaced data: 3
}
console.log('\ntestOffFn: ');
testOffFn();

function testOnce() {
  let em = new EventManager();
  em.$once('tick3', (data) => {
    console.log('data: ', data);
  });
  em.$emit('tick3', '1'); // data: 1
  em.$emit('tick3', '2'); // no output
}
console.log('\ntestOnce: ');
testOnce();
