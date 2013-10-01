
function Matrix() {
  this.content = new Array;
  this.rows = 0;
  this.cols = 0;

  if (arguments[0] instanceof Matrix) {
    var array = arguments[0].content;

    this.content = array.slice(0);

    this.rows = arguments[0].rows;
    this.cols = arguments[0].cols;

  } else if (
    !isNaN(arguments[0])
    && arguments.length >= 2
    && arguments.length <= 3
    && !isNaN(arguments[1])
    && arguments[0] % 1 === 0
    && arguments[1] % 1 === 0
    && arguments[0] > 0
    && arguments[1] > 0
  ) {
    if (arguments.length === 3 && arguments[2] instanceof Array) {
      if (arguments[2].length === arguments[0] * arguments[1]) {
        this.rows = arguments[0];
        this.cols = arguments[1];

        for (var index = 0; index < arguments[2].length; index++) {
          if (isNaN(arguments[2][index])) {
            throw 'Element ('
              + row + ', ' + col + ') of the Array is not numeric.';
          } else {
            this.content.push(arguments[2][index]);
          }
        }
      } else {
        throw 'Array can\'t fill matrix of dimensions '
          + arguments[0] + ' X ' + arguments[1] + '.'
      }

    } else {
      this.rows = arguments[0];
      this.cols = arguments[1];

      for (var index = 0; index < this.rows * this.cols; index++) {
        this.content[index] = 0;
      }

    }

  } else {
    throw "Wrong arguments.";
  }

}


Matrix.prototype.get = function (row, col) {
  if (
    isNaN(row)
    || isNaN(col)
    || row < 0
    || col < 0
    || row >= this.rows
    || col >= this.cols
  ) {
    throw "Wrong coordinates."
  } else {
    return this.content[row * this.cols + col];
  }
}

Matrix.prototype.set = function (row, col, value) {
  if (
    isNaN(row)
    || isNaN(col)
    || row < 0
    || col < 0
    || row >= this.rows
    || col >= this.cols
  ) {
    throw "Wrong coordinates."
  } else if (isNaN(value)) {
    throw "Value must be a number."
  } else {
    this.content[row * this.cols + col] = value;

    return this;
  }
}

Matrix.prototype.setRow = function (row, vector) {
  if (
    !isNaN(row)
    && row % 1 === 0
    && row < this.rows
    && vector instanceof Array
    && vector.length == this.cols
  ) {
    for (var index = 0; index < vector.length; index++) {

      if (isNaN(vector[index])) {
        throw 'Element on index ' + index + ' of vector is not a number.';
      } else {
        this.content[row * this.cols + index] = vector[index];
      }
    }

    return this;
  } else {
    throw "Wrong arguments.";
  }

}

Matrix.prototype.getRow = function (row) {
  if (
    !isNaN(row)
    && row % 1 === 0
    && row < this.rows
  ) {
    return this.content.slice(row * this.cols, row * this.cols  + this.cols);
  } else {
    throw "Wrong argument.";
  }

}

Matrix.prototype.setCol = function (col, vector) {
  if (
    !isNaN(col)
    && col % 1 === 0
    && col < this.cols
    && vector instanceof Array
    && vector.length == this.rows
  ) {
    for (var index = 0; index < vector.length; index++) {

      if (isNaN(vector[index])) {
        throw 'Element on index ' + index + ' of vector is not a number.';
      } else {
        this.content[index * this.cols + col] = vector[index];
      }
    }

    return this;
  } else {
    throw "Wrong arguments.";
  }
}

Matrix.prototype.getCol = function (col) {
  if (
    !isNaN(col)
    && col % 1 === 0
    && col < this.cols
  ) {
    var result = [];

    for (var row = 0; row < this.rows; row++) {
      result.push(this.content[row * this.cols + col]);
    }

    return result;
  } else {
    throw "Wrong argument.";
  }
}

Matrix.prototype.toArray = function () {
  return this.content.slice(0);
}

Matrix.prototype.getArrayRef = function () {
  return this.content;
}

Matrix.prototype.dim = function () {
  return {rows: this.rows, cols: this.cols};
}

Matrix.prototype.mul = function () {
  var output = new Matrix(this);

  for (var index = 0; index < arguments.length; index++) {
    if (isNaN(arguments[index])) {
      var matrix;
      if (arguments[index] instanceof Matrix) {
        matrix = arguments[index];

        if (output.cols === matrix.rows) {
          var newOutput = new Matrix(output.rows, matrix.cols);

          for (var row = 0; row < output.rows; row++) {
            for (var col = 0; col < matrix.cols; col++) {
              for (var mulIndex = 0; mulIndex < output.cols; mulIndex++) {
                newOutput.content[row * newOutput.cols + col] +=
                  output.content[row * output.cols + mulIndex]
                  * matrix.content[mulIndex * matrix.cols + col];
              }
            }
          }

          output = newOutput;
        } else {
          throw 'Incopatible matrix sizes on index - ' + index + '.';
        }
      } else {
        throw 'Wrong argument type on index - ' + index + '.';
      }


    } else {

      for (var contentKey = 0; contentKey < output.content.length; contentKey++) {
        output.content[contentKey] *= arguments[index];
      }
    }
  }

  return output;
}

