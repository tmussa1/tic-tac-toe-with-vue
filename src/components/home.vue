<template>
  <div id="board">
    <canvas id="game-board" @mousedown="boxClicked"></canvas>
    <b-modal id="win-modal">Congratulations, you won! Click okay to play again!</b-modal>
    <b-modal id="game-over-modal">Game over! click okay to play again!</b-modal>
    <b-modal id="maximum-attempts-modal">You can keep playing but you won't get any credits!</b-modal>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  data: function() {
    return {
      squares: [[], [], [], [], [], [], [], [], []],
      characters: ["", "", "", "", "", "", "", "", ""],
      xCoordinate: 0,
      yCoordinate: 0,
      won: false,
      winningCount: 0,
      lossCount: 0
    };
  },
  methods: {
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
    drawVertical: function(boardContext, square, beginPoint, endPoint) {
      boardContext.beginPath();
      boardContext.moveTo(square, beginPoint);
      boardContext.lineTo(square, endPoint);
      boardContext.stroke();
    },
    drawHorizontal: function(boardContext, square, beginPoint, endPoint) {
      boardContext.beginPath();
      boardContext.moveTo(beginPoint, square);
      boardContext.lineTo(endPoint, square);
      boardContext.stroke();
    },
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
    boxClicked: function(event) {
      this.xCoordinate = event.offsetX;
      this.yCoordinate = event.offsetY;

      let rand = Math.floor(Math.random() * 10);

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
            this.checkwin();
            this.checkGameOver();
          }
          break;
        }
      }
    },
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
    checkwin: function() {
      this.checkRowWins(0);
      this.checkRowWins(3);
      this.checkRowWins(6);
      this.checkColumnWins(0);
      this.checkColumnWins(1);
      this.checkColumnWins(2);
      this.checkDiagonalWins(0);
      this.checkDiagonalWins(2);

      if (this.won) {
        this.$bvModal.show("win-modal");
        this.winningCount += 1;
        this.$emit("update-win", this.winningCount);
        this.clearCanvas();
        this.drawBoard();
      }
    },
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
    checkDiagonalWins: function(start) {
      if (
        (this.characters[start] &&
          this.characters[start] == this.characters[start + 4] &&
          this.characters[start + 4] == this.characters[start + 8] &&
          this.characters[start] == this.characters[start + 8]) ||
        (this.characters[start] != null &&
          this.characters[start] == this.characters[start + 2] &&
          this.characters[start + 2] == this.characters[start + 4] &&
          this.characters[start] == this.characters[start + 4])
      )
        this.won = true;
    },
    checkGameOver: function() {
      let filledCount = 0;
      for (let i = 0; i < this.characters.length; i++) {
        if (this.characters[i]) {
          filledCount += 1;
        }
      }
      if (filledCount > 8 && !this.won) {
        this.$bvModal.show("game-over-modal");
        this.lossCount += 1;
        this.$emit("update-loss", this.lossCount);
        this.clearCanvas();
        this.drawBoard();
      }
    }
  },
  mounted() {
    this.drawBoard();
  },
  computed: {
    total: function() {
      return this.winningCount + this.lossCount;
    }
  },
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
</style>