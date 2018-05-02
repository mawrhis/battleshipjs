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

  ships: [{ locations: ["7", "8", "9"], hits: ["","",""] },
          { locations: ["11", "18", "25"], hits: ["","",""] },
          { locations: ["39", "40", "41"], hits: ["","",""] }],

  fire: function(guess) {
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
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++)  {
      if(ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  }
};
