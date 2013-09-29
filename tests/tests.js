
test("matrix creation - empty", function() {
  var matrix = new Matrix(2, 3);
  deepEqual(
    matrix.content,
    [
      [0, 0, 0],
      [0, 0, 0]
    ]
  );

  matrix = new Matrix(3, 2)
  deepEqual(
    matrix.content,
    [
      [0, 0],
      [0, 0],
      [0, 0]
    ]
  );

  matrix = new Matrix(4, 4)
  deepEqual(
    matrix.content,
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  );


});

test("matrix creation - from array", function() {
  var matrix = new Matrix(
    [
      [ 0, 1, 2 ],
      [ 3, 4, 5 ],
      [ 6, 7, 8 ]
    ]);
  deepEqual(
    matrix.content,
    [
      [ 0, 1, 2 ],
      [ 3, 4, 5 ],
      [ 6, 7, 8 ]
    ]
  );

});

