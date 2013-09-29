
function Matrix() {
  this.content = new Array;
  this.rows = 0;
  this.cols = 0;

  if (arguments[0] instanceof Matrix) {
    var array = arguments[0].content;

    for (var row = 0; array.length; row++) {
      this.content.push(array[row].slice(0));
    }

  } else if (arguments[0] instanceof Array) {
    this.rows = arguments[0].length;
    this.cols = arguments[0][1].length;

    for (var row = 0; row < this.rows; row++) {
      if (
        arguments[0] instanceof Array
        && !arguments[0][row].length >= this.cols
      ) {
        if (!this.content[row]) {
          this.content[row] = [];
        }

        for (var col = 0; col < this.cols; col++) {
          if (isNaN(arguments[0][row][col])) {
            throw 'Element ('
              + row + ', ' + col + ') of the Array is not numeric.';
          }
          this.content[row][col] = arguments[0][row][col];
        }
      } else {
        throw 'Input Array is not a matrix. Check the ' + row + 'row.';
      }
    }

  } else if (
    !isNaN(arguments[0])
    && arguments.length == 2
    && !isNaN(arguments[1])
  ) {
    this.rows = arguments[0];
    this.cols = arguments[1];

    for (var ii = 0; ii < this.rows; ii++) {
      this.content[ii] = [];
      for (var jj = 0; jj < this.cols; jj++) {
        this.content[ii][jj] = 0;
      }
    }
  } else {
    throw "Wrong arguments!";
  }

}


