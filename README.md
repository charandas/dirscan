Dirscan
=======

A `readdirp` based implementation to find files with same content
in an arbitrarily deep filesystem tree.

Synopsis
--------

1. sh1 sums can be used to determine whether file content is same.
2. Using streams for sha1 as well as directory scans makes sense, as there
is backpressure management provided for free. Streams are lazy and they work out as
their consumers draw out their food.
3. The algorithm computes a object like so:
  ```js
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
captured more than 1 file.

Command Line Arguments
----------------------
1. `-f, --filter`: filter for files, specify a glob pattern
2. `-d, --dir`: directory to execute the scan in

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
