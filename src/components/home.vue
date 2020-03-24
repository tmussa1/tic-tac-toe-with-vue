<template>
  <div id="board">
    <canvas id="game-board" @mousedown="boxClicked"></canvas>
    <!-- Shows different alerts to guide the user through the game -->
    <b-modal
      id="win-modal"
      :body-bg-variant="alertSuccess"
    >Congratulations, you won! Click okay to play again!</b-modal>
    <b-modal
      id="game-over-modal"
      :body-bg-variant="alertGameOver"
    >Game over! click okay to play again!</b-modal>
    <b-modal
      id="maximum-attempts-modal"
      :body-bg-variant="alertTooManyAttempts"
    >You can keep playing but you won't get any credits!</b-modal>
    <div id="spacer"></div>
    <b-button variant="danger" @click="resetGame">Reset the Game</b-button>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      /**
       * The 2 dimensional squares array contains the top left and bottom right coordinates
       * of every square in the canvas
       */
      squares: [[], [], [], [], [], [], [], [], []],
      /**
       * The characters maybe empty or hold value X or O
       */
      characters: ["", "", "", "", "", "", "", "", ""],
      /**
       * The X and Y coordinates of where the user clicked
       */
      xCoordinate: 0,
      yCoordinate: 0,
      /**
       * Whether the user won current iteration and the counts in the current session
       */
      won: false,
      winningCount: 0,
      lossCount: 0,
      /**
       * Dynamically binds feedback color
       */
      alertGameOver: "warning",
      alertTooManyAttempts: "danger",
      alertSuccess: "success"
    };
  },
  methods: {
    /**
     * Draws a 2 dimensional board using canvas API
     */
    drawBoard: function() {
      let canvas = document.getElementById("game-board");
      let boardContext = canvas.getContext("2d");
      let size = canvas.offsetWidth;
      var square = Math.floor(size / 3);

      this.drawVertical(boardContext, square, 0, 300);
      this.drawVertical(boardContext, square * 2, 0, 300);
      this.drawHorizontal(boardContext, square * 0.5, 0, 300);
      this.drawHorizontal(boardContext, square, 0, 300);
      this.drawHorizontal(boardContext, square * 1.5, 0, 300);
      this.populateLocation(100, 50);
    },
    /**
     * Helper method to draw the vertical lines
     */
    drawVertical: function(boardContext, square, beginPoint, endPoint) {
      boardContext.beginPath();
      boardContext.moveTo(square, beginPoint);
      boardContext.lineTo(square, endPoint);
      boardContext.stroke();
    },
    /**
     * Helper method to draw the horizontal lines
     */
    drawHorizontal: function(boardContext, square, beginPoint, endPoint) {
      boardContext.beginPath();
      boardContext.moveTo(beginPoint, square);
      boardContext.lineTo(endPoint, square);
      boardContext.stroke();
    },
    /**
     * Stores the top left and bottom right coordinates of the squares in canvas
     */
    populateLocation: function(width, height) {
      this.squares[0] = [height * 0, width * 0, width * 1, height * 1];
      this.squares[1] = [height * 0, width * 1, width * 2, height * 1];
      this.squares[2] = [height * 0, width * 2, width * 3, height * 1];
      this.squares[3] = [height * 1, width * 0, width * 1, height * 2];
      this.squares[4] = [height * 1, width * 1, width * 2, height * 2];
      this.squares[5] = [height * 1, width * 2, width * 3, height * 2];
      this.squares[6] = [height * 2, width * 0, width * 1, height * 3];
      this.squares[7] = [height * 2, width * 1, width * 2, height * 3];
      this.squares[8] = [height * 2, width * 2, width * 3, height * 3];
    },
    /**
     * Handles mouse down event in the squares
     */
    boxClicked: function(event) {
      this.xCoordinate = event.offsetX;
      this.yCoordinate = event.offsetY;

      let rand = Math.floor(Math.random() * 10);

      /**
       * User gets X or O randomly
       */
      for (let i = 0; i < this.squares.length; i++) {
        if (
          this.xCoordinate <= this.squares[i][2] &&
          this.yCoordinate <= this.squares[i][3]
        ) {
          if (rand < 5) {
            this.drawCharacters(
              "X",
              this.squares[i][1],
              this.squares[i][3],
              this.squares[i][1],
              this.squares[i][0]
            );
            this.characters[i] = "X";
            /**
             * Checks if the current selectiton made the user a winner or if there
             * are no empty slots and the game is over
             */
            this.checkwin();
            this.checkGameOver();
          } else {
            this.drawCharacters(
              "O",
              this.squares[i][1],
              this.squares[i][3],
              this.squares[i][1],
              this.squares[i][0]
            );
            this.characters[i] = "O";
            /**
             * Checks if the current selectiton made the user a winner or if there
             * are no empty slots and the game is over
             */
            this.checkwin();
            this.checkGameOver();
          }
          break;
        }
      }
    },
    /**
     * An additional functionality is the ability to clear choices and select a new icon
     * The user is not guaranteed a winning icon during the second selection
     */
    drawCharacters: function(
      characterToDraw,
      xLocation,
      yLocation,
      deleteX,
      deleteY
    ) {
      let canvas = document.getElementById("game-board");
      let boardContext = canvas.getContext("2d");
      boardContext.fillStyle = "#ffffff";
      boardContext.fillRect(deleteX + 1, deleteY + 1, 20, 48);
      boardContext.save();
      boardContext.font = "20px Georgia";
      boardContext.fillStyle = "#000000";
      boardContext.fillText(characterToDraw, xLocation, yLocation);
      boardContext.save();
    },
    /**
     * Clears the canvas, resets stored characters and sets winning to false.
     * Useful for redrawing
     */
    clearCanvas: function() {
      let canvas = document.getElementById("game-board");
      let boardContext = canvas.getContext("2d");
      boardContext.fillStyle = "#ffffff";
      boardContext.fillRect(0, 0, 300, 150);
      boardContext.save();

      for (let i = 0; i < this.characters.length; i++) {
        this.characters[i] = null;
      }

      this.won = false;
    },
    /**
     * Checks winning by the rows, columns and diagonals
     */
    checkwin: function() {
      this.checkRowWins(0);
      this.checkRowWins(3);
      this.checkRowWins(6);
      this.checkColumnWins(0);
      this.checkColumnWins(1);
      this.checkColumnWins(2);
      this.checkDiagonalWins(0);
      this.checkDiagonalWins(2);

      /**
       * Emit event to the parent after a win. ALso redraw the canvas to start fresh
       */
      if (this.won) {
        this.$bvModal.show("win-modal");
        this.winningCount += 1;
        this.$emit("update-win", this.winningCount);
        this.clearCanvas();
        this.drawBoard();
      }
    },
    /**
     * Helper method to check possible winnings in the row
     */
    checkRowWins: function(column) {
      if (
        this.characters[column] &&
        this.characters[column] == this.characters[column + 1] &&
        this.characters[column + 1] == this.characters[column + 2] &&
        this.characters[column] == this.characters[column + 2]
      ) {
        this.won = true;
      }
    },
    /**
     * Helper method to check possible winnings in the column
     */
    checkColumnWins: function(row) {
      if (
        this.characters[row] &&
        this.characters[row] == this.characters[row + 3] &&
        this.characters[row + 3] == this.characters[row + 6] &&
        this.characters[row] == this.characters[row + 6]
      ) {
        this.won = true;
      }
    },
    /**
     * Helper method to check possible winnings in the diagonals
     */
    checkDiagonalWins: function(start) {
      if (
        (this.characters[start] &&
          this.characters[start] == this.characters[start + 4] &&
          this.characters[start + 4] == this.characters[start + 8] &&
          this.characters[start] == this.characters[start + 8]) ||
        (this.characters[start] &&
          start >= 2 &&
          this.characters[start] == this.characters[start + 2] &&
          this.characters[start + 2] == this.characters[start + 4] &&
          this.characters[start] == this.characters[start + 4])
      )
        this.won = true;
    },
    /**
     * Checks if there are no more empty slots and the game is over
     */
    checkGameOver: function() {
      let filledCount = 0;
      for (let i = 0; i < this.characters.length; i++) {
        if (this.characters[i]) {
          filledCount += 1;
        }
      }
      /**
       * Emits event to the parent to update the loss count
       */
      if (filledCount > 8 && !this.won) {
        this.$bvModal.show("game-over-modal");
        this.lossCount += 1;
        this.$emit("update-loss", this.lossCount);
        this.clearCanvas();
        this.drawBoard();
      }
    },
    resetGame: function() {
      this.clearCanvas();
      this.drawBoard();
      this.lossCount = 0;
      this.winningCount = 0;
      this.$emit("update-loss", this.winningCount);
      this.$emit("update-win", this.winningCount);
    }
  },
  /**
   * Draws the board during mounting
   */
  mounted() {
    this.drawBoard();
  },
  /**
   * Calculate the total number of attempts so far
   */
  computed: {
    total: function() {
      return this.winningCount + this.lossCount;
    }
  },
  /**
   * When the attempt totals to 10, alert the user that he is not getting credit
   */
  watch: {
    total: function() {
      if (this.total == 10) {
        this.$bvModal.show("maximum-attempts-modal");
      }
    }
  }
};
</script>

<style scoped>
#board {
  padding-left: 50px;
}
#spacer {
  margin-top: 50px;
  padding-left: 30px;
}
</style>