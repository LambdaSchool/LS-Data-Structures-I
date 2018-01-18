/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

// LimitedArray, and getIndexBelowMax are two tools provided for you in the helper file.
// There are other methods on the LimitedArray class in the './hash-table-helpers' file that you can use for your implementation.

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  checkCapacity() {
    let slotCounter = 0;
    this.storage.each((bucket) => {
      if (bucket) slotCounter++;
    });
    return (slotCounter / this.limit) >= 0.75;
  }

  resize() {
    this.limit *= 2;
    const oldTable = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldTable.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.checkCapacity()) this.resize();

    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    if (bucket === undefined) {
      this.storage.set(index, [[key, value]]);
      return;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        this.storage.set(index, bucket);
        return;
      }
    }

    bucket.push([key, value]);
    this.storage.set(index, bucket);
  }

  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    if (!bucket) return;

    if (bucket.length === 1) {
      this.storage.set(index, undefined);
      this.sizeCounter--;
      return;
    }

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.storage.set(index, bucket);
      }
    }
  }

  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    if (!bucket) return;
    // for (let i = 0; i < bucket.length; i++) {
    //   if (bucket[i][0] === key) {
    //     return bucket[i][1];
    //   }
    // }
    const found = bucket.find((pair) => {
      return pair[0] === key;
    });
    return found[1];
  }
}

module.exports = HashTable;
