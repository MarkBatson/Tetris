/*
 * Tetris
 * This is a replica of the Tetris video game in javascript
 * Each grid square is 30x30
 * The grid is 10x20
*/

// Initializes HTML canvas
var canvas = document.getElementById("canvas");
var shape = canvas.getContext("2d");
// grid keeps track of colored squares, grid starts at 0
var grid = [
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
  ["white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"]
];
// These variables represent the four blocks of the current shape
// Every Teris shape is only four blocks
var x1;  var y1;
var x2;  var y2;
var x3;  var y3;
var x4;  var y4;
// Every shape has a number and a color
var color;
var shapeNumber;
var rotationPosition;

/*
 * This function fills in the square at position x,y
 * with the specified color
 */
function fillSquare(x,y,color) {
  shape.fillStyle = color;
  shape.fillRect(x*30,y*30,30,30);
}

/*
 * This function clears the square at position x,y
 * by filling it in white
 */
function clearSquare(x,y) {
  shape.fillStyle = "white";
  shape.fillRect(x*30,y*30,30,30);
}

/*
 * This function checks to see if there is contact between
 * the current active shape and the border or any other shapes
 */
function checkContact(x1,x2,x3,x4,y1,y2,y3,y4) {
  // Check boundaries
  if (   x1<0 || x1>9 || y1>19
      || x2<0 || x2>9 || y2>19
      || x3<0 || x3>9 || y3>19
      || x4<0 || x4>9 || y4>19)
    {
      return true;
    }

 // check if it will intersect a shape that is not white
  if(grid[x1][y1] != "white" || grid[x2][y2] != "white" ||
    grid[x3][y3] != "white" || grid[x4][y4] != "white")
    return true;

  return false;
}

/*
 * This function rotates the shape to the right if it will
 * not conflict with bondries or previous shapes.
 * This funciton is specific for the specified shape and its position.
 * Only the first condition is annotated
 */
