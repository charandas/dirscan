Dirscan
=======

A `readdirp` based implementation to find files with same content
in an arbitrarily deep filesystem tree.

Synopsis
--------

1. sha1 sums can be used to determine whether file content is same.
2. Using streams for sha1 and the consequent `reduce` operation makes sense, as there
is backpressure management provided for free. For `readdirp`, we are using the `pauseable-streams` branch provided [here](https://github.com/toddself/readdirp/tree/pauseable-streams), post [this PR](https://github.com/thlorenz/readdirp/pull/32) this won't be needed. Also, stream interface provides readability over imperative code, as we see the set of operations specified declaratively.
3. The algorithm computes a `Map` like so using a `reduce` operation on a computed stream of
`{path: path, hash: hash}`:
  ```
  {
    "79239999d":["0.copy.test","0.test"],
    "01e554876":["1.copy.test","1.test"],
    "5810672c1":["2.copy.test","2.test"],
    "5b094f1bb":["3.copy.test","3.test"],
    .
    .
    .. so on
  }
  ```
4. Lastly, it logs out an array of arrays to the console for all hashes, that
captured more than 1 file. It does so by transforming the aforementioned `Map` to
an array.

Requisites
-----------

Requires:
```js
"engines" : {
  "node" : "> 4.2.2"
}
```

CLI Arguments
-------------
```bash
node index.js
```

1. `-f, --filter`: Filter files by a glob pattern such as `*.js`, defaults to `*.*`.
2. `-d, --dir`: Directory to find files with identical contents, relative or absolute, default to `node_modules`.
3. `-p, --parallel`: Threshold to control how many hashes are computed in parallel before the `reduce` operation.

Resourses
---------
1. [`readdirp`](https://github.com/thlorenz/readdirp)
2. [`highlandjs`](http://highlandjs.org/)

License
-------
Copyright (c) 2015 Charandas Batra-Daitch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
