/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
module phosphor.collections.algorithm {

/**
 * Find the index of the first occurrence of a value in an array.
 *
 * @param array - The array of values to be searched.
 *
 * @param value - The value to locate in the array.
 *
 * @param fromIndex - The starting index of the search. If this value
 *   is negative, it is taken as an offset from the end of the array.
 *   If the adjusted value is still negative, it is clamped to `0`.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *   If `true` and the end of the array is reached without finding the
 *   value, the search will wrap to the front of the array and continue
 *   until one before `fromIndex`.
 *
 * @returns The index of the first occurrence of `value` in `array`,
 *   or `-1` if `value` is not in `array`.
 *
 * #### Notes
 * Values are compared using the strict equality `===` operator.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * var data = ['zero', 'one', 'two', 'three', 'two', 'one', 'zero'];
 * algo.indexOf(data, 'two');           // 2
 * algo.indexOf(data, 'two', 3);        // 4
 * algo.indexOf(data, 'two', -4);       // 4
 * algo.indexOf(data, 'two', 5);        // -1
 * algo.indexOf(data, 'two', 5, true);  // 2
 * ```
 *
 * **See also** [[lastIndexOf]] and [[findIndex]].
 */
export
function indexOf<T>(array: T[], value: T, fromIndex = 0, wrap = false): number {
  var len = array.length;
  if (len === 0) {
    return -1;
  }
  fromIndex = fromIndex | 0;
  if (fromIndex < 0) {
    fromIndex += len;
    if (fromIndex < 0) {
      fromIndex = 0;
    }
  }
  if (wrap) {
    for (var i = 0; i < len; ++i) {
      var j = (i + fromIndex) % len;
      if (array[j] === value) {
        return j;
      }
    }
  } else {
    for (var i = fromIndex; i < len; ++i) {
      if (array[i] === value) {
        return i;
      }
    }
  }
  return -1;
}


/**
 * Find the index of the last occurrence of a value in an array.
 *
 * @param array - The array of values to be searched.
 *
 * @param value - The value to locate in the array.
 *
 * @param fromIndex - The starting index of the search. If this value
 *   is negative, it is taken as an offset from the end of the array.
 *   If this value is positive, it is clamped to `array.length - 1`.
 *
 * @param wrap - Whether the search wraps around at the front of the
 *   array. If `true` and the front of the array is reached without
 *   finding the value, the search will wrap to the end of the array
 *   and continue until one after `fromIndex`.
 *
 * @returns The index of the last occurrence of `value` in `array`,
 *   or `-1` if `value` is not in `array`.
 *
 * #### Notes
 * Values are compared using the strict equality `===` operator.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * var data = ['zero', 'one', 'two', 'three', 'two', 'one', 'zero'];
 * algo.lastIndexOf(data, 'two');           // 4
 * algo.lastIndexOf(data, 'two', 3);        // 2
 * algo.lastIndexOf(data, 'two', -4);       // 2
 * algo.lastIndexOf(data, 'two', 1);        // -1
 * algo.lastIndexOf(data, 'two', 1, true);  // 4
 * ```
 *
 * **See also** [[indexOf]] and [[findLastIndex]].
 */
export
function lastIndexOf<T>(array: T[], value: T, fromIndex = -1, wrap = false): number {
  var len = array.length;
  if (len === 0) {
    return -1;
  }
  fromIndex = fromIndex | 0;
  if (fromIndex < 0) {
    fromIndex += len;
  } else if (fromIndex >= len) {
    fromIndex = len - 1;
  }
  if (wrap) {
    for (var i = len; i > 0; --i) {
      var j = (((i + fromIndex) % len) + len) % len;
      if (array[j] === value) {
        return j;
      }
    }
  } else {
    for (var i = fromIndex; i >= 0; --i) {
      if (array[i] === value) {
        return i;
      }
    }
  }
  return -1;
}


/**
 * Find the index of the first value in an array which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search. If this value
 *   is negative, it is taken as an offset from the end of the array.
 *   If the adjusted value is still negative, it is clamped to `0`.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *   If `true` and the end of the array is reached without finding the
 *   value, the search will wrap to the front of the array and continue
 *   until one before `fromIndex`.
 *
 * @returns The index of the first matching value, or `-1` if no value
 *   matches the predicate.
 *
 * #### Notes
 * The range of visited indices is set before the first invocation of
 * `pred`. It is not safe for `pred` to change the length of `array`.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * algo.findIndex(data, isEven);           // 1
 * algo.findIndex(data, isEven, 4);        // 5
 * algo.findIndex(data, isEven, -4);       // 3
 * algo.findIndex(data, isEven, 6);        // -1
 * algo.findIndex(data, isEven, 6, true);  // 1
 * ```
 *
 * **See also** [[findLastIndex]] and [[indexOf]].
 */
export
function findIndex<T>(array: T[], pred: IPredicate<T>, fromIndex = 0, wrap = false): number {
  var len = array.length;
  if (len === 0) {
    return -1;
  }
  fromIndex = fromIndex | 0;
  if (fromIndex < 0) {
    fromIndex += len;
    if (fromIndex < 0) {
      fromIndex = 0;
    }
  }
  if (wrap) {
    for (var i = 0; i < len; ++i) {
      var j = (i + fromIndex) % len;
      if (pred(array[j], j)) {
        return j;
      }
    }
  } else {
    for (var i = fromIndex; i < len; ++i) {
      if (pred(array[i], i)) {
        return i;
      }
    }
  }
  return -1;
}


/**
 * Find the index of the last value in an array which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search. If this value
 *   is negative, it is taken as an offset from the end of the array.
 *   If this value is positive, it is clamped to `array.length - 1`.
 *
 * @param wrap - Whether the search wraps around at the front of the
 *   array. If `true` and the front of the array is reached without
 *   finding the value, the search will wrap to the end of the array
 *   and continue until one after `fromIndex`.
 *
 * @returns The index of the last matching value, or `-1` if no value
 *   matches the predicate.
 *
 * #### Notes
 * The range of visited indices is set before the first invocation of
 * `pred`. It is not safe for `pred` to change the length of `array`.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * algo.findLastIndex(data, isEven);           // 5
 * algo.findLastIndex(data, isEven, 4);        // 3
 * algo.findLastIndex(data, isEven, -5);       // 1
 * algo.findLastIndex(data, isEven, 0);        // -1
 * algo.findLastIndex(data, isEven, 0, true);  // 5
 * ```
 *
 * **See also** [[findIndex]] and [[lastIndexOf]].
 */
export
function findLastIndex<T>(array: T[], pred: IPredicate<T>, fromIndex = -1, wrap = false): number {
  var len = array.length;
  if (len === 0) {
    return -1;
  }
  fromIndex = fromIndex | 0;
  if (fromIndex < 0) {
    fromIndex += len;
  } else if (fromIndex >= len) {
    fromIndex = len - 1;
  }
  if (wrap) {
    for (var i = len; i > 0; --i) {
      var j = (((i + fromIndex) % len) + len) % len;
      if (pred(array[j], j)) {
        return j;
      }
    }
  } else {
    for (var i = fromIndex; i >= 0; --i) {
      if (pred(array[i], i)) {
        return i;
      }
    }
  }
  return -1;
}


/**
 * Find the first value in an array which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search. If this value
 *   is negative, it is taken as an offset from the end of the array.
 *   If the adjusted value is still negative, it is clamped to `0`.
 *
 * @param wrap - Whether the search wraps around at the end of the array.
 *   If `true` and the end of the array is reached without finding the
 *   value, the search will wrap to the front of the array and continue
 *   until one before `fromIndex`.
 *
 * @returns The first matching value, or `undefined` if no value matches
 *   the predicate.
 *
 * #### Notes
 * The range of visited indices is set before the first invocation of
 * `pred`. It is not safe for `pred` to change the length of `array`.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * algo.find(data, isEven);           // 2
 * algo.find(data, isEven, 4);        // 2
 * algo.find(data, isEven, -5);       // 4
 * algo.find(data, isEven, 6);        // undefined
 * algo.find(data, isEven, 6, true);  // 2
 * ```
 *
 * **See also** [[findLast]] and [[binaryFind]].
 */
export
function find<T>(array: T[], pred: IPredicate<T>, fromIndex?: number, wrap?: boolean): T {
  var i = findIndex(array, pred, fromIndex, wrap);
  return i !== -1 ? array[i] : void 0;
}


/**
 * Find the last value in an array which matches a predicate.
 *
 * @param array - The array of values to be searched.
 *
 * @param pred - The predicate function to apply to the values.
 *
 * @param fromIndex - The starting index of the search. If this value
 *   is negative, it is taken as an offset from the end of the array.
 *   If this value is positive, it is clamped to `array.length - 1`.
 *
 * @param wrap - Whether the search wraps around at the front of the
 *   array. If `true` and the front of the array is reached without
 *   finding the value, the search will wrap to the end of the array
 *   and continue until one after `fromIndex`.
 *
 * @returns The last matching value, or `undefined` if no value matches
 *   the predicate.
 *
 * #### Notes
 * The range of visited indices is set before the first invocation of
 * `pred`. It is not safe for `pred` to change the length of `array`.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * function isEven(value: number): boolean {
 *   return value % 2 === 0;
 * }
 *
 * var data = [1, 2, 3, 4, 3, 2, 1];
 * algo.findLast(data, isEven);           // 2
 * algo.findLast(data, isEven, 4);        // 4
 * algo.findLast(data, isEven, -1);       // 2
 * algo.findLast(data, isEven, 0);        // undefined
 * algo.findLast(data, isEven, 0, true);  // 2
 * ```
 *
 * **See also** [[find]] and [[binaryFindLast]].
 */
export
function findLast<T>(array: T[], pred: IPredicate<T>, fromIndex?: number, wrap?: boolean): T {
  var i = findLastIndex(array, pred, fromIndex, wrap);
  return i !== -1 ? array[i] : void 0;
}


/**
 * Using a binary search, find the index of the first element in an
 * array which compares `<=` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparator function to apply to the values.
 *
 * @returns The index of the first element which compares `<=` to
 *   `value`, or `array.length` if `array` has no such element.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * function numberCmp(a: number, b: number): number {
 *   return a - b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * algo.lowerBound(data, 0, numberCmp);   // 0
 * algo.lowerBound(data, 6, numberCmp);   // 3
 * algo.lowerBound(data, 7, numberCmp);   // 3
 * algo.lowerBound(data, -1, numberCmp);  // 0
 * algo.lowerBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[upperBound]] and [[binaryFindIndex]].
 */
export
function lowerBound<T, U>(array: T[], value: U, cmp: IComparator<T, U>): number {
  var begin = 0;
  var half: number;
  var middle: number;
  var n = array.length;
  while (n > 0) {
    half = n >> 1;
    middle = begin + half;
    if (cmp(array[middle], value) < 0) {
      begin = middle + 1;
      n -= half + 1;
    } else {
      n = half;
    }
  }
  return begin;
}


/**
 * Using a binary search, find the index of the first element in an
 * array which compares `>` than a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparator function to apply to the values.
 *
 * @returns The index of the first element which compares `>` than
 *   `value`, or `array.length` if `array` has no such element.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * function numberCmp(a: number, b: number): number {
 *   return a - b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * algo.upperBound(data, 0, numberCmp);   // 1
 * algo.upperBound(data, 6, numberCmp);   // 3
 * algo.upperBound(data, 7, numberCmp);   // 5
 * algo.upperBound(data, -1, numberCmp);  // 0
 * algo.upperBound(data, 10, numberCmp);  // 6
 * ```
 *
 * **See also** [[lowerBound]] and [[binaryFindLastIndex]].
 */
export
function upperBound<T, U>(array: T[], value: U, cmp: IComparator<T, U>): number {
  var begin = 0;
  var half: number;
  var middle: number;
  var n = array.length;
  while (n > 0) {
    half = n >> 1;
    middle = begin + half;
    if (cmp(array[middle], value) > 0) {
      n = half;
    } else {
      begin = middle + 1;
      n -= half + 1;
    }
  }
  return begin;
}


/**
 * Using a binary search, find the index of the first element in an
 * array which compares `==` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparator function to apply to the values.
 *
 * @returns The index of the first element which compares `==` to
 *   `value`, or `array.length` if `array` has no such element.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * function numberCmp(a: number, b: number): number {
 *   return a - b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * algo.binaryFindIndex(data, 7, numberCmp);  // 3
 * algo.binaryFindIndex(data, 6, numberCmp);  // -1
 * ```
 *
 * **See also** [[binaryFindLastIndex]] and [[lowerBound]].
 */
export
function binaryFindIndex<T, U>(array: T[], value: U, cmp: IComparator<T, U>): number {
  var i = lowerBound(array, value, cmp);
  if (i === array.length) {
    return -1;
  }
  if (cmp(array[i], value) === 0) {
    return i;
  }
  return -1;
}


/**
 * Using a binary search, find the index of the last element in an
 * array which compares `==` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparator function to apply to the values.
 *
 * @returns The index of the last element which compares `==` to
 *   `value`, or `array.length` if `array` has no such element.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * function numberCmp(a: number, b: number): number {
 *   return a - b;
 * }
 *
 * var data = [0, 3, 4, 7, 7, 9];
 * algo.binaryFindLastIndex(data, 7, numberCmp);  // 4
 * algo.binaryFindLastIndex(data, 6, numberCmp);  // -1
 * ```
 *
 * **See also** [[binaryFindIndex]] and [[upperBound]].
 */
export
function binaryFindLastIndex<T, U>(array: T[], value: U, cmp: IComparator<T, U>): number {
  var i = upperBound(array, value, cmp);
  if (i === 0) {
    return -1;
  }
  if (cmp(array[i - 1], value) === 0) {
    return i - 1;
  }
  return -1;
}


/**
 * Using a binary search, find the first element in an array which
 * compares `==` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparator function to apply to the values.
 *
 * @returns The first element which compares `==` to `value`, or
 *   `undefined` if `array` has no such element.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * interface IPair {
 *   rank: number;
 *   value: string;
 * }
 *
 * var data: IPair[] = [
 *   { rank: 0, value: 'zero' },
 *   { rank: 3, value: 'three' },
 *   { rank: 7, value: 'seven-A' },
 *   { rank: 7, value: 'seven-B' },
 *   { rank: 9, value: 'nine' },
 * ];
 *
 * function rankCmp(pair: IPair, rank: number): number {
 *   return pair.rank - rank;
 * }
 *
 * algo.binaryFind(data, 7, rankCmp);  // { rank: 7, value: 'seven-A' }
 * algo.binaryFind(data, 8, rankCmp);  // undefined
 * ```
 *
 * **See also** [[binaryFindLast]] and [[find]].
 */
export
function binaryFind<T, U>(array: T[], value: U, cmp: IComparator<T, U>): T {
  var i = binaryFindIndex(array, value, cmp);
  return i !== -1 ? array[i] : void 0;
}


/**
 * Using a binary search, find the last element in an array which
 * compares `==` to a value.
 *
 * @param array - The array of values to be searched. It must be sorted
 *   in ascending order.
 *
 * @param value - The value to locate in the array.
 *
 * @param cmp - The comparator function to apply to the values.
 *
 * @returns The last element which compares `==` to `value`, or
 *   `undefined` if `array` has no such element.
 *
 * #### Example
 * ```typescript
 * import algo = phosphor.collections.algorithm;
 *
 * interface IPair {
 *   rank: number;
 *   value: string;
 * }
 *
 * var data: IPair[] = [
 *   { rank: 0, value: 'zero' },
 *   { rank: 3, value: 'three' },
 *   { rank: 7, value: 'seven-A' },
 *   { rank: 7, value: 'seven-B' },
 *   { rank: 9, value: 'nine' },
 * ];
 *
 * function rankCmp(pair: IPair, rank: number): number {
 *   return pair.rank - rank;
 * }
 *
 * algo.binaryFindLast(data, 7, rankCmp);  // { rank: 7, value: 'seven-B' }
 * algo.binaryFindLast(data, 8, rankCmp);  // undefined
 * ```
 *
 * **See also** [[binaryFind]] and [[findLast]].
 */
export
function binaryFindLast<T, U>(array: T[], value: U, cmp: IComparator<T, U>): T {
  var i = binaryFindLastIndex(array, value, cmp);
  return i !== -1 ? array[i] : void 0;
}


/**
 * Create a shallow copy of the given array.
 */
export
function copy<T>(array: T[]): T[] {
  var n = array.length;
  var result = new Array<T>(n);
  for (var i = 0; i < n; ++i) {
    result[i] = array[i];
  }
  return result;
}


/**
 * Insert an element at the given index.
 *
 * If `index` is negative, it will be offset from the end of the array.
 * If the adjusted value is still negative, it will be clamped to `0`.
 * If `index` is greater than `array.length`, it will be clamped to
 * `array.length`.
 *
 * Returns the index at which the element was inserted.
 */
export
function insert<T>(array: T[], index: number, value: T): number {
  index = index | 0;
  var len = array.length;
  if (index < 0) {
    index += len;
    if (index < 0) {
      index = 0;
    }
  } else if (index > len) {
    index = len;
  }
  for (var i = len; i > index; --i) {
    array[i] = array[i - 1];
  }
  array[index] = value;
  return index;
}


/**
 * Move an array element from one index to another.
 *
 * If `fromIndex` is negative, it will be offset from the end of the
 * array. If the adjusted value is out of range, `-1` will be returned.
 *
 * If `toIndex` is negative, it will be offset from the end of the
 * array. If the adjusted value is out of range, it will be clamped.
 *
 * Returns the final index of the moved element.
 */
export
function move<T>(array: T[], fromIndex: number, toIndex: number): number {
  fromIndex = fromIndex | 0;
  var len = array.length;
  if (fromIndex < 0) {
    fromIndex += len;
  }
  if (fromIndex < 0 || fromIndex >= len) {
    return -1;
  }
  toIndex = toIndex | 0;
  if (toIndex < 0) {
    toIndex += len;
    if (toIndex < 0) {
      toIndex = 0;
    }
  } else if (toIndex >= len) {
    toIndex = len - 1;
  }
  if (fromIndex === toIndex) {
    return toIndex;
  }
  var value = array[fromIndex];
  if (fromIndex > toIndex) {
    for (var i = fromIndex; i > toIndex; --i) {
      array[i] = array[i - 1];
    }
  } else {
    for (var i = fromIndex; i < toIndex; ++i) {
      array[i] = array[i + 1];
    }
  }
  array[toIndex] = value;
  return toIndex;
}


/**
 * Remove and return the element at the given index.
 *
 * If `index` is negative, it will be offset from the end of the array.
 *
 * Returns `undefined` if the index is out of range.
 */
export
function removeAt<T>(array: T[], index: number): T {
  index = index | 0;
  var len = array.length;
  if (index < 0) {
    index += len;
  }
  if (index < 0 || index >= len) {
    return void 0;
  }
  var value = array[index];
  for (var i = index + 1; i < len; ++i) {
    array[i - 1] = array[i];
  }
  array.pop();
  return value;
}


/**
 * Remove the first occurrence of the element and return its index.
 *
 * Returns the `-1` if the element is not in the array.
 */
export
function remove<T>(array: T[], value: T): number {
  var i = indexOf(array, value);
  if (i !== -1) removeAt(array, i);
  return i;
}

} // module phosphor.collections.algorithm
