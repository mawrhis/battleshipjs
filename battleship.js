var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};




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

var controller = {
  guesses: 0,

  processGuess: function(guess) {
    function parseGuess (guess) {
      var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

      if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
      } else {
        firstChar = guess.charAt(0) //grab the first character of guess
        var row = alphabet.indexOf(firstChar);
        var column = guess.chartAt(1);

        if (isNan(row) || inNaN(column)) {
          alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
          alert ("Oops, that's off the board!");
        }
      }
    }
  }
}


// TODO/docs

// what is null?
// what is NaN - not a number
// || returns true if either operand is true
// array - pole
