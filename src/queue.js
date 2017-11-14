/*
  1. Add a constructor with a storage structure; there are multiple options you could use for this
  2. Add a size getter that returns the number of items the queue is storing
  3. Add an `enqueue` method that accepts an item as input and adds it to the storage structure
  4. Add a `dequeue` method that removes the item in the queue that was added earliest
*/
class Queue {
  constructor() {
    this.first = null;
    this.queueArray = [];
    this.length = 0;
  }

  enqueue(value) {
    this.queueArray.push(value);
    this.first = this.queueArray[0];
    this.length++;
  }

  dequeue() {
    this.first = this.queueArray[1];
    const dequeueValue = this.queueArray.shift();
    if (this.queueArray.length === 0) {
      this.length = 0;
    } else {
      this.length--;
    }
    return dequeueValue;
  }

  get size() {
    return this.length;
  }
}

module.exports = Queue;
