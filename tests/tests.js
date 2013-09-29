/**
test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});
*/


test("empty matrix creation", function() {
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