function rotateRight() {
  if (shapeNumber == 1) {
    if (rotationPosition == 1) {
      // 1 3 2 4
      // first check for conflict with boundaries and other shapes
      var checkRotate = checkContact(x2,x2,x3,x4,y2-2,y2,y2-1,y2+1);
      if (checkRotate == false) {
        clearSquare(x1,y1); // clear the previous position
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x2; y1=y2-2; // change the appropriate active blocks
        x3=x2; y3=y2-1;
        x4=x2; y4=y2+1;
        fillSquare(x1,y1,color); // fill in the new blocks
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 2; // switch to new rotaion position
      }
    }
    else if (rotationPosition == 2) {
      var checkRotate = checkContact(x2-2,x2,x2-1,x2+1,y2,y2,y2,y2);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x2-2; y1=y2;
        x3=x2-1; y3=y2;
        x4=x2+1; y4=y2;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 1;
      }
    }
  }
  else if (shapeNumber == 2) {
    //square doesn't rotate
  }
  else if (shapeNumber == 3){
    //  1
    //3 2 4
    if (rotationPosition == 1) {
      var checkRotate = checkContact(x1,x2,x2,x4,y1,y2,y2+1,y4);
      if (checkRotate == false) {
        clearSquare(x3,y3);
        x3=x2; y3=y2+1;
        fillSquare(x3,y3,color);
        rotationPosition = 2;
      }
    }
    else if (rotationPosition == 2) {
      var checkRotate = checkContact(x2-1,x2,x3,x4,y2,y2,y3,y4);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        x1=x2-1; y1=y2;
        fillSquare(x1,y1,color);
        rotationPosition = 3;
      }
    }
    else if (rotationPosition == 3) {
      var checkRotate = checkContact(x1,x2,x3,x2,y1,y2,y3,y2-1);
      if (checkRotate == false) {
        clearSquare(x4,y4);
        x4=x2; y4=y2-1;
        fillSquare(x4,y4,color);
        rotationPosition = 4;
      }
    }
    else if (rotationPosition == 4) {
      var checkRotate = checkContact(x2,x2,x2-1,x2+1,y2-1,y2,y2,y2);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x2; y1=y2-1;
        x3=x2-1; y3=y2;
        x4=x2+1; y4=y2;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 1;
      }
    }
  }
  else if (shapeNumber == 4) {
    //   2 1
    // 3 4
    if (rotationPosition == 1) {
      var checkRotate = checkContact(x2-1,x2,x3,x4,y1,y2,y2-1,y4);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        x1=x2-1;
        y3=y2-1;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        rotationPosition = 2;
      }
    }
    else if (rotationPosition == 2) {
      var checkRotate = checkContact(x2+1,x2,x3,x4,y1,y2,y2+1,y4);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        x1=x2+1;
        y3=y2+1;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        rotationPosition = 1;
      }
    }
  }
  else if (shapeNumber == 5) {
    // 1 2
    //   3 4
    if (rotationPosition == 1) {
      var checkRotate = checkContact(x1,x2,x3,x2-1,y1,y2,y2-1,y4);
      if (checkRotate == false) {
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        y3=y2-1;
        x4=x2-1;
        fillSquare(x4,y4,color);
        fillSquare(x3,y3,color);
        rotationPosition = 2;
      }
    }
    else if (rotationPosition == 2) {
      var checkRotate = checkContact(x1,x2,x3,x2+1,y1,y2,y2+1,y4);
      if (checkRotate == false) {
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        y3=y2+1;
        x4=x2+1;
        fillSquare(x4,y4,color);
        fillSquare(x3,y3,color);
        rotationPosition = 1;
      }
    }
  }
  else if (shapeNumber == 6) {
    // 1
    // 2
    // 3 4
    if (rotationPosition == 1) {
      var checkRotate = checkContact(x2-1,x2,x3-1,x4,y2,y2,y3,y4-1);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x2-1; y1=y2;
        x3=x3-1;
        y4=y4-1;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 2;
      }
    }
    else if (rotationPosition == 2) {
      var checkRotate = checkContact(x1,x2,x3+1,x2,y1-1,y2,y3,y2-1);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        y1=y1-1;
        x3=x3+1;
        x4=x2; y4=y2-1;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 3;
      }
    }
    else if (rotationPosition == 3) {
      var checkRotate = checkContact(x1,x2,x2+1,x4+1,y1+1,y2,y2,y4);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        y1=y1+1;
        x3=x2+1; y3=y2;
        x4=x4+1;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 4;
      }
    }
    else if (rotationPosition == 4) {
      var checkRotate = checkContact(x2,x2,x2,x4,y2-1,y2,y2+1,y4+2);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x2; y1=y2-1;
        x3=x2; y3=y2+1;
        y4=y4+2;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 1;
      }
    }
  }
  else if (shapeNumber == 7) {
    //   1
    //   2
    // 4 3
    if (rotationPosition == 1) {
      var checkRotate = checkContact(x1-1,x2,x2+1,x4,y1,y2,y2,y4-1);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x1-1;
        x3=x2+1; y3=y2;
        y4=y4-1;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 2;
      }
    }
    else if (rotationPosition == 2) {
      var checkRotate = checkContact(x1+1,x2,x3,x2,y1,y2,y3-1,y2+1);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x1+1;
        y3=y3-1;
        x4=x2; y4=y2+1;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 3;
      }
    }
    else if (rotationPosition == 3) {
      var checkRotate = checkContact(x2-1,x2,x3,x4+1,y2,y2,y3+1,y4);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x2-1; y1=y2;
        y3=y3+1;
        x4=x4+1;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 4;
      }
    }
    else if (rotationPosition == 4) {
      var checkRotate = checkContact(x2,x2,x2,x4-2,y2-1,y2,y2+1,y4);
      if (checkRotate == false) {
        clearSquare(x1,y1);
        clearSquare(x3,y3);
        clearSquare(x4,y4);
        x1=x2; y1=y2-1;
        x3=x2; y3=y2+1;
        x4=x4-2;
        fillSquare(x1,y1,color);
        fillSquare(x3,y3,color);
        fillSquare(x4,y4,color);
        rotationPosition = 1;
      }
    }
  }
}

/*
 * This function shifts every block down once
 * when a line is deleted
 */
function shiftDown(startY) {
  for (var j=startY-1; j>-1; j--) {
    for (var i=0; i<10; i++) {
      if(grid[i][j] != "white")
      {
        fillSquare(i,j+1,grid[i][j]);
        grid[i][j+1] = grid[i][j];
        clearSquare(i,j);
        grid[i][j] = "white";
      }
    }
  }
}

/*
 * This function creates a new shape
 */
function newShape() {
  x1 = 0;   y1 = 0;
  x2 = 0;   y2 = 0;
  x3 = 0;   y3 = 0;
  x4 = 0;   y4 = 0;
  rotationPosition = 1;

  shapeNumber = Math.floor(Math.random() * 7) + 1;
  if (shapeNumber == 1) {
    x1 = 3; // assign the starting location and shape
    x3 = 4;
    x2 = 5;
    x4 = 6;
    color = "cyan"; // asign the color
  }
  else if (shapeNumber == 2) {
    x1 = 4;
    x2 = 5;
    x3 = 4;  y3 = 1;
    x4 = 5;  y4 = 1;
    color = "yellow";
  }
  else if (shapeNumber == 3) {
    x1 = 4;
    x3 = 3;  y3 = 1;
    x2 = 4;  y2 = 1;
    x4 = 5;  y4 = 1;
    color = "fuchsia";
  }
  else if (shapeNumber == 4) {
    x2 = 4;
    x1 = 5;
    x3 = 3;  y3 = 1;
    x4 = 4;  y4 = 1;
    color = "lime";
  }
  else if (shapeNumber == 5) {
    x1 = 4;
    x2 = 5;
    x3 = 5;  y3 = 1;
    x4 = 6;  y4 = 1;
    color = "red";
  }
  else if (shapeNumber == 6) {
    x1 = 4;
    x2 = 4;  y2 = 1;
    x3 = 4;  y3 = 2;
    x4 = 5;  y4 = 2;
    color = "orange";
  }
  else if (shapeNumber == 7) {
    x1 = 5;
    x2 = 5;  y2 = 1;
    x3 = 5;  y3 = 2;
    x4 = 4;  y4 = 2;
    color = "blue";
  }

  // start shape in game
  var check = checkContact(x1,x2,x3,x4,y1,y2,y3,y4);
  if (check == false)
  {
    fillSquare(x1,y1,color);
    fillSquare(x2,y2,color);
    fillSquare(x3,y3,color);
    fillSquare(x4,y4,color);
  }
  else {
    // if the shape immediately conflicts
    // GAME OVER
    shape.clearRect(0, 0, 300, 600); // clear screen
    shape.font = "40px Aldrich";
    shape.fillStyle = "black";
    shape.fillText("GAME OVER",10,40);
  }
}

