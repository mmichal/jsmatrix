/**
test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});
*/

var matrix = new Matrix(2, 3);

test("empty matrix creation", function() {
  deepEqual(
    matrix.content,
    [
      [0, 0, 0],
      [0, 0, 0],
    ]
  );
});