Matrix.prototype.add = function() {
  var output = new Matrix(this);

  for (var index = 0; index < arguments.length; index++) {
    if (arguments[index] instanceof Matrix) {
      matrix = arguments[index];

      if (output.cols === matrix.cols && output.rows === matrix.rows) {
        var newOutput = new Matrix(output.rows, output.cols);

        for (var row = 0; row < output.rows; row++) {
          for (var col = 0; col < output.cols; col++) {
            newOutput.content[row * newOutput.cols + col] =
              output.content[row * output.cols + col]
              + matrix.content[row * matrix.cols + col];
          }
        }

        output = newOutput;
      } else {
        throw 'Incopatible matrix sizes on index - ' + index + '.';
      }

    } else {
      throw 'Wrong argument type on index - ' + index + '.';
    }


  }

  return output;
}

Matrix.prototype.sub = function() {
  var output = new Matrix(this);

  for (var index = 0; index < arguments.length; index++) {
    if (arguments[index] instanceof Matrix) {
      matrix = arguments[index];

      if (output.cols === matrix.cols && output.rows === matrix.rows) {
        var newOutput = new Matrix(output.rows, output.cols);

        for (var row = 0; row < output.rows; row++) {
          for (var col = 0; col < output.cols; col++) {
            newOutput.content[row * newOutput.cols + col] =
              output.content[row * output.cols + col]
              - matrix.content[row * matrix.cols + col];
          }
        }

        output = newOutput;
      } else {
        throw 'Incopatible matrix sizes on index - ' + index + '.';
      }

    } else {
      throw 'Wrong argument type on index - ' + index + '.';
    }


  }

  return output;
}


Matrix.prototype.transpose = function() {
  var output = new Matrix(this.cols, this.rows);

  for (var row = 0; row < this.rows; row++) {
    for (var col = 0; col < this.cols; col++) {
      output.content[col * output.cols + row] =
        this.content[row * this.cols + col];
    }
  }

  return output;
}

Matrix.prototype.det = function () {
  if (this.rows === this.cols) {
    if (this.rows > 2) {
      var value = 0;

      for (var col = 0; col < this.cols; col++) {
        value += this.content[col] * this.cofactor(0, col);
      }

      return value;
  } else if (this.rows === 2) {
      return this.content[0] * this.content[3]
        - this.content[1] * this.content[2];
    } else if (this.rows === 1) {
      return this.content[0];
    } else {
      throw 'Wrong matrix size.';
    }
  } else {
    throw 'This matrix is not a square matrix.'
  }
}

Matrix.prototype.submatrix = function(row, col) {
  if (isNaN(row) || isNaN(col) || row % 1 !== 0 || col % 1 !== 0) {
    throw 'Row and col must be integer values.';
  } else if (row >= this.rows || col >= this.cols || row < 0 || col < 0) {
    throw 'Index out of bounds.';
  } else {
    var result = new Matrix(this);

    result.content.splice(row * result.cols, result.cols);
    result.rows -= 1;
    result.cols -= 1;

    for (var rowIndex = 0; rowIndex < result.rows; rowIndex++) {
      result.content.splice(rowIndex * result.cols + col, 1);
    }
    return result;
  }
}

Matrix.prototype.min = function(row, col) {
  return this.submatrix(row, col).det();
}

Matrix.prototype.cofactor = function(row, col) {
  return this.min(row, col) * Math.pow(-1, row + col + 2);
}

Matrix.prototype.trace = function() {
  if (this.cols === this.rows) {
    var result = 0;

    for (var index = 0; index < this.rows; index++) {
      result += this.content[index * this.rows + index];
    }

    return result;
  } else {
    throw 'This matrix is not a square matrix.'
  }
}

Matrix.prototype.inv = function() {
  var det = this.det();

  output = new Matrix(this.rows, this.cols);
  if (det !== 0) {
    for (var row = 0; row < this.rows; row++) {
      for (var col = 0; col < this.cols; col++) {
        output.content[row * output.cols + col] = this.cofactor(row, col);
      }
    }

    return output.transpose().mul(1/det);

  } else {
    throw 'Determinant is equal 0.';
  }
}

Matrix.idenity = function(size) {
  if (isNaN(size) || size % 1 !== 0 || size <= 0 ) {
    throw 'Size must be an positive integer.';
  } else {
    var result = new Matrix(size, size);

    for (index = 0; index < size; index++) {
      result.content[index * result.cols + index] = 1;
    }
    return result;
  }
}

Matrix.diag = function(vector) {
  if (vector instanceof Array) {
    var result = new Matrix(vector.length, vector.length);
    for (index = 0; index < vector.length; index++) {
      if (isNaN(vector[index])) {
        throw 'Vector element is not numeric on index ' + index + '.';
      } else {
        result.content[index * result.cols + index] = vector[index];
      }
    }

    return result;
  } else {
    throw 'Vector must be an array.'
  }
}

Matrix.rowVector = function(vector) {
  if (vector instanceof Array) {
    var result = new Matrix(1, vector.length);
    for (index = 0; index < vector.length; index++) {
      if (isNaN(vector[index])) {
        throw 'Vector element is not numeric on index ' + index + '.';
      } else {
        result.content[index] = vector[index];
      }
    }

    return result;
  } else {
    throw 'Vector must be an array.'
  }
}

Matrix.colVector = function(vector) {
  if (vector instanceof Array) {
    var result = new Matrix(vector.length, 1);
    for (index = 0; index < vector.length; index++) {
      if (isNaN(vector[index])) {
        throw 'Vector element is not numeric on index ' + index + '.';
      } else {
        result.content[index] = vector[index];
      }
    }

    return result;
  } else {
    throw 'Vector must be an array.'
  }
}
