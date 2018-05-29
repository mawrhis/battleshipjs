// view object

var view = {
  displayMessage: function(msg) { //method
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) { //method
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) { //method
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};


// model object

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [{ locations: ["01", "02", "03"], hits: ["","",""] },
          { locations: ["13", "14", "15"], hits: ["","",""] },
          { locations: ["26", "36", "46"], hits: ["","",""] }],

  fire: function(guess) { //method
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess); //indexOf(arg) goes through array and finds location (index) of arg
      if (index >= 0) {
        //we have a hit
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");
        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed.")
    return false
  },
  isSunk: function(ship) { //method
    for (var i = 0; i < this.shipLength; i++)  {
      if(ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  }
};

// controller object

var controller = {
  guesses: 0,
  gameOver: false,

  processGuess: function(guess) { //method
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank all my battleships, in " + this.guesses + "guesses");
        this.gameOver = true;
      }

    }

    function parseGuess (guess) {
      var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

      if (controller.gameOver === true) {
        view.displayMessage("Oops, game is over, no more guesses allowed");
      } else if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
      } else {
        firstChar = guess.charAt(0) //grab the first character of guess
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
          alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
          alert ("Oops, that's off the board!");
        } else {
          return row + column;
        }
      }
      return null;
    }
  }
}


// TODO/docs

// what is null?
// what is NaN - not a number
// || returns true if either operand is true
// array - pole
// null is falsey value - falsey truthy