newShape(); // first shape

/*
 * This function detects key presses and moves the shape
 * after making sure there is no conflict
 */
document.onkeydown = function(e){
  e = e || window.event;
  var key = e.which || e.keyCode;
  if(key===40){ //down
    y1++; y2++; y3++; y4++;
    var checkDown = checkContact(x1,x2,x3,x4,y1,y2,y3,y4);
    if (checkDown == false) {
      clearSquare(x1,y1-1);
      clearSquare(x2,y2-1);
      clearSquare(x3,y3-1);
      clearSquare(x4,y4-1);

      fillSquare(x1,y1,color);
      fillSquare(x2,y2,color);
      fillSquare(x3,y3,color);
      fillSquare(x4,y4,color);
    }
    else {
      y1--; y2--; y3--; y4--;
    }
  }
  else if (key===39){ //right
    x1++; x2++; x3++; x4++;
    var checkRight = checkContact(x1,x2,x3,x4,y1,y2,y3,y4);
    if (checkRight == false) {
      clearSquare(x1-1,y1);
      clearSquare(x2-1,y2);
      clearSquare(x3-1,y3);
      clearSquare(x4-1,y4);

      fillSquare(x1,y1,color);
      fillSquare(x2,y2,color);
      fillSquare(x3,y3,color);
      fillSquare(x4,y4,color);
    }
    else {
      x1--; x2--; x3--; x4--;
    }
  }
  else if (key===37){ //left
    x1--; x2--; x3--; x4--;
    var checkLeft = checkContact(x1,x2,x3,x4,y1,y2,y3,y4);
    if (checkLeft == false) {
      clearSquare(x1+1,y1);
      clearSquare(x2+1,y2);
      clearSquare(x3+1,y3);
      clearSquare(x4+1,y4);

      fillSquare(x1,y1,color);
      fillSquare(x2,y2,color);
      fillSquare(x3,y3,color);
      fillSquare(x4,y4,color);
    }
    else {
      x1++; x2++; x3++; x4++;
    }
  }
  else if (key===32){ // space bar rotates
    rotateRight();
  }
}

/*
 * This function iterates every 500 ms and moves the shape down
 * If the shape has reached the bottom, it's color is stores in
 * the grid and then it checks to see if any of the lines are
 * complete
 */
setInterval(function () {
  y1++; y2++; y3++; y4++;
  var checkDown = checkContact(x1,x2,x3,x4,y1,y2,y3,y4);
  if (checkDown == false) {
    clearSquare(x1,y1-1);
    clearSquare(x2,y2-1);
    clearSquare(x3,y3-1);
    clearSquare(x4,y4-1);

    fillSquare(x1,y1,color);
    fillSquare(x2,y2,color);
    fillSquare(x3,y3,color);
    fillSquare(x4,y4,color);
  }
  else {
    grid[x1][y1-1]=color;
    grid[x2][y2-1]=color;
    grid[x3][y3-1]=color;
    grid[x4][y4-1]=color;
    console.clear();
    for(var i=0; i<20; i++) {
      console.log(grid[0][i] +", "+ grid[1][i]+", "+ grid[2][i] +", "+ grid[3][i] +", "+ grid[4][i] +", "+
          grid[5][i] +", "+ grid[6][i] +", "+ grid[7][i] +", "+ grid[8][i] +", "+ grid[9][i]);
      if (grid[0][i] != "white" && grid[1][i] != "white" && grid[2][i] != "white" && grid[3][i] != "white" && grid[4][i] != "white" &&
          grid[5][i] != "white" && grid[6][i] != "white" && grid[7][i] != "white" && grid[8][i] != "white" && grid[9][i] != "white") {
          for(var j=0; j<10; j++) {
            grid[j][i] = "white";
            clearSquare(j,i);
          }
          shiftDown(i);
      }
    }
    newShape();
  }
}, 500);
