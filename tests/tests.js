
test("matrix creation - empty", function() {
  var matrix = new Matrix(2, 3);
  deepEqual(
    matrix.content,
    [
      0, 0, 0,
      0, 0, 0
    ]
  );

  matrix = new Matrix(3, 2)
  deepEqual(
    matrix.content,
    [
      0, 0,
      0, 0,
      0, 0
    ]
  );

  matrix = new Matrix(4, 4)
  deepEqual(
    matrix.content,
    [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ]
  );


});

test("matrix creation - from array", function() {
  var matrix = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);
  deepEqual(
    matrix.content,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]
  );

});

test("matrix creation - from another matrix", function() {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var matrix2 = new Matrix(matrix1)
  deepEqual(
    matrix1.content,
    matrix2.content
  );

});

test("matrix elements seting", function() {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var matrix1Ref = matrix1.set(1, 1, 5.5);
  deepEqual(
    matrix1.content,
    [
      0, 1, 2,
      3, 5.5, 5,
      6, 7, 8
    ]
  );

  deepEqual(
    matrix1Ref,
    matrix1
  );


});

test("matrix elements getting", function() {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var element = matrix1.get(1, 1);
  deepEqual(
    element,
    4
  );

});

test("matrix row setting", function() {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var matrix1Ref = matrix1.setRow(0, [1,2,3]);
  deepEqual(
    matrix1.content,
    [
      1, 2, 3,
      3, 4, 5,
      6, 7, 8
    ]
  );

  deepEqual(matrix1Ref, matrix1);

});

test("matrix row getting", function() {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var row = matrix1.getRow(1);
  deepEqual(
    row,
    [3,4,5]
  );

});

test("matrix col setting", function () {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var matrix1Ref = matrix1.setCol(2, [1,2,3]);
  deepEqual(
    matrix1.content,
    [
      0, 1, 1,
      3, 4, 2,
      6, 7, 3
    ]
  );

  deepEqual(matrix1, matrix1Ref);
});

test("matrix col getting", function() {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var col = matrix1.getCol(2);
  deepEqual(
    col,
    [2,5,8]
  );

});

test("matrix toArray", function () {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var array = matrix1.toArray();
  array[0] = 1;
  notDeepEqual(
    matrix1.content,
    array
  );

});

test("matrix getArrayRef", function () {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var array = matrix1.getArrayRef();
  array[0] = 1;
  deepEqual(
    matrix1.content,
    array
  );

});


test("matrix multipilation - by value", function() {
  var matrix1 = new Matrix(
    3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]);

  var matrix2 = matrix1.mul(2);
  deepEqual(
    matrix2.content,
    [
      0, 2, 4,
      6, 8, 10,
      12, 14, 16
    ]
  );

  var matrix2 = matrix1.mul(2, 3);
  deepEqual(
    matrix2.content,
    [
      0, 6, 12,
      18, 24, 30,
      36, 42, 48
    ]
  );


});

test("matrix multipilation - by matrix", function() {
  var matrix1 = new Matrix(
    3, 2,
    [
      0, 1,
      2, 3,
      4, 5
    ]
  );

  var matrix2 = new Matrix(
    2, 2,
    [
      1, 2,
      3, 4
    ]
  );

  deepEqual(
    matrix1.mul(matrix2).content,
    [
      3, 4,
      11, 16,
      19, 28
    ]
  );

  deepEqual(
    matrix1.mul(matrix2, matrix2).content,
    [
      15, 22,
      59, 86,
      103, 150
    ]
  );


});

test("matrix addition", function() {
  var matrix1 = new Matrix(3, 2,
    [
      0, 1,
      2, 3,
      4, 5
    ]
  );

  var matrix2 = new Matrix(3, 2,
    [
      1, 2,
      3, 4,
      3, 4
    ]
  );

  deepEqual(
    matrix1.add(matrix2).content,
    [
      1, 3,
      5, 7,
      7, 9
    ]
  );

  deepEqual(
    matrix1.add(matrix2, matrix2).content,
    [
      2, 5,
      8, 11,
      10, 13
    ]
  );


});

test("matrix subtraction", function() {
  var matrix1 = new Matrix(3, 2,
    [
      0, 1,
      2, 3,
      4, 5
    ]
  );

  var matrix2 = new Matrix(3, 2,
    [
      1, 2,
      3, 4,
      3, 4
    ]
  );

  deepEqual(
    matrix1.sub(matrix2).content,
    [
      -1, -1,
      -1, -1,
      1, 1
    ]
  );

  deepEqual(
    matrix1.sub(matrix2, matrix2).content,
    [
      -2, -3,
      -4, -5,
      -2, -3
    ]
  );


});

test("matrix transposition", function() {
  var matrix = new Matrix(3, 2,
    [
      0, 1,
      2, 3,
      4, 5
    ]
  );

  deepEqual(
    matrix.transpose().content,
    [
      0, 2, 4,
      1, 3, 5,
    ]
  );

});

test("matrix determinant", function() {
 var matrix = new Matrix(3, 3,
    [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9
    ]
  );

  deepEqual(
    matrix.det(),
    0
  );

  var matrix = new Matrix(3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]
  );

  deepEqual(
    matrix.det(),
    0
  );

  var matrix = new Matrix(3, 3,
    [
      2, 5, 7,
      6, 3, 4,
      5, -2, -3
    ]
  );

  deepEqual(
    matrix.det(),
    -1
  );

});

test("matrix submatrix", function() {
  var matrix = new Matrix(3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]
  );

  deepEqual(
    matrix.submatrix(1,2).content,
    [
      0, 1,
      6, 7
    ]
  );
});

test("matrix minor", function() {
  var matrix = new Matrix(3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]
  );

  deepEqual(
    matrix.min(1,2),
    -6
  );
});

test("matrix cofactor", function() {
  var matrix = new Matrix(4, 4,
    [
      0, 1, 2, 3,
      3, 4, 5, 4,
      6, 7, 8, 5,
      9, 10, 11, 6
    ]
  );

  deepEqual(
    matrix.cofactor(0, 0),
    matrix.min(0, 0)
  );

  deepEqual(
    matrix.cofactor(1,0),
    matrix.min(1, 0) * -1
  );

});

test("matrix trace", function() {
  var matrix = new Matrix(3, 3,
    [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ]
  );

  deepEqual(
    matrix.trace(),
    12
  );
});

test("matrix invertible", function() {
  var matrix = new Matrix(3, 3,
    [
      2, 5, 7,
      6, 3, 4,
      5, -2, -3
    ]
  );

  deepEqual(
    matrix.inv().content,
    [
      1, -1, 1,
      -38, 41, -34,
      27, -29, 24
    ]
  );
});

test("matrix idenity", function() {
  var matrix = Matrix.idenity(4);

  deepEqual(
    matrix.content,
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  );

});

test("matrix diagonal", function() {
  var matrix = Matrix.diag([0, 1, 2, 3]);

  deepEqual(
    matrix.content,
    [
      0, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 2, 0,
      0, 0, 0, 3
    ]
  );

});


test("matrix row vector", function() {
  var matrix = Matrix.rowVector([0, 1, 2, 3]);

  deepEqual(
    matrix.content,
    [
      0, 1, 2, 3
    ]
  );

});

test("matrix col vector", function() {
  var matrix = Matrix.colVector([0, 1, 2, 3]);

  deepEqual(
    matrix.content,
    [
      0,
      1,
      2,
      3
    ]
  );

});

